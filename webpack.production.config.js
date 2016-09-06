var webpack = require('webpack');
var path = require('path');
var getLoaders = require('./webpack.loaders');

module.exports = {
	entry: {
		app: './src/index.jsx',
		vendor: ['lodash', 'react', 'react-dom']
	},
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
			'env': JSON.stringify('production'),
			'process.env': { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
	]
};