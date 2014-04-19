define([ ], function() {  
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
      OPERATOR: {
        name: 'Operator',
        params: {
          leftOperand: null,
          rightOperand: null,
          operator: null
        },
        functions: {
          
        }
      },
      INT_LITERAL: {
        name: 'Int Literal',
        params: {
          value: 0
        },
        functions: {
          
        }
      }
    }
  };
});