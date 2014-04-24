define([ 'src/app/compiler/syntaxError', 'src/app/compiler/ast/operator', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/int_literal', 'src/app/compiler/ast/if_statement', 'src/app/compiler/ast/bool_literal', 'src/app/compiler/ast/string_literal', 'src/app/compiler/ast/call', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/while_statement', 'src/app/compiler/ast/for_statement', 'src/app/compiler/ast/repeat_statement', 'src/app/compiler/ast/variable_declaration', 'src/app/compiler/ast/datatype', 'src/app/compiler/ast/func_declaration' ], function(syntaxErrorModule, operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier, while_statement, for_statement, repeat_statement, variable_declaration, datatype, func_declaration) {
  var iterator;
  var current;
  
  return {
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
          value: astPrototype.functions,
          enumerable: false,
          writeable: false
          
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
        traverse: {
          value: function(cb) {
            if (cb) {
              if (!cb(this)) {
                // dont stop
                if (this.functions && this.functions.traverse) {
                  this.functions.traverse.call(this, cb);
                }
              }
            }
          },
          enumerable: false,
          writable: false
        },
        getDataType: {
          value: function() {
            if (this.functions && this.functions.getDataType) {
               return this.functions.getDataType.call(this);
            }
          },
          enumerable: false,
          writable: false
        },
        checkDataTypes: {
          value: function() {
            if (this.functions && this.functions.checkDataTypes) {
               this.functions.checkDataTypes.call(this);
            }
          },
          enumerable: false,
          writable: false
        }
      });
      
      obj.traverse(function(traversingObject) {
        // set parent
        if (traversingObject !== obj) {
          traversingObject.parent = obj;
          return true;
        }
      });
      return obj;
    },
    AstPrototypes: {
      SCOPE: scope,
      OPERATOR: operator,
      INT_LITERAL: int_literal,
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
      FUNCTION: func_declaration
    }
  };
});