const tokens = require("./tokens.js")
const utils = require("./utils.js")

const isInvalidToken = token => {
  if (tokens.discardTokens.join(" ").match(token) || token.match(utils.emojiParseRegEx)) {
    return true
  }

  return false
}

const zapinate = ({ zap, mood = "happy", rate = 0.5, strength = 3, toUpper = false }) => {
  if (Number.isInteger(strength)) {
    strength = [Math.floor(strength/2), strength]
  } else {
    strength = [1, 3]
  }

  const specific = Object.keys(tokens.specificTokens)

  let zapinated = ""

  zap.toLowerCase().split("\n").forEach(line => {
    line.replace(/\s+/g, " ").split(" ").forEach(token => {
      const originalToken = token
      token = utils.removerAcentos(token)

      const isSpecificToken = specific.includes(token)
      const isSpecificTokenPlural = specific.map(t => utils.pluralizar(t)).includes(token)

      if (!isSpecificToken && (token.length <= 2 || isInvalidToken(token))) {
        zapinated += `${token} `
        return
      }

      if (Math.random() < rate) {
        let zapStrength = strength[Math.round(Math.random())]
        let possibleEmojis
        
        if (isSpecificToken || isSpecificTokenPlural) {
          possibleEmojis = tokens.specificTokens[token]
        } else {
          possibleEmojis = tokens.moodEmojis[mood]
        }

        let chosenEmojis = utils.choices(possibleEmojis, zapStrength)
        zapinated += `${originalToken} ${chosenEmojis.join("")} `
      } else {
        zapinated += `${originalToken} `
      }
    })
  })

  if (toUpper) {
    zapinated = zapinated.toUpperCase()
  }

  return zapinated.trim()
}

module.exports = {
  zapinate,
}