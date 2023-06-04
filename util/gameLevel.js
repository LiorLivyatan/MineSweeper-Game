function gameLevel(level) {
  switch (level) {
    case "easy":
      return { width: 5, height: 5, numMines: 5 };
    case "medium":
      return { width: 10, height: 10, numMines: 20 };
    case "hard":
      if (window.innerWidth <= 768) {
        return { width: 17, height: 10, numMines: 50 };
      } else {
        return { width: 15, height: 25, numMines: 100 };
      }
    default:
      return { width: 5, height: 5, numMines: 5 };
  }
}

export default gameLevel;
