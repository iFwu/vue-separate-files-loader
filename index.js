const tag = require('create-html-element')
// const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')
const regexes = {
  script: [/\.jsx?$/],
  style: [/\.css$/, /\.s(a|c)ss$/, /\.stylus$/],
  template: [/\.tpl$/, /\.template$/, /\.html$/]
}
module.exports = function (content) {
  const dirPath = this.context
  // const options = loaderUtils.getOptions(this)
  const filesName = fs.readdirSync(dirPath)
  if (filesName.length === 0) {
    return
  }
  const tags = []
  Object.keys(regexes).forEach(type => {
    try {
      let code = []
      const files = filesName.filter(file => regexes[type].some(re => re.test(file)))
      if (files.length === 0) {
        return
      }
      if (type === 'script' || type === 'template') {
        if (files.length > 1) {
          throw new Error('script and template file must not be over 1')
        }
      }
      files.forEach(file => {
        tags.push(tag({
          name: type,
          value: '' ,
          attributes: {
            src: path.join(dirPath, file)
          }
        }))
      })
    } catch (e) {
      throw e
    }
  })
  return tags.join('')
}
