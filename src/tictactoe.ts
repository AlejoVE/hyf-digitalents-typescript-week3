type Values = {
  [key: string]: string
}
class Board {

  public renderInitialBoard() {
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
  public renderBoard(object: Values) {
    console.log(`
            ${object['1'] || ' '} | ${object['2'] || ' '} |  ${object['3'] || ' '}
            -----------
            ${object['4'] || ' '} | ${object['5'] || ' '} |  ${object['6'] || ' '}
            -----------
            ${object['7'] || ' '} | ${object['8'] || ' '} |  ${object['9'] || ' '}

    `)

  }
}


class Game extends Board {
  availableMoves: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  currentTurn: string = 'COMPUTER';
  currentState: Values = {}

  public command(command: string): void {

    const move: number = Number(command)

    // Check if the move is valid
    if (!this.availableMoves.includes(move)) {
      console.log('Invalid move')
      return
    }

    this.executeMove(move, 'X', 'COMPUTER')

    // Execute computer move after 1.5s
    setTimeout(() => {
      this.computerMove()
    }, 1500);
  }

  public computerMove(): void {
    const randomIndex: number = Math.floor(Math.random() * this.availableMoves.length);

    const move: number = this.availableMoves[randomIndex]

    this.executeMove(move, 'O', 'HUMAN')
  }

  public executeMove(move: number, value: string, nextTurn: string) {
    // If there are no available moves, check if there is a winner or draw.
    if (this.availableMoves.length === 0) {
      this.checkGame()
    }

    // Take out current move from available moves
    this.availableMoves = this.availableMoves.filter(value => value != move);

    // Update state
    this.currentState[move] = value;

    console.log(`${this.currentTurn} has put a ${value} in cell ${move}`);

    this.renderBoard(this.currentState);

    // Check if there is a winner or draw.
    this.checkGame();

    // Update turn
    this.currentTurn = nextTurn;

  }

  public checkGame(): void {
    const winningRows: string[] = [
      this.currentState['1'] + this.currentState['2'] + this.currentState['3'], //First row
      this.currentState['4'] + this.currentState['5'] + this.currentState['6'], //second row
      this.currentState['7'] + this.currentState['8'] + this.currentState['9'], //Third row
      this.currentState['1'] + this.currentState['4'] + this.currentState['7'], //First Colum
      this.currentState['2'] + this.currentState['5'] + this.currentState['8'], //Second Colum
      this.currentState['3'] + this.currentState['6'] + this.currentState['9'], //Third Colum
      this.currentState['1'] + this.currentState['5'] + this.currentState['9'], //First Diagonal
      this.currentState['7'] + this.currentState['5'] + this.currentState['3'], //Second Diagonal
    ]

    const match: string[] = ['XXX', 'OOO']

    for (let i = 0; i <= winningRows.length; i++) {
      if (winningRows[i] === match[1] || winningRows[i] === match[0]) {
        console.log(`${this.currentTurn} has won!`)
        this.endGame()
      }
    }

    if (this.availableMoves.length === 0) {
      console.log('Draw!')
      this.endGame()
    }

  }

  public endGame(): void {
    process.exit(0)
  }

}

const game = new Game();

export { game };