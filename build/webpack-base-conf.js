/*
* @Author: jensen
* @Date:   2018-04-04 10:17:18
* @Last Modified by:   jensen
* @Last Modified time: 2018-04-04 13:40:40
*/

// 引入外部模块
const path = require('path')  //path.resolve（）方法将一系列路径或路径段解析为绝对路径

// 引入插件基于commonjs的require  require的插件都是来源于yarn add webapck -D时依赖进来的
/**
 * 常用的plugins
 * @uglifyjs-webpack-plugin  压缩js代码
 * @DefinePlugin  					 定义环境变量
 * @ExtractTextWebpackPlugin 生成css文件
 */
const UglifyPlugin = require('uglifyjs-webpack-plugin')


/** 使用__dirname变量获取当前模块文件所在目录的完整绝对路径 */
function reslove(dir){
	return path.join(__dirname, '..', dir)   // ..相对路径
}

// webpack config
module.exports = {
	/**
	 * webpack本身就是个打包工具，核心包括：entry,loaders,plugins,output,mode
	 * @entry [obj]: 配置入口文件名和路径
	 * @laoders [obj]： 就是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块（在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件）
	 * @plugins [arr]: 用于处理更多其他的一些构建任务,也就是loader以外的任务
	 * @output [obj]: 配置输出的文件名和路径
	 */
	entry: {
		/**
		 * 多文件作为一个入口可以用数组的方式eg: main:['index1.js','index2.js']
		 * 多入口  eg:  main: 'path1', foo: 'path2'
		 */
		main: './src/index.js' 
	},
	output: {
		/**
		 * 常用字段
		 * @path 路径
		 * @filename  文件名
		 */
		path: reslove('dist'), //指定输出路径
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: [
					resolve('src') //指定哪些路径下的文件需要经过loader的处理
				],
				use: 'babel-loader', // 指定使用的loader
			},
		]
	},
	plugins: [
		new UglifyPlugin()
	]
}