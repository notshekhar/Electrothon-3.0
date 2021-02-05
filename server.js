const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
require("dotenv").config()

const { errorHandler } = require("./serverJS/error")

const app = express()

app.use(express.json({ limit: "1mb" }), cookieParser(), logger("dev"))
app.use(express.static("public"))

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to port -> ${server.address().port}`)
})
//api


//error handle
app.use(errorHandler)
