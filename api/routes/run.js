const generateFile = require("../helpers/generateFiles");
const runCpp = require("../helpers/runCPP");
const runPy = require("../helpers/runPy");
const { exec } = require('child_process');

const router = require("express").Router()

router.post("/cpp", async (req,res) => {
    const { len = "cpp", code} = req.body;
    if(code === undefined) return res.status(400).json({success: false, message: "Code Can not be Empty"})
    console.log(-1)
    const filePath = await generateFile(len, code);
    console.log(0)
    let output = "hh";


    // const p = new Promise((resolve,reject) => {
    //     const data = runPy(filePath)
    //     console.log("runPy done")
    //     resolve(data)
    // })
    // p.then((message) => {
    //     console.log("message")
    //     console.log(message)
    //     return res.status(200).json({
    //         message    
    //     })
    // })

    // const test = () => {
    //     return new Promise((resolve, reject) => {
    //         const data = runPy(filePath)
    //         console.log("data runed")
    //         resolve(data)
    //     })
    // }
    // test().then((m) => {
    //     console.log("mm")
    //     console.log(m)
    //     return res.status(200).json({
    //         m    
    //     })
    // })

            // console.log(1)
            // console.log(`output from ${output   }`)
            // console.log(2)
            
            // console.log(3)
            // console.log(`data from ${data   }`)
            // console.log(`output from ${output   }`)
            // console.log(4)
        
            // res.status(200).json({
            //     data    
            // })
    

    
})

router.post("/run", async (req,res) => {
    const {code } = req.body
    

    const { exec } = require('child_process');

    const runCppInDocker = async (code) => {
        // Create a temporary directory to store the C++ code
        const tempDir = `/tmp/cpp-${Date.now()}`;
        try {
          await exec(`mkdir ${tempDir}`);
        } catch (error) {
          throw error;
        }
      
        // Write the C++ code to a file in the temporary directory
        const codeFile = `${tempDir}/main.cpp`;
        try {
          await exec(`echo "${code}" > ${codeFile}`);
        } catch (error) {
          throw error;
        }
      
        // Run the C++ code in a Docker container
        try {
          const { stdout, stderr } = await exec(`docker run -v ${tempDir}:/app -w /app g++ main.cpp -o main && docker run -v ${tempDir}:/app -w /app ./main`);
          if (stderr) {
            throw stderr;
          }
          return stdout;
        } catch (error) {
          throw error;
        }
      };

    
    try {
        const result = await runCppInDocker(req.body.code);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to run C++ code', error });
    }
})

module.exports = router;