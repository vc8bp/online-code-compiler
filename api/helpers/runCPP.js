const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, "output")
if(!fs.existsSync(outPath)){
    fs.mkdirSync(outPath)
}


const runCpp = async (dir) => {
    const fileName = await path.basename(dir).split('.')[0];
    console.log(`file name inside run: ${fileName}`)
    const outPath = await path.join(__dirname, "../", "output")
    console.log(`outpPth: ${outPath}`)
    const outPathWithFileName = await path.join(__dirname, "../", "output", `${fileName}.out`)
    console.log(outPathWithFileName)
    //const outPath = path.join(__dirname, `${fileName}.out`)
    return new Promise((resolve, reject) => {
        console.log(0)
        
       //exec(`g++ ${dir} -o ${outPath}/${fileName}.exe && cd ${outPath} && ${outPathWithFileName}.exe`, (error, stdout, stderr)=>{
        exec(`cd ${outPath} && ./${outPathWithFileName}.exe`, (error, stdout, stderr)=>{
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