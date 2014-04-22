define(['src/app/compiler/ast/ast', 'src/app/compiler/parser/operator', 'src/app/compiler/parser/dataType'], function(astModule, operatorModule, dataTypeModule) {
  describe('AstNode', function() {
    // this node mocks a node for testing purpose only
    var stubNode = {
      name: 'Stub',
      params: { },
      functions: {
        traverse: function() { }
      }
    };
    
    var traverseCount = 0;
    beforeEach(function() {
      traverseCount = 0;
    });
    
    describe('Operator', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.OPERATOR, {
          leftOperand: astModule.createNode(stubNode),
          rightOperand: astModule.createNode(stubNode),
          operator: operatorModule.Operators.PLUS_OPERATOR
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
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
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
    
    describe('Int Literal', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.INT_LITERAL, {
          value: 42
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Int Literal',
          params: {
            value: 42
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(1);
      });
    });
    
    describe('Bool Literal', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.BOOL_LITERAL, {
          value: true
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Bool Literal',
          params: {
            value: true
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(1);
      });
    });
    
    describe('String Literal', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.STRING_LITERAL, {
          value: 'swiggidy swag'
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'String Literal',
          params: {
            value: 'swiggidy swag'
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(1);
      });
    });
    
    describe('Scope', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.SCOPE, {
          type: astModule.AstPrototypes.SCOPE.types.MAIN,
          nodes: [ astModule.createNode(stubNode) ]
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Scope',
          params: {
            type: astModule.AstPrototypes.SCOPE.types.MAIN,
            nodes: [ { name: 'Stub', params: { } } ]
          }
        };
         
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(2);
      });
    });
    
    describe('If', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.IF, {
          cases: [
            {
              condition: astModule.createNode(stubNode),
              scope: astModule.createNode(stubNode)
            }
          ]
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
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
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
    
    describe('While', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.WHILE, {
          condition: astModule.createNode(stubNode),
          scope: astModule.createNode(stubNode)
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'While',
          params: {
            condition: { name: 'Stub', params: { } },
            scope: { name: 'Stub', params: { } }
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
    
     describe('For', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.FOR, {
          variable: astModule.createNode(stubNode),
          collection: astModule.createNode(stubNode),
          scope: astModule.createNode(stubNode)
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'For',
          params: {
            variable: { name: 'Stub', params: { } },
            collection: { name: 'Stub', params: { } },
            scope: { name: 'Stub', params: { } }
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(4);
      });
    });
    
    describe('Call', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.CALL, {
          func: astModule.createNode(stubNode),
          params: [ astModule.createNode(stubNode) ]
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Call',
          params: {
            func: { name: 'Stub', params: { } },
            params: [ { name: 'Stub', params: { } } ]
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
    
    describe('Identifier', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.IDENTIFIER, {
          name: 'yolo'
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Identifier',
          params: {
            name: 'yolo'
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(1);
      });
    });
    
    describe('Variable Declaration', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.VARDEC, {
          variables: [
            {
              identifier: astModule.createNode(stubNode),
              value: astModule.createNode(stubNode),
              dataType: null,
              type: astModule.AstPrototypes.VARDEC.types.VARIABLE
            }
          ]
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Variable Declaration',
          params: {
            variables: [
              {
                identifier: { name: 'Stub', params: { } },
                value: { name: 'Stub', params: { } },
                dataType: null,
                type: astModule.AstPrototypes.VARDEC.types.VARIABLE
              }
            ]
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
    
    describe('DataType', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.DATATYPE, {
          dataType: dataTypeModule.PrimitiveDataTypes.INT
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'DataType',
          params: {
            dataType: dataTypeModule.PrimitiveDataTypes.INT
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(1);
      });
    });
    
    describe('Function Declaration', function() {
      var ast;
      beforeEach(function() {
        ast = astModule.createNode(astModule.AstPrototypes.FUNCTION, {
          returnDataType: astModule.createNode(stubNode),
          params: [ ],
          scope: astModule.createNode(stubNode)
        });
      });
      afterEach(function() {
        ast = null;
      });
      
      it('is created properly', function() {
        // arrange
        var expectedAst = {
          name: 'Function Declaration',
          params: {
            returnDataType: { name: 'Stub', params: { } },
            params: [ ],
            scope: { name: 'Stub', params: { } }
          }
        };
        
        // assert
        expect(ast).not.toBeNull();
        expect(ast).toEqual(expectedAst);
      });
      
      it('is traversing properly', function() {
        // act
        ast.traverse(function() {
          traverseCount++;
        });
        
        // assert
        expect(traverseCount).toBe(3);
      });
    });
  });
});