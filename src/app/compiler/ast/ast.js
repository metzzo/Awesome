define([ 'app/compiler/ast/operator', 'app/compiler/ast/scope', 'app/compiler/ast/int_literal', 'app/compiler/ast/if_statement', 'app/compiler/ast/bool_literal', 'app/compiler/ast/string_literal', 'app/compiler/ast/call', 'app/compiler/ast/identifier' ], function(operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier) {  
  return {
    createNode: function(astPrototype, params) {
      if (!params) params = { };
      if (!astPrototype) {
        throw 'Invalid Parameter';
      }
      
      return Object.create({ }, {
        name: {
          value: astPrototype.name,
          enumerable: true,
          writeable: false
        },
        params: {
          value: params,
          enumerable: true,
          writeable: true
        },
        functions: {
          value: astPrototype.functions,
          enumerable: false,
          writeable: false
          
        },
        traverse: {
          value: function() {
            
          },
          enumerable: false,
          writeable: false
        }
      });
    },
    AstPrototypes: {
      SCOPE: scope,
      OPERATOR: operator,
      INT_LITERAL: int_literal,
      IF: if_statement,
      BOOL_LITERAL: bool_literal,
      STRING_LITERAL: string_literal,
      CALL: call,
      IDENTIFIER: identifier
    }
  };
});