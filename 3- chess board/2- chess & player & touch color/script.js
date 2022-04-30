/*Constant area*/
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
let selectedCell;
let table;
let boardData;

//creating classes to pieces
class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player
    }

    getPossibleMoves() {
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
            console.log("Unknown type", type)
        }
        // console.log('relativeMoves', relativeMoves);


        // Get absolute moves
        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            absoluteMoves.push([absoluteRow, absoluteCol]);
        }
        // console.log('absoluteMoves', absoluteMoves);


        // Get filtered absolute moves
        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        // console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }

    getPawnRelativeMoves() {
        let direction = 1;
        if (this.player === BLACK_PLAYER) {
            return [[-direction, 0]];
        }
        return [[+1, 0]];
    }

    getRookRelativeMoves() {
        const boardSizeArray = [...Array(BOARD_SIZE).keys()].slice(1);
        const movesArray = boardSizeArray.map(i => {
            return [[+i, 0], [-i, 0], [0, +i], [0, -i]]
        }).flat();
        return movesArray;
    }

    getKnightRelativeMoves() {
        const numbers = { ones: [-1, +1], twos: [-2, +2] };
        const combined = numbers.twos.flatMap(o => numbers.ones.map(t => [o, t]));
        const reversedcombined = numbers.ones.flatMap(o => numbers.twos.map(t => [o, t]));
        return [...combined, ...reversedcombined];
    }

    getBishopRelativeMoves() {
        const boardSizeArray = [...Array(BOARD_SIZE).keys()].slice(1);
        const movesArray = boardSizeArray.map(i => {
            return [[+i, +i], [-i, -i], [+i, -i], [-i, +i]]
        }).flat();
        return movesArray;
    }

    getKingRelativeMoves() {
        const numbers = [-1, 0, +1];
        const combined = numbers.flatMap(o => numbers.map(t => {
            if (o !== 0 || t !== 0) {
                return [o, t];
            }
        }));
        return combined.filter(Boolean);
    }

    getQueenRelativeMoves() {
        return [...this.getRookRelativeMoves(), ...this.getBishopRelativeMoves()];
    }
}

class BoardData {
    constructor(pieces) {
        this.pieces = pieces;
    }

    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }
}

//positioning pieces on board
function getInitialPieces() {
    let result = [];

    addFirstRowPieces(result, 0, WHITE_PLAYER);
    addFirstRowPieces(result, 7, BLACK_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
        result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    }
    return result;
}

function addFirstRowPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, KING, player));
    result.push(new Piece(row, 4, QUEEN, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
}

//matching icons to classes function
function addImage(cell, player, name) {
    const image = document.createElement('img');
    // image.src = 'images/' + player + '/' + name + '.png';
    image.src = `images/${player}/${name}.png`;
    cell.appendChild(image);
}

function onCellClick(event, row, col) {
    // console.log(row);
    // console.log(col);
    // Clear all previous possible moves
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move');
        }
    }

    // Show possible moves
    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
        let possibleMoves = piece.getPossibleMoves();
        for (let possibleMove of possibleMoves) {
            const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
            cell.classList.add('possible-move');
        }
    }

    // Clear previously selected cell
    if (selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
    }

    // Show selected cell
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
}

function createChessBoard() {
    // Create empty chess board HTML:                         
    const cols = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H" }
    table = document.createElement('table');
    table.className = "board";
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
        // let rowElement = table.insertRow();
        let rowElement = document.createElement('tr');
        table.appendChild(rowElement);
        rowElement.dataset.line = row + 1;
        for (let col = 0; col < BOARD_SIZE; col++) {
            //   let cell = rowElement.insertCell();
            let cell = document.createElement('td');
            cell.dataset.column = cols[col + 1];
            cell.dataset.line = row;
            rowElement.appendChild(cell);
            cell.id = "cell-" + row.toString() + "_" + col.toString();
            if ((row + col) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }

    // Create list of pieces (32 total)
    boardData = new BoardData(getInitialPieces());


    // Add pieces images to board
    for (let piece of boardData.pieces) {
        const cell = table.rows[piece.row].cells[piece.col];
        addImage(cell, piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);  //this command - create the chess board
