define([ 'src/app/compiler/ast/operator', 'src/app/compiler/ast/scope', 'src/app/compiler/ast/int_literal', 'src/app/compiler/ast/if_statement', 'src/app/compiler/ast/bool_literal', 'src/app/compiler/ast/string_literal', 'src/app/compiler/ast/call', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/while_statement', 'src/app/compiler/ast/for_statement', 'src/app/compiler/ast/repeat_statement', 'src/app/compiler/ast/variable_declaration', 'src/app/compiler/ast/datatype', 'src/app/compiler/ast/func_declaration' ], function(operator, scope, int_literal, if_statement, bool_literal, string_literal, call, identifier, while_statement, for_statement, repeat_statement, variable_declaration, datatype, func_declaration) {  
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