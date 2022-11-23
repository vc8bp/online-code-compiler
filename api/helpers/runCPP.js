const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, "output")
if(!fs.existsSync(outPath)){
    fs.mkdirSync(outPath)
}


const runCpp = (dir) => {
    const fileName = path.basename(dir).split('.')[0];
    const outPath = path.join(__dirname, "output")
    const outPathWithFileName = path.join(__dirname, "output", `${fileName}.out`)
    console.log(outPath)
    //const outPath = path.join(__dirname, `${fileName}.out`)
    return new Promise((resolve, reject) => {
        console.log(0)
        
       exec(`g++ ${dir} -o ${outPath} && cd ${outPath} && ./${outPathWithFileName}.out`, (error, stdout, stderr)=>{
        console.log(1)
            if(error){
                console.log("error")
                console.log(error)
                reject({ error, stderr})
            }
            if(stderr){
                console.log("stderr")
                console.log(stderr)
                reject({stderr})
            }
            console.log(stdout)
            resolve(stdout)
       }) 

    })
}

module.exports = runCpp