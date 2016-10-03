module.exports = function getLoaders(isProduction) {
	var sourceMapLoaderParam = isProduction ? '' : '&sourceMap';
	var postCssLoaderParam = 'importLoaders=1!postcss-loader';
	var cssLoaderParms = '?modules&localIdentName=[name]__[local]___[hash:base64:5]' + sourceMapLoaderParam + '&' + postCssLoaderParam;
	var jsxLoaders = isProduction ? ['babel'] : ['react-hot', 'babel'];
	return [
		{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loaders: jsxLoaders,
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader' + cssLoaderParms
		},
		{
		   test: /\.scss$/,
		   loaders: ["style", "css" + cssLoaderParms, "sass"]
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		},
		{
			test: /\.(woff|woff2)$/,
			loader: "url?prefix=font/&limit=5000"
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/octet-stream"
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=image/svg+xml"
		},
		{
			test: /\.gif/,
			loader: "url-loader?limit=10000&mimetype=image/gif"
		},
		{
			test: /\.jpg/,
			loader: "url-loader?limit=10000&mimetype=image/jpg"
		},
		{
			test: /\.png/,
			loader: "url-loader?limit=10000&mimetype=image/png"
		}
	];
}