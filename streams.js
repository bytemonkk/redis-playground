const client = require("./client");

async function init() {

    // ADD / CREATE STREAM

    const message1 = await client.xadd(
        "orders",
        "*",
        "user", "dobby",
        "product", "Laptop",
        "price", "75000"
    );

    console.log("Message 1 ID:", message1);

    const message2 = await client.xadd(
        "orders",
        "*",
        "user", "hermione",
        "product", "Phone",
        "price", "45000"
    );

    console.log("Message 2 ID:", message2);

    const message3 = await client.xadd(
        "orders",
        "*",
        "user", "harry",
        "product", "Headphones",
        "price", "5000"
    );

    console.log("Message 3 ID:", message3);


    // GET ALL MESSAGES FROM STREAM

    const messages = await client.xrange(
        "orders",
        "-",
        "+"
    );

    console.log("XRANGE:", messages);


    // GET LATEST MESSAGES

    const latestMessages = await client.xrevrange(
        "orders",
        "+",
        "-",
        "COUNT",
        2
    );

    console.log("XREVRANGE:", latestMessages);


    // GET NUMBER OF MESSAGES

    const count = await client.xlen("orders");

    console.log("Number of messages:", count);


    // READ MESSAGES AFTER A SPECIFIC ID

    const newMessages = await client.xrange(
        "orders",
        message1,
        "+"
    );

    console.log("Messages after message1:", newMessages);


    // CREATE CONSUMER GROUP

    const groupCreated = await client.xgroup(
        "CREATE",
        "orders",
        "order-group",
        "0",
        "MKSTREAM"
    ).catch(() => 0);

    console.log("Consumer group created:", groupCreated);


    // READ MESSAGES USING CONSUMER GROUP

    const groupMessages = await client.xreadgroup(
        "GROUP",
        "order-group",
        "consumer-1",
        "COUNT",
        2,
        "STREAMS",
        "orders",
        ">"
    );

    console.log("XREADGROUP:", groupMessages);


    // ACKNOWLEDGE PROCESSED MESSAGE

    if (groupMessages && groupMessages.length > 0) {
        const streamMessages = groupMessages[0][1];

        if (streamMessages.length > 0) {
            const messageId = streamMessages[0][0];

            const acknowledged = await client.xack(
                "orders",
                "order-group",
                messageId
            );

            console.log("Message acknowledged:", acknowledged);
        }
    }


    // GET PENDING MESSAGES

    const pending = await client.xpending(
        "orders",
        "order-group"
    );

    console.log("XPENDING:", pending);

    // DELETE A MESSAGE
    const deleted = await client.xdel(
        "orders",
        message3
    );

    console.log("Messages deleted:", deleted);

    // GET FINAL STREAM
    const finalStream = await client.xrange(
        "orders",
        "-",
        "+"
    );

    console.log("Final stream:", finalStream);
}

init();