const { discardTokens, matchTokens } = require('../tokens');
const { hasAccent, removeAccent } = require('./accents');
const { emojiParseRegEx } = require('./regex');


const cleanToken = text => text.replace(/[[\]{}()*+!%@?.,"'\\^$|#\s]/g, "");

const isInvalidToken = token => {
  return discardTokens.join(" ").match(token) || token.match(emojiParseRegEx);
};

const fullMatchToken = token => Object.keys(matchTokens.fullMatch).includes(token);

const fullAccentMatchToken = token => hasAccent(token)
  && Object.keys(matchTokens.accentMatch).includes(token);

const getTokenMatch = (isFullMatch, isFullAccentMatch, token) => {
  if (isFullAccentMatch) {
    return matchTokens.accentMatch[token]
  } else {
    token = removeAccent(token)
  }

  if (isFullMatch) {
    return matchTokens.fullMatch[token]
  }

  let match

  const any = matchTokens.partialMatch.any
  const matchesAny = Object.keys(any).some(t => {
    if (new RegExp(`\\w*${t}\\w*`, "iu").test(token)) {
      match = t
      return true
    }
  })

  if (matchesAny) {
    return any[match]
  }

  const prefix = matchTokens.partialMatch.prefix
  const matchesPrefix = Object.keys(prefix).some(t => {
    if (new RegExp(`^${t}\\w*`, "iu").test(token)) {
      match = t
      return true
    }
  })

  if (matchesPrefix) {
    return prefix[match]
  }

  return false
};

module.exports = {
  cleanToken,
  isInvalidToken,
  fullMatchToken,
  fullAccentMatchToken,
  getTokenMatch,
};
