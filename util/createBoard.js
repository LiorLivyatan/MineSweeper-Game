function createBoard(numRows, numCols, numBombs) {
  // Init board
  let board = [];
  let mineLocations = [];

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push({
        value: 0,
        revealed: false,
        flagged: false,
        x: i,
        y: j,
        coordinates: [i, j],
      });
    }
    board.push(row);
  }

  // Add bombs at random locations:
  let bombsCount = 0;
  while (bombsCount < numBombs) {
    const row = Math.trunc(Math.random() * numRows);
    const col = Math.trunc(Math.random() * numCols);
    if (board[row][col].value === 0) {
      board[row][col].value = "X";
      mineLocations.push([row, col]);
      bombsCount++;
    }
  }

  // Count neighbors bombs
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

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (board[i][j].value !== "X") {
        directions.forEach((dir) => {
          const r = i + dir[0];
          const c = j + dir[1];
          if (
            r >= 0 &&
            c >= 0 &&
            r < numRows &&
            c < numCols &&
            board[r][c].value === "X"
          ) {
            board[i][j].value++;
          }
        });
      }
    }
  }
  //   board.map((row) => row.map((item) => console.log(item.value)));

  //   let q = [board[0][4]];

  //   while (q.length > 0) {
  //     const [r, c] = q.pop(0).coordinates;
  //     console.log(r, c);
  //   }

  return { board, mineLocations };
}
export default createBoard;
