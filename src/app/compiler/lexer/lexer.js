define([ ], function() {
  var delimiter = ' \t\n\r!"§$%&/()=?`´[]{}^°+*#\'-.:,;<>'; // marks the end of a token
  var silentDelimiter = ' \t\r'; // these delimiters are not added to the array
  var comment = '--';
  var newLine = '\n';
  
  
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
  
  var Lexer = function(input) {
    this.input = input;
    this.position = 0;
    this.lastPosition = 0;
    this.result = [ ];
    this.line = 0;
    this.lastNewLine = 0;
    this.lineText = '';
  };
  
  Lexer.prototype.tokenize = function() {
    this.result = [ ];
    this.lastPosition = 0;
    this.lastNewLine = 0;
    this.line = 0;
    this.lineText = this._processLineText();
    
    for (this.position = 0; this.position < this.input.length; this.position++) {
      var singleToken = this.input.charAt(this.position);
      var doubleToken = (this.position < this.input.length - 1) ? this.input.substr(this.position, 2) : '';
      
      if (doubleToken === comment) {
        // comment!
        this._nextToken();
        while(this.position < this.input.length && this.input.charAt(this.position) != '\n') {
          this.position++;
        }
        this.lastPosition = this.position;
        this.position--;
      } else if (delimiter.indexOf(singleToken) != -1) {
        // shit just got serious
        this._nextToken();
        
        // add the delimiter itself if it is not silent
        if (silentDelimiter.indexOf(singleToken) == -1) {
          this.lastPosition = this.position;
          this.position++;
          
          this._nextToken();
          
          this.lastPosition = this.position;
        } else {
          this.lastPosition = this.position + 1; // current position + singleToken length
        }
      }
      
           
      if (singleToken === newLine) {
        this.lastNewLine = this.position;
        this.line++;
        this.lineText = this._processLineText();
      }
    };
    if (this.lastPosition < this.position) {
      this._nextToken()
    }
    
    return this.result;
  };
  
  Lexer.prototype._nextToken = function() {
    var text = this.input.substring(this.lastPosition, this.position);
    if (text.length > 0) {
      var token = new Token(text, {
        file: null,
        lineText: this.lineText,
        line: this.line,
        character: this.lastPosition - this.lastNewLine
      });
      
      this.result.push(token);
    }
  };
  
  Lexer.prototype._processLineText = function() {
    var currentPosition = this.position;
    while (currentPosition < this.input.length && this.input.charAt(currentPosition) != newLine) currentPosition++;
    return this.input.substring(this.position, currentPosition);
  };
  
  return {
    Lexer: Lexer,
    Token: Token
  };
});