# vue-file-builder-loader
Merge separate .js, .html, .css... files in same directory into one .vue file.
It using `src` attr in .vue file, so support all features that vue-loader suport.

## Example:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          /* note the order of loaders is from last to first */
          {
            loader: 'vue-loader'
            options: {
              /* normal vue-loader options */
              postcss: [require('postcss-cssnext')()]
            }
          },
          { loader: 'vue-file-builder-loader' }
        ]
      }
    ]
  }
}
```

## TODOS
* support custome blocks
* use magic comments to indicate tag attr option
* support different file types, e.g. .scss...

## Contribution
All kind of issues or pull requests are welcome!
