const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: ['babel-polyfill', './index.js']
    },
    output:{
        path: path.join(__dirname, './public'), // путь к каталогу выходных файлов
        filename: "index.js"  // название создаваемого файла
    }, 
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader"}
            },

            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }

        ] 
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'index.css'
        }),
    ]
};