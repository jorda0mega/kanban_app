var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var merge = require("webpack-merge");

// gets the path to this app's directory
var ROOT_PATH = path.resolve(__dirname);

// gets the target on the npm lifecycle
var TARGET = process.npm_lifecycle_event;

var common = {
	entry: path.resolve(ROOT_PATH, "app/main.jsx"),
	devServer: {
		colors: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	output: {
		path: path.resolve(ROOT_PATH, "build"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ["style","css"],
				include: path.resolve(ROOT_PATH, "app")
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Kanban App"
		})
	]
};

if(TARGET == "start" || !TARGET){
	module.exports = merge(common, {
		devtool: "eval",
		module: {
			loaders: [{
				test: /\.jsx?/,
				loaders: ["react-hot","babel"],
				include: path.resolve(ROOT_PATH, "app")
			}]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}