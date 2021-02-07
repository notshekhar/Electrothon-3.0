const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const monk = require("monk")
require("dotenv").config()

const db = monk("localhost/electrothon")
const [users] = [db.get("users")]

const { errorHandler } = require("./serverJS/error")
const { encodeJSON, decodeJSON, MD5 } = require("./serverJS/encryption")

const app = express()

app.use(express.json({ limit: "1mb" }), cookieParser(), logger("dev"))
app.use(express.static("public"))

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to port -> ${server.address().port}`)
})
//api
app.post("/login", async (req, res, next) => {
    try {
        let { u_username, u_password } = req.body
        let user = await users.findOne({
            $and: [{ username: u_username }, { password: MD5(u_password) }],
        })
        if (!user) throw new Error("No user exist create new account")
        let { password, ...user_data } = user
        let { timestamp, name, ...token_data } = user
        res.json({ token: encodeJSON(token_data), data: user_data })
    } catch (err) {
        next(err)
    }
})
app.post("/signup", async (req, res, next) => {
    try {
        let { u_username, u_password, u_name } = req.body
        console.log(u_name, u_password, u_username)
        if (
            !(
                (u_name.length > 0) &
                (u_username.length > 0) &
                (u_password.length > 0)
            )
        )
            throw new Error("You can leave any Field Empty")
        else {
            let user = await users.findOne({ username: u_username })
            if (user) throw new Error("User Already Exist")
            else {
                let insert = await users.insert({
                    username: u_username,
                    name: u_name,
                    password: MD5(u_password),
                    timestamp: new Date(),
                })
                let { password, ...user_data } = insert
                let { timestamp, name, ...token_data } = insert
                res.json({ token: encodeJSON(token_data), data: user_data })
            }
        }
    } catch (err) {
        next(err)
    }
})
app.get("/auth", async (req, res, next) => {
    try {
        let { token } = req.query
        let { username, password } = decodeJSON(token)
        let user = await users.findOne({ $and: [{ username }, { password }] })
        if (!user) throw new Error("Auth Failed")
        else {
            res.json({ auth: true })
        }
    } catch (err) {
        next(err)
    }
})

//error handle
app.use(errorHandler)
