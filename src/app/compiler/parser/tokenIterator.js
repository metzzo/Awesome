define([ 'underscore.string', 'src/app/compiler/data/errorMessages', 'src/app/compiler/data/syntaxError' ], function(_, errorMessages, syntaxErrorModule) {
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
      this.riseSyntaxError(_.sprintf(errorMessages.UNEXPECTED_TOKEN, ''+this.current().text, ''+text));
    }
  };
  
  /**
   * Matches the current token with the specified text, if it succeeds it returns true and skips the token, if it fails it returns false
   * @param text
   * @returns {*}
   */
  TokenIterator.prototype.optMatch = function (text) {
    if (this.is(text)) {
      this.next();
      return true;
    } else {
      return false;
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
      this.riseSyntaxError(errorMessages.UNEXPECTED_EOF);
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
    while (this.hasNext() && !this.isNL()) {
      this.next();
      hasSkipped = true;
    }
    if (this.hasNext()) this.next();
    while (this.hasNext() && this.isNL()) this.next();
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
   * Check whether the current token is a newline token
   */
  TokenIterator.prototype.isNL = function() {
    return this.is('\n') || this.is(';');
  };

  /**
   * Iterates through the source code
   * @param func Function that is called at the beginning of each line
   */
  TokenIterator.prototype.iterate = function(func) {
    // if \n skip!!
    while (this.hasNext() && this.isNL()) this.next();
    
    var stop = false;
    while (this.hasNext() && !stop) {
      try {
        stop = func();

        if (this.hasNext() && !stop) {
          do {
            if (!this.optMatch(';')) {
              this.match('\n');
            }
          } while (this.hasNext() && this.isNL());
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