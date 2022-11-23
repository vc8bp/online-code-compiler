const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const dirName = path.join(__dirname, "../", "codes")

if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName,{recursive: true});
}

const generateFile = async (ext, code) => {
    const fileName = `${uuid()}.${ext}` 
    const filePath = path.join(dirName,"bfe43f56-d9d8-4d9c-aa34-070eeec09a84.cpp");
    //await fs.appendFileSync(filePath, code)
    return filePath
}

module.exports = generateFile