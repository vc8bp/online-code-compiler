const generateFile = require("../helpers/generateFiles");
const runCpp = require("../helpers/runCPP");
const runPy = require("../helpers/runPy");

const router = require("express").Router()

router.post("/cpp", async (req,res) => {
    const { len = "cpp", code} = req.body;
    if(code === undefined) return res.status(400).json({success: false, message: "Code Can not be Empty"})
    const filePath = await generateFile(len, code);

    let output = "hh";

    try{
        if(len === "py")
        {
            console.log(1)
            console.log(`output from ${output   }`)
            console.log(2)
            output = await runPy(filePath)
            console.log(3)
            console.log(`output from ${output   }`)
            console.log(4)
        } else if (len === "cpp"){
            output = await runCpp(filePath);
        }

        
         res.status(200).json({
            output
        })
    }catch(e){
        res.status(404).json("hemloo", e)
    }
    

    
})

module.exports = router;