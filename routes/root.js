const router = require('express').Router();
const {
    getHomePage,
    getAllPosts,
    deleteSinglePost
} = require('../controllers/rootController');

router.route("/posts").get(getAllPosts);
router.route('/posts/delete/:id').delete(deleteSinglePost);


module.exports = router;