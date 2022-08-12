/**
 * Ao inserir dados no data.json, lembre-se dos indices:
 * 0: null (não usado, usado apenas para inserir caracteres para não dar erro)
 * 1: angry,
 * 2: happy,
 * 3: sad,
 * 4: sassy,
 * 5: sick
 */

const brain = require("brain.js");
const fs = require("fs");
const colors = require("colors");

const finalTest = "Eu prefiro morrer do que perder a vida!";
const ai_src = "public/ai.json";
const data_src = "data.json";
const epochs = 500; //reduza o valor se muitos dados forem colocados

const data_types = {
  0: "null",
  1: "angry",
  2: "happy",
  3: "sad",
  4: "sassy",
  5: "sick"
}

// text classifier:
const ai = new brain.recurrent.LSTM({
  //activation: "tanh",
  // inputSize: 4,
  // hiddenLayers: [
  //   6, 4, 2
  // ],
  outputSize: 1
});
let data = [];
let testIndex = 0;

//check for --new flag
if (!process.argv.includes("--new")) {
  try {
    const json = JSON.parse(fs.readFileSync(ai_src));
    ai.fromJSON(json);
  } catch (e) {
    console.log("[W] Não há um modelo de IA salvo. Criando um novo.".yellow);
  }
}

console.log("[I] Processando dados...".blue);

data = JSON.parse(fs.readFileSync(data_src));

for (let x in data) {
  data[x].input = data[x].input;
  //data[x].output = parseInt(data[x].output);
  console.log(data[x]);
}

ai.train(data, {
  iterations: epochs * data.length,
  callback: (stats) => {
    console.log(">----------------".red);
    console.log(`epochs: ${`${stats.iterations / data.length}`.green}`);
    console.log(`error: ${`${stats.error}`.green}`);
    console.log("\n{");
    console.log("  in:".cyan, data[testIndex].input.yellow);
    let output = ai.run(data[testIndex].input);

    try {
      console.log("  out:".cyan, (`${output} (${data_types[output]})`).gray);
    } catch (e) {
      console.log("  out:".cyan, "undefined".red);
    }

    console.log("}");
    console.log("<----------------".red);

    testIndex++;
    if (testIndex >= data.length) testIndex = 0;
  },
});

console.log("[I] Result:".cyan);
console.log(">----------------".red);
console.log("\n{");
console.log("  in:".cyan, finalTest.toLowerCase().yellow);
console.log("  out:".cyan, data_types[ai.run(finalTest)].gray);
console.log("}");
console.log("<----------------".red);

console.log("[I] Salvando modelo...".cyan);

fs.writeFileSync(ai_src, JSON.stringify(ai.toJSON()));