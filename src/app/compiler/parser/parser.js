define([ 'underscore', 'underscore.string', 'app/compiler/parser/tokenIterator', 'app/compiler/ast/ast', 'app/compiler/parser/operator', 'app/compiler/lexer/token', 'app/compiler/syntaxError', 'app/compiler/errorMessages' ], function(_,_s, tokenIteratorModule, astModule, operatorModule, tokenModule, syntaxErrorModule, errorMessages) {
  var AstScope = astModule.AstPrototypes.SCOPE;
  var AstOperator = astModule.AstPrototypes.OPERATOR;
  var AstIntLit = astModule.AstPrototypes.INT_LITERAL;
  
  var Parser = function(input) {
    if (!(input instanceof Array)) {
      throw 'Invalid Parameter';
    }
    
    this.input = input;
    this.output = null;
    this.iterator = new tokenIteratorModule.TokenIterator(input);
    
    // prepare input
    this.input.push(new tokenModule.Token('\n', {
      lineText: '',
      line: 0,
      character: 0,
      file: null
    }));
  };
  
  Parser.prototype.parse = function() {
    this.output = astModule.createNode(AstScope, { type: AstScope.types.MAIN, nodes: [ ] });
    
    try {
      if (this.input.length > 1) {
        var expr = this.parseExpression();
        if (!!expr) {
          this.output.params.nodes.push(expr);
        }
      }
    } catch(ex) {
      if (ex instanceof syntaxErrorModule.SyntaxError) {
        this.output = null;
      }
      
      throw ex;
    }
    
    return this.output;
  };
  
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
  
  Parser.prototype.parseFactor = function() {
    var text = this.iterator.current().text;
    if (/^\d+$/.test(text)) {
      this.iterator.next();
      return astModule.createNode(AstIntLit, {
        value: +text
      });
    } else {
      this.iterator.riseSyntaxError(_s.sprintf(errorMessages.EXPECTING_FACTOR, this.iterator.current().text));
    }
  };
  
  return {
    Parser: Parser
  }
});