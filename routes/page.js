const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderBoard, renderHashtag, renderFollower, renderFollowing, renderBoardView } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/follower',isLoggedIn, renderFollower);

router.get('/following',isLoggedIn, renderFollowing);

router.get('/join',isNotLoggedIn, renderJoin);

router.get('/', renderMain);

router.get('/boardView', isLoggedIn, renderBoardView);



router.get('/board', isLoggedIn, renderBoard);

router.get('/hashtag', isLoggedIn, renderHashtag);

module.exports = router;