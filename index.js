const tag = require('create-html-element')
// const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')
const regexes = {
  script: [/\.jsx?$/],
  style: [/\.css$/],
  template: [/\.tpl$/, /\.template$/, /\.html$/]
}
module.exports = function (content) {
  const dirPath = this.context
  // const options = loaderUtils.getOptions(this)
  const filesName = fs.readdirSync(dirPath)
  if (filesName.length === 0) {
    return
  }
  const filesCode = {}
  Object.keys(regexes).forEach(type => {
    try {
      let code = ''
      const files = filesName.filter(file => regexes[type].some(re => re.test(file)))
      if (files.length === 0) {
        return
      }
      files.forEach(file => {
        code += fs.readFileSync(path.join(dirPath, file), 'utf8')
        code += '\n'
      })
      filesCode[type] = code
    } catch (e) {
      throw e
    }
  })
  let result = ''
  Object.keys(filesCode).forEach(tagName => {
    result += tag({
      name: tagName,
      value: filesCode[tagName]
    })
  })
  // tag('script', null, )
  // tag('template', null, )
  // tag('style', null, )
  return result
}
