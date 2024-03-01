const gridHeight = 10;
const gridWidth = 10;

function reset(){
  squares.forEach(square => {
        square.classList.remove('path');
    });
  squares.forEach(square => {
        square.classList.remove('wall');
    });
}

function getNeighbors(square) {
    const neighbors = [];
    const [row, col] = square.id.split('-').map(num => parseInt(num));
    // check the square above
    if (row > 0) {
        const neighbor = document.getElementById(`${row - 1}-${col}`);
        if (!neighbor.classList.contains('wall')) neighbors.push(neighbor);
    }
    // check the square below
    if (row < gridHeight - 1) {
        const neighbor = document.getElementById(`${row + 1}-${col}`);
        if (!neighbor.classList.contains('wall')) neighbors.push(neighbor);
    }
    // check the square to the left
    if (col > 0) {
        const neighbor = document.getElementById(`${row}-${col - 1}`);
        if (!neighbor.classList.contains('wall')) neighbors.push(neighbor);
    }
    // check the square to the right
    if (col < gridWidth - 1) {
        const neighbor = document.getElementById(`${row}-${col + 1}`);
        if (!neighbor.classList.contains('wall')) neighbors.push(neighbor);
    }
    return neighbors;
}

const grid = document.getElementById('grid');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const squares = [];

for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = `${i}-${j}`;
        grid.appendChild(square);
        squares.push(square);
    }
}
// turn square 1-1 into the character by giving it the class 'character'
const character = document.getElementById('1-1');
character.classList.add('character');
// turn square 8-8 into the goal by giving it the class 'goal'
const goal = document.getElementById('8-8');
goal.classList.add('goal');

// when any square (other than the character and the goal) is clicked, it will be toggled between a wall and not a wall
squares.forEach(square => {
    if (square === character || square === goal) return;
    square.addEventListener('click', () => {
        square.classList.toggle('wall');
    });
});

function findPath(){
    // perform a breadth-first search to find the shortest path from the character to the goal
    // make each space not a path
    squares.forEach(square => {
        square.classList.remove('path');
    });
    queue = [character];
    visited = [character];
    found = false;
    while (queue.length > 0) {
        const current = queue.shift();
        const neighbors = getNeighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!visited.includes(neighbor)) {
                queue.push(neighbor);
                visited.push(neighbor);
                neighbor.previous = current;
            }
            // if the neighbor is the goal, we're done!
            if (neighbor === goal) {
                let current = goal;
                current = current.previous;
                while (current !== character) {
                    current.classList.add('path');
                    current = current.previous;
                }
                queue = [];
                found = true;
                break;
            }
        }
    }
    if (!found) alert('D:< No path found!');
}

// when the start button is clicked, find the path
startButton.addEventListener('click', findPath);
resetButton.addEventListener('click', reset);