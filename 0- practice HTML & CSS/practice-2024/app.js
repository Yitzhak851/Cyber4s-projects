//declrate variables
var board = document.getElementById('boardInner');
var numContainer = document.getElementById('numContainer');
var letterContainer = document.getElementById('lettContainer');
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8']
var display = 'block'

// four functions to render the board
const renderBoard = (useLabels) => {
    if (useLabels) {
        renderLabels()
    }
    var change = false
    var color = 'white'
    for (var i = 0; i < 64; ++i) {
        var el = document.createElement('DIV')
        el.className = 'square'
        change = i % 8 === 0 || i % 8 === NaN
        color = change ? color :
            color === 'white' ? 'black' : 'white'
        el.style.backgroundColor = color
        board.appendChild(el)
        change = false
    }
}

const renderBoard1 = (useLabels) => {
    if (useLabels) {
        renderLabels()
    }
    for (var i = 0; i < letters.length; ++i) {
        var row = document.createElement('DIV')
        row.className = 'row'
        row.style.flexDirection = i % 2 === 0 ? '' : 'row-reverse';
        for (var j = 0; j < letters.length; ++j) {
            var square = document.createElement('DIV')
            square.className = 'square'
            square.style.backgroundColor = j % 2 === 0 ? 'white' : 'black'
            row.appendChild(square)
        }
        board.appendChild(row)
    }
}

renderLabels = () => {
    letters.forEach((x, i) => {
        var el = document.createElement('DIV')
        var el2 = document.createElement('DIV')
        el.innerText = x
        el.className = 'label'
        el2.innerText = numbers[i]
        el2.className = 'label'
        numContainer.appendChild(el2)
        letterContainer.appendChild(el)
    })
}


renderBoard1()