const Redis = require("ioredis");

const publisher = new Redis();
const subscriber = new Redis();

async function init() {

    // SUBSCRIBE TO A CHANNEL

    await subscriber.subscribe("notifications");

    console.log("Subscribed to notifications channel");


    // RECEIVE MESSAGES FROM CHANNEL

    subscriber.on("message", (channel, message) => {

        console.log("Channel:", channel);
        console.log("Message:", message);

    });


    // PUBLISH MESSAGE TO CHANNEL

    const published = await publisher.publish(
        "notifications",
        "Hello from Redis Pub/Sub!"
    );

    console.log("Number of subscribers:", published);


    // PUBLISH ANOTHER MESSAGE

    const published2 = await publisher.publish(
        "notifications",
        "New notification received!"
    );

    console.log("Number of subscribers:", published2);


    // GET NUMBER OF SUBSCRIBERS

    const subscribers = await publisher.pubsub(
        "NUMSUB",
        "notifications"
    );

    console.log("Subscribers:", subscribers);


    // SUBSCRIBE TO MULTIPLE CHANNELS

    await subscriber.subscribe(
        "orders",
        "payments"
    );

    console.log("Subscribed to orders and payments");


    // PUBLISH TO ORDERS CHANNEL

    await publisher.publish(
        "orders",
        "New order received"
    );


    // PUBLISH TO PAYMENTS CHANNEL

    await publisher.publish(
        "payments",
        "Payment completed"
    );
}

init();