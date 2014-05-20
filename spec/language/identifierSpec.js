define([ 'src/app/compiler/data/dataType', 'src/app/compiler/ast/ast', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/ast' ], function(dataTypeModule, astModule, identifierModule, identifierAstModule, astModule) {
  describe('Identifier', function() {
    it('is created properly', function() {
      // arrange
      var identifier;
      
      // act
      identifier = new identifierModule.Identifier('yolo', {
        dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
        type: 'swagtype'
      });
      
      // assert
      expect(identifier).not.toBeNull();
      expect(identifier.name).toBe('yolo');
    });
    
    it('is not created properly', function() {
      expect(function() { new identifierModule.Identifier(null, {
          type: 'yolo'
        })
      }).toThrow('Invalid Parameter');
    });
    
    it('can be proposed properly', function() {
      // arrange
      var identifier = new identifierModule.Identifier('yolo', {
        dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
        type: 'swagtype'
      });
      
      // act
      identifier.proposeDataType(dataTypeModule.PrimitiveDataTypes.INT);
      
      // assert
      expect(identifier.params.dataType).toBe(dataTypeModule.PrimitiveDataTypes.INT);
    });
  });
});