define([ 'src/app/compiler/lexer/lexer', 'src/app/compiler/parser/parser', 'src/app/compiler/semanter/semanter', 'src/app/compiler/generator/generator', 'src/app/compiler/ast/import', 'src/app/awesome/standard_library' ], function(lexerModule, parserModule, semanterModule, generatorModule, importModule, standard_library) {
  var File = function(awesome, name, code) {
    this.name = name;
    this.code = code;
    this.awesome = awesome;
    this.ast = null;
    this.tokens = null;
    this.generatedCode = '';
    
    this.isParsed     = false;
    this.isTokenized  = false;
    this.isGenerated  = false;
  }
  
  File.prototype.parse = function() {
    var lexer, parser;
    
    if (!this.isTokenized) {
      lexer = new lexerModule.Lexer(this.code, this.name);
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
  
  Awesome.prototype.loadFile = function(path) {
    if (!!standard_library[path]) {
      return standard_library[path];
    } else {
      return this.getFile(path);
    }
  };
  
  Awesome.prototype.getFile = function(name) {
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].name === name) {
        return this.files[i];
      }
    }
    return null;
  };
  
  Awesome.prototype.addFile = function(name, code) {
    // does this file already exist?
    if (!this.getFile(name)) {
      var file = new File(this, name, code);
      this.files.push(file);
      return file
    } else {
      return this.getFile(name);
    }
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
            node.functions.processImports();
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
    
    var asts = [];
    for (var i = 0; i < this.files.length; i++) {
      var file = this.files[i];
      asts.push(file.ast);
    }
    var semanter = new semanterModule.Semanter(asts);
    semanter.semant();
    
    this.output = this.mainFile.generate();
    return this.output;
  };
  
  return Awesome;
});