define([ 'underscore', 'underscore.string', 'src/app/compiler/parser/tokenIterator', 'src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/lexer/token', 'src/app/compiler/syntaxError', 'src/app/compiler/errorMessages', 'src/app/compiler/parser/dataType' ], function(_,_s, tokenIteratorModule, astModule, operatorModule, tokenModule, syntaxErrorModule, errorMessages, dataTypeModule) {
  var AstScope      = astModule.AstPrototypes.SCOPE;
  var AstOperator   = astModule.AstPrototypes.OPERATOR;
  var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
  var AstIf         = astModule.AstPrototypes.IF;
  var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
  var AstCall       = astModule.AstPrototypes.CALL;
  var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
  var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
  var AstWhile      = astModule.AstPrototypes.WHILE;
  var AstFor        = astModule.AstPrototypes.FOR;
  var AstRepeat     = astModule.AstPrototypes.REPEAT;
  var AstVarDec     = astModule.AstPrototypes.VARDEC;
  var AstDataType   = astModule.AstPrototypes.DATATYPE;

  
  var Parser = function(input) {
    if (!(input instanceof Array)) {
      throw 'Invalid Parameter';
    }
    
    this.input = input;
    this.output = null;
    
    
    // prepare input
    this.input.push(new tokenModule.Token('\n', {
      lineText: '',
      line: 0,
      character: 0,
      file: null
    }));
  };
  
  Parser.prototype.parse = function() {
    this.output = null;
    this.iterator = new tokenIteratorModule.TokenIterator(this.input);
    
    try {
      this.output = this.parseScope(AstScope.types.MAIN);
    } catch(ex) {
      if (ex instanceof syntaxErrorModule.SyntaxError) {
        this.output = null;
      }
      
      throw ex;
    }
    
    return this.output;
  };
  
  Parser.prototype.parseLine = function() {
    var expr;
    if (this.isKeyword()) {
      expr = this.parseKeyword();
    } else if (this.isIdentifier()) {
      expr = this.parseFuncCall(false);
    } else {
      expr = this.parseExpression();
    }
    return expr;
  };
  
  // SCOPE
  Parser.prototype.parseScope = function(type, endToken) {
    // if no \n => it is a one line scope, kinda like if(yolo) swag;
    if (!this.iterator.is('\n') && type === AstScope.types.LOCAL) {
      return astModule.createNode(AstScope, { type: type, nodes: [ this.parseLine() ] });
    } else {
      if (_.isUndefined(endToken)) {
        endToken = [ ];
      }
      endToken.push('end');
      
      var scope = astModule.createNode(AstScope, { type: type, nodes: [ ] });
      this.iterator.iterate(_.bind(function() {
        if (endToken.indexOf(this.iterator.current().text) != -1) {
          return true;
        } else {
          var line = this.parseLine();
          if (!!line) {
            scope.params.nodes.push(line);
          }
          return false;
        }
      }, this));
      return scope;
    }
  };
  
  // KEYWORD
  Parser.prototype.isKeyword = function() {
    return !!this.keywordsParser[this.iterator.current().text];
  };
  
  Parser.prototype.parseKeyword = function() {
    if (this.isKeyword()) {
      return this.keywordsParser[this.iterator.current().text].call(this);
    } else {
      this.iterator.riseSyntaxError(_s.sprintf(errorMessages.EXPECTING_KEYWORD, this.iterator.current().text));
    }
  };
  Parser.prototype.parseInvalidKeyword = function() {
    this.iterator.riseSyntaxError(errorMessages.UNEXPECTED_KEYWORD);
  };
  Parser.prototype.keywordsParser = {
    'else': Parser.prototype.parseInvalidKeyword,
    'then': Parser.prototype.parseInvalidKeyword,
    'do': Parser.prototype.parseInvalidKeyword,
    'in': Parser.prototype.parseInvalidKeyword,
    'until': Parser.prototype.parseInvalidKeyword,
    'end': Parser.prototype.parseInvalidKeyword,
    'var': function() {
      return this.parseVariableDeclaration();
    },
    'const': function() {
      return this.parseVariableDeclaration();
    },
    'repeat': function() {
      this.iterator.next();
      var scope = this.parseScope(AstScope.types.LOCAL, [ 'until' ]);
      if (!this.iterator.is('\n')) this.iterator.match('until');
      var condition = this.parseExpression();
      return astModule.createNode(AstRepeat, {
        condition: condition,
        scope: scope
      });
    },
    'for': function() {
      this.iterator.next();
      var variable = this.parseIdentifier();
      this.iterator.match('in');
      var collection = this.parseExpression();
      this.iterator.optMatch('do');
      var scope = this.parseScope(AstScope.types.LOCAL);
      this.iterator.optMatch('end');
      
      return astModule.createNode(AstFor, {
        variable: variable,
        collection: collection,
        scope: scope
      });
    },
    'while': function() {
      this.iterator.next();
      var condition = this.parseExpression();
      this.iterator.optMatch('do');
      var scope = this.parseScope(AstScope.types.LOCAL);
      this.iterator.optMatch('end');
      
      return astModule.createNode(AstWhile, {
        condition: condition,
        scope: scope
      });
    },
    'if': function() {
      var cases = [ ];
      
      do {
        this.iterator.next();
        var condition = this.parseExpression();
        this.iterator.optMatch('then');
      
        var scope = this.parseScope(AstScope.types.LOCAL, [ 'else' ]);
        
        cases.push({
          condition: condition,
          scope: scope
        });
        
        if (this.iterator.is('else')) {
          this.iterator.next();
          
          if (!this.iterator.is('if')) {
            scope = this.parseScope(AstScope.types.LOCAL);
            cases.push({
              condition: null,
              scope: scope
            });
          }
        }
      } while(!(this.iterator.is('end') || this.iterator.is('\n')));
      this.iterator.optMatch('end');
      
      return astModule.createNode(AstIf, {
        cases: cases
      });
    }
  };
  
  
  // EXPRESSION
  Parser.prototype.parseExpression = function(priority) {
    if (_.isUndefined(priority)) {
      priority = 0;
    }
    
    if (priority <= operatorModule.findMaxPriority()) {
      var leftOperand, rigtOperand;
      leftOperand = this.parseExpression(priority + 1);
      
      var found;
      do {
        found = false;
        var operators = operatorModule.findOperatorsByPriority(priority);
        
        for (var operatorPos = 0; operatorPos < operators.length && !found; operatorPos++) {
          var operator = operators[operatorPos];
          
          if (this.iterator.is(operator.name)) {
            this.iterator.next();
            rightOperand = this.parseExpression(priority + 1);
            leftOperand = astModule.createNode(AstOperator, {
              leftOperand: leftOperand,
              rightOperand: rightOperand,
              operator: operator
            });
            found = true;
          }
        }
      } while(found);
      
      return leftOperand;
    } else {
      return this.parseFactor();
    }
  };
  
  Parser.prototype.isOperator = function() {
    return operatorModule.findOperatorByText(this.iterator.current().text);
  };
  
  Parser.prototype.parseFactor = function() {
    var text = this.iterator.current().text;
    if (/^\d+$/.test(text)) {
      this.iterator.next();
      return astModule.createNode(AstIntLit, {
        value: +text
      });
    } else if(text === 'true' || text === 'false') {
      this.iterator.next();
      return astModule.createNode(AstBoolLit, {
        value: text === 'true'
      });
    } else if ((_s.startsWith(text, '"') || _s.startsWith(text, "'")) && (_s.endsWith(text, '"') || _s.endsWith(text, "'"))) {
      this.iterator.next();
      return astModule.createNode(AstStringLit, {
        value: text.substring(1, text.length-1)
      });
    } else if (this.iterator.is('var')) {
      return this.parseVariableDeclaration();
    } else if (this.isIdentifier()) { // check if identifier?
      return this.parseFuncCall(true);
    } else if (this.isKeyword()) {
      this.iterator.riseSyntaxError(errorMessages.UNEXPECTED_KEYWORD);
    } else {
      this.iterator.riseSyntaxError(_s.sprintf(errorMessages.EXPECTING_FACTOR, this.iterator.current().text));
    }
  };
  
  Parser.prototype.isIdentifier = function() {
    var text = this.iterator.current().text;
    return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(text) && !this.keywordsParser[this.iterator.current().text];
  };
  
  Parser.prototype.parseVariableDeclaration = function() {
    var isConst;
    if (!this.iterator.is('const')) {
      this.iterator.match('var');
      isConst = false;
    } else {
      this.iterator.optMatch('const');
      isConst = true;
    }
    
    var variables= [ ];
    do {
      
      var identifier = this.parseIdentifier();
      var dataType = null;
      var value = null;
      
      if (this.iterator.optMatch('is')) {
        dataType = this.parseDataType();
        
        if (this.iterator.optMatch('=')) {
          value = this.parseExpression();
        }
      } else {
        this.iterator.match('=');
        value = this.parseExpression();
      }
      variables.push({
        identifier: identifier,
        value: value,
        dataType: dataType
      });
    } while(this.iterator.optMatch(','));
    
    
    return astModule.createNode(AstVarDec, {
      variables: variables
    });
  };
  
  Parser.prototype.parseDataType = function() {
    var dataType = dataTypeModule.findPrimitiveDataTypeByName(this.iterator.current().text);
    if (!!dataType) {
      this.iterator.next();
      return astModule.createNode(AstDataType, {
        dataType: dataType
      });
    } else {
      this.iterator.riseSyntaxError(errorMessages.EXPECTING_DATATYPE);
    }
  };
  
  Parser.prototype.parseIdentifier = function() {
    if (this.isIdentifier()) {
      var name = this.iterator.current().text;
      this.iterator.next();
      return astModule.createNode(AstIdentifier, {
        name: name
      });
    } else {
      this.iterator.riseSyntaxError(_s.sprintf(errorMessages.EXPECTING_IDENTIFIER, this.iterator.current().text));
    }
  };
  
  Parser.prototype.parseFuncCall = function(requireBrackets) {
    var position = this.iterator.position;
    
    var identifier = this.parseIdentifier();
    var hasBrackets;
    
    if (this.iterator.optMatch('(')) {
      hasBrackets = true;
    } else {
      hasBrackets = false;
    }
    
    if (!requireBrackets && this.isOperator()) {
      this.iterator.position = position // nope is just an expression
      return this.parseExpression();
      
      // this.iterator.riseSyntaxError(errorMessages.EXPECTING_FUNCTIONCALL);
    }
    
    if (!hasBrackets && requireBrackets) {
      // not a function, but a normal identifier
      return identifier;
    } else {
      // parse parameters
      var first = true;
      var params = [ ];
      while (!(this.iterator.is('\n') || this.iterator.is(')'))) {
        if (!first) {
          this.iterator.match(',');
        }
        params.push(this.parseExpression());
        
        first = false;
      }
      
      if (hasBrackets) {
        this.iterator.match(')');
      }
      
      return astModule.createNode(AstCall, {
        func: identifier,
        params: params
      });
    }
  };
  
  return {
    Parser: Parser
  }
});