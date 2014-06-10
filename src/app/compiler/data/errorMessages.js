define([ ], function() {
  return {
    // Parser
    UNEXPECTED_EOF: 'Unexpected end of file',
    UNEXPECTED_TOKEN: 'Unexpected token "%s", expecting "%s"',
    UNEXPECTED_KEYWORD: 'Unexpected keyword',
    EXPECTING_FACTOR: 'Expecting literal or variable, not "%s"',
    EXPECTING_IDENTIFIER: 'Expecting identifier, not %s',
    EXPECTING_KEYWORD: 'Expecting keyword, not %s',
    EXPECTING_DATATYPE: 'Expecting data type',
    TOO_MANY_VARIABLES: 'Too many variables in variable declaration',
    UNEXPECTED_DATATYPE: 'Unexpected datatype, expecting %s, got %s',
    
    // Semanter
    CANNOT_RESOLVE_DATATYPE: 'Cannot resolve data type',
    AMBIGUOUS_DATATYPE: 'Data types are incompatible %s vs. %s',
    FUNCTION_NOT_DEFINED: 'Function is not defined %s', // unused?
    INVALID_DATATYPE: '%s is not a valid data type',
    CANNOT_RESOLVE_IMPORT: 'Cannot resolve import',
    RETURN_IN_FUNCTION: 'Return must be defined inside a function',
    CANNOT_MUTATE: 'Can only mutate variable.'
  };
});