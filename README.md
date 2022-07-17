# Vem de zap bb 😏😊😂

vemdezapbe.be é um zapeador de textos automático. O objetivo é enviar um texto e receber de volta o mesmo texto com a adição de emojis.

É possível ver zaps criados pelos usuários pela conta [@vemdezapbebe](https://twitter.com/vemdezapbebe) no Twitter.

# Glossário

- `emoji`: Qualquer caracter UTF-8 que se enquadre na RegEx:

```
/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
```

- `token`: Palavra ou qualquer sequência de caracteres separada por espaço vazio (`" "`) ou terminador de palavra (`"()[]{}./"'"`).

# API

A API REST pode ser encontrada em `https://vemdezapbebe.herokuapp.com/api`. Os seguintes endpoints estão disponíveis:

### GET
- `/api` - Retorna a versão mais recente da API. A versão atual é `v1.0`. Todas as chamadas da API retornam junto a versão atual.

```javascript
{
  version: "v1.0",
}
```

### POST
- `/api/v1.0/zap` - Zapeia um texto

  - Content-Type: `applicaton/json`
  - Request:
    - zap `string`: Texto a ser zapeado (**required**)
    - mood `One of ["angry", "happy", "sad", "sassy", "sick"]`: Humor do zap (**default `happy`**)
    - strength `number 1..5`: Número máximo de emojis por token. (**default `3`**)
    - rate `float 0..1`: Taxa de zapeamento. Quão provável é que um token seja zapeado, 0 sendo 0% e 1 sendo 100%. Cada token é testado individualmente. (**default `0.5`**)
    - tweet `boolean`: Se o zap deve ser enviado ou não para o Twitter pela conta [@vemdezapbebe](https://twitter.com/vemdezapbebe). Se o conteúdo do zap for maior que 280 caracteres o tweet não será feito. Todos os `@` são escapados antes de enviar o tweet, portanto não é possível fazer menções usando a API. É possível criar hashtags, e qualquer texto no formato `#texto` será interpretado como uma hashtag.

  - Response:
    - zap `string`: Texto zapeado
    - gemidao `string`: Gemidao em texto. Chance de 1% de ser retornado. Se retornado toca o gemidão no site.
    - requestTime `string`: Tempo de execução do servidor em ms. 

```javascript
{
  version: "v1.0",
  zap: "Zapeia 😄 esse 😀☺😀 texto 👌😋😆 bb 👶",
  gemidao: "HÃÃÃÃÃÃNNN ÕÕÕÕHH ÕÕÕÕÕÕÃHHH ÃÃÃÃÃÃÃHNN",
  requestTime: "75ms",
}
```

# Contribuidores:
* [Vinicius Marchesin Araujo](https://vmarches.in/)
* [Roberto Pommella Alegro](https://github.com/Kasama)
* [Eduardo P. Gomez](https://eduardo.ix.tc)
