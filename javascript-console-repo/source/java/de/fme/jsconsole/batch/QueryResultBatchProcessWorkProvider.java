/**
 * 
 */
package de.fme.jsconsole.batch;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.alfresco.repo.batch.BatchProcessWorkProvider;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.search.ResultSet;

/**
 * a batch process worker which iterates over the query result and provides a
 * list of size {@link #collectSize} as next work.
 * 
 * @author jgoldhammer
 * 
 */
public class QueryResultBatchProcessWorkProvider implements BatchProcessWorkProvider<Collection<NodeRef>> {

	private final ResultSet resultSet;
	private final int collectSize;
	private final int size;
	private int index = 0;

	public QueryResultBatchProcessWorkProvider(final ResultSet resultSet, final int collectSize) {
		this.resultSet = resultSet;
		this.collectSize = collectSize;
		this.size = this.resultSet.length();
	}

	/**
	 * Resets this batch process work provider for re-iteration over the
	 * encapsulated result set.
	 */
	public void reset() {
		this.index = 0;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int getTotalEstimatedWorkSize() {
		return this.resultSet.length();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public synchronized Collection<Collection<NodeRef>> getNextWork() {
		final Collection<Collection<NodeRef>> items;
		if (this.size > this.index) {
			items = new ArrayList<Collection<NodeRef>>();
			List<NodeRef> nodes = new ArrayList<NodeRef>();
			items.add(nodes);
			for (int size = 0; size < this.collectSize && this.size > this.index; this.index++, size++) {
				nodes.add(this.resultSet.getNodeRef(this.index));
			}
		} else {
			items = Collections.emptySet();
		}
		return items;
	}

}
