const { Thought, User, Reaction } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-_v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought!' });
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought!' });
            }
            await User.deleteMany({ _id: { $in: thought.users } })
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // separate function. it will require two object functions

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought!' });
            }
            await Reaction.Create(req.body )
            res.json({ message: 'Reaction has been created' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({_id: req.params.reactinId });

            if(!reaction) {
                res.status(404).json({ message: 'No reaction!'});
            }

            res.json({ message: 'Reaction deleted! '});
        } catch(err) {
            res.status(500).json(err);
        }
    },

};