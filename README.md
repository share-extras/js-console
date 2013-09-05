
Javascript Console Admin Console component for Alfresco 3.4/4.0
===============================================================

Author: Florian Maul (fme AG)

This project contains a Javascript Console component for the Alfresco Share's 
Administration Console, that enables the execution of arbitrary javascript code 
in the repository. 


Installation
------------

The component has been developed to install on top of an existing Alfresco
4.0, 4.1 or 4.2 installation. The javascript-console-repo-<version>.amp or
javascript-console-share-<version>.amp needs to be installed into the Alfresco
Repository / Share webapp using the Alfresco Module Management Tool:

    java -jar alfresco-mmt.jar install javascript-console-repo-<version>.amp /path/to/alfresco.war
    java -jar alfresco-mmt.jar install javascript-console-share-<version>.amp /path/to/share.war
  
You can also use the Alfresco Maven SDK to install or overlay the AMP during the build of a
Repository / Share WAR project. See https://artifacts.alfresco.com/nexus/content/repositories/alfresco-docs/alfresco-lifecycle-aggregator/latest/plugins/alfresco-maven-plugin/advanced-usage.html
for details.


Building
--------

To build the module and its AMP / JAR files, run the following command from the base 
project directory:

    mvn install

The command builds two JAR files named javascript-console-repo-<version>.jar / 
javascript-console-share-<version>.jar and javascript-console-repo-<version>-sources.jar /
javascript-console-share-<version>-sources.jar as well as javascript-console-repo-<version>.amp /
javascript-console-share-<version>.amp in the 'target' directory within your project.

If you want to build the module so it can be installed and run in an Alfresco 4.0 / 4.1 server
running on Java 6 you need to have a Java 6 JDK available. Either make sure that your JDK 6 is set
as the default Java environment (PATH / JAVA_HOME environment variable) or run the build with the
following command from the base project directory:

    mvn install -P Java6-crossCompile -Djdk6.executable=/path/to/javac


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

