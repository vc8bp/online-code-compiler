const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const dirName = path.join(__dirname, "../", "codes")

if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName,{recursive: true});
}

const generateFile = async (ext, code) => {
    const fileName = `${uuid()}.${ext}` 
    const filePath = path.join(dirName,fileName);
    await fs.appendFileSync(filePath, code)
    return filePath
}

module.exports = generateFile