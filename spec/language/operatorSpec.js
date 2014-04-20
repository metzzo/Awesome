define(['app/compiler/parser/operator'], function(operatorModule) {
  describe('Operator', function() {
    it('is created properly', function() {
      // arrange
      var operator;
      var name = 'test';
      var params = {
        priority: 42
      };
      
      // act
      operator = new operatorModule.Operator(name, params);
      
      // assert
      expect(operator).not.toBeNull();
      expect(operator.name).toBe(name);
      expect(operator.params).not.toBeNull();
      expect(operator.params).toEqual(params);
    });
    it('findOperatorsByPriority returns correct value', function() {
      // arrange
      var expectedOperators = [operatorModule.Operators.PLUS_OPERATOR, operatorModule.Operators.MINUS_OPERATOR];
      var operators;
      
      // act
      operators = operatorModule.findOperatorsByPriority(operatorModule.Operators.PLUS_OPERATOR.params.priority);
      
      // assert
      expect(operators).not.toBeNull();
      expect(operators).toEqual(expectedOperators);
    });
    it('findMaxPriority returns max priority', function() {
      // arrange
      var expectedPriority = 20;
      var priority;
      
      // act
      priority = operatorModule.findMaxPriority();
      
      // assert
      expect(priority).toBe(expectedPriority);
    });
    it('findOperatorByText returns correct operator', function() {
      // arrange
      var operator = '+';
      var expectedOperator = operatorModule.Operators.PLUS_OPERATOR;
      
      // act
      operator = operatorModule.findOperatorByText(operator);
      
      // assert
      expect(operator).not.toBeNull();
      expect(operator).toEqual(expectedOperator);
    });
  })
});