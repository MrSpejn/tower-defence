const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
		bundle: './app/main.js',
		models_bundle: './app/models.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'app')
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'eslint-loader' }
				]
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract({
        			use: ["css-loader", "sass-loader"]
      			})
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				use: 'file-loader'
			},
			{
				test: /\.(glsl|vs|fs)$/,
				use: 'shader-loader'
			},
			{
				test: /\.obj$/,
				use: 'raw-loader'
			}
		]
	},
	plugins: [
    	new DashboardPlugin(),
		new ExtractTextPlugin({
		    filename: "bundle.css",
  		})
	],
	devServer: {
	  contentBase: path.join(__dirname, "app"),
	  historyApiFallback: true,
	  port: 8080
	}

};
