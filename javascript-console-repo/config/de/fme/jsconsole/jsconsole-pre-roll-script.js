/*
 * Set up a wrapper for the logger, to write logging information to the 
 * output stream and yet keep all methods of the Java ScriptLogger available.
 */
var _$orglogger = logger;

logger = {
  log: function(text) {
    print(text);
    _$orglogger.log(text);
  },
  
  warn: function(text) {
    print(text);
    _$orglogger.warn(text);
  },
  
  isLoggingEnabled : function() {
    return _$orglogger.isLoggingEnabled();
  },
  
  isWarnLoggingEnabled : function() {
    return _$orglogger.isWarnLoggingEnabled();
  },

  system : _$orglogger.system,
  
  /**
   * Sets the log level of a class or package using log4j
   * @param classname a Java class or package name
   * @param level log level TRACE,DEBUG,INFO,ERROR as String
   */
  setLevel : function(classname, level) {
	  var log4j = Packages.org.apache.log4j.Logger.getLogger(classname);
	  var logLevel = Packages.org.apache.log4j.Level.toLevel(level);
	  log4j.setLevel(logLevel);	  
  }
};

function print(obj) { 
	jsconsole.print(obj);
};
