const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",
    entry:{
        bundle: ["./src/js/html5App.js","./src/js/log.js","./src/js/offline.js"]
    },
    output: {
    filename: "js/app.js",
    },
    devServer: {
    contentBase: './dist',
    watchContentBase:true,
    port:4444,
    },
    watch: true,

    module: {
        rules: [
           {
             test: /\.css$/,
             use: [
               {
                 loader: MiniCssExtractPlugin.loader,
                 options: {
                   // you can specify a publicPath here
                   // by default it uses publicPath in webpackOptions.output
                   publicPath: '../',
                   hmr: process.env.NODE_ENV === 'development',
                 },
               },
               'css-loader',
             ],
           },
         ],
       },

    plugins:[
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/app.css'
          }),

    new CopyPlugin([
        {from: 'src/index.html'},
        {from: 'src/index-jap.html'},
        {from: 'src/no-network.html'},
        {from: 'src/login.html'},
        {
          from:'src/fonts', 
          to: 'fonts/' 
        },
        {
          from:'src/img',
          to: 'img'
        },
        {
          from:'offlineApp.manifest',
          to: 'offlineApp.manifest'
        },
    ])
    ]
};