/** @jsx React.DOM */
 
define([ 'react', 'src/app/compiler/awesome' ], function(React, Awesome) {
  var CompileButton = React.createClass({displayName: 'CompileButton',
    render: function() {
      return (
        React.DOM.button( {className:"run_button", onClick:this.handleRun}, "Run")
      );
    },
    handleRun: function() {
      var inputCode = this.props.code;
      var awesome = new Awesome(inputCode);
      var outputCode = awesome.compile();
      console.log(outputCode);
      
      console.log('Execute');
      eval(outputCode);
      console.log('Finished');
    }
  });
  
  var EditorComponent = React.createClass({displayName: 'EditorComponent',
    render: function() {
      return (
        React.DOM.div( {className:"editor_container"}, 
          React.DOM.textarea( {className:"editor", onChange:this.onChange}),
          CompileButton( {code:this.state.code} )
        )
      );
    },
    onChange: function(e) {
      this.setState({
        code: e.target.value
      });
    },
    getInitialState: function() {
      return {code: ''};
    }
  });
  
  return EditorComponent;
});