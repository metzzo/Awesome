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
  })
});