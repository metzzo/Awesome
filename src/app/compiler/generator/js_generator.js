define([ 'src/app/compiler/ast/ast', 'src/app/compiler/data/dataType' ], function(astModule, dataTypeModule) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstCall       = astModule.AstPrototypes.CALL;
  var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstWhile      = astModule.AstPrototypes.WHILE;
  var AstFor        = astModule.AstPrototypes.FOR;
  var AstRepeat     = astModule.AstPrototypes.REPEAT;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;
  var AstFunction   = astModule.AstPrototypes.FUNCTION;
  var AstEmpty      = astModule.AstPrototypes.EMPTY;
  
  var forceCast = ['*', '/'];
  var forceInnerCast = ['=']
  
  var defaultDataTypeValues = {
    'int': '0',
    'float': '0.0',
    'string': "''"
  };
  var getDefaultDataTypeValue = function(dataType) {
    return defaultDataTypeValues[dataType.name];
  };
  
  var cast = function(gen, targetType, myType, cb) {
    if (!myType || !myType.matches(targetType)) {
      if (targetType.matches(dataTypeModule.PrimitiveDataTypes.INT)) {
        gen.emit('~~(');
        cb();
        gen.emit(')');
      } else if (targetType.matches(dataTypeModule.PrimitiveDataTypes.FLOAT)) {
        gen.emit('+(');
        cb();
        gen.emit(')');
      } else if (targetType.matches(dataTypeModule.PrimitiveDataTypes.STRING)) {
        gen.emit('(\'\'+(');
        cb();
        gen.emit('))');
      } else if (targetType.matches(dataTypeModule.PrimitiveDataTypes.BOOL)) {
        gen.emit('!!(');
        cb();
        gen.emit(')');
      } else {
        throw 'JS Generator does not know how to cast :(';
      }
    } else {
      cb();
    }
  };
  
  var castNode = function(gen, node, targetType) {
    cast(gen, targetType, node.getDataType(), function() {
      gen.emitNode(node);
    });
  };
  
  return {
    'Bool Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'Int Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'String Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'Float Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'Call': function(gen, node) {
      gen.emitNode(node.params.func);
      gen.emit('(');
      for (var i = 0; i < node.params.params.length; i++) {
        if (i !== 0) {
          gen.emit(', ');
        }
        gen.emitNode(node.params.params[i]);
      }
      gen.emit(')');
    },
    'DataType': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Empty': function(gen, node) { },
    'For': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Function Declaration': function(gen, node) {
      if (node.params.name) {
        gen.emit('var ');
        gen.emitNode(node.params.name);
        gen.emit(' = ');
      }
      gen.emit('function (');
      for (var i = 0; i < node.params.params.length; i++) {
        if (i !== 0) {
          gen.emit(', ');
        }
        var param = node.params.params[i];
        gen.emitNode(param.identifier.params.name);
      }
      gen.emit(') ');
      gen.emitNode(node.params.scope);
    },
    'Identifier': function(gen, node) {
      gen.emit(node.params.name);
    },
    'If': function(gen, node) {
      for (var i = 0; i < node.params.cases.length; i++) {
        var ifCase = node.params.cases[i];
        if (i === 0) {
          gen.emit('if (');
          gen.emitNode(ifCase.condition);
          gen.emit(') ');
        } else if (ifCase.condition.name !== AstEmpty.name) {
          gen.emit(' else if (');
          gen.emitNode(ifCase.condition);
          gen.emit(') ');
        } else {
          gen.emit(' else ');
        }
        gen.emitNode(ifCase.scope);
      }
    },
    'Operator': function(gen, node) {
      var left, right;
      left = node.params.leftOperand;
      right = node.params.rightOperand;
      
      var dataType = node.getDataType();
      var innerCast = forceInnerCast.indexOf(node.params.operator.name) !== -1;
      
      var isUsedAsStatement = node.parent ? node.parent.name === AstScope.name : false;
      
      var action = function() {
        if (!isUsedAsStatement) {
          gen.emit('(');
        }
        
        if (innerCast) {
          castNode(gen, left, dataType);
        } else {
          gen.emitNode(left);
        }
        gen.emit(' ' + node.params.operator.name + ' ');
        if (innerCast) {
          castNode(gen, right, dataType);
        } else {
          gen.emitNode(right);
        }
        if (!isUsedAsStatement) {
          gen.emit(')');
        }
      };
      
      if (forceCast.indexOf(node.params.operator.name) !== -1 && dataType.matches(dataTypeModule.PrimitiveDataTypes.INT)) {
        cast(gen, dataType, null, action); 
      } else {
        action();
      }
    },
    'Repeat': function(gen, node) {
      gen.emit('do ');
      gen.emitNode(node.params.scope);
      gen.emit(' while (!(');
      gen.emitNode(node.params.condition);
      gen.emit('))');
    },
    'Scope': function(gen, node) {
      if (node.params.nodes.length > 0) {
        gen.emit('{');
        gen.indent();
        gen.emitLine();
        
        for (var i = 0; i < node.params.nodes.length; i++) {
          if (i !== 0) {
            gen.emitLine();
          }
          gen.emitNode(node.params.nodes[i]);
          gen.emit(';');
        }
        gen.outdent();
        gen.emitLine('}');
      } else {
        gen.emit('{ }');
      }
    },
    'Variable Declaration': function(gen, node) {
      gen.emit('var ');
      for (var i = 0; i < node.params.variables.length; i++) {
        if (i !== 0) {
          gen.emit(', ');
        }
        
        var variable = node.params.variables[i];
        gen.emit(variable.identifier.params.name);
        gen.emit(' = ');
        if (variable.value.name !== AstEmpty.name) {
          castNode(gen, variable.value, variable.dataType.getDataType());
        } else {
          gen.emit(getDefaultDataTypeValue(variable.dataType.getDataType()));
        }
      }
    },
    'While': function(gen, node) {
      gen.emit('while (');
      gen.emitNode(node.params.condition);
      gen.emit(') ');
      gen.emitNode(node.params.scope);
    },
    'Main': function(gen) {
      return gen.emitNode(gen.mainNode);
    }
  };
});