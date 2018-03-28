/** We will need this
*   http://unicode.org/emoji/charts/full-emoji-list.html
*   http://www.palavras.net/
*/

const discardTokens = [ "ainda", "antes", "apenas", "apesar", "assim", "até", "cada", "como", "conforme", "consoante", "contudo", "depois", "desde", "embora", "enquanto", "entanto", "então", "entretanto", "isso", "logo", "mais", "mal", "maneira", "mas", "medida", "menos", "mesmo", "modo", "não", "nem", "nem", "no", "obstante", "ora", "ou", "para", "passo", "pois", "pois", "por", "por", "porém", "porque", "portanto", "posto", "proporção", "qual", "quando", "quanto", "que", "salvo", "segundo", "sem", "sempre", "ser", "também", "todas", "todavia", "uma", "vez", "vezes",  ]

const matchTokens = {
  fullMatch: {
    "100": ["💯"],
    "alface": ["🥗"],
    "alvo": ["🎯"],
    "amo": ["😍", "😻", "😘", "😗", "😙", "😚", "💘	", "❤", "💓", "💕", "💖", "💖"],
    "amor": ["😍", "😻", "😘", "😗", "😙", "😚", "💘	", "❤", "💓", "💕", "💖", "💖"],
    "ap": ["🏢"],
    "ape": ["🏢"],
    "apice": ["🔝", "🏔", "⛰", "🗻"],
    "arma": ["🔫", "🔪", "💣💥"],
    "avalanche": ["🏔", "❄", "☃"],
    "banheira": ["🛁"],
    "banheiro": ["🚽"],
    "banho": ["🚿", "🛁", "🧖‍♂️", "🧖‍♀️"],
    "bar": ["🍺", "🍻", "🥃", "🍾", "🤮"],
    "beber": ["🍺", "🍻", "🥃", "🍾", "🤮"],
    "bem": ["☺"],
    "boa": ["🤙"],
    "bolsa": ["👜", "👝"],
    "bravo": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
    "bumbum": ["😮", "😏"],
    "carro": ["🚐", "🚗"],
    "casa": ["😋"],
    "caso": ["💑"],
    "celular": ["📱"],
    "cerebro": ["🧠", "💭"],
    "chama": ["📞", "☎"],
    "chef": ["👨‍🍳", "👩‍🍳"],
    "ciencia": ["👩‍🔬", "👨‍🔬", "⚗", "🔬", "🔭", "📡"],
    "classe": ["📚", "📘"],
    "consciencia": ["🧠", "💭"],
    "coracao": ["💘	", "❤", "💓", "💕", "💖", "💖"],
    "corra": ["🏃"],
    "corre": ["🏃"],
    "croissant": ["🥐"],
    "dado": ["🎲"],
    "data": ["📅", "🗓"],
    "dinheiro": ["💳", "💵", "💰", "💲"],
    "embuste": ["😭", "🤢", "💥", "😘", "😜"],
    "escola": ["👨‍🎓", "👩‍🎓", "📚", "📘", "🏫"],
    "faculdade": ["👨‍🎓", "👩‍🎓", "📚", "📘"],
    "feio": ["😛"],
    "feia": ["😛"],
    "fora": ["👉"],
    "fim": ["🙅‍♂️", "🙅‍♀️"],
    "já": ["⏰"],
    "internet": ["🌐"],
    "madame": ["🌹"],
    "marcial": ["💪"],
    "marciais": ["💪"],
    "mente": ["🧠", "💭"],
    "moca": ["🌹"],
    "mundo": ["🌍"],
    "nada": ["😮"],
    "nao": ["⛔", "🚫", "🛑", "✋", "✋🛑", "⚠"],
    "oi": ["😏", "😉"],
    "ok": ["👌"],
    "papo": ["💬"],
    "parabens": ["🎈", "🎉", "🎊", "👏"],
    "pc": ["💻", "🖥", "🖱⌨", "💾", "👨‍💻", "👩‍💻"],
    "planeta": ["🌍"],
    "preco": ["💳", "💵", "💰", "💲"],
    "princesa": ["👸"],
    "principe": ["🤴"],
    "quer": ["😏"],
    "raio": ["⚡"],
    "ri": ["😅", "😂", "🤣"],
    "rir": ["😅", "😂", "🤣"],
    "risada": ["😅", "😂", "🤣"],
    "riso": ["😅", "😂", "🤣"],
    "rola": ["😒", "😝", "👉👌"],
    "sai": ["🚫", "⛔"],
    "saliente": ["😋"],
    "secreto": ["🕵️‍"],
    "sera": ["🤨", "🤔", "🧐"],
    "sexo": ["😆", "👉👌"],
    "soco": ["🥊"],
    "sono": ["💤"],
    "sos": ["🆘"],
    "susto": ["😱", "🎃"],
    "terra": ["🌍"],
    "tesao": ["🌚"],
    "tiro": ["🔫"],
    "tomar": ["🍺", "🍻"],
    "topo": ["🔝", "🏔", "⛰", "🗻"],
    "ve": ["👀", "👁"],
    "vem": ["🚐", "🏎"],
    "ver": ["👀👀", "👀"],
    "voce": ["👉"],
    "zap": ["📞", "♣"],
    "zumbi": ["🧟‍♂️", "🧟‍♀️"],
    /* Abreviações/Girias */
    "aff": ["🙄"],
    "bb": ["👶", "😍", "😂", "🤑", "😜"],
    "caraio": ["😜", "😩", "😖", "☹", "😛", "😏", "😞"],
    "caralho": ["😜", "😩", "😖", "☹", "😛", "😏", "😞"],
    "escroto": ["👺", "👹", "👿"],
    "lol": ["😅", "😂", "🤣"],
    "mozao": ["💘	", "❤", "💓", "💕", "💖", "💖"],
    "top": ["😂👌", "👌", "🔝", "🤩"],
    "topper": ["😂👌", "👌", "🔝", "🤩"],
    "topperson": ["😂👌", "👌", "🔝", "😛", "🤩"],
    "uau": ["😋"],
    "wow": ["😋"],
    /* Comidas */
    "abacate": ["🥑"],
    "amendoim": ["🥜"],
    "bacon": ["🥓"],
    "batata": ["🍟", "🥔"],
    "berinjela": ["🍆"],
    "biscoito": ["🍪"],
    "bolacha": ["🍪"],
    "brocolis": ["🥦"],
    "castanha": ["🌰"],
    "cenoura": ["🥕"],
    "cerveja": ["🍺", "🍻"],
    "cogumelo": ["🍄"],
    "doce": ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
    "ovo": ["🥚", "🍳"],
    "pepino": ["🥒"],
    "pizza": ["🍕"],
    "pretzel": ["🥨"],
    "salada": ["🥗"],
    "sanduiche": ["🥪"],
    "sushi": ["🍣", "🍙", "🍱", "🍘"],
    "trato": ["🤝"],
    /* Empresas */
    "aliexpress": ["🇨🇳"],
    "donalds": ["🍔🍟"],
    "globo": ["🌍"],
    "mcdonalds": ["🍔🍟"],
    "sedex": ["📦", "📬"],
    /* Esportes */
    "basquete": ["🏀"],
    "futebol": ["⚽"],
    "volei": ["🏐"],
    /* Signos */
    "aries": ["♈"],
    "touro": ["♉"],
    "gemeos": ["♊"],
    "cancer": ["♋"],
    "leao": ["♌"],
    "virgem": ["♍"],
    "libra": ["♎"],
    "escorpiao": ["♏"],
    "sagitario": ["♐"],
    "capricornio": ["♑"],
    "aquario": ["♒"],
    "peixes": ["♓"],
    /* Personagens */
    "bolsonaro": ["🚫🏳️‍🌈", "🔫"],
    "lula": ["💰", "🏢", "🦑"],
    "mario": ["🍄"],
    "neymar": ["😍"],
    "noel": ["🎅"],
    "pabblo": ["👩", "🏳️‍🌈👩"],
    "pabbllo": ["👩", "🏳️‍🌈👩"],
    "pabllo": ["👩", "🏳️‍🌈👩"],
    "temer": ["🧛‍♂️", "🚫"],
    "vittar": ["👩", "🏳️‍🌈👩"],
  },
  partialMatch: {
    any: {
      "brasil": ["🇧🇷"],
      "cabel": ["💇‍♂️", "💇‍♀️"],
      "deus": ["👼", "😇", "🙏", "🙏🙏"],
      "doid": ["🤪"],
      "fuma": ["🚬", "🚭"],
      "piment": ["🌶"],
      "mort": ["☠", "💀", "⚰", "👻"],
    },
    prefix: {
      "abrac": ["🤗"],
      "alema": ["🇩🇪"],
      "alun": ["👨‍🎓", "👩‍🎓"],
      "anjo": ["😇"],
      "armad": ["🔫", "🔪", "💣💥"],
      "arte": ["🖌"],
      "assust": ["😱", "🎃"],
      "ataq": ["💣", "🔫"],
      "atenc": ["👀"],
      "bunda": ["😮", "😏"],
      "cachorr": ["🐶"],
      "calad": ["🤐"],
      "casad": ["💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨"],
      "chave": ["🔑", "🗝"],
      "cheir": ["👃"],
      "combat": ["💣", "🔫", "🎖", "💪"],
      "computa": ["💻", "🖥", "🖱⌨", "💾", "👨‍💻", "👩‍💻"],
      "comun": ["🇷🇺"],
      "combin": ["🤝"],
      "condec": ["🎖"],
      "conhec": ["🧠", "💭"],
      "content": ["😀", "😁", "😃", "😄", "😊", "🙂", "☺"],
      "correr": ["🏃"],
      "corrid": ["🏃"],
      "danca": ["💃", "🕺"],
      "dance": ["💃", "🕺"],
      "desculpa": ["😅"],
      "docei": ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
      "doen": ["😷", "🤒", "🤕", "🤢", "🤮", "🤧"],
      "enjo": ["🤢", "🤮"],
      "espia": ["🕵️‍"],
      "espio": ["🕵️‍"],
      "europ": ["🇪🇺"],
      "exercito": ["🎖"],
      "familia": ["👨‍👩‍👧‍👦"],
      "feli": ["😀", "😁", "😃", "😄", "😊", "🙂", "☺"],
      "fest": ["🎆", "🎇", "✨", "🎈", "🎉", "🎊"],
      "gat": ["😏", "👌", "😽","😻"],
      "goz": ["💦"],
      "guerr": ["💣", "🔫", "🎖"],
      "hora": ["⌚", "⏲", "🕛"],
      "hospita": ["👨‍⚕️", "⚕", "🚑"],
      "imediat": ["⌚", "⏳", "🕛"],
      "invest": ["💳", "💵", "💰", "💲"],
      "justic": ["⚖", "👨‍⚖️"],
      "louc": ["🤪", "😩", "😢", "😰"],
      "louv": ["👼", "😇", "🙏", "🙏🙏"],
      "mao": ["🖐", "🖐"],
      "maneir": ["🔝"],
      "mentir": ["🤥", "🤫"],
      "militar": ["🎖"],
      "miste": ["🕵️‍"],
      "monitor": ["🖥"],
      "morre": ["☠", "💀", "⚰", "👻"],
      "morri": ["☠", "💀", "⚰", "👻"],
      "musica": ["🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎼", "🎵", "🎶", "🎤"],
      "olh": ["👀"],
      "ouv": ["👂"],
      "palavr": ["✏", "✒", "🖋", "📝", "💬"],
      "palhac": ["🤡"],
      "palma": ["👏"],
      "paulista": ["🏳", "🌈"],
      "patet": ["😣"],
      "patriot": ["🇧🇷"],
      "pens": ["🧠", "💭"],
      "pesa": ["🏋"],
      "pipo": ["🍿"],
      "pistol": ["🔫"],
      "pula": ["🏃"],
      "pule": ["🏃"],
      "querid": ["☺", "🤗"],
      "quiet": ["🤐"],
      "raiv": ["⚡", "😤","😤💦","😖","🙁","😩","😦","😡","🤬","💣","💢","✋🛑","☠"],
      "rock": ["🤟"],
      "saudade":["😢"],
      "segred": ["🕵️‍"],
      "sumid": ["😍"],
      "surpre": ["😮"],
      "telefo": ["📱", "📞", "☎"],
      "text": ["✏", "✒", "🖋", "📝", "💬"],
      "transa": ["👉👌"],
      "transe": ["👉👌"],
      "trist": ["☹", "🙁", "😖", "😞", "😟", "😢", "😭", "😭", "😭", "😩", "😿"],
      "vergonh": ["😳"],
      "vist": ["👀"],
      "whisk": ["🥃"],
      /* Abreviações/Girias */
      "bucet": ["😜", "😘", "😟"],
      "fod": ["👉👌", "🔞"],
      "fud": ["👉👌", "🔞"],
      "haha": ["😅", "😂", "🤣"],
      "hehe": ["😉","😎","😋", "😏","😜","😈", "🙊","😼"],
      "kk": ["😅", "😂", "🤣"],
      "mackenz": ["🐴"],
      "merd": ["💩"],
      "nude": ["🙊", "😼", "😏"],
      "print": ["📱"],
      "put": ["😤", "😤💦", "😖", "🙁", "😩", "😦", "😡", "🤬", "💣", "💢", "✋🛑", "☠"],
      /* Comidas */
      "hamburger": ["🍔"],
      "hamburguer": ["🍔"],
      "pao": ["🍞", "🥖"],
      "panqueca": ["🥞"],
      "milh": ["🌽"],
      /* Profissões */
      "astronaut": ["👨‍🚀", "👩‍🚀"],
      "bombeir": ["👩‍🚒", "👨‍🚒"],
      "cienti": ["👩‍🔬", "👨‍🔬", "⚗", "🔬", "🔭", "📡"],
      "cozinh": ["👨‍🍳", "👩‍🍳"],
      "juiz": ["👨‍⚖️", "👩‍⚖️", "⚖"],
      "medic": ["👨‍⚕️", "👩‍⚕️", "⚕"],
      "pilot": ["👨‍✈️", "👩‍✈️"], 
      "policia": ["🚨", "🚔", "🚓", "👮‍♂️", "👮‍♀️", "🔫"],
      "professor": ["👨‍🏫", "👩‍🏫"],
      /* Signos */
      "arian": ["♈"],
      "taurin": ["♉"],
      "geminian": ["♊"],
      "cancerian": ["♋"],
      "leonin": ["♌"],
      "virginian": ["♍"],
      "librian": ["♎"],
      "escorpian": ["♏"],
      "sagitario": ["♐"],
      "capricornian": ["♑"],
      "aquarian": ["♒"],
      "piscian": ["♓"],
    },
  },
}

const moodEmojis = {
  "angry": ["😤","😤💦","😖","🙁","😩","😦","😡","🤬","💣","💢","✋🛑","☠"],
  "happy": ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","☺","😛","😜","😝","👌"],
  "sad": ["☹","🙁","😖","😞","😟","😢","😭","😭","😭","😩","😿"],
  "sassy": ["😉","😎","😋","😘","😏","😜","😈","😻","🙊","👉👌","😼"],
  "sick": ["😷","🤒","🤕","🤢","🤮","🤧"],
}

module.exports = {
  discardTokens,
  matchTokens,
  moodEmojis,
}