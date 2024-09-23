const {User, Thought } = require ('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .select('-__v');

            res.json(thoughts);
        } catch (err) {
            console.error('GET MULTIPLE THOUGHTS ERROR: ${err}');
            res.status(500).json({message: 'Failed to Retrieve Thoughts', error: err});
        }
    },

    async getSingleThought(req ,res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thoughts Matching That ID'}); 
            }

            res.json(thought);
        } catch (err) {
            console.error('GET SINGLE THOUGHT ERROR: ${err}');
            res.status(500).json({message: 'Failed To Retrieve The Thought', error: err});
        }
    },

    async CreateThought (req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                {_id: req.bady.userId},
                { $push: {thoughts: thought._id}},
                {new:true}
            );
            if (!user) {
                return res.status(404).json({message:'No User With That ID. Thought Not Created Properly '});
            }

            res.status(201).json({message: 'Thought Created And Associated With User!', thought});
        } catch (err) {
            console.error('CREATE THOUGHT ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Create The Thought', error: err});
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new:true}
            );
            if (!thought) {
                return res.status(404).json({ message: "Thought Wasn't Able To Update"});
            }

            res.json(thought);
        } catch (err) {
            console.error('UPDATE THOUGHT ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Update The Thought', error: err});
        }
    },

    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtIdhought});

            if (!thought) {
                return res.status(404).json({ message: 'Unable To Delete Thought. Invalid ID'});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId},
                { $pull: { thoughts: req.params.thoughtId}},
                {new: true}
            );
            if (!user){
                return res.status(404).json({ message: "Thought Deleted But Doesn't Belong To A User"});
            }
            res.json({message:'Thought And User Data Updated'});
        } catch (err) {
            console.error('DELETE THOUGHT ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Delete The Thought', error: err});
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $push: {reactions: req.body}},
                { new: true, runValidators: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'No Thought Found With That ID'})
            }
            res.json(thought);
        } catch (err) {
            console.error('ADD REACTION ERROR: ${err}');
            res.status(500).json({message: 'Failed To Add The Reaction', error: err});
        }
    },

    async deleteReaction(req, res) {
        try {
            console.log('Attempting To Delete Reaction with ID: ${req.params.reactionId} from thought with ID: ${req.params.thoughtId}');

            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: {reactions:{_id: req.params.reactionId}}},
                { new: true, runValidators: true}
            );

            if(!thought) {
                return res.status(404).json({message: 'No Thought Found With That ID'});
            }

            res.json(thought);
        } catch (err) {
            console.error('DELETE REACTION ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Delete The Reaction', error: err});
        }
    }
};