const { exec } = require('child_process')
const { urlencoded } = require('express')
const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, "../" ,"output")
console.lo
if(!fs.existsSync(outPath)){
    fs.mkdirSync(outPath)
}

const runCpp = async (dir) => {
    const fileName = await path.basename(dir).split('.')[0];
    const outPathWithFileName = await path.join(outPath, `${fileName}.exe`)
    console.log(outPathWithFileName)
    return new Promise((resolve, reject) => {  
        exec(`g++ ${dir} -o ${outPathWithFileName} && cd ${outPath} && ${fileName}.exe`, (error, stdout, stderr)=>{
            if (stderr) {
                reject({ success: false, message: stderr}) 
            } else if (error) {
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }

            // Delete the compiled executable file
            if(fs.existsSync(outPathWithFileName)){
                fs.unlinkSync(outPathWithFileName, (err) => {console.log(err)})
            }
        }) 
    })

}

module.exports = runCpp
