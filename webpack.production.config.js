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
			'env': JSON.stringify('production'),
			'process.env': { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.hash--[hash].js"),
		new ExtractTextPlugin('[name].hash--[chunkhash].css', { disable: false }),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
		new HtmlWebpackPlugin({
		  template: 'src/index.html'
		})
	]
};