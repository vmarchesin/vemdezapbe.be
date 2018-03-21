"""Contains special words which are specially zapinated, or not."""

"""Tokens that shall never be zapinated. NEVER."""
discard_tokens = ["de", "que"]

"""Wordlist of special tokens"""
specific_tokens = {
  "brasil" : ["🇧🇷"], 
  "festa" : ["🎆", "🎇", "✨", "🎈", "🎉", "🎊"], 
  "top" : ["👌"], 
  "zap" : ["📞", "♣"]
}

"""list of emojis by mood"""
mood_emoji = {
  "happy": ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","☺","😛","😜","😝", "👌"],
  "angry": ["😤", "😖", "🙁", "😩", "😦", "😡", "🤬"]
}
