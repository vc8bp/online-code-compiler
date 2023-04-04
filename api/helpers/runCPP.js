const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const codeDir = path.join(__dirname, "../", "codes")
const DockerjsImage = "dockerfiles-cpp"

const runCpp = async (dir) => {
    const fileName = await path.basename(dir).split('.')[0];
    const outPathWithFileName = await path.join(dir, `${fileName}.exe`)
    console.log(outPathWithFileName)
    return new Promise((resolve, reject) => {  
        exec(`docker run --rm -v ${codeDir}:/code ${DockerjsImage} sh -c "g++ /code/${fileName}.cpp -o /code/${fileName}.exe && /code/${fileName}.exe"`, (error, stdout, stderr)=>{
            if (stderr) {
                reject({ success: false, message: stderr}) 
            } else if (error) {
                console.log(error)
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }
        }) 
    })

}

module.exports = runCpp
