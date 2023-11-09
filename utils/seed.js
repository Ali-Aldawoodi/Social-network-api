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

    // How do i input al
    const users = [];

    const username = 'asdf'
    const email = 'asdf@yahoo.com'
    const thoughts = ['what is this']
    const friends = ['john', '654c2bb0e2453c45ded1eef1']

    users.push({
        username,
        email,
        thoughts,
        friends,
    });

    await User.collection.insertMany(users);

    const thoughtText = 'where are we';
    const createdAt = '11/06/23';
    const reactions = ['wow great']


    await Thought.collection.insertOne({
        thoughtText,
        createdAt,
        username,
        reactions: [...reactions],
    });

    console.table(users);
    console.table(thoughts)
    console.info('Seeding complete!');
    process.exit(0);

});