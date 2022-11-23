const generateFile = require("../helpers/generateFiles");
const runCpp = require("../helpers/runCPP");

const router = require("express").Router()

router.post("/cpp", async (req,res) => {
    const { len = "cpp", code} = req.body;
    if(code === undefined) return res.status(400).json({success: false, message: "Code Can not be Empty"})
    const filePath = await generateFile(len, code);
    const output = await runCpp(filePath);
    res.status(200).json({
        output
    })
    
})

module.exports = router;