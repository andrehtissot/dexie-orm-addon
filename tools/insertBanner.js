const fs = require('fs'),
    files = process.argv.slice(2),
    bannerContent = fs.readFileSync('tools/banner.txt', "utf-8"),
    escapeStringRegexp = require('escape-string-regexp'),
    escapedBannerContent = escapeStringRegexp(bannerContent),
    bannerRegexp = new RegExp(escapedBannerContent.replace(/ \\\*/g, " +\\*"), 'g');

files.forEach(file => {
    let fileContent = fs.readFileSync(file, "utf-8");
    fileContent = fileContent.replace(bannerRegexp, '');
    fs.writeFileSync(file, bannerContent + fileContent, "utf-8");
});
