// Normal data type!
const client = require("./client");

async function init() {
    await client.set("msg:3", "hello from Nodejs");
    await client.expire("msg:3", 17);
    const result = await client.get("msg:3");
    console.log("Result ->", result);
}

init();