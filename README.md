# Simple WASM loader
This package is a simple zero-dependency `.wasm` loader for webpack. It's bundling your WebAssembly file buffers as strings into your code and returns an async function which returns a `WebAssembly.Instance`.

## Install
`npm install -S simple-wasm-loader`

## How to use
Just add this to your `webpack.config.js`:
```
{
    test: /\.wasm$/,
    type: 'javascript/auto',
    loaders: ["simple-wasm-loader"]
}
```

And then you can import `.wasm` files:

```
import squarer from "./squarer.wasm";

(async () => {
    const instance = await squarer();
    console.log(instance.exports._Z7squareri(5)); // 25
})();
```

## Why not use [wasm-loader](https://github.com/ballercat/wasm-loader)?
You can still use wasm-loader, but simple-wasm-loader just creates a WebAssembly Instance. Not more, not less. 