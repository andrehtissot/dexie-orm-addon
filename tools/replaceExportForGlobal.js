const fs = require('fs'),
    files = process.argv.slice(2)

files.forEach((file) => {
    let fileContent = fs.readFileSync(file, 'utf-8')
    fileContent = fileContent.replace(' = mod.exports;', ' = mod.exports.default;')
    fs.writeFileSync(file, fileContent, 'utf-8')
})
