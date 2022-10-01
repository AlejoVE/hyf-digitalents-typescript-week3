type StateValue = {
  [key: string]: string;
}

type ValidPlayer = "HUMAN" | "COMPUTER";

class Player {
  player: ValidPlayer = 'COMPUTER';

  get currentPlayer() {
    return this.player;
  }

  set currentPlayer(player: ValidPlayer) {
    this.player = player;
  }

}
class Board extends Player {
  currentState: StateValue = {};

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
  public renderBoard(): void {
    console.log(`
            ${this.currentState['1'] || ' '} | ${this.currentState['2'] || ' '} |  ${this.currentState['3'] || ' '}
            -----------
            ${this.currentState['4'] || ' '} | ${this.currentState['5'] || ' '} |  ${this.currentState['6'] || ' '}
            -----------
            ${this.currentState['7'] || ' '} | ${this.currentState['8'] || ' '} |  ${this.currentState['9'] || ' '}

    `)

  }

}


class Game extends Board {
  availableMoves: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      this.checkGame(this.currentState, this.currentPlayer);
    }

    // Take out current move from available moves
    this.availableMoves = this.availableMoves.filter(value => value != move);

    // Update state
    this.currentState[move] = value;

    console.log(`${this.currentPlayer} has put a ${value} in cell ${move}`);

    this.renderBoard();

    // Check if there is a winner or draw.
    this.checkGame(this.currentState, this.currentPlayer);

    // Update turn
    this.currentPlayer = nextTurn;

  }

  public checkGame(state: StateValue, player: ValidPlayer): void {

    // I was helped by this article https://antoniomignano.medium.com/node-js-socket-io-express-tic-tac-toe-10cff9108f7

    // Output example: ['OX, 'OOX', 'XXX', ...]
    const stateValues: string[] = [
      state['1'] + state['2'] + state['3'], //First row
      state['4'] + state['5'] + state['6'], //second row
      state['7'] + state['8'] + state['9'], //Third row
      state['1'] + state['4'] + state['7'], //First Colum
      state['2'] + state['5'] + state['8'], //Second Colum
      state['3'] + state['6'] + state['9'], //Third Colum
      state['1'] + state['5'] + state['9'], //First Diagonal
      state['7'] + state['5'] + state['3'], //Second Diagonal
    ];

    const winningCombinations: string[] = ['XXX', 'OOO'];

    // Check if any of the values of the array match a winning combination
    for (let i = 0; i <= stateValues.length; i++) {
      if (stateValues[i] === winningCombinations[0] || stateValues[i] === winningCombinations[1]) {
        console.log(`${player} has won!`);
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