const  {exec} = require("child_process")
const path = require("path")
const codeDir = path.join(__dirname, "../", "codes")

const runPy = (dir) => {
    const outFileName = path.basename(dir).split(".")[0]

    const p = () => {
        return new Promise((resolve, reject) => {
            exec(`cd ${codeDir} && python ${outFileName}.py`, (error, stdout, stderr)=>{
            console.log("inside")
                if(error){
                    console.log("errorrrrrrr")
                    console.log(error)
                    reject({ error, stderr})
                }
                if(stderr){ 
                    console.log("stderrrrrrrrrrrrrrr")
                    console.log(stderr)
                    reject({stderr})
                }
                console.log(stdout)
                resolve({stdout})
           }) 
    
        })
    }
    
    p().then((m) => {
        console.log("inside then")
        const res = {success: true, message: m}
        return res
    }).catch((e) => {
        console.log("inside catch")
        const res = {success: false, message: e}
        return res
    })
}
module.exports = runPy