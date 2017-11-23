# MS-MUI

Checkout [demo](https://maintstar.github.io/ms-mui/build/) 

is not precompiled, so needs to be included in build process.

```js
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: path.resolve(__dirname, "src/test"),
    include: [
      path.resolve(__dirname, "src"),
      ...
      path.resolve(__dirname, "node_modules/ms-mui"),
      path.resolve(__dirname, "node_modules/ms-form")
    ]
  }
```