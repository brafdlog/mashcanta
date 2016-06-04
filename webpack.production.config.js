var webpack = require('webpack');
var path = require('path');
var getLoaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'./src/index.jsx' // appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: getLoaders(true)
	},
	plugins: [
	  new webpack.DefinePlugin({
	    'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	  })
	]
};