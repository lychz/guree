const path = require('path');
const { version } = require('./package');
const webpackConfig = require('./config/webpack.config.js')

module.exports = {
	components: 'src/components/**/[A-Z]*.tsx',
	defaultExample: true,
	moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	webpackConfig: {
		module: webpackConfig().module,
	},
	version,
	propsParser: require('react-docgen-typescript').withCustomConfig(
    './docgen-ts.json'
  ).parse
};