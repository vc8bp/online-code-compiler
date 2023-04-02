const  {exec} = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes")

const runPy = (dir) => {
    const outFileName = path.basename(dir).split(".")[0]

    return new Promise((resolve, reject) => {
        exec(`cd ${codeDir} && python ${outFileName}.py`, (error, stdout, stderr) => {
            if (error) {
                reject({ success: false, message: { error, stderr } })
            } else if (stderr) {
                reject({ success: false, message: stderr })
            } else {
                resolve({ success: true, message: stdout })
            }
        })
    })
}


module.exports = runPy