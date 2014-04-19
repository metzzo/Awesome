define([ ], function() {
  return {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 0
    },
    types: {
      MAIN: 'main', // "first" scope
      FUNCTION: 'function', // function
      LOCAL: 'local' // if, while, ...
    }
  };
});