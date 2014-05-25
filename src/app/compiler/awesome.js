define([ 'src/app/compiler/lexer/lexer', 'src/app/compiler/parser/parser', 'src/app/compiler/semanter/semanter', 'src/app/compiler/generator/generator', 'src/app/compiler/ast/import' ], function(lexerModule, parserModule, semanterModule, generatorModule, importModule) {
  var File = function(awesome, name, code) {
    this.name = name;
    this.code = code;
    this.awesome = awesome;
    this.ast = null;
    this.tokens = null;
    this.generatedCode = '';
    
    this.isSemanted   = false;
    this.isParsed     = false;
    this.isTokenized  = false;
    this.isGenerated  = false;
  }
  
  File.prototype.parse = function() {
    var lexer, parser;
    
    if (!this.isTokenized) {
      lexer = new lexerModule.Lexer(this.code);
      this.tokens = lexer.tokenize();
      this.isTokenized = true;
    }
    
    if (!this.isParsed) {
      parser = new parserModule.Parser(this.tokens);
      this.ast = parser.parse();
      this.isParsed = true;
      this.ast.params.context = this.awesome;
    }
  };
  
  File.prototype.semant = function() {
    if (!this.isSemanted) {
      var semanter = new semanterModule.Semanter(this.ast);
      semanter.semant();
      this.isSemanted = true;
    }
  };
  
  File.prototype.generate = function() {
    if (!this.isGenerated) {
      var generator = new generatorModule.Generator(this.ast);
      this.generatedCode = generator.generate();
      this.isGenerated = true;
    }
    return this.generatedCode;
  };
  
  var Awesome = function(input) {
    this.output = null;
    this.files = [];
    this.mainFile = this.addFile('main', input);
  };
  
  Awesome.prototype.addFile = function(name, code) {
    // does this file already exist?
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].name === name) {
        return; // yes!
      }
    }
    
    var file = new File(this, name, code);
    this.files.push(file);
    return file
  };
  
  Awesome.prototype.compile = function() {
    var anyUnparsedFiles = false;
    do {
      for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        file.parse();
        
        // get all the imports
        file.ast.traverse(function(node) {
          if (node.name === importModule.name) {
            node.processImports();
          }
        });
      }
      
      anyUnparsedFiles = false;
      for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        if (!file.isParsed) {
          anyUnparsedFiles = true;
          break;
        }
      }
    } while(anyUnparsedFiles);
    
    for (var i = 0; i < this.files.length; i++) {
      var file = this.files[i];
      file.semant();
    }
    
    this.output = this.mainFile.generate();
    return this.output;
  };
  
  return Awesome;
});