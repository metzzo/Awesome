define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
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
    
    it('finds datatype by name', function() {
      // arrange
      var dataType;
      var expectedDataType = dataTypeModule.PrimitiveDataTypes.INT;
      
      // act
      dataType = dataTypeModule.findPrimitiveDataTypeByName('int');
      
      // assert
      expect(dataType).not.toBeNull();
      expect(dataType).toEqual(expectedDataType);
    });
    
    it('matches works', function() {
      expect(dataTypeModule.PrimitiveDataTypes.INT.matches(dataTypeModule.PrimitiveDataTypes.INT)).toBe(true);
      expect(dataTypeModule.PrimitiveDataTypes.INT.matches(dataTypeModule.PrimitiveDataTypes.FLOAT)).toBe(false);
    });
    
    it('toString works', function() {
      expect(dataTypeModule.PrimitiveDataTypes.INT.toString()).toBe('int');
    })
    
    it('balances works', function() {
      expect(dataTypeModule.PrimitiveDataTypes.INT.balance(dataTypeModule.PrimitiveDataTypes.INT)).toBe(dataTypeModule.PrimitiveDataTypes.INT);
      expect(dataTypeModule.PrimitiveDataTypes.INT.balance(dataTypeModule.PrimitiveDataTypes.FLOAT)).toBe(dataTypeModule.MetaDataTypes.AMBIGUOUS);
    });
    
    it('isKnown works', function() {
      expect(dataTypeModule.PrimitiveDataTypes.INT.isKnown()).toBe(true);
      expect(dataTypeModule.MetaDataTypes.UNKNOWN.isKnown()).toBe(false);
    })
  })
});