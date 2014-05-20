define([ 'src/app/compiler/lexer/lexer', 'src/app/compiler/parser/parser', 'src/app/compiler/semanter/semanter', 'src/app/compiler/generator/generator' ], function(lexerModule, parserModule, semanterModule, generatorModule) {
  var Awesome = function(input) {
    this.input = input;
    this.output = null;
  };
  
  Awesome.prototype.compile = function() {
    var lexer, parser, semanter, generator;
    var tokens, ast, code;
    
    lexer = new lexerModule.Lexer(this.input);
    tokens = lexer.tokenize();
    
    parser = new parserModule.Parser(tokens);
    ast = parser.parse();
    
    semanter = new semanterModule.Semanter(ast);
    semanter.semant();
    
    generator = new generatorModule.Generator(ast);
    code = generator.generate();
    
    return code;
  };
  
  return {
    Awesome: Awesome
  }
});