const generateFile = require("../helpers/generateFiles");
const fs = require("fs");
const path = require("path");
const runCodeWithTimeout = require("../helpers/RunCode");

const router = require("express").Router()



router.post("/", async (req, res) => {
  const { code, len } = req.body
  const filePath = await generateFile(len, code);
  const filename = path.basename(filePath).split(".")[0]
  let ress;

  try {
    const { dockerImage, command } = getDockerImageAndCommand(filename, len)
    ress = await runCodeWithTimeout({ dockerImage, command, filename })
  } catch (e) {
    console.log(e)
    ress = e
  }

  try {
    res.status(200).json(ress)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Failed to run ${len} code`, error });
  }

  fs.unlinkSync(filePath)
})


function getDockerImageAndCommand(filename, len) {
  let dockerImage, command;
  if (len === "py") {
    dockerImage = "dockerfiles-python";
    command = `python /code/${filename}.py`;
  } else if (len === "cpp") {
    dockerImage = "dockerfiles-cpp";
    command = `sh -c "g++ /code/${filename}.cpp -o /code/${filename}.exe && /code/${filename}.exe"`;
  } else if (len === "js") {
    dockerImage = "dockerfiles-javascript";
    command = `node /code/${filename}.js`;
  } else {
    throw new Error("Invalid language");
  }
  return { dockerImage, command };
}


module.exports = router;