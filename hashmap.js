const client = require("./client");

async function init() {

    // SET / CREATE HASH
    const fieldsAdded = await client.hset(
        "bike:1",
        {
            model: "MV Agusta",
            brand: "Ergonom",
            type: "Enduro bikes",
            price: 7971
        }
    );

    console.log(`Number of fields added: ${fieldsAdded}`);

    // GET ALL FIELDS + VALUES
    const bike = await client.hgetall("bike:1");

    console.log("HGETALL:", bike);

    // GET ONE FIELD
    const model = await client.hget("bike:1", "model");

    console.log("HGET model:", model);

    // GET MULTIPLE FIELDS
    const details = await client.hmget(
        "bike:1",
        "model",
        "brand",
        "price"
    );

    console.log("HMGET:", details);

    // GET ALL FIELD NAMES
    const fields = await client.hkeys("bike:1");

    console.log("HKEYS:", fields);

    // GET ALL VALUES
    const values = await client.hvals("bike:1");

    console.log("HVALS:", values);

    // CHECK IF FIELD EXISTS
    const exists = await client.hexists("bike:1", "price");

    console.log("HEXISTS price:", exists);
}

init();

// lookup time O(1)
