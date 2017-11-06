const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

//设置环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html参数方法
var getHtmlConfig = function(name){
    return{
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    };
};
 config = {
    entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']},
    output: {
        path: path.resolve('./dist'),
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
     externals: {
        'jquery': "window.jQuery"
     },
     module:{
        loaders:[
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                use: "css-loader"}),
            },
            {
                //对图片和字体文件的处理
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=[name].[ext]'
            }
        ]
     },

     plugins:[
         //独立通用模块到js/base.js
         new webpack.optimize.CommonsChunkPlugin({
             name: 'common',
             filename: 'js/base.js'
         }),
         //把css单独打包
         new ExtractTextPlugin("[name].css"),
         //html模板的处理
         new HtmlWebpackPlugin(getHtmlConfig('index')),
         new HtmlWebpackPlugin(getHtmlConfig('login')),

     ]
};

if(WEBPACK_ENV == 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;