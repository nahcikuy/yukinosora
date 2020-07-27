const conf = require('./conf');
const jwt = require('jsonwebtoken');

async function sign(userId) {
	return new Promise((resolve, reject) =>
		jwt.sign({ userId }, conf.jwt.secret, conf.jwt.options, (err, token) => {
			err ? reject(err) : resolve(token);
		}));
}

async function verify(req) {
	return new Promise((resolve, reject) => {
		let token = req.headers.authorization;
		if (token && token.startsWith('Bearer ')) {
			token = token.slice(7);
			jwt.verify(token, conf.jwt.secret, null, (err, { userId }) =>
				resolve(err ? null : userId));
		}
	});
}

module.exports = { sign, verify };