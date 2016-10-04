var webpack = require('webpack');
var path = require('path');
var getLoaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.jsx',
		vendor: ['chart.js', 'classnames', 'firebase', 'lodash', 'mobx', 
			'mobx-react', 'react', 'react-chartjs-2', 'react-dom', 'react-select']
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		// This is used for require.ensure.
		chunkFilename: '[name].js'
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
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		  'env': JSON.stringify('dev')
		}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js"),
		// The plugin is used only in production so it is disabled for dev. We still define it
		// here with disabled: true because if we don't the build fails
		new ExtractTextPlugin('[name].hash--[chunkhash].css', { disable: true }),
		new HtmlWebpackPlugin({
		  template: 'src/index.html',
		  filename: './index.html'
		})
	],
	postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};