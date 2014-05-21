/** @jsx React.DOM */

define(['react', 'jquery', 'src/app/editor/gen/editorComponent'], function(React, $, EditorComponent) {
  $('body').ready(function() {
    // stuff!
    
    React.renderComponent(EditorComponent(null ), document.getElementById('editor'));
  });
});