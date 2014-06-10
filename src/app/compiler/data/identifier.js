define([ 'underscore', 'src/app/compiler/data/dataType' ], function(_, dataTypeModule) {
  var module;
  
  var Identifier = function(name, params) {
    if (_.isUndefined(name) || _.isUndefined(params) || _.isUndefined(params.dataType) || _.isUndefined(params.type)) {
      throw 'Invalid Parameter';
    }
    this.name   = name;
    this.params = {
      dataType: params.dataType,
      type: params.type,
      nodes: [ ]
    };
  };
  
  Identifier.prototype.proposeDataType = function(dataType) {
    if (!this.params.dataType.isUnique()) {
      this.params.dataType = this.params.dataType.proposeDataType(dataType);
    }
  };
  
  return module = {
    Identifier: Identifier
  };
});