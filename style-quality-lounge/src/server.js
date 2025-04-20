const express = require("express")
const port = 5555
let app = express()


app.listen(5555,() => {
    console.log(`Server is litening at ${port}`)
})

app.get('/',(req,res) => {
    res.send("<h1>DigitalServer Working</h1>")
})