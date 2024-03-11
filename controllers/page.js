const { User, Post, Hashtag, Board } = require('../models');

exports.renderFollower = (req, res) => {
    res.render('follower', {title: '팔로워 - NodeBird'});
};


exports.renderFollowing = (req, res) => {
    res.render('following', {title: '팔로잉 - NodeBird'});
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원 가입 -NodeBird' });
};

exports.renderBoard = (req, res) => {
    res.render('board', { title: '게시판 - NodeBird'})
}

exports.renderBoardView = async (req, res, next) => {
    try {
        const boards = await Board.findAll();
        if (req.user != null) {
            res.render('boardView', {
                title: 'NodeBird',
                boards: boards,
            });
        }
        else{
        res.render('loginForm');
    }
    } catch (err) {
        console.error(err);
        next(err);
    }
}



exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        if (req.user != null) {
            res.render('main', {
                title: 'NodeBird',
                twits: posts,
            });
        }
        else{
        res.render('loginForm');
    }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }

        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

