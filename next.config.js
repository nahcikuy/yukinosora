const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withCSS(withLess({
	lessLoaderOptions: { javascriptEnabled: true },
	exportPathMap: async (defaultMap) => {
		console.log(defaultMap);
		return defaultMap;
		
	},
	webpack: (config, options) => {
		//config.node = { fs: 'empty' };
		return config;
	}
}));