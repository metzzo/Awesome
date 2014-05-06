define([ 'src/app/compiler/data/dataType', 'src/app/compiler/ast/ast', 'src/app/compiler/data/identifier' ], function(dataTypeModule, astModule, identifierModule) {
  describe('Identifier', function() {
    it('is created properly', function() {
      // arrange
      var identifier;
      var expectedIdentifier = {
        name: 'yolo',
        params: {
          dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
          value: astModule.AstPrototypes.EMPTY,
          type: identifierModule.Types.LOCAL
        }
      };
      
      // act
      identifier = new identifierModule.Identifier('yolo', {
        dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
        value: astModule.AstPrototypes.EMPTY,
        type: identifierModule.Types.LOCAL
      });
      
      // assert
      expect(identifier).not.toBeNull();
      expect(identifier).toEqual(expectedIdentifier);
    });
  });
});