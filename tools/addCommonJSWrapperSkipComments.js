const fs = require('fs'),
    files = process.argv.slice(2)

const ignoreComment = '/* istanbul ignore next */\n'

const referenceTexts = [
    'if (typeof define === "function" && define.amd) {',
    'function _asyncToGenerator(fn)',
    'var _slicedToArray = function () {',
]

files.forEach((file) => {
    let fileContent = fs.readFileSync(file, 'utf-8')
    for (let referenceText of referenceTexts) {
        fileContent = fileContent.replace(referenceText, ignoreComment + referenceText)
    }
    fs.writeFileSync(file, fileContent, 'utf-8')
})
