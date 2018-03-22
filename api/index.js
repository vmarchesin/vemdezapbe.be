const tokens = require("./tokens.js")
const utils = require("./utils.js")

const isInvalidToken = token => {
  if (tokens.discardTokens.join(" ").match(token) || token.match(utils.emojiParseRegEx)) {
    return true
  }

  return false
}

const zapinate = ({ zap, mood = "happy", rate = 0.5, strength = 3 }) => {
  if (Number.isInteger(strength)) {
    strength = [Math.floor(strength/2), strength]
  }

  const specific = Object.keys(tokens.specificTokens)

  let zapinated = ""

  zap.toLowerCase().split("\n").forEach(line => {
    line.replace(/\s+/g, " ").split(" ").forEach(token => {
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
        let chosenEmoji
        
        if (isSpecificToken || isSpecificTokenPlural) {
          possibleEmojis = tokens.specificTokens[token]
        } else {
          possibleEmojis = tokens.moodEmojis[mood]
        }

        chosenEmoji = utils.choices(possibleEmojis, zapStrength)
        zapinated += `${token} ${chosenEmoji.join("")} `
      } else {
        zapinated += `${token} `
      }
    })
  })

  return zapinated.toUpperCase().trim()
}

module.exports = {
  zapinate,
}