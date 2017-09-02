const loaderRunner = require("loader-runner")
const runLoaders = loaderRunner.runLoaders
const path = require('path')
const fs = require('fs')
runLoaders({
   resource: path.join(__dirname, 'foo/index.js'),
   // String: Absolute path to the resource (optionally including query string)

   loaders: [path.resolve(__dirname, '../')],
   // String[]: Absolute paths to the loaders (optionally including query string)
   // {loader, options}[]: Absolute paths to the loaders with options object

   context: { minimize: true },
   // Additional loader context which is used as base context

   readResource: fs.readFile.bind(fs)
   // A function to read the resource
   // Must have signature function(path, function(err, buffer))

}, function(err, result) {
   // err: Error?

   // result.result: Buffer | String
   // The result
  if (err) {
    throw err
  }
  console.log(result.result)

   // result.resourceBuffer: Buffer
   // The raw resource as Buffer (useful for SourceMaps)

   // result.cacheable: Bool
   // Is the result cacheable or do it require reexecution?

   // result.fileDependencies: String[]
   // An array of paths (files) on which the result depends on

   // result.contextDependencies: String[]
   // An array of paths (directories) on which the result depends on
})