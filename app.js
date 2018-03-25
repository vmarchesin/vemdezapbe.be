const express = require("express")
const fs = require("fs")
const api = require(`${__dirname}/api`)
const bodyParser = require("body-parser")
const version = fs.readFileSync(`${__dirname}/api/VERSION`, "utf-8")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

app.use("/favicon.ico", express.static(`${__dirname}/public/images/favicon.ico`))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/home.html`)
})

app.get("/api", (req, res) => {
  res.send({ version })
})

app.post(`/api/${version}`, (req, res) => {
  const xStart = Date.now()
  const data = req.body
  let params = {}
  if (!data.zap) {
    res.send({ error: { code: 10, message: "zap property missing" }, version })
    return
  } else {
    Object.assign(params, { zap: data.zap })
  }

  Object.assign(params, data.mood && { mood: data.mood })
  Object.assign(params, data.rate && { rate: data.rate })
  Object.assign(params, data.strength && { strength: data.strength })
  
  let response = { version, zap: api.zapinate(params) }
  if (Math.floor(Math.random() * 100 + 1 ) >= 99) {
    response.gemidao = "HÃÃÃÃÃÃNNN ÕÕÕÕHH ÕÕÕÕÕÕÃHHH ÃÃÃÃÃÃÃHNN"
  }
  
  response.requestTime = `${Date.now() - xStart}ms`

  res.send(response)
})

const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log(`Zapinating on port ${port}!`)
})