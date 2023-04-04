const  {exec} = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes") // E:\webProjects\react\onlineCodeCompiler\api\codes
const imageName = "dockerfiles-python"


const runPy = (dir) => {
    console.log(dir) 
    const outFileName = path.basename(dir) 
    return new Promise((resolve, reject) => {
        exec(`docker run --rm -v ${codeDir}:/code ${imageName} python /code/${outFileName}`, (error, stdout, stderr) => {
            if (stderr) {
                reject({ success: false, message: stderr}) 
            } else if (error) {
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }
        })
    })
}


module.exports = runPy
