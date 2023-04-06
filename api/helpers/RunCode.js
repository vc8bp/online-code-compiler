const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const codeDir = path.join(__dirname, "../", "codes")

const runCodeWithTimeout = async ({ dockerImage, command, filename }) => {
    return new Promise((resolve, reject) => {  
        const container = exec(`docker run --rm -v ${codeDir}:/code ${dockerImage} ${command}`, (error, stdout, stderr)=>{
            if (stderr) {
                reject({ success: false, message: stderr}) 
            } else if (error) {
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }

            const outPathWithFileName = path.join(codeDir, `${filename}.exe`) //this is c++ specific because it hase comiled file also which need to be deleted
            console.log(outPathWithFileName)
            if(fs.existsSync(outPathWithFileName)){
                fs.unlinkSync(outPathWithFileName, (err) => {console.log(err)})
            } 
        }) 

        timeout = setTimeout(() => {
            container.kill("SIGTERM"); // Kill the container when the timeout expires
            reject({ success: false, message: "Command failed: Timeout Error" });
        }, 10000);

        container.on("exit", () => clearTimeout(timeout)) //clear timeout if the code is runed before timeout limit
    })
}

module.exports = runCodeWithTimeout
