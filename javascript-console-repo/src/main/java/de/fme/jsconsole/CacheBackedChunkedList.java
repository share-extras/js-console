package de.fme.jsconsole;

import java.io.Serializable;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

import org.alfresco.repo.cache.SimpleCache;
import org.alfresco.util.Pair;

/**
 * A simple list which transfers entries onto a backing cache in chunks of a defined size. This class is <b>not thread-safe</b>.
 * 
 * @author Axel Faust, <a href="http://www.prodyna.com">PRODYNA AG</a>
 */
public class CacheBackedChunkedList<K extends Serializable, E extends Serializable> extends AbstractList<E>
{

    private final int chunkSize;

    private final K primaryCacheKey;

    private final List<E> backingInMemoryList = new ArrayList<E>();

    private final SimpleCache<Pair<K, Integer>, List<E>> backingCache;

    private int lastChunkTransferred = -1;

    public CacheBackedChunkedList(final SimpleCache<Pair<K, Integer>, List<E>> cache, final K primaryCacheKey, final int chunkSize)
    {
        this.primaryCacheKey = primaryCacheKey;
        this.backingCache = cache;
        this.chunkSize = chunkSize;
    }

    @Override
    public E get(final int index)
    {
        return this.backingInMemoryList.get(index);
    }

    @Override
    public int size()
    {
        return this.backingInMemoryList.size();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void add(final int index, final E e)
    {
        if (index == this.backingInMemoryList.size())
        {
            this.backingInMemoryList.add(e);

            final int nextChunk = this.lastChunkTransferred + 1;
            final int startIdx = nextChunk * this.chunkSize;
            if (this.backingInMemoryList.size() - startIdx >= this.chunkSize)
            {
                final int endIdx = (nextChunk + 1) * this.chunkSize;
                final List<E> toTransfer = this.backingInMemoryList.subList(startIdx, endIdx);
                final List<E> arrToTransfer = new ArrayList<E>(toTransfer);
                final Pair<K, Integer> chunkKey = new Pair<K, Integer>(this.primaryCacheKey, Integer.valueOf(nextChunk));

                this.backingCache.put(chunkKey, arrToTransfer);

                this.lastChunkTransferred = nextChunk;
            }

        }
        else
        {
            throw new UnsupportedOperationException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear()
    {
        // clear the backing list
        this.backingInMemoryList.clear();

        // clear the backing cache
        for (int chunk = 0; chunk <= this.lastChunkTransferred; chunk++)
        {
            final Pair<K, Integer> chunkKey = new Pair<K, Integer>(this.primaryCacheKey, Integer.valueOf(chunk));
            this.backingCache.remove(chunkKey);
        }
        this.lastChunkTransferred = -1;
    }

}
