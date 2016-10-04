var webpack = require('webpack');
var path = require('path');
var getLoaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.jsx',
		vendor: ['lodash', 'react', 'react-dom']
	},
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
		contentBase: "./dev-server",
			noInfo: true, //  --no-info option
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		  'env': JSON.stringify('dev')
		}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		// The plugin is used only in production so it is disabled for dev. We still define it
		// here with disabled: true because if we don't the build fails
		new ExtractTextPlugin('style.css', { disable: true }),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
	],
	postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};