// A Redis set is an unordered collection of unique strings!
// Track unique items (Eg: Track all unique IP addresses accessing a given blog post)!
// represent relations (Eg: the set of all users with a given role)!

const client = require("./client");

async function init() {
    await client.sadd("ip", 1);
    await client.sadd("ip", 2);
    await client.sadd("ip", 3);
    await client.sadd("ip", 4);
    await client.sadd("ip", 5);
    await client.sadd("ip", 6);
    await client.sadd("ip", 7);
    const result = await client.smembers("ip");
    console.log(result);

}

init();

// The max size of a Redis set is 2^32 - 1 (4,294,967,295) members!