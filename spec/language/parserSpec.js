define(['underscore.string', 'app/compiler/parser/parser', 'app/compiler/lexer/token', 'app/compiler/ast/ast', 'app/compiler/parser/operator', 'app/compiler/syntaxError', 'app/compiler/errorMessages'], function(_s, parserModule, tokenModule, astModule, operatorModule, syntaxErrorModule, errorMessages) {
  describe('Parser', function() {
    it('is created properly', function() {
      // arrange
      var parser;
      var input = [ ];
      
      var expectedInput = [new tokenModule.Token('\n', {
        lineText: '',
        line: 0,
        character: 0,
        file: null
      })];
      
      // act
      parser = new parserModule.Parser(input);
      
      // assert
      expect(parser).not.toBeNull();
      expect(parser.input).toEqual(expectedInput);
    });
    
    it('is not created properly', function() {
      // arrange
      var parser;
      var input = null;
      
      // act // assert
      expect(function() { parser = new parserModule.Parser(input); }).toThrow('Invalid Parameter');
    });
    
    var AstScope      = astModule.AstPrototypes.SCOPE;
    var AstOperator   = astModule.AstPrototypes.OPERATOR;
    var AstIntLit     = astModule.AstPrototypes.INT_LITERAL;
    var AstIf         = astModule.AstPrototypes.IF;
    var AstBoolLit    = astModule.AstPrototypes.BOOL_LITERAL;
    var AstCall       = astModule.AstPrototypes.CALL;
    var AstStringLit  = astModule.AstPrototypes.STRING_LITERAL;
    var AstIdentifier = astModule.AstPrototypes.IDENTIFIER;
    
    var params = [
      {
        name: 'is parsing empty input properly',
        input: [ ],
        output: astModule.createNode(AstScope, { type: AstScope.types.MAIN, nodes: [ ] })
      },
      {
        name: 'is parsing literal input properly',
        input: [ '42' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN, 
          nodes: [
            astModule.createNode(AstIntLit, { value: 42 })
          ]
        })
      },
      {
        name: 'is parsing simple term properly',
        input: [ '1', '+', '2'],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
              rightOperand: astModule.createNode(AstIntLit, { value: 2 }),
              operator: operatorModule.Operators.PLUS_OPERATOR
            })
          ]
        })
      },
      {
        name: 'is parsing complex term properly',
        input: [ '1', '+', '2', '*', '3'],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
              rightOperand: astModule.createNode(AstOperator, {
                leftOperand: astModule.createNode(AstIntLit, { value: 2 }),
                rightOperand: astModule.createNode(AstIntLit, { value: 3 }),
                operator: operatorModule.Operators.MUL_OPERATOR
              }),
              operator: operatorModule.Operators.PLUS_OPERATOR
            })
          ]
        })
      },
      {
        name: 'is not parsing simple term "1++1"',
        input: [ '1', '+', '+', '2' ],
        output: new syntaxErrorModule.SyntaxError(_s.sprintf(errorMessages.EXPECTING_FACTOR, '+'), {
          token: new tokenModule.Token('+', {
            file: null,
            lineText: '',
            line: 0,
            character: 0
          })
        }),
        fails: true
      },
      {
        name: 'is parsing if',
        input: [ 'if', 'true', '\n', '1', '\n', 'end' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstIf, {
              cases: [
                {
                  condition: astModule.createNode(AstBoolLit, { value: true }),
                  scope: astModule.createNode(AstScope, {
                    type: AstScope.types.LOCAL,
                    nodes: [
                      astModule.createNode(AstIntLit, { value: 1 })
                    ]
                  })
                }
              ]
            })
          ]
        })
      },
      {
        name: 'is parsing if with then',
        input: [ 'if', 'true', 'then', '\n', '1', '\n', 'end' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstIf, {
              cases: [
                {
                  condition: astModule.createNode(AstBoolLit, { value: true }),
                  scope: astModule.createNode(AstScope, {
                    type: AstScope.types.LOCAL,
                    nodes: [
                      astModule.createNode(AstIntLit, { value: 1 })
                    ]
                  })
                }
              ]
            })
          ]
        })
      },
      {
        name: 'is parsing if with elseif',
        input: [ 'if', 'true', '\n', '42', '\n', 'else', 'if', 'false', '\n', '1337', '\n', 'end' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstIf, {
              cases: [
                {
                  condition: astModule.createNode(AstBoolLit, { value: true }),
                  scope: astModule.createNode(AstScope, {
                    type: AstScope.types.LOCAL,
                    nodes: [
                      astModule.createNode(AstIntLit, { value: 42 })
                    ]
                  })
                },
                {
                  condition: astModule.createNode(AstBoolLit, { value: false }),
                  scope: astModule.createNode(AstScope, {
                    type: AstScope.types.LOCAL,
                    nodes: [
                      astModule.createNode(AstIntLit, { value: 1337 })
                    ]
                  })
                }
              ]
            })
          ]
        })
      },
      {
        name: 'is parsing simple function call',
        input: [ 'print', '"Hello World"' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstCall, {
              func: astModule.createNode(AstIdentifier, { name: 'print' }),
              params: [
                astModule.createNode(AstStringLit, { value: 'Hello World' })
              ]
            })
          ]
        })
      },
      {
        name: 'is parsing complex term with functions and variables',
        input: [ '1', '+', 'swag', '*', 'hallo', '(', 'true', ',', 'false', ')' ],
        output: astModule.createNode(AstScope, {
          type: AstScope.types.MAIN,
          nodes: [
            astModule.createNode(AstOperator, {
              leftOperand: astModule.createNode(AstIntLit, { value: 1 }),
              rightOperand: astModule.createNode(AstOperator, {
                leftOperand: astModule.createNode(AstIdentifier, { name: 'swag' }),
                rightOperand: astModule.createNode(AstCall, {
                  func: astModule.createNode(AstIdentifier, { name: 'hallo' }),
                  params: [
                    astModule.createNode(AstBoolLit, { value: true }),
                    astModule.createNode(AstBoolLit, { value: false }),
                  ]
                }),
                operator: operatorModule.Operators.MUL_OPERATOR
              }),
              operator: operatorModule.Operators.PLUS_OPERATOR
            })
          ]
        })
      },
      {
        name: 'is parsing variable addition',
        input: [ 'yolo', '+', 'swag' ],
        output: new syntaxErrorModule.SyntaxError(errorMessages.EXPECTING_FUNCTIONCALL, {
          token: new tokenModule.Token('+', {
            file: null,
            lineText: '',
            line: 0,
            character: 0
          })
        }),
        fails: true
      }
    ];
    
    for (var testCase = 0; testCase < params.length; testCase++) {
      var test = params[testCase];
      (function(test) {
        it(test.name, function() {
          // arrange
          var parser;
          var input = [ ];
          var output;
          var expectedOutput = test.output;
          var fails = test.fails;
          
          for (var inputToken = 0; inputToken < test.input.length; inputToken++) {
            var token = test.input[inputToken];
            input.push(new tokenModule.Token(token, {
              file: null,
              lineText: '',
              line: 0,
              character: 0
            }));
          }
          
          var func = function() {
            // act
            parser = new parserModule.Parser(input);
            output = parser.parse(input);
            
          };
          if (fails) {
            expect(func).toThrow(expectedOutput);
            
            expect(parser).not.toBeNull();
            expect(parser.input).toBe(input);
            expect(parser.output).toBeNull();
          } else {
            func();
            
            // assert
            expect(parser).not.toBeNull();
            expect(parser.input).toBe(input);
            expect(output).not.toBeNull();
            expect(output).toEqual(expectedOutput);
          }
        });
      })(test);
    };
  });
});