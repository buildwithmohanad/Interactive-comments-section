const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const stylesHandler = 'style-loader';
module.exports = {
    mode:"development",
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'public' ),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            // use: ['style-loader', 'css-loader'],
            use: [stylesHandler, 'css-loader', 'postcss-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif|webp)?$/,
            use: 'file-loader',
         //    options: {
         //       name(resourcePath, resourceQuery) {
         //         // `resourcePath` - `/absolute/path/to/file.js`
         //         // `resourceQuery` - `?foo=bar`
     
         //         if (process.env.NODE_ENV === 'development') {
         //           return '[path][name].[ext]';
         //         }
     
         //         return '[contenthash].[ext]';
         //       }
         // }
         }
      
]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html',
         favicon: 'public/favicon.ico'
      }) ,
    
   ]
};