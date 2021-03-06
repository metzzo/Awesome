define(['underscore', 'src/app/compiler/lexer/token', 'src/app/compiler/data/operator'], function(_, tokenModule, operatorModule) {
  var delimiter = ' \t\n\r!"§$%&/()=?`´[]{}^°+*#\'-.:,;<>'; // marks the end of a token
  var silentDelimiter = ' \t\r'; // these delimiters are not added to the array
  var comment = '--';
  var newLine = '\n';
  var stringStarter = '"';
  var doubleDelimiter = ['->'];
  
  var Lexer = function(input, file) {
    if (_.isUndefined(this.file)) {
      file = null;
    }
    this.input = input;
    this.position = 0;
    this.lastPosition = 0;
    this.output = [ ];
    this.line = 0;
    this.lastNewLine = 0;
    this.lineText = '';
    this.file = file;
  };
  
  Lexer.prototype.tokenize = function() {
    this.output = [ ];
    this.lastPosition = 0;
    this.lastNewLine = 0;
    this.line = 0;
    this.lineText = this._processLineText();
    
    for (this.position = 0; this.position < this.input.length; this.position++) {
      var singleToken = this._getSingleToken();
      var doubleToken = this._getDoubleToken();
      
      if (doubleToken === comment) {
        // comment!
        this._nextToken();
        while(this.position < this.input.length && this.input.charAt(this.position) !== '\n') {
          this.position++;
        }
        this.lastPosition = this.position;
        this.position--;
      } else if (delimiter.indexOf(singleToken) !== -1 || operatorModule.findOperatorByText(doubleToken) || doubleDelimiter.indexOf(doubleToken) !== -1) {
        // shit just got serious
        this._nextToken();
        
        // add the delimiter itself if it is not silent
        do {
          if (singleToken === stringStarter) {
            this._nextToken();
            do {
              this.position++;
            } while(this.position < this.input.length && this.input.charAt(this.position) !== stringStarter);
            this.position++;
            this._nextToken();
            this.lastPosition = this.position;
          } else if (silentDelimiter.indexOf(singleToken) === -1) {
            var isToken = operatorModule.findOperatorByText(doubleToken) || doubleDelimiter.indexOf(doubleToken) !== -1;
            
            this.lastPosition = this.position;
            this.position = this.position + (isToken ? 2 : 1);
            
            this._nextToken();
            
            this.lastPosition = this.position;
          } else {
            this.lastPosition = this.position + 1; // current position + singleToken length
            break;
          }
          
          this._handleNewLine(singleToken);
          
          singleToken = this._getSingleToken();
          doubleToken = this._getDoubleToken();
        } while(delimiter.indexOf(singleToken) !== -1 || operatorModule.findOperatorByText(doubleToken) || doubleDelimiter.indexOf(doubleToken) !== -1);
      }
      
      this._handleNewLine(singleToken);
    }
    if (this.lastPosition < this.position) {
      this._nextToken()
    }
    
    return this.output;
  };
  
  Lexer.prototype._nextToken = function() {
    var text = this.input.substring(this.lastPosition, this.position);
    if (text.length > 0) {
      var token = new tokenModule.Token(text, {
        file: this.file,
        lineText: this.lineText,
        line: this.line,
        character: this.lastPosition - this.lastNewLine
      });
      
      this.output.push(token);
    }
  };
  
  Lexer.prototype._handleNewLine = function(singleToken) {
    if (singleToken === newLine) {
      this.lastNewLine = this.position;
      this.line++;
      this.lineText = this._processLineText();
    }
  };
  
  Lexer.prototype._getSingleToken = function() {
    return this.input.charAt(this.position);
  };
  
  Lexer.prototype._getDoubleToken = function() {
    return (this.position < this.input.length - 1) ? this.input.substr(this.position, 2) : '';
  };
  
  Lexer.prototype._processLineText = function() {
    var currentPosition = this.position;
    while (currentPosition < this.input.length && this.input.charAt(currentPosition) !== newLine) currentPosition++;
    return this.input.substring(this.position, currentPosition);
  };
  
  return {
    Lexer: Lexer
  };
});