const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const Twitter = require('twitter')
const request = require("request")

const api = require(`${__dirname}/api`)
const apiUtils = require(`${__dirname}/api/utils`)
const version = fs.readFileSync(`${__dirname}/api/VERSION`, "utf-8")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const tweetInterval = (30 * 60 * 1000) / 50 /* 50 tweets per 30m in ms */
let canTweet = true
let tweetQueue = []

setInterval(() => {
  console.log("canTweet: ", canTweet)
  console.log("Tweets remaining: ", tweetQueue.length)
  if (tweetQueue.length) {
    const tweet = tweetQueue.splice(Math.floor(Math.random() * tweetQueue.length), 1)[0]
    twitter.post("statuses/update", { status: tweet }, (err, tweet, response) => {
      if (err) {
        console.log(err)
        tweetQueue.push(tweet)
      } else {
        console.log("Posted to Twitter")
      }
    })
  } else {
    canTweet = true
  }
}, tweetInterval)

app.use("/favicon.ico", express.static(`${__dirname}/public/images/favicon.ico`))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/home.html`)
})

app.get("/api", (req, res) => {
  res.send({ version })
})

app.post(`/api/${version}/zap`, (req, res) => {
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

  if (process.env.PORT && Math.floor(Math.random() * 100 + 1) >= 99) { //self-trolled too many times
    response.gemidao = "HÃÃÃÃÃÃNNN ÕÕÕÕHH ÕÕÕÕÕÕÃHHH ÃÃÃÃÃÃÃHNN"
  }

  const validTweet = data.tweet === "true" && (response.zap.length < 280)
  const validRate = data.rate === undefined || Number(data.rate) >= 0.3

  if (canTweet && validTweet && validRate) {
    canTweet = false
    const tweet = response.zap.replace(/\@/g, "")
    twitter.post("statuses/update", { status: tweet }, (err, tweet, response) => {
      if (err) {
        console.log("TWITTER ERROR: ", err)
      } else {
        console.log("Posted to Twitter")
      }
    })
  } else if (validTweet && validRate) {
    tweetQueue.push(response.zap.replace(/\@/g, ""))
  }

  console.log(`ZAP ${data.tweet === "true" ? "COM POST" : "SEM POST"}`)
  // console.log(data.zap)

  response.requestTime = `${Date.now() - xStart}ms`

  res.send(response)
})

const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log(`Zapinating on port ${port}!`)
})
