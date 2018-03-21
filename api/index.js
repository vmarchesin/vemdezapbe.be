const tokens = require("./tokens.js")
const discardTokens = tokens.discardTokens
const moodEmojis = tokens.moodEmojis
const specificTokens = tokens.specificTokens

Array.prototype.choices = function(n) {
  let choices = []

  for (let i = 0; i < n; i++) {
    choices.push(this[Math.floor(Math.random() * this.length)])
  }

  return choices
}

const zapinate = (text, mood, rate, strength) => {
  if (Number.isInteger(strength)) {
    strength = [1, strength]
  }

  let zapinated = ""

  text.toLowerCase().split("\n").forEach(line => {
    line.replace(/\s+/g, " ").split(" ").forEach(token => {
      if (token.length <= 2 || discardTokens.includes(token)) {
        zapinated += `${token} `
        return
      }

      if (Math.random() < rate) {
        let zapStrength = strength[Math.floor(Math.random() * 2)]
        let possibleEmojis
        let chosenEmoji

        if (Object.keys(specificTokens).includes(token)) {
          possibleEmojis = specificTokens[token]
        } else {
          possibleEmojis = moodEmojis[mood]
        }

        chosenEmoji = possibleEmojis.choices(zapStrength)
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