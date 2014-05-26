define(['src/app/compiler/data/dataType'], function(dataTypeModule) {
  describe('DataType', function() {
    
  
    describe('Primitive DataType', function() {
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
      });
      
      it('decorateName works', function() {
        expect(dataTypeModule.PrimitiveDataTypes.INT.decorateName()).toBe('_int');
      });
      
      it('balances works', function() {
  expect(dataTypeModule.PrimitiveDataTypes.INT.balance(dataTypeModule.PrimitiveDataTypes.INT)).toBe(dataTypeModule.PrimitiveDataTypes.INT);
        expect(dataTypeModule.PrimitiveDataTypes.INT.balance(dataTypeModule.PrimitiveDataTypes.FLOAT)).toBe(dataTypeModule.MetaDataTypes.AMBIGUOUS);
      });
      
      it('isKnown works', function() {
        expect(dataTypeModule.PrimitiveDataTypes.INT.isKnown()).toBe(true);
        expect(dataTypeModule.MetaDataTypes.UNKNOWN.isKnown()).toBe(false);
      });
    });
    
    
    describe('Function DataType', function() {
       it('matches works', function() {
        var func1 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT]);
        var func2 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.INT]);
        
        expect(func1.matches(func1)).toBe(true);
        expect(func1.matches(func2)).toBe(false);
      });
      
      it('toString works', function() {
        var func = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT]);
        expect(func.toString()).toBe('function(int, float) returns int');
      });
      
      it('decorateName works', function() {
        var func = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT]);
        expect(func.decorateName()).toBe('_func_int_float_ret_int');
      });
      
      it('balances works', function() {
        var func1 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT]);
        var func2 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.INT]);
        
        expect(func1.balance(func1)).toBe(func1);
        expect(func1.balance(func2)).toBe(dataTypeModule.MetaDataTypes.AMBIGUOUS);
      });
      
      it('isKnown works', function() {
        var func1 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.PrimitiveDataTypes.FLOAT]);
        var func2 = dataTypeModule.createFunctionDataType(dataTypeModule.PrimitiveDataTypes.INT, [dataTypeModule.PrimitiveDataTypes.INT, dataTypeModule.MetaDataTypes.UNKNOWN]);
        
        expect(func1.isKnown()).toBe(true);
        expect(func2.isKnown()).toBe(false);
      });
    });
  })
});