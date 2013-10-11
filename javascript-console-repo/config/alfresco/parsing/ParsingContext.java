/**
 *
 */
package de.fme.jsconsole.parsing;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.jdt.core.dom.TypeDeclaration;

/**
 * @author jgoldhammer
 *
 */
public class ParsingContext {

	private Map<String, TypeDeclaration> rootTypes = new HashMap<String, TypeDeclaration>();
	private Map<String, TypeDeclaration> interestingTypes = new HashMap<String, TypeDeclaration>();
	private Map<String, String> packageDeclarations = new HashMap<String, String>();

	public void putRootType(String key, TypeDeclaration value) {
		rootTypes.put(key, value);
	}

	public Map<String, TypeDeclaration> getRootTypes() {
		return rootTypes;
	}

	public void putInterestingTypes(String typeName, TypeDeclaration typeDeclaration) {
		interestingTypes.put(typeName, typeDeclaration);

	}

	public Map<String, TypeDeclaration> getInterestingTypes() {
		return interestingTypes;
	}

	public void putPackageDeclaration(String typeName, String packageName) {
		packageDeclarations.put(typeName, packageName);
	}

	public Map<String, String> getPackageDeclarations() {
		return packageDeclarations;
	}

	public String getPackage(String key) {
		return packageDeclarations.get(key);
	}

}
