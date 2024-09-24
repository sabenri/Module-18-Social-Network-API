const { User } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            console.error('GET MULTIPLE USERS ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Retrieve Users', error: err});
        }
    },

    async getSingleUser(req, res) {
        try{
            const user = await User.findOne ({_id: req.params.userId})
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No User Matching That ID'});
            }
            res.json(user);
        }catch (err) {
            console.error('ADD FRIEND ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Add The Friend', error: err});
        }
    },
    async deleteFriend(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.paramsuserId},
                { $pull: {friends: req.params.friendId} },
            )
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if(!user) {
                return res.status(400).json({ message: 'No User With That ID To Remove'});
            }
            res.json(user);
        } catch (err) {
            console.error('REMOVE FRIEND ERROR: ${err}');
            res.status(500).json({ message: 'Failed To Remove The Friend', error: err});
        }
    }
};