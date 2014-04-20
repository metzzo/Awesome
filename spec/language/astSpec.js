define(['src/app/compiler/ast/ast', 'src/app/compiler/parser/operator'], function(astModule, operatorModule) {
  describe('AstNode', function() {
    // this node mocks a node for testing purpose only
    var stubNode = {
      name: 'Stub',
      params: { },
      functions: {
        
      }
    };
    
    var stubCount = 0;
    beforeEach(function() {
      stubCount = 0;
    });
    
    describe('Operator', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Operator',
          params: {
            leftOperand: {
              name: 'Stub',
              params: { }
            },
            rightOperand: {
              name: 'Stub',
              params: { }
            },
            operator: operatorModule.Operators.PLUS_OPERATOR
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.OPERATOR, {
          leftOperand: astModule.createNode(stubNode),
          rightOperand: astModule.createNode(stubNode),
          operator: operatorModule.Operators.PLUS_OPERATOR
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('Int Literal', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Int Literal',
          params: {
            value: 42
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.INT_LITERAL, {
          value: 42
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('Bool Literal', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Bool Literal',
          params: {
            value: true
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.BOOL_LITERAL, {
          value: true
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('String Literal', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'String Literal',
          params: {
            value: 'swiggidy swag'
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.STRING_LITERAL, {
          value: 'swiggidy swag'
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('Scope', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Scope',
          params: {
            type: astModule.AstPrototypes.SCOPE.types.MAIN,
            nodes: [ { name: 'Stub', params: { } } ]
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.SCOPE, {
          type: astModule.AstPrototypes.SCOPE.types.MAIN,
          nodes: [ astModule.createNode(stubNode) ]
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('If', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'If',
          params: {
            cases: [
              {
                condition: { name: 'Stub', params: { } },
                scope: { name: 'Stub', params: { } }
              }
            ]
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.IF, {
          cases: [
            {
              condition: astModule.createNode(stubNode),
              scope: astModule.createNode(stubNode)
            }
          ]
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('While', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'While',
          params: {
            condition: { name: 'Stub', params: { } },
            scope: { name: 'Stub', params: { } }
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.WHILE, {
          condition: astModule.createNode(stubNode),
          scope: astModule.createNode(stubNode)
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('Call', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Call',
          params: {
            func: { name: 'Stub', params: { } },
            params: [ { name: 'Stub', params: { } } ]
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.CALL, {
          func: { name: 'Stub', params: { } },
          params: [ { name: 'Stub', params: { } } ]
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
    
    describe('Identifier', function() {
      it('is created properly', function() {
        // arrange
        var ast;
        var expectedAst = {
          name: 'Identifier',
          params: {
            name: 'yolo'
          }
        };
        
        // act
        ast = astModule.createNode(astModule.AstPrototypes.IDENTIFIER, {
          name: 'yolo'
        });
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
    });
  });
});