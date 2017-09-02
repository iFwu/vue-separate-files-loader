# vue-separate-files-loader

Load separate .js, .html, .css files under same directory as one .vue file.  
It uses `src` attr in .vue file's tag, so support all features that vue-loader suports.

> Differences between [vue-builder-webpack-plugin](https://github.com/pksunkara/vue-builder-webpack-plugin): It won't output a .vue file under your project directory, instead, it will load all files and directly output to vue-loader, so you can keep your repo cleaner😃!

## Install
```
npm install vue-separate-files-loader --save-dev
```
or
```
yarn add --dev vue-separate-files-loader
```
## Usage

Suppose you have files below:
```
├── foo
│   ├── bar.css
│   ├── foo.css
│   ├── foo.html
│   └── index.js
└── index.js
```

You can use `foo` directory as one .vue file to be imported by any other file.

### Setup webpack config
Here is a part of webpack config file to use this loader.
```js
...
module: {
  rules: [
    {
      test: /\.jsx?$/,
      /* recommended, avoid unnessary import */
      include: /foo/,
      use: [
        /* note the order of loaders is from last to first */
        {
          loader: 'vue-loader'
          options: {
            /* normal vue-loader options */
            postcss: [require('postcss-cssnext')()]
          }
        },
        { loader: 'vue-separate-files-loader' }
      ]
    }
  ]
}
...
```

## TODOS
* [ ] support custome blocks
* [ ] use magic comments to indicate tag attr option
* [ ] if module is enabled, use file name as module name
* [ ] support more file types, e.g. .scss...

## Contribution
All kind of issues or pull requests are welcome!
