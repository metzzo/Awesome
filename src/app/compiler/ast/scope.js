define([ ], function() {
  return {
    name: 'Scope',
    params: {
      nodes: [ ],
      type: 0
    },
    types: {
      MAIN: 0, // "first" scope
      FUNCTION: 1, // function
      LOCAL: 2 // if, while, ...
    }
  };
});