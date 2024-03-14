const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
    try {
        const cacheKey = req.originalUrl;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
        } else {
            const originalJson = res.json;

            res.json = (data) => {
                try {
                    cache.set(cacheKey, JSON.stringify(data), 900); // 15 min
                    originalJson.call(res, data);
                } catch (error) {
                    originalJson.call(res, data);
                }
            };

            next();
        }
    } catch (error) {
        next(error);
    }
};

// '/api/v2/site/site-config',
// '/api/v2/category/get-all-categories',

const flushSiteConfig = (req, res, next) => {
    cache.del('/api/v2/site/site-config');
    const originalJson = res.json;
    res.json = (data) => {
        originalJson.call(res, data);
    }
    next()
}

const flushCategories = (req, res, next) => {
    cache.del('/api/v2/category/get-all-categories');
    const originalJson = res.json;
    res.json = (data) => {
        originalJson.call(res, data);
    }
    next()
}

const flushProducts = (req, res, next) => {
    const allKeys = cache.keys();
    Promise.all(allKeys.map((item) => {
        if (item !== '/api/v2/category/get-all-categories' && item !== '/api/v2/site/site-config') {
            cache.del(item);
        }
    }))
    const originalJson = res.json;
    res.json = (data) => {
        originalJson.call(res, data);
    }
    next()
}

const flushBlogs = (req, res, next) => {
    const allKeys = cache.keys();
    Promise.all(allKeys.map((item) => {
        if (item.includes("/api/v2/blogs/pagination")) {
            cache.del(item);
        }
    }))
    const originalJson = res.json;
    res.json = (data) => {
        originalJson.call(res, data);
    }
    next()
}

const flushProductsByCategory = (req, res, next) => {
    const allKeys = cache.keys();
    Promise.all(allKeys.map((item) => {
        if (item.includes("/api/v2/category/search")) {
            cache.del(item);
        }
    }))
    const originalJson = res.json;
    res.json = (data) => {
        originalJson.call(res, data);
    }
    next()
}


module.exports = { cacheMiddleware, flushSiteConfig, flushCategories, flushProducts, flushBlogs, flushProductsByCategory };
