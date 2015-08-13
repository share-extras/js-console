/**
 * Copyright (C) 2005-2009 Alfresco Software Limited.
 *
 * This file is part of the Spring Surf Extension project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package de.fme.jsconsole;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.extensions.webscripts.annotation.ScriptClass;
import org.springframework.extensions.webscripts.annotation.ScriptClassType;
import org.springframework.extensions.webscripts.annotation.ScriptMethod;
import org.springframework.extensions.webscripts.annotation.ScriptParameter;


/**
 * NOTE: Copied from org.alfresco.repo.jscript 
 * 
 * Copied from org.springframework.extensions.webscripts.ScriptLogger by Florian Maul
 * Modified to allow printing of Log Messages to the Javascript Console.
 * 
 * @author Kevin Roast
 * @author davidc
 * @author Florian Maul (fme AG)
 */
@ScriptClass 
(
        help="Provides functions to aid debugging of scripts.",
        code="logger.log(\"Command Processor: isEmailed=\" + isEmailed);",
        types=
        {
                ScriptClassType.JavaScriptRootObject
        }
)
public final class JavascriptConsoleScriptLogger
{
    // NOTE: keep compatibility with repository script logger
    private static final Log logger = LogFactory.getLog("org.alfresco.repo.jscript.ScriptLogger");
    private final SystemOut systemOut = new SystemOut();
	private final JavascriptConsoleScriptObject jsConsole;
    
    public JavascriptConsoleScriptLogger(JavascriptConsoleScriptObject jsConsole) {
		this.jsConsole = jsConsole;
	}
    
    @ScriptMethod
    (
            help="Returns true if logging is enabled.",
            code="var loggerStatus = logger.isLoggingEnabled();",
            output="true if logging is enabled"
    )
    public boolean isLoggingEnabled()
    {
        return logger.isDebugEnabled();
    }
    
    @ScriptMethod
    (
            help="Logs a message"
    )
    public void log(@ScriptParameter(help="Message to log") String str)
    {
        logger.debug(str);
    	jsConsole.print("DEBUG - " + str);
    }

    @ScriptMethod
    (
            help="Returns true if debug logging is enabled.",
            code="var loggerStatus = logger.isDebugEnabled();",
            output="true if debug logging is enabled"
    )
    public boolean isDebugLoggingEnabled()
    {
        return logger.isDebugEnabled();
    }

    @ScriptMethod
    (
            help="Logs a debug message"
    )
    public void debug(@ScriptParameter(help="Message to log") String str)
    {
        logger.debug(str);
        jsConsole.print("DEBUG - " + str);
    }

    @ScriptMethod
    (
            help="Returns true if info logging is enabled.",
            code="var loggerStatus = logger.isInfoEnabled();",
            output="true if info logging is enabled"
    )
    public boolean isInfoLoggingEnabled()
    {
        return logger.isInfoEnabled();
    }

    @ScriptMethod
    (
            help="Logs an info message"
    )
    public void info(@ScriptParameter(help="Message to log") String str)
    {
        logger.info(str);
        jsConsole.print(str);
    }

    @ScriptMethod
    (
            help="Returns true if warn logging is enabled.",
            code="var loggerStatus = logger.isWarnLoggingEnabled();",
            output="true if warn logging is enabled"
    )
    public boolean isWarnLoggingEnabled()
    {
        return logger.isWarnEnabled();
    }
    
    @ScriptMethod
    (
            help="Logs a warning message"
    )
    public void warn(@ScriptParameter(help="Message to log") String str)
    {
        logger.warn(str);
    	jsConsole.print("WARN - " + str);
    }

    @ScriptMethod
    (
            help="Returns true if error logging is enabled.",
            code="var loggerStatus = logger.isErrorLoggingEnabled();",
            output="true if error logging is enabled"
    )
    public boolean isErrorLoggingEnabled()
    {
        return logger.isErrorEnabled();
    }

    @ScriptMethod
    (
            help="Logs an error message"
    )
    public void error(@ScriptParameter(help="Message to log") String str)
    {
        logger.error(str);
        jsConsole.print("ERROR - " + str);
    }

    public SystemOut getSystem()
    {
        return systemOut;
    }
    
    public class SystemOut
    {
        public void out(String str)
        {
            System.out.println(str);
            jsConsole.print(str);
        }
    }
    
    public void setLevel(String classname, String level) {
    	Logger log4j = Logger.getLogger(classname);
    	Level logLevel = Level.toLevel(level);
    	log4j.setLevel(logLevel);
    }
	  	  
}
