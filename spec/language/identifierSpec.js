define([ 'src/app/compiler/data/dataType', 'src/app/compiler/ast/ast', 'src/app/compiler/data/identifier', 'src/app/compiler/ast/identifier', 'src/app/compiler/ast/ast' ], function(dataTypeModule, astModule, identifierModule, identifierAstModule, astModule) {
  describe('Identifier', function() {
    it('is created properly', function() {
      // arrange
      var identifier;
      var expectedIdentifier = {
        name: astModule.createNode(identifierAstModule, { name: 'yolo' }),
        params: {
          dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
          type: 'swagtype'
        }
      };
      
      // act
      identifier = new identifierModule.Identifier(astModule.createNode(identifierAstModule, { name: 'yolo' }), {
        dataType: dataTypeModule.MetaDataTypes.UNKNOWN,
        type: 'swagtype'
      });
      
      // assert
      expect(identifier).not.toBeNull();
      expect(identifier).toEqual(expectedIdentifier);
    });
    
    it('is not created properly', function() {
      expect(function() { new identifierModule.Identifier(null, {
          type: identifierModule.Types.LOCAL
        })
      }).toThrow('Invalid Parameter');
    });
  });
});