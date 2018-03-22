// https://gist.github.com/marioluan/6923123#file-remover-acentos-js
function removerAcentos( newStringComAcento ) {
  let string = newStringComAcento
	let mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	}

	for ( let letra in mapaAcentosHex ) {
		let expressaoRegular = mapaAcentosHex[letra]
		string = string.replace( expressaoRegular, letra )
	}

  return string
}

const pluralizar = palavra => {
	const regras = {
		acrescentar: {
				"s": ["a", "e", "i", "o", "u", "ã", "ãe"],
				"es": ["r", "z", "n", "ás"],
				"": ["is", "us", "os"],
		},
		substituir: {
				"ais": "al",
				"eis": "el",
				"ois": "ol",
				"uis": "ul",
				"is": "il",
				"ns": "m",
				"eses": "ês",
				"ões": "ão",
		},
		excecoes: {
				"males": "mal",
				"cônsules": "cônsul",
				"méis": "mel",
				"féis": "fel",
				"cais": "cal",
		},
		sem_plural: [
			"não",
		],
	}

	let regex_troca =  "^([a-zA-Zà-úÀ-Ú]*)(%s)$"
	let plural = ""

	for ( let regra in regras ) {
		switch ( regra ) {
			case 'acrescentar':
				for ( let adicao in regras[regra] ) {
						let busca = regex_troca.replace("%s", regras[regra][adicao].join("|"))
						let regex = new RegExp(busca, 'i')
						if ( regex.exec(palavra) !== null ) {
							plural = palavra + adicao
							break
						}
				}
				break
			case 'substituir':
				for ( let substituicao in regras[regra] ) {
					let busca = regex_troca.replace("%s", regras[regra][substituicao])
					let regex = new RegExp(busca, 'i')
					if ( regex.exec(palavra) !== null ) {
						if ( palavra.match(/([áéíóú])/) !== null && regex.exec(palavra)[2] == "il" ) {
							plural = palavra.replace("il", "eis")
							break
						} else {
							let busca_sub = new RegExp(regex.exec(palavra)[2] + '$', 'i')
							plural = palavra.replace(busca_sub, substituicao)
							break
						}
					}
				}
				break
			case 'excecoes':
				for ( let excecao in regras[regra] ) {
					if ( palavra == regras[regra][excecao] ) {
						plural = excecao
						break
					}
				}
				break
			case 'sem_plural':
				regras[regra].forEach(function(r) {
					if (palavra === r) plural = palavra
				})
				break
			}
	}

	return plural !== "" ? plural : palavra
}

const choices = function(arr, n) {
  let choices = []

  n = Math.min(n, arr.length+1)
  for (let i = 0; i < n; i++) {
    choices.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return choices
}

const emojiParseRegEx = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

module.exports = {
	choices,
	emojiParseRegEx,
	pluralizar,
	removerAcentos,
}