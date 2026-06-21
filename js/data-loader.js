/**
 * Data Loader Module
 * Handles fetching and caching of JSON data files
 */

const DataLoader = (() => {
    const CACHE_TTL = 3600000; // 1 hour in milliseconds

    /**
     * Cache data in localStorage with timestamp
     */
    function setCache(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to cache data:', e);
        }
    }

    /**
     * Retrieve cached data if valid
     */
    function getCache(key) {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return null;

            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp > CACHE_TTL) {
                localStorage.removeItem(key);
                return null;
            }
            return parsed.data;
        } catch (e) {
            console.warn('Failed to retrieve cached data:', e);
            return null;
        }
    }

    /**
     * Load data from JSON file with caching
     */
    async function loadData(url, cacheKey) {
        // Check cache first
        const cached = getCache(cacheKey);
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }

            const data = await response.json();

            // Cache the data
            setCache(cacheKey, data);

            return data;
        } catch (error) {
            console.error(`Error loading data from ${url}:`, error);

            // Return empty array as fallback
            return { products: [] };
        }
    }

    /**
     * Load products data
     */
    async function loadProducts() {
        const data = await loadData('data/products.json', 'products_cache');
        return data.products || [];
    }

    /**
     * Load partners data
     */
    async function loadPartners() {
        const data = await loadData('data/partners.json', 'partners_cache');
        return data.partners || [];
    }

    /**
     * Clear all cached data
     */
    function clearCache() {
        try {
            localStorage.removeItem('products_cache');
            localStorage.removeItem('partners_cache');
        } catch (e) {
            console.warn('Failed to clear cache:', e);
        }
    }

    return {
        loadProducts,
        loadPartners,
        clearCache
    };
})();
