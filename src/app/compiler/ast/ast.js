define([ 'src/app/compiler/ast/operator', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/int_literal', 'src/app/compiler/ast/if_statement', 'src/app/compiler/ast/bool_literal', 'src/app/compiler/ast/string_literal', 'src/app/compiler/ast/call', 'src/app/compiler/ast/identifier' ], function(operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier) {  
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