define([ 'app/compiler/parser/tokenIterator'], function(tokenIteratorModule) {
  describe('TokenIterator', function() {
    var iterator;
    
    beforeEach(function() {
      // arrange
      iterator = new tokenIteratorModule.TokenIterator([
        {text: 'A'},
        {text: 'B'},
        {text: '\n'}
      ]);
    });
    
    afterEach(function() {
      iterator = null;
    });
    
    it('The "match" function matches A == A and returns B', function () {
      expect(iterator.match('A').text).toBe('B');
    });
    
    it('The "match" function matches A != B and throws exception', function () {
      expect(function () { iterator.match("B"); }).toThrow();
    });
    
    it('The "is" function matches A == A and returns true', function () {
      expect(iterator.is("A")).toBe(true);
    });
    
    it('The "is" function does not throw an exception if used outside the range of the array', function() {
      iterator.position = 10;
      expect(iterator.is()).toBe(null);
    });
    
    it('The "next" function goes to the next token', function () {
      expect(iterator.next().text).toBe('B');
    });
    
    it('The "next" function throws exception if it reaches end', function () {
      expect(function () {
        iterator.next();
        iterator.next();
        iterator.next();
      }).toThrow();
    });
    
    it('The "current" function returns correct value A', function() {
     expect(iterator.current().text).toBe('A');
    });
    
    it('The "hasNext" function returns correct value true if there is a next token', function() {
      expect(iterator.hasNext()).toBe(true);
    });
    
    it('The "hasNext" function returns correct value false if there is no next token', function() {
      // act
      iterator.next();
      iterator.next();
      
      // assert
      expect(iterator.hasNext()).toBe(false);
    });
    
    it('The "restore" function restores state', function() {
      // act
      iterator.restore();
      expect(iterator.hasNext()).toBe(false);
    });
    
    it('The "iterate" function should iterate through the tokens', function() {
      // act
      iterator.iterate(function() {
        iterator.next();
        iterator.next();
      });
      
      // assert
      expect(iterator.hasNext()).toBe(false);
    });
    
    it('Setting position should work properly', function() {
      // act
      var position = iterator.position;
      iterator.next();
      iterator.next();
      iterator.position = position;
      iterator.next();
      
      // assert
      expect(iterator.current().text).toBe('B');
    });
    
    it('is throwing correct syntax messages', function() {
      expect(function() { iterator.riseSyntaxError('yolo'); }).toThrow();
    });
  });
});