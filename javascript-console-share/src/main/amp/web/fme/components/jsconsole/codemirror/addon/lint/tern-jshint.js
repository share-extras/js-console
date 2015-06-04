CodeMirror.ternJSHint = function(value, updateLinting, options, cm) {

  function addAnnotation(error, found) {
    var startLine = error.startLine;
    var startChar = error.startChar;
    var endLine = error.endLine;
    var endChar = error.endChar;
    var message = error.message;
    found.push({
      from : error.start,
      to : error.end,
      message : message
    });
  }

  var getServer = (typeof options.server == "function") ? options.server : function(cm) {return options.server};
  var query = {
    type : "jshint",
    file : "#0",
    lineCharPositions : true
  };

  var files = [];
  files.push({
    type : "full",
    name : "[doc]",
    text : value
  });

  var doc = {
    query : query,
    files : files
  };
  getServer(cm).server.request(doc, function(error, response) {
    if (error) {
      updateLinting(cm, []);
    } else {
      var messages = response.messages;
      updateLinting(cm, messages);
    }
  });

};
