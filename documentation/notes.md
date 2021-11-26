https://discoverthreejs.com/book/first-steps/

## Webpack

We will use webpack to build the project.

```
"devDependencies": {
    "prettier": "^2.0.4",
    "webpack": "^5.64.4",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.6.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "css-loader": "^6.5.1"
}
```

```
"scripts": {
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --mode development",
},
```

### webpack.config.js

Main js module which is recursively searched for modules

```
entry: "./src/main.js",
```

Output js file containing all modules bundled together:

```
 output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
},
```

Configure optiosn for serving static files from the build directory "public by default, commonly dist/ or build/"

```
devServer: {
    static: {
        directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
},
```

Plugin which either creates an index.html file in the build dir or makes one using a template. The index.html file will link
to the output js file and css file.

```
plugins: [
    new HtmlWebpackPlugin({
        title: "HTML Webpack Test",
        template: "index.html",
        filename: "./index.html",
    }),
],
```

The template can access the plugin options:

```
<title><%= htmlWebpackPlugin.options.title %></title>
```

#### Module rules

Rules can be used to perform specific actions on certain files.

To use static css files, we need to compile them into a format understood by Webpack. We do this with two _loaders_:

```
module: {
    rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        ...
    ],
},
```

To output static files to the build dir, we can markt them as resources:

```
module: {
    rules: [
        ...
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
    ],
},
```

To apply our custom css, we import them in modules:

```
import '../static/styles/main.css';
```

### Bootstrap

```
 // For bootstrap, https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
{
    test: /\.(scss)$/,
    use: [
        {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
        },
        {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
        },
        {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [require('autoprefixer')];
                },
            },
        },
        {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
        },
    ],
},
```

You can import the default, static css inside the entry js file:

```
import 'bootstrap-icons/font/bootstrap-icons.css';
```

The same thing can be done with for bootstrap icons:

```
import 'bootstrap-icons/font/bootstrap-icons.css';
```

If you would like to override things or use the bootstrap sass source files,
follow the [Bootstrap with Webpack instructions](https://getbootstrap.com/docs/4.0/getting-started/webpack/)

https://stevenwestmoreland.com/2018/01/how-to-include-bootstrap-in-your-project-with-webpack.html
