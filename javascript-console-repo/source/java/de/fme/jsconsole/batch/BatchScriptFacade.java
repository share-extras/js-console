package de.fme.jsconsole.batch;

import java.util.Collection;

import org.alfresco.repo.batch.BatchProcessor;
import org.alfresco.repo.jscript.Scopeable;
import org.alfresco.repo.processor.BaseProcessorExtension;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.ScriptService;
import org.alfresco.service.cmr.repository.StoreRef;
import org.alfresco.service.cmr.search.LimitBy;
import org.alfresco.service.cmr.search.ResultSet;
import org.alfresco.service.cmr.search.SearchParameters;
import org.alfresco.service.cmr.search.SearchService;
import org.alfresco.service.transaction.TransactionService;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * fascade to a batch processor implementation.
 * 
 * @author jgoldhammer
 */

public class BatchScriptFacade extends BaseProcessorExtension implements Scopeable {

	private static final int FIXED_BATCH_SIZE = 1;
	private TransactionService transactionService;
	private SearchService searchService;
	private Scriptable scope;
	private ScriptService scriptService;

	public void setTransactionService(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	public void setSearchService(SearchService searchService) {
		this.searchService = searchService;
	}

	public void setScriptService(ScriptService scriptService) {
		this.scriptService = scriptService;
	}

	/**
	 * process the given processorfunction on a set of nodes which are the
	 * result of the provided luceneQuery. The processing takes place in a batch
	 * processor with the given batchName, the number of workerthreads and the
	 * number of nodes as batchsize.
	 * 
	 * @param batchName the name of the batch
	 * @param workerThreads the number of threads which can be used for the batch processing
	 * @param batchSize
	 * @param luceneQuery the lucene query to execute to make the processing on the nodes of the resultset
	 * @param processorFunction the javascript function to process- the function has to be named process
	 * 
	 * Example:
	 *  batch.run('MyProcessor',4,10,'TEXT:alfresco',function process(node){
			logger.error(node);
		}, true);
	 *  
	 */
	public void run(String batchName, int workerThreads, final int batchSize, final String luceneQuery,
			final String processorFunction, final boolean runAsSystem) {

		final SearchParameters params = new SearchParameters();
		params.setLimitBy(LimitBy.UNLIMITED);
		params.setLanguage(SearchService.LANGUAGE_LUCENE);
		params.setQuery(luceneQuery);
		params.addStore(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE);

		final ResultSet resultSet = searchService.query(params);
		BatchProcessor<Collection<NodeRef>> processor;
		final Scriptable batchScope = this.scope;

		try {
			if (resultSet.length() != 0) {
				resultSet.setBulkFetch(false);

				processor = new BatchProcessor<Collection<NodeRef>>(batchName, transactionService.getRetryingTransactionHelper(),
						new QueryResultBatchProcessWorkProvider(resultSet, batchSize), workerThreads, FIXED_BATCH_SIZE, null,
						null, FIXED_BATCH_SIZE);

				processor.process(
						new ScriptedBatchProcessWorker(runAsSystem, batchScope, processorFunction, Context.getCurrentContext(),
								serviceRegistry, scriptService), true);
			}
		} finally {
			resultSet.close();
		}

	}

	@Override
	public void setScope(Scriptable scope) {
		this.scope = scope;

	}

	private ServiceRegistry serviceRegistry;

	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}

}
