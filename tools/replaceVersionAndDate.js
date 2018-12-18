const fs = require('fs'),
    files = process.argv.slice(2),
    version = require('../package.json').version

files.forEach((file) => {
    let fileContent = fs.readFileSync(file, 'utf-8')
    fileContent = fileContent.replace(/{version}/g, version).replace(/{date}/g, new Date().toDateString())
    fs.writeFileSync(file, fileContent, 'utf-8')
})
