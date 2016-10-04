var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getLoaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.jsx',
		vendor: ['chart.js', 'classnames', 'firebase', 'lodash', 'mobx', 
			'mobx-react', 'react', 'react-chartjs-2', 'react-dom', 'react-select']
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].hash--[chunkhash].js',
		// This is used for require.ensure.
		chunkFilename: '[name].hash--[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: getLoaders(true)
	},
	plugins: [
		new webpack.DefinePlugin({
			// This sets the environment variable env.
			'env': JSON.stringify('production'),
			'process.env': { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
		// This plugin extracts code that is common to multiple chunks and puts it in a separate chunk
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.hash--[hash].js"),
		// This plugin extracts all the css that is imported inside the modules to a css file
		new ExtractTextPlugin('[name].hash--[chunkhash].css', { disable: false }),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		    	// If this is not set, every build we get a ton of warnings for uglifyjs that are not interesting
		        warnings: false
		    }
		}),
		// Builds the html file and injects into it the bundle script tags and css style element.
		// This is needed because these files are built with a hash that changes when they change.
		new HtmlWebpackPlugin({
		  template: 'src/index.html'
		})
	]
};