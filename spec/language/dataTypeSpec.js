define(['app/compiler/parser/dataType'], function(dataTypeModule) {
  describe('DataType', function() {
    it('is created properly', function() {
      // arrange
      var dataType;
      var name = 'test';
      var params = { };
      
      // act
      dataType = new dataTypeModule.DataType(name, params);
      
      // assert
      expect(dataType).not.toBeNull();
      expect(dataType.name).toBe(name);
      expect(dataType.params).not.toBeNull();
      expect(dataType.params).toEqual(params);
    });
  })
});