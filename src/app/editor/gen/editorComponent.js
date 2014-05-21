/** @jsx React.DOM */
 
define([ 'react' ], function(React) {
  var EditorComponent = React.createClass({displayName: 'EditorComponent',
    render: function() {
      return (
        React.DOM.div( {className:"editor"}, 
          "EDITOR SWAG"
        )
      );
    }
  });
  
  return EditorComponent;
});