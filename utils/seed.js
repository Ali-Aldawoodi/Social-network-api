const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    const users = [];

    users.push({
        username,
        email,
        thoughts,
        friends,
    });

    await User.collection.insertMany(users);


    await Thought.collection.insertOne({
        thoughtText,
        createdAt,
        username,
        reactions: [...reactions],
    });

    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);

});