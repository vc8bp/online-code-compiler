const  {exec} = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes")

const runPy = (dir) => {
    const outFileName = path.basename(dir).split(".")[0]

    return new Promise((resolve, reject) => {
        exec(`cd ${codeDir} && python ${outFileName}.py`, (error, stdout, stderr) => {
            if (stderr) {
                reject({ success: false, message: stderr.replace(/File ".*?api\\codes\\(.*?)",/g, '') }) //This is used because i wanted to remove the pathname 
            } else if (error) {
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }
        })
    })
}


module.exports = runPy