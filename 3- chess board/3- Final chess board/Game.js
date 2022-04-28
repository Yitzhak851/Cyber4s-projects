class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
  }

  // Tries to actually make a move. Returns true if successful.
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);
    // possibleMoves looks like this: [[1,2], [3,2]]
    for (const possibleMove of possibleMoves) {
      // possibleMove looks like this: [1,2]
      if (possibleMove[0] === row && possibleMove[1] === col) {
        // There is a legal move
        this.boardData.removePiece(row, col);
        piece.row = row;
        piece.col = col;
        this.currentPlayer = piece.getOpponent();
        return true;
      }
    }
    return false;
  }

  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player) {
      return [];
    }
    return piece.getPossibleMoves(this.boardData);
  }
}
