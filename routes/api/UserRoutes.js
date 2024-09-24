const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    updateSingleUser,
    createUser,
    addFriend,
    deleteFriend
} = require('../../controllers/UserConroller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .post(updateSingleUser);

 router.route('/userId/friends/:friendId')
    .get(addFriend)
    .post(deleteFriend);

module.exports = router;


