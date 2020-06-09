const path = require('path');
const { version } = require('./package');
const webpackConfig = require('./config/webpack.config.js')()

module.exports = {
	components: 'src/components/**/[A-Z]*.tsx',
	defaultExample: true,
	moduleAliases: {
		'@components': path.resolve(__dirname, 'src/components'),
	},
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	webpackConfig: {
		resolve: webpackConfig.resolve,
		module: webpackConfig.module,
	},
	version,
	propsParser: require('react-docgen-typescript').withCustomConfig(
		'./docgen-ts.json',
		{
			shouldExtractLiteralValuesFromEnum: true,
		}
	).parse,
	require: [
    path.join(__dirname, 'styleguide.styles.css')
  ]
};