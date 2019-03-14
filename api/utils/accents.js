// https://gist.github.com/marioluan/6923123#file-remover-acentos-js
const removeAccent = str => {
  let accentMap = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (let letter in accentMap) {
    str = str.replace(accentMap[letter], letter);
  }

  return str;
};

const hasAccent = str => {
  let accentMap = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (let letter in accentMap) {
    if (str.match(accentMap[letter])) {
      return true;
    }
  };

  return false;
};

module.exports = {
  hasAccent,
  removeAccent,
};
