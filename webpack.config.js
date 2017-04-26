var path = require('path');
var fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = true;
const entrys = require('./entrys');//获取入口文件,包括js,html

var htmlEntrys = entrys.htmlFiles;
var jsEntrys = entrys.jsFiles;

var entry = {};
var venderEntrys = ['jquery'];//提取公用的文件
entry.vender = venderEntrys;
for(var i=0;i<jsEntrys.length;i++){
    entry[path.basename(jsEntrys[i],".js")] = jsEntrys[i];
}

/**
 * 配置html入口文件，
 * */
var htmlWebpackPluginList = [];
for(var j=0;j<htmlEntrys.length;j++){
    htmlWebpackPluginList.push(
        new HtmlWebpackPlugin({
            template: htmlEntrys[j],
            filename:"html/"+path.basename(htmlEntrys[j],'.html')+".html",
            inject:true,
            minify: { //压缩HTML文件
                removeComments: isProduction, //移除HTML中的注释
                collapseWhitespace: isProduction //删除空白符与换行符
            },
            hash:true,
            chunks:['vender',path.basename(htmlEntrys[j],".html")],
        })
    )
}

/*sass，css插件 , 将css提取到单独的文件中*/
const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
});
const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
});

/**
 * 插件列表
 * */
var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ["vender"],
        filename: "js/commons.js",
    }),
    extractSass,
    extractCss,
].concat(htmlWebpackPluginList);

if(isProduction){
    plugins.push(//生产环境压缩js
    new webpack.optimize.UglifyJsPlugin({
        comments:false,
    }))
}

var config = {
    entry:entry,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist/',
        chunkFilename:'js/[id].[name].chunk.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory:true,
                    }
                }
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: "style-loader",
                    use:[{
                        loader:"css-loader",
                        options:{
                            minimize:isProduction,
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options:{
                            minimize:isProduction,
                        }
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: plugins,
};
module.exports = config;