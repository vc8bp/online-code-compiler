const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const dirName = path.join(__dirname, "../", "codes")

if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName,{recursive: true});
}

const generateFile = async (ext, code) => {
    const fileName = `${uuid()}.${ext}` 
    console.log(`file name: ${fileName}`)
    const filePath = path.join(dirName,fileName);
    console.log(`file path: ${filePath}`)
    await fs.appendFileSync(filePath, code)
    return filePath
}

module.exports = generateFile