# Vem de zap bb 😏😊😂

vemdezapbe.be é um zapeador de textos automático. O objetivo é enviar um texto e receber de volta o mesmo texto com a adição de emojis.

# Glossário

- `token`: Palavra ou qualquer sequência de caracteres separada por espaço vazio (`" "`) ou terminador de palavra (`"()[]{}./"'"`). Tokens não interpretam acentos do lado do servidor, ou seja: `não` é equivalente a `nao`.

# API

A API REST pode ser encontrada em `http://vemdezapbe.be/api`. Os seguintes endopoints estão disponíveis:

### GET
- `/api` - Retorna a versão mais recente da API. A versão atual é `v1.0`. Todas as chamadas da API retornam junto a versão atual.

```JSON
{
  version: v1.0
}
```

- `/api/v1.0/suggest` - Retorna todas as sugestões oferecidas pelos usuários.

```JSON
{
  version: v1.0,
  suggestions: { 
    "palavra": ["emoji"], 
    "palavra": ["emoji", "emoji"],
    ... 
  },
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

  - Response:
    - zap `string`: Texto zapeado
    - gemidao `string`: Gemidao em texto. Chance de 1% de ser retornado. Se retornado toca o gemidão no site.
    - requestTime `string`: Tempo de execução do servidor em ms. 

```JSON
{
  version: v1.0,
  zap: "Zapeia 😄 esse 😀☺😀 texto 👌😋😆 bb 👶",
  gemidao: "HÃÃÃÃÃÃNNN ÕÕÕÕHH ÕÕÕÕÕÕÃHHH ÃÃÃÃÃÃÃHNN",
  requestTime: "75ms",
}
```

- `/api/v1.0/suggest` - Envia uma sugestão de emoji

  - Content-Type: `applicaton/json`
  - Request:
    - word `string`: Token que será comparado para o emoji (**required**)
    - emojis `string`: String com um ou mais emojis que poderão ser aplicados ao token. É permitido enviar caracteres que não sejam emojis junto da string, mas estes não serão processados. (**required**)

  - Response:
    - success `boolean`: A sugestão foi recebida com sucesso.

```JSON
{
  version: v1.0,
  success: true,
}
```