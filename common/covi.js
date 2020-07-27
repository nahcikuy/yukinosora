/**
 * Encaposulate operations to CouchDB.
 */

const url = require('url');
const http = require('http');
const { database } = require('./conf');

/**
 * Request CouchDB server.
 * @param {string} path the requested URL path
 * @param {string} [method] the HTTP method. Default: 'GET'
 * @param {any} [body] the request body. If an object is given, *covi* will automatically stringify it
 * @param {object} [headers] the request headers. Default: { 'Accept':'application/json', 'Content-Type':
 * 'application/json' }
 * @param {object} [options]
 * * *throws*: if true, *covi* will reject when couchDB responds with any error status code. Default to true
 * * *getResponse*: specify what to return. See *returns* section for details. Default to false
 * @returns {Promise<object>} 
 * if getResponse is true:
 * * statusCode: the status code responded by couchDB
 * * headers: the response headers
 * * body: the response body, coverted to object type
 * 
 * otherwise:
 * * returns the response body only, coverted to object type
 */

module.exports = async (path, method, body, headers, options) => {
	options = {
		throws: true,
		getResponse: false,
		...options
	};
	return new Promise((resolve, reject) => {
		const req = http.request({
			host: database.host,
			port: database.port,
			auth: database.username + ':' + database.password,
			path: path,
			method: method || 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				...headers
			}
		}, (res) => {
			let response =
			{
				body: '',
				headers: res.headers,
				statusCode: res.statusCode
			}
			if (res.statusCode >= 400 && options.throws)
				reject('Error: CouchDB responds with status code ' + res.statusCode);

			res.setEncoding('utf8');
			res.on('data', chunk => response.body += chunk)
			res.on('error', err => reject(err));
			res.on('end', () => {
				response.body = JSON.parse(response.body);
				resolve(options.getResponse ? response : response.body);
			});
		});
		body && req.write(typeof (body) == 'object' ? JSON.stringify(body) : body);
		req.end();
	});
}