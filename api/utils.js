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

module.exports = {
	pluralizar,
	removerAcentos,
}