const readline = require("readline");

const characters = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
  },
  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
  },
  {
    nome: "Peach",
    velocidade: 3,
    monobrabilidade: 4,
    poder: 2,
    pontos: 0,
  },
  {
    nome: "Yochi",
    velocidade: 2,
    monobrabilidade: 4,
    poder: 3,
    pontos: 0,
  },
  {
    nome: "Bowser",
    velocidade: 5,
    monobrabilidade: 2,
    poder: 5,
    pontos: 0,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    monobrabilidade: 2,
    poder: 5,
    pontos: 0,
  },
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function logRollResult(name, block, result, attribute) {
  console.log(
    `${name} rolou um dado 🎲 de ${block} ${result} + ${attribute} = ${
      result + attribute
    }`
  );
}

async function declareWinner(character1, character2) {
  console.log(`Resultado Final!`);
  console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
  console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

  if (character1.pontos > character2.pontos) {
    console.log(`${character1.nome} venceu ⭐`);
  } else if (character2.pontos > character1.pontos) {
    console.log(`${character2.nome} venceu 🌟`);
  } else {
    console.log(`Empate`);
  }
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    let block = await getRandomBlock();
    console.log(`🏁 Rodada: ${round}`);
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "Reta") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );
      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
    }

    if (block === "Curva") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade
      );
      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade
      );
    }
    if (block === "Confronto") {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} 🆚 ${character2.nome}`);

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder
      );
      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder
      );

      if (powerResult1 > powerResult2 && character2.pontos > 0) {
        console.log(`${character1.nome} Venceu 😀 😜`);
        character2.pontos--;
      }

      if (powerResult2 > powerResult1 && character1.pontos > 0) {
        console.log(`${character2.nome} Venceu 😀 😜`);
        character1.pontos--;
      }

      if (powerResult2 === powerResult1) {
        console.log(`Confronto empatado, nenhum ponto retirado`);
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.nome} Marcou um ponto!`);
      character1.pontos++;
    } else if (totalTestSkill1 < totalTestSkill2) {
      console.log(`${character2.nome} Marcou um ponto!`);
      character2.pontos++;
    }

    console.log("_______________________________________");
  }
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confronto";
  }

  return result;
}
// Configura o readline para capturar a entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function escolherPersonagem() {
  console.log("Escolha um personagem:");

  characters.forEach((char, index) => {
    console.log(`${index + 1}. ${char.nome}`);
  });

  return new Promise((resolve) => {
    rl.question("Digite o número do personagem escolhido: ", (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < characters.length) {
        console.log(`Você escolheu: ${characters[index].nome}`);
        resolve(characters[index]);
      } else {
        console.log("Opção inválida. Tente novamente.");
        resolve(escolherPersonagem());
      }
    });
  });
}

(async function main() {
  const player1 = await escolherPersonagem();
  const player2 = await escolherPersonagem();

  console.log(
    `🚨 🏁 Corrida entre ${player1.nome} 🆚 ${player2.nome} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);

  rl.close();
})();
