const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)


// usercontrollers - .populate friends or thoughts 
router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;