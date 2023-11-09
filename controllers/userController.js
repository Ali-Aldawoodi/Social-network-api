const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            // add .populate here
            const user = await User.findOne({ _id: req.params.userId })
                .select('-_v');
            if (!user) {
                return res.status(404).json({ message: 'No user!' })
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(400).json({ message: 'No user!' });
            }

            res.json({ message: 'User deleted.' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
            );

            if (!user) {
                return res.status(404).json({ message: 'No user!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user!' });
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
      },

      async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                {_id: req.params.userId },
                { $pull: {friends: { _id: req.params.userId} } },
                {runValidators: true, new: true}
            );

            if (!user) {
                return res 
                    .status(404)
                    .json({ message: 'No user!'});
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
      },
};