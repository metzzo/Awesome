define([ 'underscore', 'src/app/compiler/generator/js_generator' ], function(_, jsGeneratorModule) {
  var Generator = function(mainNode) {
    this.mainNode = mainNode;
    this.lines = [ ];
    this.indentationLevel = 0;
  };
  
  Generator.prototype.generate = function(backend) {
    if (!backend) {
      // default backend
      backend = jsGeneratorModule;
    }
    this.backend = backend;
    this.getTranslator('Main')(this);
    
    return this.getCode();
  };
  
  Generator.prototype.indent = function() {
    this.indentationLevel++;
  };
  
  Generator.prototype.outdent = function() {
    this.indentationLevel--;
    if (this.indentationLevel < 0) {
      this.indentationLevel = 0;
    }
  };
  
  Generator.prototype.emit = function(content) {
    content = !_.isUndefined(content) ? content : '/* EMPTY?!?! */';
    
    if (this.lines.length === 0) {
      this.lines.push('');
    }
    this.lines[this.lines.length - 1] += content;
  };
  
  Generator.prototype.emitLine = function(content) {
    content = !_.isUndefined(content) ? content : '';
    
    var line = '';
    for (var i = 0; i < this.indentationLevel; i++) {
      line += '  ';
    }
    this.lines.push(line + content);
  };
  
  Generator.prototype.emitNode = function(node) {
    this.getTranslator(node.name)(this, node);
  };
  
  Generator.prototype.getTranslator = function(name) {
    if (this.backend[name]) {
      return this.backend[name];
    } else {
      throw 'Selected backend does not support operation '+name;
    }
  };
  
  Generator.prototype.getCode = function() {
    return this.lines.join('\n');
  };
  
  return {
    Generator: Generator
  }
});