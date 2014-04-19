define(['underscore'], function(_) {
  var FatalityLevel = {
    CRITICAL: 'CRITICAL',
    WARNING: 'WARNING',
    NOTICE: 'NOTICE'
  };
  
  var SyntaxError = function(msg, params) {
    if (_.isUndefined(msg) || _.isUndefined(params) || _.isUndefined(params.token)) {
      throw 'Invalid Parameter';
    }
    this.msg = msg;
    this.params = {
      fatality: params.fatality ? params.fatality : FatalityLevel.CRITICAL,
      token:  params.token
    };
    
    this.message = this.toString(); // fix for jasmine .toThrow handling
  };
  
  SyntaxError.prototype.toString = function() {
    return 'Syntax Error: ' + this.msg + ' at '+this.params.token.text + ' in line ' + this.params.token.params.line + ' at character ' + this.params.token.params.character + ' in file ' + this.params.token.params.file;
  };
  
  
  return {
    SyntaxError: SyntaxError,
    FatalityLevel: FatalityLevel
  }
});