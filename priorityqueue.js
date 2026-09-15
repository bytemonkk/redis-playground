const client = require("./client");

async function init() {
    
    // ADD / CREATE SORTED SET
    const added = await client.zadd(
        "tasks",
        1, "task:email",
        5, "task:backup",
        2, "task:report",
        10, "task:payment"
    );

    console.log(`Number of tasks added: ${added}`);

    // GET ALL TASKS BY PRIORITY
    // LOWEST SCORE → HIGHEST SCORE
    const tasks = await client.zrange(
        "tasks",
        0,
        -1
    );

    console.log("ZRANGE:", tasks);

    // GET TASKS + THEIR SCORES
    const tasksWithScores = await client.zrange(
        "tasks",
        0,
        -1,
        "WITHSCORES"
    );

    console.log("ZRANGE WITHSCORES:", tasksWithScores);

    // GET HIGHEST PRIORITY TASK
    // LOWEST SCORE = HIGHEST PRIORITY
    const highestPriority = await client.zrange(
        "tasks",
        0,
        0
    );

    console.log("Highest priority task:", highestPriority);

    // GET HIGHEST PRIORITY TASK + SCORE
    const priorityTask = await client.zrange(
        "tasks",
        0,
        0,
        "WITHSCORES"
    );

    console.log("Priority task + score:", priorityTask);

    // GET TASK'S SCORE
    const score = await client.zscore(
        "tasks",
        "task:payment"
    );

    console.log("Score of task:payment:", score);

    // GET NUMBER OF TASKS
    const count = await client.zcard("tasks");

    console.log("Number of tasks:", count);

    // GET RANK / POSITION
    const rank = await client.zrank(
        "tasks",
        "task:payment"
    );

    console.log("Rank of task:payment:", rank);

    // UPDATE PRIORITY
    await client.zadd(
        "tasks",
        0,
        "task:payment"
    );

    console.log("Updated task:payment priority to 0");

    // REMOVE A TASK
    await client.zrem(
        "tasks",
        "task:backup"
    );

    console.log("Removed task:backup");

    // GET FINAL QUEUE
    const finalQueue = await client.zrange(
        "tasks",
        0,
        -1,
        "WITHSCORES"
    );

    console.log("Final queue:", finalQueue);
}

init();