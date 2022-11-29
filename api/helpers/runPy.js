const  {exec} = require("child_process")
const path = require("path")


const { v4: uuid } = require('uuid')
const codeDir = path.join(__dirname, "../", "codes")

const runPy = async (dir) => {
    const outFileName = await path.basename(dir).split(".")[0]
    //return new Promise((resolve, reject) => {
        console.log()
        await exec(`cd ${codeDir} && python ${outFileName}.py`, (error, stdout, stderr)=>{
        console.log("inside")
            if(error){
                console.log("errorrrrrrr")
                //console.log(error)
                return error
                //reject({ error, stderr})
            }
            if(stderr){ 
                console.log("stderrrrrrrrrrrrrrr")
                //console.log(stderr)
                return stderr
                //reject({stderr})
            }
            console.log(stdout)
            return stdout
       }) 

   // })
}
module.exports = runPy