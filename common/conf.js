const url = require('url');


module.exports = {
	database: {
		host: 'localhost',
		username: 'root',
		password: 'root',
		port: 5984
	},
	jwt:
	{
		secret: '19260817',
		options:
		{
			expiresIn: '30d'
		}
	}
};