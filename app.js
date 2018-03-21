const express = require("express")
const fs = require("fs")
const api = require("./api/index.js")
const bodyParser = require("body-parser")
const version = fs.readFileSync(`${__dirname}/api/VERSION`, "utf-8")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/home.html`)
})

app.get("/api", (req, res) => {
  res.send({ version })
})

app.post(`/api/${version}`, (req, res) => {
  const data = req.body
  let response = {
    zap: api.zapinate(data.zap, data.mood || "happy", data.rate || 0.5, data.strength || 3)
  }
  res.send(response)
})

app.listen(3000, function () {
  console.log("Zapinating on port 3000!")
})