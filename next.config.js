const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withCSS(withLess({
	lessLoaderOptions: { javascriptEnabled: true },
	webpack: (config, options) => {
		config.node = { fs: 'empty' };
		return config;
	}
}));