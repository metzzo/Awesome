define([ 'underscore', 'app/compiler/parser/tokenIterator', 'app/compiler/ast/ast', 'app/compiler/parser/operator', 'app/compiler/lexer/token' ], function(_, tokenIteratorModule, astModule, operatorModule, tokenModule) {
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
    
    if (this.input.length > 0) {
      var expr = this.parseExpression();
      if (!!expr) {
        this.output.params.nodes.push(expr);
      }
    }
    
    return this.output;
  };
  
  Parser.prototype.parseExpression = function(priority) {
    if (_.isUndefined(priority)) {
      priority = 0;
    }
    
    if (priority < 15) { // TODO: Not hardcoded -> Max Priority
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
    }
  };
  
  return {
    Parser: Parser
  }
});