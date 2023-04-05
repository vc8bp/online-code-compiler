const { exec } = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes")
const DockerjsImage = "dockerfiles-javascript"

const runJs = (dir) => {
    const basename = path.basename(dir)
    return new Promise((resolve, reject) => {
        const container = exec(`docker run --rm -v ${codeDir}:/code ${DockerjsImage} node /code/${basename}`, (error, stdout, stderr) => {
            if (stderr) {
                reject({ success: false, message: stderr}) 
            } else if (error) {
                reject({ success: false, message: { error, stderr } })
            } else {
                resolve({ success: true, message: stdout })
            }
        })

        // const timeout = setTimeout(() => {
        //     reject({success: false, message: "Command failed: Timeout Error"})
        // }, 10000)

        // container.on("exit", clearTimeout(timeout))
    })
}

module.exports = runJs