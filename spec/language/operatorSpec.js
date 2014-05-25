define(['src/app/compiler/data/operator', 'src/app/compiler/data/dataType'], function(operatorModule, dataTypeModule) {
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
    it('is balancing properly', function() {
      // arrange
      var operator = operatorModule.Operators.PLUS_OPERATOR;
      var left = dataTypeModule.PrimitiveDataTypes.INT;
      var right = dataTypeModule.PrimitiveDataTypes.FLOAT;
      var result;
      // act
      result = operator.balance(left, right);
      
      // assert
      expect(result).not.toBeNull();
      expect(result).toBe(dataTypeModule.PrimitiveDataTypes.FLOAT);
    });
    
    it('is not balancing properly', function() {
      // arrange
      var operator = operatorModule.Operators.PLUS_OPERATOR;
      var left = dataTypeModule.PrimitiveDataTypes.INT;
      var right = dataTypeModule.MetaDataTypes.AMBIGUOUS;
      var result;
      // act
      result = operator.balance(left, right);
      
      // assert
      expect(result).not.toBeNull();
      expect(result).toBe(dataTypeModule.MetaDataTypes.AMBIGUOUS);
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