const User = require('../models/user');

exports.follow = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            // Following 테이블에 추가
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('seccess');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};