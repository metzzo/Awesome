define([ 'underscore.string', 'app/compiler/errorMessages', 'app/compiler/syntaxError' ], function(_, errorMessages, syntaxErrorModule) {
  /**
   * Creates an iterator that iterates through a token array.
   * It also features some useful methods
   * @param tokens
   * @constructor
   */
  TokenIterator = function (tokens) {
    this.tokens = tokens;
    this.position = 0;
  };

  /**
   * Matches the current token with the specified text, if it fails an error is raised
   * @param text
   * @returns {*}
   */
  TokenIterator.prototype.match = function (text) {
    if (this.is(text)) {
      return this.next();
    } else {
      this.riseSyntaxError(_.sprintf(errorMessages.UNEXPECTED_TOKEN, this.current().text, text));
    }
  };

  /**
   * Checks whether the current token equals the given text.
   * @param text
   * @returns {boolean}
   */
  TokenIterator.prototype.is = function (text) {
    if (this.position >= 0 && this.position < this.tokens.length) {
      return this.current().text === text;
    } else {
      return null;
    }
  };

  /**
   * Moves to the next token. If there is none, an error is rised.
   */
  TokenIterator.prototype.next = function () {
    if (this.hasNext()) {
      this.position++;
      return this.current();
    } else {
      this.riseSyntaxError(errorMessages.UNEXPECTED_TOKEN);
    }
  };

  /**
   * If there is a next token => next(), otherwise ignore
   */
  TokenIterator.prototype.optNext = function() {
    if (this.hasNext()) {
      return this.next();
    } else {
      return this.current();
    }
  }

  /**
   * Returns the current token
   * @returns {*}
   */
  TokenIterator.prototype.current = function () {
    return this.tokens[this.position];
  };

  /**
   * Returns whether there is a next token or not
   * @returns {boolean}
   */
  TokenIterator.prototype.hasNext = function () {
    return this.position + 1 < this.tokens.length
  };

  /**
   * Restores the TokenIterator to the next consistent state (used for multiple error messages)
   */
  TokenIterator.prototype.restore = function () {
    // restore state => continue until \n is reached, and then skip the \n
    var hasSkipped = false;
    while (this.hasNext() && !this.is('\n')) {
      this.next();
      hasSkipped = true;
    }
    if (this.hasNext()) this.next();
    while (this.hasNext() && this.is('\n')) this.next();
  };

  /**
   * Wrapper for the yasp.Assembler.riseSyntaxError function
   * @param msg
   */
  TokenIterator.prototype.riseSyntaxError = function (msg, fatality) {
    throw new syntaxErrorModule.SyntaxError(msg, {
      fatality: fatality,
      token: this.current()
    });
  };

  /**
   * Iterates through the source code
   * @param func Function that is called at the beginning of each line
   */
  TokenIterator.prototype.iterate = function(func) {
    // if \n skip!!
    while (this.hasNext() && this.is("\n")) this.next();
    
    while (this.hasNext()) {
      try {
        func();

        if (this.hasNext()) {
          do {
            this.match('\n');
          } while (this.hasNext() && this.is('\n'));
        }
      } catch (ex) {
        if (typeof ex == 'string') {
          this.restore(); // error occured => try to make state consistent again
        } else {
          throw ex; // rethrow
        }
      }
    }
  };
  
  return {
    TokenIterator: TokenIterator
  };
});