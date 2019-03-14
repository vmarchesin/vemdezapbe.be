/** We will need this
*   http://unicode.org/emoji/charts/full-emoji-list.html
*   http://www.palavras.net/
*/
const discardTokens = require('./discard.js');
const matchTokens = require('./match.js');
const moodEmojis = require('./mood.js');

module.exports = {
  discardTokens,
  matchTokens,
  moodEmojis,
}