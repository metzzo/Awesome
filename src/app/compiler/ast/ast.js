define([ 'underscore', 'src/app/compiler/data/syntaxError', 'src/app/compiler/ast/operator', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/int_literal', 'src/app/compiler/ast/if_statement', 'src/app/compiler/ast/bool_literal', 'src/app/compiler/ast/string_literal', 'src/app/compiler/ast/call', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/while_statement', 'src/app/compiler/ast/for_statement', 'src/app/compiler/ast/repeat_statement', 'src/app/compiler/ast/variable_declaration', 'src/app/compiler/ast/datatype', 'src/app/compiler/ast/func_declaration', 'src/app/compiler/ast/empty', 'src/app/compiler/ast/float_literal', 'src/app/compiler/ast/import', 'src/app/compiler/ast/return_statement' ], function(_, syntaxErrorModule, operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier, while_statement, for_statement, repeat_statement, variable_declaration, datatype, func_declaration, empty, float_literal, importModule, return_statement) {
  var iterator;
  var current;
    
  var moduleData
  return moduleData = {
    setIterator: function(it) {
      iterator = it;
    },
    mark: function() {
      current = iterator.current();
    },
    copyNodeArray: function(arr) {
      var newArr = [ ];
      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (!!obj.copy) {
          newArr.push(obj.copy());
        } else {
          var newObj = { };
          for (var key in obj) {
            var node = obj[key];
            if (!!node.copy) {
              newObj[key] = node.copy();
            } else {
              newObj[key] = JSON.parse(JSON.stringify(node));
            }
          }
          newArr.push(newObj);
        }
        
      }
      return newArr;
    },
    createNode: function(astPrototype, params) {
      if (!params) params = { };
      if (!astPrototype) {
        throw 'Invalid Parameter';
      }
      var token;
      if (!!iterator) {
        token = current;
      } else {
        current = null;
      }
      
      if (params.token) {
        token = params.token;
        delete params.token;
      }
      
      var obj = Object.create({}, {
        name: {
          value: astPrototype.name,
          enumerable: true,
          writable: true
        },
        token: {
          value: token,
          enumerable: true,
          writable: true
        },
        parent: {
          enumerable: false,
          writable: true
        },
        astModule: {
          enumerable: false,
          writable: false,
          value: moduleData
        },
        params: {
          value: params,
          enumerable: true,
          writable: true
        },
        functions: {
          value: _.clone(astPrototype.functions),
          enumerable: false,
          writable: true
        },
        copy: {
          value: function() {
            if (this.functions.copy) {
              var newParams = this.functions.copy();
              newParams.token = this.token;
              return moduleData.createNode(astPrototype, newParams);
            } else {
              throw 'Cannot copy AST node';
            }
          }
        },
        riseSyntaxError: {
          value: function(msg, fatality) {
            throw new syntaxErrorModule.SyntaxError(msg, {
              fatality: fatality,
              token: this.token
            });
          },
          enumerable: false,
          writable: false
        },
        backTraverse: {
          value: function(cb) {
            if (cb) {
              var continueTraversing = true;
              var current = this.parent;
              while(continueTraversing && current) {
                continueTraversing = !cb(current);
                current = current.parent;
              } 
            }
          },
          enumerable: false,
          writable: false
        },
        traverse: {
          value: function(cb) {
            if (cb) {
              if (!cb(this)) {
                // dont stop
                if (this.functions && this.functions.traverse) {
                  this.functions.traverse(cb);
                }
              }
            }
          },
          enumerable: false,
          writable: false
        },
        getScope: {
          value: function(cb) {
            var returnValue = null;
            this.backTraverse(function(astNode) {
              if (astNode.name === scope.name) {
                returnValue = astNode;
                return true;
              } else {
                return false;
              }
            });
            return returnValue;
          },
          enumerable: false,
          writable: false
        },
        getContext: {
          value: function(cb) {
            var returnValue = null;
            this.backTraverse(function(astNode) {
              if (astNode.name === scope.name && scope.params.type === scope.types.MAIN) {
                returnValue = astNode.params.context;
                return true;
              } else {
                return false;
              }
            });
            return returnValue;
          },
          enumerable: false,
          writable: false
        },
        
        // DATATYPE:
        getDataType: {
          value: function() {
            if (this.functions && this.functions.getDataType) {
              return this.functions.getDataType();
            }
          },
          enumerable: false,
          writable: false
        },
        checkDataTypes: {
          value: function() {
            if (this.functions && this.functions.checkDataTypes) {
              this.functions.checkDataTypes();
            }
          },
          enumerable: false,
          writable: false
        },
        processDataTypes: {
          value: function() {
            if (this.functions && this.functions.processDataTypes) {
              this.functions.processDataTypes();
            }
          },
          enumerable: false,
          writable: false
        },
        proposeDataType: {
          value: function(dataType) {
            if (this.functions && this.functions.proposeDataType) {
              this.functions.proposeDataType(dataType);
            }
          },
          enumerable: false,
          writable: false
        },
        isMutable: {
          value: function() {
            if (this.functions && this.functions.isMutable) {
              return this.functions.isMutable();
            } else {
              return false;
            }
          },
          enumerable: false,
          writable: false
        },
        use: {
          value: function() {
            if (this.functions && this.functions.use) {
              this.functions.use();
            } else {
              var obj = this;
              this.traverse(function(traversingObject) {
                if (traversingObject !== obj) {
                  traversingObject.use();
                  return true;
                }
              });
            }
          },
          enumerable: false,
          writable: false
        },
        isUsed: {
          value: function() {
            if (this.functions && this.functions.isUsed) {
              return this.functions.isUsed();
            } else {
              return true;
            }
          },
          enumerable: false,
          writable: false
        },
        remove: {
          value: function(node) {
            this.params = { };
            this.functions = _.clone(empty.functions);
            this.name = empty.name;
            
            _.each(this.functions, (function(value, key) {
              this.functions[key] = value.bind(this);
            }).bind(this));
          },
          enumerable: false,
          writable: false
        },
        // VARIABLE / FUNCTION
        getVariables: {
          value: function() {
            if (this.functions && this.functions.getVariables) {
              return this.functions.getVariables();
            } else {
              return [];
            }
          },
          enumerable: false,
          writable: false
        },
        getFunctions: {
          value: function(modules) {
            if (this.functions && this.functions.getFunctions) {
              return this.functions.getFunctions(modules);
            } else {
              return [];
            }
          },
          enumerable: false,
          writable: false
        }
      });
      
      // bind every function to object
      _.each(obj.functions, function(value, key) {
        obj.functions[key] = value.bind(obj);
      });
      
      obj.traverse(function(traversingObject) {
        // set parent
        if (traversingObject !== obj) {
          traversingObject.parent = obj;
          return true; // true says "yo homie skip my children pl0x"
        }
      });
      
      // call init function if it exists
      if (!!obj.functions.init) {
        obj.functions.init();
      }
      
      return obj;
    },
    AstPrototypes: {
      SCOPE: scope,
      OPERATOR: operator,
      INT_LITERAL: int_literal,
      FLOAT_LITERAL: float_literal,
      IF: if_statement,
      WHILE: while_statement,
      FOR: for_statement,
      REPEAT: repeat_statement,
      BOOL_LITERAL: bool_literal,
      STRING_LITERAL: string_literal,
      CALL: call,
      IDENTIFIER: identifier,
      VARDEC: variable_declaration,
      DATATYPE: datatype,
      FUNCTION: func_declaration,
      RETURN: return_statement,
      EMPTY: empty,
      IMPORT: importModule
    }
  };
});