// The one who hits the Redis server!
const { Redis } = require("ioredis");

const client = new Redis();


module.exports = client;
