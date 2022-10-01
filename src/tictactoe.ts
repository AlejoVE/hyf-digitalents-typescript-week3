type StateValue = {
  [key: string]: string;
}

type ValidPlayer = "HUMAN" | "COMPUTER";

class Player {
  player: ValidPlayer = 'COMPUTER';

  get currentPlayer(): ValidPlayer {
    return this.player;
  }

  set currentPlayer(player: ValidPlayer) {
    this.player = player;
  }

}
class Board extends Player {

  public renderInitialBoard(): void {
    console.log('         TIC - TAC - TOE')
    console.log("Choose a cell numbered from 1 to 9 as below and play")
    console.log(`
          1 | 2  | 3
        --------------
          4 | 5  | 6
        --------------
          7 | 8  | 9

-------------- --------------  --------------  --------------
        `)
  }
  public renderBoard(state: StateValue): void {
    console.log(`
            ${state['1'] || ' '} | ${state['2'] || ' '} |  ${state['3'] || ' '}
            -----------
            ${state['4'] || ' '} | ${state['5'] || ' '} |  ${state['6'] || ' '}
            -----------
            ${state['7'] || ' '} | ${state['8'] || ' '} |  ${state['9'] || ' '}

    `)

  }

}


class Game extends Board {
  availableMoves: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  currentState: StateValue = {};


  public command(command: string): void {

    const move: number = Number(command);

    // Check if the move is valid
    if (!this.availableMoves.includes(move)) {
      console.log('Invalid move');
      return;
    }

    this.executeMove(move, 'X', 'COMPUTER');

    // Execute computer move after 1.5s
    setTimeout(() => {
      this.computerMove();
    }, 1500);
  }

  public computerMove(): void {
    const randomIndex: number = Math.floor(Math.random() * this.availableMoves.length);

    const move: number = this.availableMoves[randomIndex];

    this.executeMove(move, 'O', 'HUMAN');
  }

  public executeMove(move: number, value: string, nextTurn: ValidPlayer) {
    // If there are no available moves, check if there is a winner or draw.
    if (this.availableMoves.length === 0) {
      this.checkGame();
    }

    // Take out current move from available moves
    this.availableMoves = this.availableMoves.filter(value => value != move);

    // Update state
    this.currentState[move] = value;

    console.log(`${this.currentPlayer} has put a ${value} in cell ${move}`);

    this.renderBoard(this.currentState);

    // Check if there is a winner or draw.
    this.checkGame();

    // Update turn
    this.currentPlayer = nextTurn;

  }

  public checkGame(): void {

    // I was helped by this article https://antoniomignano.medium.com/node-js-socket-io-express-tic-tac-toe-10cff9108f7

    // Output example: ['OX, 'OOX', 'XXX', ...]
    const stateValues: string[] = [
      this.currentState['1'] + this.currentState['2'] + this.currentState['3'], //First row
      this.currentState['4'] + this.currentState['5'] + this.currentState['6'], //second row
      this.currentState['7'] + this.currentState['8'] + this.currentState['9'], //Third row
      this.currentState['1'] + this.currentState['4'] + this.currentState['7'], //First Colum
      this.currentState['2'] + this.currentState['5'] + this.currentState['8'], //Second Colum
      this.currentState['3'] + this.currentState['6'] + this.currentState['9'], //Third Colum
      this.currentState['1'] + this.currentState['5'] + this.currentState['9'], //First Diagonal
      this.currentState['7'] + this.currentState['5'] + this.currentState['3'], //Second Diagonal
    ];

    const winningCombinations: string[] = ['XXX', 'OOO'];

    // Check if any of the values of the array match a winning combination
    for (let i = 0; i <= stateValues.length; i++) {
      if (stateValues[i] === winningCombinations[0] || stateValues[i] === winningCombinations[1]) {
        console.log(`${this.currentPlayer} has won!`);
        this.endGame();
      }
    }

    // If there are no moves and no winners, it's a draw.
    if (this.availableMoves.length === 0) {
      console.log('Draw!');
      this.endGame();
    }

  }

  public endGame(): void {
    process.exit(0);
  }

}

const game = new Game();

export { game };