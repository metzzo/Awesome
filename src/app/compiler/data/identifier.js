define([ 'underscore' ], function(_) {
  var module;
  
  var Identifier = function(name, params) {
    if (_.isUndefined(name) || _.isUndefined(params) || _.isUndefined(params.dataType) || _.isUndefined(params.type)) {
      throw 'Invalid Parameter';
    }
    this.name   = name;
    this.params = params;
  };
  
  return module = {
    Identifier: Identifier,
    Types: {
      LOCAL: 'local'
    }
  };
});