const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withCSS(withLess({
	exportTrailingSlash: true,
	lessLoaderOptions: { javascriptEnabled: true },
	webpack: (config, options) => {
		//config.node = { fs: 'empty' };
		return config;
	}
}));