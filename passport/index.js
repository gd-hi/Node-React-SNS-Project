const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
		// 로그인 시 실행 req.session 객체에 어떤 데이터를 저장할 지 정하는 메소드
    passport.serializeUser((user, done) => {
		// done(에러발생시 주는 데이터, 저장하고 싶은 데이터);
		// 사용자 정보 다 저장하면 용량이 커지고 데이터 일관성 문제로
		// 사용자의 아이디만 저장
        done(null, user.id);
    });
		// 각 요청마다 실행 passport.session 미들웨어가 호출하는 메소드
		// serializeUser의 done을 인수로 받아 데이터베이스에서 사용자 정보를 조회
    passport.deserializeUser((id, done) => {
				// 세션에 저장한 ID를 통해 DB 조회
        User.findOne({ 
          where: { id },
          include: [{
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followers',
          }, {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings',
          }], 
        })
				// 에러면 null, req.user에 저장하고 싶다는 뜻
        .then(user => done(null, user))
        .catch(err => done(err));
    });

		// localStrategy: 로컬 로그인 전략에 대한 파일 (로그인 과정 어떻게 처리할지 설정)
    local();
		// kakaoStrategy: 카카오 로그인 전략에 대한 파일 (로그인 과정 어떻게 처리할지 설정)
    kakao();
};