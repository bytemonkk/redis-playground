// Redis lists are linked lists of string values. Redis lists are frequently used to:
// implement stack and queues.
// Build queue management for background worker systems!

const client = require("./client");

async function init() {
    // await client.lpush("messages", 1);
    // await client.lpush("messages", 2);
    // await client.lpush("messages", 3);
    // await client.lpush("messages", 4);
    // const result = await client.rpop("messages");
    const result1 = await client.blpop("messages", 10);
    console.log(result1);
    
}

init();

// The max size of a Redis list is 2^32 - 1 (4,294,967,295) members!
