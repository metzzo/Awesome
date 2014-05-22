define([], function() {
  return [
    {
      name: 'is tokenizing simple text properly',
      input: 'input',
      output: [
        {
          text: 'input', 
          params: {
            line: 0,
            character: 0
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with 2 words properly',
      input: 'input output',
      output: [
        {
          text: 'input',
          params: {
            line: 0,
            character: 0
          }
        },
        {
          text: 'output',
          params: {
            line: 0,
            character: 6
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with multiple whitespaces between 2 words properly',
      input: 'input  output',
      output: [
        {
          text: 'input',
          params: {
            line: 0,
            character: 0
          }
        },
        {
          text: 'output',
          params: {
            line: 0,
            character: 7
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with multiple whitespaces between 4 words properly',
      input: '        input  output   input  output   ',
      output: [
        {
          text: 'input',
          params: {
            line: 0,
            character: 8
          }
        },
        {
          text: 'output',
          params: {
            line: 0,
            character: 15
          }
        },
        {
          text: 'input',
          params: {
            line: 0,
            character: 24
          }
        },
        {
          text: 'output',
          params: {
            line: 0,
            character: 31
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with comment properly',
      input: 'text -- this is a comment',
      output: [
        {
          text: 'text',
          params: {
            line: 0,
            character: 0
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with multiple delimiters properly',
      input: 'text text,text;text.text-text*text+text-text(text)text%text$',
      output: [
        {
          text: 'text',
          params: {
            line: 0,
            character: 0
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 5
          }
        },
        {
          text: ',',
          params: {
            line: 0,
            character: 9
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 10
          }
        },
        {
          text: ';',
          params: {
            line: 0,
            character: 14
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 15
          }
        },
        {
          text: '.',
          params: {
            line: 0,
            character: 19
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 20
          }
        },
        {
          text: '-',
          params: {
            line: 0,
            character: 24
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 25
          }
        },
        {
          text: '*',
          params: {
            line: 0,
            character: 29
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 30
          }
        },
        {
          text: '+',
          params: {
            line: 0,
            character: 34
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 35
          }
        },
        {
          text: '-',
          params: {
            line: 0,
            character: 39
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 40
          }
        },
        {
          text: '(',
          params: {
            line: 0,
            character: 44
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 45
          }
        },
        {
          text: ')',
          params: {
            line: 0,
            character: 49
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 50
          }
        },
        {
          text: '%',
          params: {
            line: 0,
            character: 54
          }
        },
        {
          text: 'text',
          params: {
            line: 0,
            character: 55
          }
        },
        {
          text: '$',
          params: {
            line: 0,
            character: 59
          }
        }
      ]
    },
    {
      name: 'is tokenizing text with newlines properly',
      input: [ 'my',
               'name',
               'is',
               'skrillex'],
      output: [
        {
          text: 'my',
          params: {
            line: 0,
            character: 0,
            lineText: 'my'
          }
        },
        {
          text: '\n',
          params: {
            line: 0,
            character: 2
          }
        },
        {
          text: 'name',
          params: {
            line: 1,
            character: 0,
            lineText: 'name'
          }
        },
        {
          text: '\n',
          params: {
            line: 1,
            character: 4
          }
        },
        {
          text: 'is',
          params: {
            line: 2,
            character: 0,
            lineText: 'is'
          }
        },
        {
          text: '\n',
          params: {
            line: 2,
            character: 2
          }
        },
        {
          text: 'skrillex',
          params: {
            line: 3,
            character: 0,
            lineText: 'skrillex'
          }
        },
      ]
    },
    {
      name: 'is tokenizing text with comment and newlines properly',
      input: [  'text -- this is a comment',
                'anothertext--another comment',
                'moar text --comment' ],
      output: [
        {
          text: 'text',
          params: {
            line: 0,
            character: 0,
            lineText: 'text -- this is a comment'
          }
        },
        {
          text: '\n',
          params: {
            line: 0,
            character: 25
          }
        },
        {
          text: 'anothertext',
          params: {
            line: 1,
            character: 0,
            lineText: 'anothertext--another comment'
          }
        },
        {
          text: '\n',
          params: {
            line: 1,
            character: 28
          }
        },
        {
          text: 'moar',
          params: {
            line: 2,
            character: 0,
            lineText: 'moar text --comment'
          }
        },
        {
          text: 'text',
          params: {
            line: 2,
            character: 5
          }
        }
      ]
    },
    {
      name: 'is tokenizing with just 1 space and newlines',
      input: ['if true \n 42 \n end'],
      output: [
        {
          text: 'if',
          params: {
            line: 0,
            character: 0,
            lineText: 'if true '
          }
        },
        {
          text: 'true',
          params: {
            line: 0,
            character: 3,
            lineText: 'if true '
          }
        },
        {
          text: '\n',
          params: {
            line: 0,
            character: 8,
            lineText: 'if true '
          }
        },
        {
          text: '42',
          params: {
            line: 1,
            character: 1,
            lineText: ' 42 '
          }
        },
        {
          text: '\n',
          params: {
            line: 1,
            character: 4,
            lineText: ' 42 '
          }
        },
        {
          text: 'end',
          params: {
            line: 2,
            character: 1,
            lineText: ' end'
          }
        }
      ]
    },
    {
      name: 'is tokenizing double token properly',
      input: ['1==2'],
      output: [
        {
          text: '1',
          params: {
            line: 0,
            character: 0,
            lineText: '1==2'
          }
        },
        {
          text: '==',
          params: {
            line: 0,
            character: 1,
            lineText: '1==2'
          }
        },
        {
          text: '2',
          params: {
            line: 0,
            character: 3,
            lineText: '1==2'
          }
        },
      ]
    }
  ]
});