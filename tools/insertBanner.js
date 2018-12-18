const fs = require('fs'),
    files = process.argv.slice(2),
    bannerContent = fs.readFileSync('tools/banner.txt', 'utf-8')

const removeBannerDuplicates = function(fileContent) {
    if (fileContent.indexOf('/*!') === -1) {
        return fileContent
    }
    return removeBannerDuplicates(
        fileContent.substring(0, fileContent.indexOf('/*!')) + fileContent.substring(fileContent.indexOf(' */') + 3)
    )
}

files.forEach((file) => {
    let fileContent = fs.readFileSync(file, 'utf-8')
    fs.writeFileSync(file, bannerContent + removeBannerDuplicates(fileContent), 'utf-8')
})
