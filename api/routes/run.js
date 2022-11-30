const generateFile = require("../helpers/generateFiles");
const runCpp = require("../helpers/runCPP");
const runPy = require("../helpers/runPy");

const router = require("express").Router()

router.post("/cpp", async (req,res) => {
    const { len = "cpp", code} = req.body;
    if(code === undefined) return res.status(400).json({success: false, message: "Code Can not be Empty"})
    console.log(-1)
    const filePath = await generateFile(len, code);
    console.log(0)
    let output = "hh";

    const p = new Promise((resolve,reject) => {
        const data = runPy(filePath)
        resolve(data)
    })
    p.then((message) => {
        console.log("message")
        console.log(message)
        return res.status(200).json({
            message    
        })
    })

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

module.exports = router;