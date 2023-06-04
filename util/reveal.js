function reveal(grid, x, y, mineLocations, counter) {
  if (grid[x][y].value === 0) {
    let newGrid = JSON.parse(JSON.stringify(grid));

    const numRows = newGrid.length;
    const numCols = newGrid[0].length;

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    // BFS Algorithm:
    let q = [newGrid[x][y]];
    const visited = new Set();
    visited.add(newGrid[x][y]);
    counter--;
    while (q.length > 0) {
      const cell = q.pop(0);
      const [row, col] = cell.coordinates;
      // console.log(counter, cell.coordinates, cell.revealed);
      cell.revealed = true;

      for (const dir of directions) {
        const r = row + dir[0];
        const c = col + dir[1];

        if (
          r >= 0 &&
          c >= 0 &&
          r < numRows &&
          c < numCols &&
          !newGrid[r][c].revealed &&
          !visited.has(newGrid[r][c])
        ) {
          // If the value is 0, then we want to add that cell to the queue.
          if (newGrid[r][c].value === 0) {
            q.push(newGrid[r][c]);
            visited.add(newGrid[r][c]);
            counter--;

            // Otherwise, we don't want to reveal all of its neighbors, but just this specific cell.
          } else {
            newGrid[r][c].revealed = true;
            counter--;
          }
        }
      }
    }

    return { newGrid, counter };
  } else if (grid[x][y].value === "X") {
    let newGrid = JSON.parse(JSON.stringify(grid));
    mineLocations.forEach((loc) => {
      newGrid[loc[0]][loc[1]].revealed = true;
    });
    const game = true;
    // alert("You lost the game.");
    return { newGrid, counter, game };
  } else {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].revealed = true;
    counter--;
    return { newGrid, counter };
  }
}

export default reveal;
