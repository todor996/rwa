const path=require('path');
module.exports ={
entry:'./src/index.js',
watchOptions: {
  poll: true
},
output:{
    filename: "bundle.js",
    path: path.resolve(__dirname,'dist'),
    publicPath: "./dist/",
},
devtool: 'source-map',
devServer: {
  contentBase: __dirname,
  inline: true,
  host: '0.0.0.0',
  port: 8080,
  hot: true
},
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
}
