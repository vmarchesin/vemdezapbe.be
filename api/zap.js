const Twitter = require('twitter');
const { accents, array, regex, tokens } = require('./utils');
const { moodEmojis } = require('./tokens');
const app = require('express')();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const zapinate = ({ zap, mood = "happy", rate = 0.5, strength = 3, toUpper = false }) => {
  if (Number.isInteger(strength)) {
    strength = strength > 5 ? 5 : strength
    strength = [Math.floor(strength/2), strength]
  } else {
    strength = [1, 3]
  }

  let zapinated = ""

  zap.split("\n").forEach(line => {
    line.replace(/\s+/g, " ").split(" ").forEach(token => {
      const originalToken = token
      token = tokens.cleanToken(token.toLowerCase())

      const isFullAccentMatch = tokens.fullAccentMatchToken(token)
      const isFullMatch = !isFullAccentMatch && tokens.fullMatchToken(accents.removeAccent(token))

      if (!isFullMatch && !isFullAccentMatch && (token.length <= 2 || tokens.isInvalidToken(token))) {
        zapinated += `${originalToken} `
        return
      }

      if (Math.random() < rate) {
        let zapStrength = strength[Math.round(Math.random())]
        let possibleEmojis = tokens.getTokenMatch(isFullMatch, isFullAccentMatch, token) || moodEmojis[mood]
        let chosenEmojis = array.choices(possibleEmojis, zapStrength)
        zapinated += `${originalToken} ${chosenEmojis.join("")} `
      } else {
        zapinated += `${originalToken} `
      }
    })
    zapinated += "\n"
  })

  if (toUpper) {
    zapinated = zapinated.toUpperCase()
  }

  return zapinated.trim()
}

app.post('*', async (req, res) => {
  const xStart = Date.now();
  const data = req.body;

  let params = {}
  if (!data.zap) {
    res.send({
      error: {
        code: 10,
        message: "zap property missing",
      },
      version: 'v1.0',
    });
    return
  } else {
    Object.assign(params, { zap: data.zap });
  }

  Object.assign(params, data.mood && { mood: data.mood });
  Object.assign(params, data.rate && { rate: data.rate });
  Object.assign(params, data.strength && { strength: data.strength });

  let response = { version: 'v1.0', zap: zapinate(params) };

  if (process.env.PORT && Math.floor(Math.random() * 100 + 1) >= 99) { //self-trolled too many times
    response.gemidao = "HÃÃÃÃÃÃNNN ÕÕÕÕHH ÕÕÕÕÕÕÃHHH ÃÃÃÃÃÃÃHNN";
  }

  if (data.tweet === 'true' && (response.zap.length < 280)) {
    twitter.post("statuses/update", { status: response.zap.replace(/\@/g, "") }, (err) => {
      if (err) { console.log("[TWITTER]: ", err); }
    });
  }

  response.requestTime = `${Date.now() - xStart}ms`;

  res.send(response);
});

if (!process.env.NOW_REGION){
  app.listen();
}

module.exports = app;
