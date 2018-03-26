/** We will need this
*   http://unicode.org/emoji/charts/full-emoji-list.html
*   http://www.palavras.net/
*/

const discardTokens = [ "ainda", "antes", "apenas", "apesar", "assim", "até", "cada", "como", "conforme", "consoante", "contudo", "depois", "desde", "embora", "enquanto", "entanto", "então", "entretanto", "isso", "logo", "mais", "mal", "maneira", "mas", "medida", "menos", "mesmo", "modo", "não", "nem", "nem", "no", "obstante", "ora", "ou", "para", "passo", "pois", "pois", "por", "por", "porém", "porque", "portanto", "posto", "proporção", "qual", "quando", "quanto", "que", "salvo", "segundo", "sem", "sempre", "ser", "também", "todas", "todavia", "uma", "vez", "vezes",  ]

const matchTokens = {
  fullMatch: {
    "aff": ["🙄"],
    "amo": ["😍", "😻", "😘", "😗", "😙", "😚", "💘	", "❤", "💓", "💕", "💖", "💖"],
    "amor": ["😍", "😻", "😘", "😗", "😙", "😚", "💘	", "❤", "💓", "💕", "💖", "💖"],
    "banheira": ["🛁"],
    "banheiro": ["🚽"],
    "banho": ["🚿", "🛁"],
    "basquete": ["🏀"],
    "bem": ["☺"],
    "bolsa": ["👜", "👝"],
    "bolsonaro": ["🚫🏳️‍🌈", "🔫"],
    "bravo": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
    "carro": ["🚐"],
    "caso": ["💑"],
    "celular": ["📱"],
    "chama": ["📞", "☎"],
    "chef": ["👨‍🍳", "👩‍🍳"],
    "coracao": ["💘	", "❤", "💓", "💕", "💖", "💖"],
    "dado": ["🎲"],
    "data": ["📅", "🗓"],
    "deus": ["👼", "😇", "🙏", "🙏🙏"],
    "dinheiro": ["💳", "💵", "💰", "💲"],
    "feliz": ["😀", "😁", "😃", "😄", "😊", "🙂", "☺"],
    "fim": ["🙅‍♂️", "🙅‍♀️"],
    "futebol": ["⚽"],
    "já": ["⏰"],
    "justiça": ["⚖", "👨‍⚖️"],
    "nao": ["⛔", "🚫", "🛑", "✋", "✋🛑", "⚠"],
    "ok": ["👌"],
    "pabblo": ["👩", "🏳️‍🌈👩"],
    "pabllo": ["👩", "🏳️‍🌈👩"],
    "parabens": ["🎈", "🎉", "🎊", "👏"],
    "policia": ["🚨", "🚔", "🚓", "👮‍♂️", "👮‍♀️", "🔫"],
    "puto": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
    "quer": ["😏"],
    "sai": ["🚫", "⛔"],
    "sera": ["🤨", "🤔", "🧐"],
    "soco": ["🥊"],
    "sono": ["💤"],
    "susto": ["😱", "🎃"],
    "tiro": ["🔫"],
    "top": ["😂👌", "👌", "🔝"],
    "topper": ["😂👌", "👌", "🔝"],
    "ve": ["👀", "👁"],
    "vem": ["🚐", "🏎"],
    "ver": ["👀👀", "👀"],
    "volei": ["🏐"],
    "zap": ["📞", "♣"],
  },
  partialMatch: {
    any: {
      "brasil": ["🇧🇷"], 
      "doid": ["🤪"],
    },
    prefix: {
      "alun": ["👨‍🎓", "👩‍🎓"],
      "anjo": ["😇"],
      "assust": ["😱", "🎃"],
      "chave": ["🔑", "🗝"],
      "computa": ["💻", "🖥", "🖱⌨", "💾"],
      "cozinh": ["👨‍🍳", "👩‍🍳"],
      "desculpa": ["😅"],
      "doen": ["😷", "🤒", "🤕", "🤢", "🤮", "🤧"],
      "fest": ["🎆", "🎇", "✨", "🎈", "🎉", "🎊"],
      "fode": ["👉👌"],
      "fude": ["👉👌", "🔞"],
      "fuma": ["🚬", "🚭"],
      "hospital": ["👨‍⚕️", "⚕", "🚑"],
      "juiz": ["👨‍⚖️", "👩‍⚖️", "⚖"],
      "louc": ["🤪"],
      "medic": ["👨‍⚕️", "👩‍⚕️", "⚕"],
      "mentir": ["🤥", "🤫"],
      "musica": ["🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎼", "🎵", "🎶", "🎤"],
      "ouv": ["👂"],
      "pistol": ["🔫"],
      "professor": ["👨‍🏫", "👩‍🏫"],
      "querid": ["☺"],
      "telefo": ["📱", "📞", "☎"],
      "trist": ["☹", "🙁", "😖", "😞", "😟", "😢", "😭", "😭", "😭", "😩", "😿"],
      "vergonh": ["😳"],
      "vist": ["👀"],
    },
  },
}

const moodEmojis = {
  "angry": ["😤","😤💦","😖","🙁","😩","😦","😡","🤬","💣","💢","✋🛑","☠"],
  "happy": ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","☺","😛","😜","😝","👌"],
  "sad": ["☹","🙁","😖","😞","😟","😢","😭","😭","😭","😩","😿"],
  "sassy": ["😉","😎","😋","😘","😏","😜","😈","😻","🙊","👉👌","😼"],
  "sick": ["😷", "🤒", "🤕", "🤢", "🤮", "🤧"],
}

module.exports = {
  discardTokens,
  matchTokens,
  moodEmojis,
}
