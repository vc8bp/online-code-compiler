const express = require("express")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.port || 5000

app.get("/",(req, res) => {
    res.send("hemloo")
})

app.use("/run", require("./routes/run"))
app.listen(port, () => {
    console.log(`server Running on port : ${port}`)
})