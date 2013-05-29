CodeMirror.showContextualInfo = new function() {

  var contextInfo = null;

  // Interface

  return {
    onSelect : function(cm, data, completion, hints) {
      var information = null;
      if (completion.info) {
        information = completion.info(completion);
      }
      if (information) {
        var box = hints.getBoundingClientRect();
        if (contextInfo == null) {
          contextInfo = document.createElement('div');
          contextInfo.className = 'CodeMirror-hints-contextInfo'
          document.body.appendChild(contextInfo);
        }
        contextInfo.style.top = hints.style.top;
        contextInfo.style.left = box.right + 'px';
        contextInfo.innerHTML = information.replace(/\n/g, "<br />");;
        contextInfo.style.display = 'block';
      } else {
        if (contextInfo != null) {
          contextInfo.innerHTML = 'none';
          contextInfo.style.display = 'none';
        }
      }
    },

    onClose : function(cm, data) {
      if (contextInfo != null) {
        contextInfo.parentNode.removeChild(contextInfo);
      }
      contextInfo = null;
    }
  }
};