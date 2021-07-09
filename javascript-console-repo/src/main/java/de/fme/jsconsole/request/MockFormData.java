package de.fme.jsconsole.request;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.extensions.webscripts.servlet.FormData;

/**
 * Implements FormData methods to be used as an jscript object called 'formdata'
 * 
 * @author <a href="mailto:lukasz.tworek@p0n3.net">Lukasz Tworek</a>
 *
 */
public class MockFormData extends FormData {

	private static final long serialVersionUID = 5415045184340110290L;

	private List<FormField> fields = new ArrayList<FormField>();
	private Map<String, String[]> parameters = null;

	public MockFormData() {
		super(null);
	}

	@Override
	public boolean getIsMultiPart() {
		return true;
	}

	@Override
	public boolean hasField(String name) {
		for (FormField field : fields) {
			if (field.getName().equals(name)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public FormField[] getFields() {
		return fields.toArray(new FormField[fields.size()]);
	}

	@Override
	public void cleanup() {
		if (fields == null) {
			return;
		}

		for (FormField field : fields) {
			field.cleanup();
		}
	}

	@Override
	public Map<String, String[]> getParameters() {
		if (parameters == null) {
			FormField[] fields = getFields();
			parameters = new HashMap<String, String[]>(fields.length);
			for (FormField field : fields) {
				String[] vals = parameters.get(field.getName());
				if (vals == null) {
					parameters.put(field.getName(), new String[] { field.getValue() });
				} else {
					String[] valsNew = new String[vals.length + 1];
					System.arraycopy(vals, 0, valsNew, 0, vals.length);
					valsNew[vals.length] = field.getValue();
					parameters.put(field.getName(), valsNew);
				}
			}
		}
		return parameters;
	}

	public void addFormField(FormField formField) {
		this.fields.add(formField);
	}

	@Override
	public String toString() {
		return "MockFormData [fields=" + fields + ", parameters=" + parameters + "]";
	}
	
}
