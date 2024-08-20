// create the fields of the boards
const BOARD_SIZE = 8;

// the fofo create chess board
function createChessBoard() {
    // create all the board by table (row's and colom's)
    const table = document.createElement('table');
    document.body.appendChild(table);
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = document.createElement('tr');
        table.body.appendChild(row);
        // const row = table1.insertRow(i);
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('tc');
            table.body.appendChild(cell);
            // const cell = table.insertCell(j);
            cell.textContent = '123';
            if (i + j % 2 == 0) {
                cell.className = 'light-cell';
            }
            cell.className = 'dark-cell'
        }
    }
}

// call
window.addEventListener('load', createChessBoard);