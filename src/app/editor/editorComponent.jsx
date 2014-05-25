/** @jsx React.DOM */
 
define([ 'react', 'src/app/compiler/awesome' ], function(React, Awesome) {
  var CompileButton = React.createClass({
    render: function() {
      return (
        <button className="run_button" onClick={this.handleRun}>Run</button>
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
  
  var EditorComponent = React.createClass({
    render: function() {
      return (
        <div className="editor_container">
          <textarea className="editor" onChange={this.onChange}></textarea>
          <CompileButton code={this.state.code} />
        </div>
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