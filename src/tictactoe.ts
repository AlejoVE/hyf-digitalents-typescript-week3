
class Game {
  availableMoves: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  movesDone: [number, string][] = [];
  currentTurn: string = 'HUMAN';
  currentState: any = {}

  public render() {
    console.log('         TIC - TAC - TOE')
    console.log("Choose a cell numbered from 1 to 9 as below and play")
    console.log(`
          1 | 2  | 3
        --------------
          4 | 5  | 6
        --------------
          7 | 8  | 9
        `)
  }


  public command(command: string): void {

    if (this.availableMoves.length === 0) {
      this.checkGame()
    }

    const move = Number(command)
    if (!this.availableMoves.includes(move)) {
      console.log('Invalid move')
      return
    }

    this.movesDone.push([move, 'X'])
    this.updateState(this.movesDone)

    console.log(`\n HUMAN has put a X in cell ${move}`)
    this.renderBoard()
    this.checkGame()

    this.availableMoves = this.availableMoves.filter(value => value != move)
    this.currentTurn = 'COMPUTER'

    setTimeout(() => {
      this.machineMove()
    }, 1000);
  }

  public machineMove(): void {

    if (this.availableMoves.length === 0) {
      this.checkGame()
    }


    const randomIndex = Math.floor(Math.random() * this.availableMoves.length);
    const move = this.availableMoves[randomIndex]

    this.movesDone.push([move, 'O'])
    this.availableMoves = this.availableMoves.filter(value => value != move)
    this.updateState(this.movesDone)
    console.log(`COMPUTER has put a X in cell ${move}`)

    this.renderBoard()
    this.checkGame()
    this.currentTurn = 'HUMAN'

  }

  public updateState(array: [number, string][]) {
    const object = Object.fromEntries(array)
    this.currentState = object
  }

  public checkGame() {
    const winningRows = [
      this.currentState['1'] + this.currentState['2'] + this.currentState['3'], //First line
      this.currentState['4'] + this.currentState['5'] + this.currentState['6'], //second line
      this.currentState['7'] + this.currentState['8'] + this.currentState['9'], //Third line
      this.currentState['1'] + this.currentState['4'] + this.currentState['7'], //First Colum
      this.currentState['2'] + this.currentState['5'] + this.currentState['8'], //Second Colum
      this.currentState['3'] + this.currentState['6'] + this.currentState['9'], //Third Colum
      this.currentState['1'] + this.currentState['5'] + this.currentState['9'], //First Diagonal
      this.currentState['7'] + this.currentState['5'] + this.currentState['3'], //Second Diagonal
    ]

    const match = ['XXX', 'OOO']

    if (this.availableMoves.length === 0) {
      for (let i = 0; i < winningRows.length; i++) {
        if (winningRows[i] === match[0] || winningRows[i] === match[1]) {
          console.log(`${this.currentTurn} has won!`)
          this.endGame()
        } else {
          console.log('Draw!')
          this.endGame()
        }
      }
    }

    for (let i = 0; i < winningRows.length; i++) {
      if (winningRows[i] === match[0] || winningRows[i] === match[1]) {
        console.log(`${this.currentTurn} has won!`)
        this.endGame()
      }
    }


  }

  public renderBoard() {
    console.log(`
            ${this.currentState['1'] || ' '} | ${this.currentState['2'] || ' '} |  ${this.currentState['3'] || ' '}
            -----------
            ${this.currentState['4'] || ' '} | ${this.currentState['5'] || ' '} |  ${this.currentState['6'] || ' '}
            -----------
            ${this.currentState['7'] || ' '} | ${this.currentState['8'] || ' '} |  ${this.currentState['9'] || ' '}

    `)

  }

  public endGame() {
    process.exit(0)
  }

}

const game = new Game();

export { game };