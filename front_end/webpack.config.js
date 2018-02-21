// config = {
//   entry: __dirname + "/src/app.js",
//   output: {
//     filename: "bundle.js",
//     path: __dirname + "/build"
//   },
//   devtool: 'source-map'
// }
//
// module.exports = config;

module.exports = {
    entry: {
        app: __dirname + "/src/app.js",
        stock: __dirname + "/src/stock-app.js"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name]-bundle.js"
    }
};
