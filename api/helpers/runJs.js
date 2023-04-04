const { exec } = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes")
const DockerjsImage = "dockerfile-javascript"

const runJs = (dir) => {
    const basename = path.basename(dir)
    return new Promise((resolve, reject) => {
        exec(`docker run --rm -v ${codeDir}:/code ${DockerjsImage} node /code/${basename}`, (error, stdout, stderr) => {
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

module.exports = runJs