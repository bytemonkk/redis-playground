const client = require("./client");

async function init() {

    // ADD / CREATE GEO LOCATION

    const added = await client.geoadd(
        "places",
        80.2707, 13.0827, "Chennai",
        77.5946, 12.9716, "Bangalore",
        78.4867, 17.3850, "Hyderabad",
        77.2090, 28.6139, "Delhi"
    );

    console.log(`Number of locations added: ${added}`);


    // GET LOCATION'S COORDINATES

    const coordinates = await client.geopos(
        "places",
        "Chennai"
    );

    console.log("GEOPOS Chennai:", coordinates);


    // GET DISTANCE BETWEEN TWO LOCATIONS

    const distance = await client.geodist(
        "places",
        "Chennai",
        "Bangalore",
        "km"
    );

    console.log("Distance Chennai → Bangalore:", distance, "km");


    // GET DISTANCE BETWEEN TWO OTHER LOCATIONS

    const distance2 = await client.geodist(
        "places",
        "Hyderabad",
        "Bangalore",
        "km"
    );

    console.log("Distance Hyderabad → Bangalore:", distance2, "km");


    // FIND LOCATIONS WITHIN A RADIUS

    const nearby = await client.georadius(
        "places",
        80.2707,
        13.0827,
        500,
        "km"
    );

    console.log("Locations within 500 km:", nearby);


    // FIND LOCATIONS WITHIN A RADIUS + DISTANCE

    const nearbyWithDistance = await client.georadius(
        "places",
        80.2707,
        13.0827,
        500,
        "km",
        "WITHDIST"
    );

    console.log("Nearby locations + distance:", nearbyWithDistance);


    // FIND LOCATIONS WITHIN A RADIUS + COORDINATES

    const nearbyWithCoordinates = await client.georadius(
        "places",
        80.2707,
        13.0827,
        500,
        "km",
        "WITHCOORD"
    );

    console.log("Nearby locations + coordinates:", nearbyWithCoordinates);


    // FIND LOCATIONS WITHIN A RADIUS + DISTANCE + COORDINATES

    const nearbyDetails = await client.georadius(
        "places",
        80.2707,
        13.0827,
        500,
        "km",
        "WITHDIST",
        "WITHCOORD"
    );

    console.log("Nearby locations + details:", nearbyDetails);


    // FIND LOCATION BY NAME

    const location = await client.geopos(
        "places",
        "Hyderabad"
    );

    console.log("Hyderabad coordinates:", location);


    // GET GEO HASH

    const geoHash = await client.geohash(
        "places",
        "Chennai",
        "Bangalore",
        "Hyderabad"
    );

    console.log("GEOHASH:", geoHash);


    // GET ALL LOCATIONS

    const allPlaces = await client.zrange(
        "places",
        0,
        -1
    );

    console.log("All locations:", allPlaces);


    // REMOVE A LOCATION

    const removed = await client.zrem(
        "places",
        "Delhi"
    );

    console.log("Locations removed:", removed);


    // GET FINAL LOCATIONS

    const finalPlaces = await client.zrange(
        "places",
        0,
        -1
    );

    console.log("Final locations:", finalPlaces);
}

init();