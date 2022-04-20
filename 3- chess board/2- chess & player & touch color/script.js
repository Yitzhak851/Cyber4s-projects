/*Constant area*/
//board constant
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
//player constant
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
/*varieble area*/
let selectedCell;
let pieces = [];
let table;

/*founction area*/ //start
function getInitialBoard() {
    let result = [];
    addPieces(result, 0, WHITE_PLAYER);
    addPieces(result, 7, BLACK_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
        result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    }
    return result;
}
function addPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, KING, player));
    result.push(new Piece(row, 4, QUEEN, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
}
function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = 'images/' + player + '/' + name + '.png';
    cell.appendChild(image);
}
function onCellClick(event, row, col) {
    console.log(row);
    console.log(col);
    //clear all revies possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
        }
    }

    //show possible moves
    for (let piece of pieces) {
        if (piece.row === row && piece.col === col) {
            console.log(piece);
            let possibleMoves = piece.getPossibleMoves();
            for (let possibleMove of possibleMoves)
                table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
        }
    }

    if (selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
}
function createChessBoard() {
    //create empty chess board HTML
    table = document.createElement('table');
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = table.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElement.insertCell();
            cell.id = "cell-" + row.toString() + "_" + col.toString();
            if ((row + col) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }

    //create list of pieaces (32 total)
    pieces = getInitialBoard();

    pieces[0].getPossibleMoves();
    // console.log('pieces', pieces);

    //add pieces imeges to the board
    for (let piece of pieces) {
        addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

/*founction area*/ //end

class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getPossibleMoves() { // call to founction of some spesific player
        let relativeMoves;
        if (this.type === PAWN) {
            relativeMoves = this.getPawnRelativeMoves();
        } else if (this.type === ROOK) {
            relativeMoves = this.getRookRelativeMoves();
        } else if (this.type === KNIGHT) {
            relativeMoves = this.getKnightRelativeMoves();
        } else if (this.type === BISHOP) {
            relativeMoves = this.getBishopRelativeMoves();
        } else if (this.type === KING) {
            relativeMoves = this.getKingRelativeMoves();
        } else if (this.type === QUEEN) {
            relativeMoves = this.getQueenRelativeMoves();
        } else {
            console.log("Unknown type", type) //why? becouse if some type not ununilted
        }
        console.log('relativeMoves', relativeMoves); //personel check
        let absoluteMoves = []; //declrate about the move of every player
        for (let relativeMove of relativeMoves) {
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        console.log('absoluteMoves', absoluteMoves);

        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }

    getPawnRelativeMoves() {
        return [[-1, 0]]
        return [[1, 0]];
    }

    getRookRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
}

// getKnightRelativeMoves(){

// }

// getBishopRelativeMoves(){

// }

// getKingRelativeMoves(){

// }

// getQueenRelativeMoves(){

// }




//todo: fuonction of player
class BoardData {
    constructor(pieces, player) {
        this.pieces = pieces;
        this.player = player;
    }

    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {

    }
}




/*this command - create the chess board*/
window.addEventListener('load', createChessBoard);