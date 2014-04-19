define([ ], function() {
  var Token = function(text, params) {
    // check if params are valid
    if (params.line < 0 || typeof params.lineText == 'undefined' || params.character < 0 || text.length == 0) {
      throw 'Invalid Parameter'
    }
    
    this.text = text;
    this.params = {
      file: params.file,
      lineText: params.lineText,
      line: params.line,
      character: params.character
    };
  };
  Token.prototype.toString = function() {
    return this.text + ' (file: ' + this.params.file + ' in line ' + this.params.line + ' at character ' + this.params.character + ')';
  };
  return {
    Token: Token
  };
});