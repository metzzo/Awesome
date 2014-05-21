/** @jsx React.DOM */

define(['react', 'jquery', 'src/app/editor/gen/editorComponent'], function(React, $, EditorComponent) {
  $('body').ready(function() {
    // stuff!
    
    React.renderComponent(<EditorComponent />, document.getElementById('editor'));
  });
});