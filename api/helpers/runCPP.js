const { exec } = require('child_process')
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
                const regex = /[a-zA-Z]:\\(?:[a-zA-Z0-9_-]+\\)*([a-zA-Z0-9_-]+\.[a-zA-Z]{1,})/g; //regex to match this pattern 'E:\webProjects\react\onlineCodeCompiler\api\codes\ec2468d8-b89b-4465-bd5c-6ec6df038009.cpp'
                reject({ success: false, message: stderr.replace(regex, "")}) 
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
