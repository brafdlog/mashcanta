var webpack = require('webpack');
var path = require('path');
var getLoaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8181', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/index.jsx' // Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		preLoaders: [
        	{test: /\.jsx?$/, exclude: /(node_modules|bower_components|vendor)/, loader: "eslint-loader"}
      	],
		loaders: getLoaders()
	},
	eslint: {
        configFile: path.join(__dirname, './.eslintrc'),
        fix: true,
        cache: true
    },
	devServer: {
		contentBase: "./public",
			noInfo: true, //  --no-info option
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};