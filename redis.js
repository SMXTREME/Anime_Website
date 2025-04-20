const Redis = require('ioredis');

/**
 * @type {Redis.Redis}
 */
const redis = new Redis(process.env.REDIS_URI);

module.exports = redis;
