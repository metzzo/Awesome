define([ 'src/app/compiler/ast/ast' ], function(astModule) {
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
  
  var defaultDataTypeValues = {
    'int': '0',
    'float': '0.0',
    'string': "''"
  };
  var getDefaultDataTypeValue = function(dataType) {
    return defaultDataTypeValues[dataType.name];
  };
  
  return {
    'Bool Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'Call': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'DataType': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Empty': function(gen, node) { },
    'For': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Function Declaration': function(gen, node) {
      throw 'Not yet implemented '+node.name;
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
          gen.emit('else if (');
          gen.emitNode(ifCase.condition);
          gen.emit(') ');
        } else {
          gen.emit('else ');
        }
        gen.emitNode(ifCase.scope);
      }
    },
    'Int Literal': function(gen, node) {
      gen.emit(node.params.value);
    },
    'Operator': function(gen, node) {
      gen.emitNode(node.params.leftOperand);
      gen.emit(' ' + node.params.operator.name + ' ');
      gen.emitNode(node.params.rightOperand);
    },
    'Repeat': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Scope': function(gen, node) {
      if (node.params.nodes.length > 0) {
        gen.emit('{');
        gen.indent();
        gen.emitLine();
        
        for (var i = 0; i < node.params.nodes.length; i++) {
          gen.emitNode(node.params.nodes[i]);
          gen.emit(';');
          gen.emitLine();
        }
        gen.outdent();
        gen.emitLine('}');
      } else {
        gen.emit('{ }');
        gen.emitLine();
      }
    },
    'String Literal': function(gen, node) {
      gen.emit(node.params.value);
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
          gen.emitNode(variable.value);
        } else {
          gen.emit(getDefaultDataTypeValue(variable.dataType.getDataType()));
        }
      }
    },
    'While': function(gen, node) {
      throw 'Not yet implemented '+node.name;
    },
    'Main': function(gen) {
      return gen.emitNode(gen.mainNode);
    }
  };
});