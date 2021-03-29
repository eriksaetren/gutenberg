
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'dekode-ski-resort-block': './src/dekode-ski-resort-block.js',
        'simple-autocomplete': './src/simple-autocomplete.js'
	},
	output: {
		path: path.join(__dirname, './assets/js'),
		filename: '[name].js'
	}
}