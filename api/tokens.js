const discardTokens = ["de", "que"]

const specificTokens = {
  "brasil" : ["🇧🇷"], 
  "festa" : ["🎆", "🎇", "✨", "🎈", "🎉", "🎊"], 
  "top" : ["👌"], 
  "zap" : ["📞", "♣"],
}

const moodEmojis = {
  "angry": ["😤", "😖", "🙁", "😩", "😦", "😡", "🤬"],
  "happy": ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","☺","😛","😜","😝", "👌"],
}

module.exports = {
  discardTokens,
  moodEmojis,
  specificTokens,
}