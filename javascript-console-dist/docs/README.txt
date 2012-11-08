
Javascript Console Admin Console component for Alfresco 3.4/4.0
===============================================================

Author: Florian Maul (fme AG)

This project contains a Javascript Console component for the Alfresco Share's 
Administration Console, that enables the execution of arbitrary javascript code 
in the repository. 


Installation
------------

The component has been developed to install on top of an existing Alfresco
3.4 or 4.0 installation. There are two different version in this archive within
a specific folder for each of the Alfresco versions 3.4.x or 4.0.x.

When you have chosen the correct folder (3.4.x or 4.0.x) for your Alfresco version
you'll find two jar files within that folder. The javascript-console-repo.jar needs
to be copied into the Alfresco repository:

  tomcat/webapps/alfresco/WEB-INF/lib/
  
The other file javascript-console-share.jar needs to be copied to the 
corresponding folder in the Share webapp:

  tomcat/webapps/share/WEB-INF/lib/
  
If you prefer the AMP deployment method you also find amp files in the respective
folder that you can install with the apply_amps.sh or apply_amps.bat utilities. Be
aware that you need to install both amps files: the repo-amp and the share-amp.

The deployment location has changed recently (with Javascript Console 0.5)
because the Javascript Console now uses Java classes that have to be deployed 
to these locations and can NOT reside in tomcat/shared/lib anymore.


Building
--------

To build the individual JAR files, run the following command from the base 
project directory.

    ant -Dalfresco.sdk.dir=c:\dev\sdks\alfresco-enterprise-sdk-4.0.0 clean dist-jar

The command should build a JAR file named javascript-console-repo.jar or
javascript-console-share.jar in the 'dist' directory within your project.

There also is the javascript-console-dist project which builds both jar files 
and creates a patched version for Alfresco 3.4.x which does not support all the 
features of the version for 4.0.x. This project creates the AMP files as well.

To deploy the extension files into a local Tomcat instance for testing, you can 
use the hotcopy-tomcat-jar task. You will need to set the tomcat.home
property in Ant.

    ant -Dtomcat.home=C:/Alfresco/tomcat clean hotcopy-tomcat-jar
    
Once you have run this you will need to restart Tomcat so that the classpath 
resources in the JAR file are picked up.


Using the component
-------------------

- Log in to Alfresco Share and navigate to an Administration page such as Users 
  or Groups
- In the left-hand-side navigation, click *Javascript Console*
- Enter Alfresco repository javascript code in the textarea at the top. Press 
  the execute button to run the script.
- You can use the special print(..) javascript command to output messages to 
  the output window.
- use Ctrl+Space for code completion. Note that only global objects and specific 
  variables (document, space, variables ending in ...node) are completed.

For more information on using the tool visit the wiki page: 

http://code.google.com/p/share-extras/wiki/JavascriptConsole




