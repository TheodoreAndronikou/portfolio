// 1. Deposit some money.
// 2. Determine number of lines to bet on.
// 3. Collect the bet amount.
// 4. Spin the slot machine.
// 5. Check if the user won.
// 6. Give the user their winnings.
// 7. Play again - No money.

//const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  Oranges: 6,
  Melons: 5,
  Bars: 4,
  Sevens: 3,
};

const SYMBOLS_MULTIPLIER = {
  Oranges: 2,
  Melons: 2,
  Bars: 4,
  Sevens: 10,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Please enter a valid deposit amount.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please enter a valid number of lines.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Please enter a valid number of bet, based on your balance. ");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    //Here the "i < count" means that inside the symbols array we will store for example Cherries 7 times etc.
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    //Here it's like "const reels=[[],[],[]]" so that's what we do, we create an array it's time inside the array.
    reels.push([]);
    //Now we copy the symbols array bcs we don't want to change the original bcs symbolsCopy is going to change.
    const symbolsCopy = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      //So, we store a random index from the big array, the copied symbols[],then from the copied array
      //we store the selected symbol in the selectedSymbol, we put that in the reels array
      //and we remove it from the copied array.
      const randomIndex = Math.floor(Math.random() * symbolsCopy.length);
      const selectedSymbol = symbolsCopy[randomIndex];

      reels[i].push(selectedSymbol);
      symbolsCopy.splice(randomIndex, 1);
    }
  }

  return reels;
};

//We want to flip the array first
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printSymbolsInStyle = (rows) => {
  for (const row of rows) {
    console.log(row.join(" | "));
  }
};

const getWinnings = (rows, bet, lines) => {
  let win = 0;

  for (let i = 0; i < lines; i++) {
    const symbols = rows[i];
    let allSame = true;

    for (let j = 0; j < symbols.length; j++) {
      if (symbols[j] !== symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      win += bet * SYMBOLS_MULTIPLIER[symbols[0]];
    }
  }

  return win;
};
/*
const updateBalanceDisplay = (balance) => {
    console.log("Your balance amount is:", balance, "$" );
    //document.getElementById('balance-amount').textContent = balance.toFixed(2);
}
*/

const game = () => {
  console.log("Welcome to 777 Megaways!");
  //Here for the (3) requirement, we take the deposit amount and store it in balance, bcs the starting balance will be what they are depositing, and then we adjust the balance based on what they bet and win. So, let balance = deposit();
  let balance = deposit();

  while (true) {
    console.log("Your current balance is:", balance, "$");
    //updateBalanceDisplay(balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printSymbolsInStyle(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won", winnings, "$");
    if (balance <= 0) {
      console.log("You have no money left.");
      break;
    }
    const playAgain = prompt("Do you want to play again? (y/n): ");
    if (playAgain !== "y") {
      break;
    }
  }
};

//game();

document.getElementById('btn-start').addEventListener('click', game);

/*
const gameSection = () => {
    document.getElementById("welcome-section").style.display = 'none';
    document.getElementById("slot-machine-section").style.display = 'block';
    game();
}
*/