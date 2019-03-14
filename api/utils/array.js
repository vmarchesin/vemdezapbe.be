const choices = (arr, n) => {
  let choices = [];

  n = Math.min(n, arr.length+1);
  for (let i = 0; i < n; i++) {
    choices.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return choices;
};

module.exports = {
  choices,
};
