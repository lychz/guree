const path = require('path');
const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.tsx',
	defaultExample: true,
	moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	version,
};