define([ 'underscore', 'src/app/compiler/data/syntaxError', 'src/app/compiler/ast/operator', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/int_literal', 'src/app/compiler/ast/if_statement', 'src/app/compiler/ast/bool_literal', 'src/app/compiler/ast/string_literal', 'src/app/compiler/ast/call', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/while_statement', 'src/app/compiler/ast/for_statement', 'src/app/compiler/ast/repeat_statement', 'src/app/compiler/ast/variable_declaration', 'src/app/compiler/ast/datatype', 'src/app/compiler/ast/func_declaration', 'src/app/compiler/ast/empty', 'src/app/compiler/ast/float_literal' ], function(_, syntaxErrorModule, operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier, while_statement, for_statement, repeat_statement, variable_declaration, datatype, func_declaration, empty, float_literal) {
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
          writable: false
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
        params: {
          value: params,
          enumerable: true,
          writable: false
        },
        functions: {
          value: _.clone(astPrototype.functions),
          enumerable: false,
          writeable: false
          
        },
        copy: {
          value: function() {
            return moduleData.createNode(astPrototype, JSON.parse(JSON.stringify(this.params)));
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
        
        // VARIABLE:
        getVariables: {
          value: function() {
            if (this.functions && this.functions.getVariables) {
              return this.functions.getVariables();
            }
          },
          enumerable: false,
          writable: false
        },
        getIdentifier: {
          value: function() {
            if (this.functions && this.functions.getIdentifier) {
              return this.functions.getIdentifier();
            } else {
              return null;
            }
          },
          enumerable: false,
          writeable: false
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
      EMPTY: empty
    }
  };
});