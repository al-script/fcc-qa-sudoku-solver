class SudokuSolver {
  validate(puzzleString) {
    let puzzleArray = puzzleString.split("");
    let invalidCharacters = puzzleString.match(/[^1-9\.]/);
    let puzzleLength = puzzleArray.length;
    let numberOfNumbers = puzzleString.match(/[1-9]/g).length; // the fewest given numbers that allows for a solvable puzzle is 17
    let conflictingValues;

    if (numberOfNumbers < 17) {
      return { error: "Puzzle cannot be solved" };
    }

    // check for duplicates
    // help from https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array && https://stackoverflow.com/questions/41312888/how-to-take-every-3rd-element-of-an-array
    // can probably do this with three functions that iterates the proper amount to check each row/col/region that then returns the error message on failure so don't have to repeat self or use needless processing power *** REFACTOR ***
    let rowADuplicates = puzzleArray
      .slice(0, 9)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowBDuplicates = puzzleArray
      .slice(9, 18)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowCDuplicates = puzzleArray
      .slice(18, 27)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowDDuplicates = puzzleArray
      .slice(27, 36)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowEDuplicates = puzzleArray
      .slice(36, 45)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowFDuplicates = puzzleArray
      .slice(45, 54)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowGDuplicates = puzzleArray
      .slice(54, 63)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowHDuplicates = puzzleArray
      .slice(63, 72)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let rowIDuplicates = puzzleArray
      .slice(72, 81)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);

    let col1Duplicates = puzzleArray
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col2Duplicates = puzzleArray
      .slice(1)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col3Duplicates = puzzleArray
      .slice(2)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col4Duplicates = puzzleArray
      .slice(3)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col5Duplicates = puzzleArray
      .slice(4)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col6Duplicates = puzzleArray
      .slice(5)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col7Duplicates = puzzleArray
      .slice(6)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col8Duplicates = puzzleArray
      .slice(7)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let col9Duplicates = puzzleArray
      .slice(8)
      .filter((_, i) => i % 9 == 0)
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);

    let reg1Duplicates = (
      puzzleArray.slice(0, 3) +
      puzzleArray.slice(9, 12) +
      puzzleArray.slice(18, 21)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg2Duplicates = (
      puzzleArray.slice(3, 6) +
      puzzleArray.slice(12, 15) +
      puzzleArray.slice(21, 24)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg3Duplicates = (
      puzzleArray.slice(6, 9) +
      puzzleArray.slice(15, 18) +
      puzzleArray.slice(24, 27)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg4Duplicates = (
      puzzleArray.slice(27, 30) +
      puzzleArray.slice(36, 39) +
      puzzleArray.slice(45, 48)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg5Duplicates = (
      puzzleArray.slice(30, 33) +
      puzzleArray.slice(39, 42) +
      puzzleArray.slice(48, 51)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg6Duplicates = (
      puzzleArray.slice(33, 36) +
      puzzleArray.slice(42, 45) +
      puzzleArray.slice(51, 54)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i); // issue, hits 1
    let reg7Duplicates = (
      puzzleArray.slice(54, 57) +
      puzzleArray.slice(63, 66) +
      puzzleArray.slice(72, 75)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg8Duplicates = (
      puzzleArray.slice(57, 60) +
      puzzleArray.slice(66, 69) +
      puzzleArray.slice(75, 78)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    let reg9Duplicates = (
      puzzleArray.slice(60, 63) +
      puzzleArray.slice(69, 72) +
      puzzleArray.slice(78, 81)
    )
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);

    conflictingValues =
      rowADuplicates +
      rowBDuplicates +
      rowCDuplicates +
      rowDDuplicates +
      rowEDuplicates +
      rowFDuplicates +
      rowGDuplicates +
      rowHDuplicates +
      rowIDuplicates +
      col1Duplicates +
      col2Duplicates +
      col3Duplicates +
      col4Duplicates +
      col5Duplicates +
      col6Duplicates +
      col7Duplicates +
      col8Duplicates +
      col9Duplicates +
      reg1Duplicates +
      reg2Duplicates +
      reg3Duplicates +
      reg4Duplicates +
      reg5Duplicates +
      reg6Duplicates +
      reg7Duplicates +
      reg8Duplicates +
      reg9Duplicates;

    let invalidCharacterError = { error: "Invalid characters in puzzle" };
    let invalidPuzzleLengthError = {
      error: "Expected puzzle to be 81 characters long",
    };
    let unsolvablePuzzleError = { error: "Puzzle cannot be solved" };

    if (invalidCharacters) {
      // console.log("error","Invalid characters in puzzle")
      // console.log("Puzzle was:", puzzleString)
      return invalidCharacterError;
    } else if (puzzleLength != 81) {
      // console.log("error","Expected puzzle to be 81 characters long")
      // console.log("Puzzle was:", puzzleString)
      // console.log("Length was:", puzzleLength)
      return invalidPuzzleLengthError;
    } else if (numberOfNumbers < 17 || conflictingValues) {
      // the fewest given numbers that allows for a solvable puzzle is 17
      // console.log("error","puzzle cannot be solved")
      // console.log("Puzzle was:", puzzleString)
      return unsolvablePuzzleError;
    } else {
      // console.log("Puzzle is validated")
      // console.log("Puzzle was:", puzzleString)
      return "validated";
    }
  }

  // validate against the current state of the board, check if the given value is valid for the given row
  checkRowPlacement(puzzleString, row, column, value) {
    let puzzleArray = puzzleString.split("");
    let rowValues;
    let duplicates;

    // console.log('Row given:', row)

    // If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting. ***********
    // will then have to make an array out of the row
    // insert the given value at the correct point in the row array, using the column to help with the index
    // then do the joining and matching, and then perform the test

    // how to insert at correct point... just gotta go based on the column - 1

    // get an array of values for that row from the puzzleString
    if (row === "A") {
      rowValues = puzzleArray.slice(0, 9);
    }
    if (row === "B") {
      rowValues = puzzleArray.slice(9, 18);
    }
    if (row === "C") {
      rowValues = puzzleArray.slice(18, 27);
    }
    if (row === "D") {
      rowValues = puzzleArray.slice(27, 36);
    }
    if (row === "E") {
      rowValues = puzzleArray.slice(36, 45);
    }
    if (row === "F") {
      rowValues = puzzleArray.slice(45, 54);
    }
    if (row === "G") {
      rowValues = puzzleArray.slice(54, 63);
    }
    if (row === "H") {
      rowValues = puzzleArray.slice(63, 72);
    }
    if (row === "I") {
      rowValues = puzzleArray.slice(72, 81);
    }

    // console.log('Row values before update:', rowValues)

    // insert the given value at given positin into the array of values for that row
    rowValues[column - 1] = value;

    // console.log('Value given:', value)
    // console.log('Row values plus value:', rowValues)

    // check if the updated array has duplicates
    // console.log('Duplicates pre:', duplicates)
    duplicates = rowValues
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    // console.log('Duplicates post:', duplicates)

    // console.log('Duplicates found:', Boolean(duplicates.length != 0), duplicates)
    // console.log('If true, should return invalid, if false should return valid')

    // if has duplicates return invalid, else return valid
    return duplicates.length === 0 ? "valid" : "invalid";
  }

  // validate against the current state of the board
  checkColPlacement(puzzleString, row, column, value) {
    let puzzleArray = puzzleString.split("");
    let columnValues;
    let duplicates;

    // console.log('Column given:', column)

    // get an array of values for that column from the puzzleString
    if (column === "1") {
      columnValues = puzzleArray.filter((_, i) => i % 9 == 0);
    }
    if (column === "2") {
      columnValues = puzzleArray.slice(1).filter((_, i) => i % 9 == 0);
    }
    if (column === "3") {
      columnValues = puzzleArray.slice(2).filter((_, i) => i % 9 == 0);
    }
    if (column === "4") {
      columnValues = puzzleArray.slice(3).filter((_, i) => i % 9 == 0);
    }
    if (column === "5") {
      columnValues = puzzleArray.slice(4).filter((_, i) => i % 9 == 0);
    }
    if (column === "6") {
      columnValues = puzzleArray.slice(5).filter((_, i) => i % 9 == 0);
    }
    if (column === "7") {
      columnValues = puzzleArray.slice(6).filter((_, i) => i % 9 == 0);
    }
    if (column === "8") {
      columnValues = puzzleArray.slice(7).filter((_, i) => i % 9 == 0);
    }
    if (column === "9") {
      columnValues = puzzleArray.slice(8).filter((_, i) => i % 9 == 0);
    }

    // nope columnValues = columnValues.filter((_,i) => i % 9 == 0) and remove that from each to simplify

    // console.log('Column values:', columnValues)

    // insert the given value into the array of values for that row
    columnValues[row.charCodeAt(0) - 65] = value;

    // console.log('Value given:', value)
    // console.log('Column values plus value:', columnValues)

    // check if the updated array has duplicates
    // console.log('Duplicates pre:', duplicates)
    duplicates = columnValues
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    // console.log('Duplicates post:', duplicates)

    // console.log('Duplicates found:', Boolean(duplicates.length != 0), duplicates)
    // console.log('If true, should return invalid, if false should return valid')

    // if has duplicates return invalid, else return valid
    return duplicates.length === 0 ? "valid" : "invalid";
  }

  // validate against the current state of the board
  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzleArray = puzzleString.split("");
    let region, regionValues, position;
    let duplicates;

    // console.log('Row given:', row, 'Column given:', column);

    // get the region from the row and column
    if (row === "A" || row === "B" || row === "C") {
      if (column < 4) {
        region = "1";
      }
      if (column > 3 && column < 7) {
        region = "2";
      }
      if (column > 6) {
        region = "3";
      }
    } else if (row === "D" || row === "E" || row === "F") {
      if (column < 4) {
        region = "4";
      }
      if (column > 3 && column < 7) {
        region = "5";
      }
      if (column > 6) {
        region = "6";
      }
    } else {
      if (column < 4) {
        region = "7";
      }
      if (column > 3 && column < 7) {
        region = "8";
      }
      if (column > 6) {
        region = "9";
      }
    }

    // console.log('Region is:', region);

    // will have to change this up for region, perhaps test all regions, or only the region that the coordinates exist in, so have to test what region that is in
    // get an array of values for that region from the puzzleString
    if (region === "1") {
      regionValues =
        puzzleArray.slice(0, 3) +
        puzzleArray.slice(9, 12) +
        puzzleArray.slice(18, 21);
    }
    if (region === "2") {
      regionValues =
        puzzleArray.slice(3, 6) +
        puzzleArray.slice(12, 15) +
        puzzleArray.slice(21, 24);
    }
    if (region === "3") {
      regionValues =
        puzzleArray.slice(6, 9) +
        puzzleArray.slice(15, 18) +
        puzzleArray.slice(24, 27);
    }
    if (region === "4") {
      regionValues =
        puzzleArray.slice(27, 30) +
        puzzleArray.slice(36, 39) +
        puzzleArray.slice(45, 48);
    }
    if (region === "5") {
      regionValues =
        puzzleArray.slice(30, 33) +
        puzzleArray.slice(39, 42) +
        puzzleArray.slice(48, 51);
    }
    if (region === "6") {
      regionValues =
        puzzleArray.slice(33, 36) +
        puzzleArray.slice(42, 45) +
        puzzleArray.slice(51, 54);
    }
    if (region === "7") {
      regionValues =
        puzzleArray.slice(54, 57) +
        puzzleArray.slice(63, 66) +
        puzzleArray.slice(72, 75);
    }
    if (region === "8") {
      regionValues =
        puzzleArray.slice(57, 60) +
        puzzleArray.slice(66, 69) +
        puzzleArray.slice(75, 78);
    }
    if (region === "9") {
      regionValues =
        puzzleArray.slice(60, 63) +
        puzzleArray.slice(69, 72) +
        puzzleArray.slice(78, 81);
    }

    regionValues = regionValues.split("").filter((x) => x != ",");

    // console.log('Region values:', regionValues);

    // insert the given value into the array of values for that row

    // determine the position of the coordinate in the array
    // A1/D1/G1 = 0, A2/D2/G2 = 1, A3/D3/G3 = 2
    // B1/E1/H1 = 3 , B2/E2/H2 = 4 , B3/E3/H3 = 5
    // C1/F1/I1 = 6, C2/F2/I2 = 7, C3/F3/I3 = 8

    //A D G 1 4 7 = 0
    //A D G 2 5 8 = 1
    //A D G 3 6 9 = 2
    //B E H 1 4 7 = 3
    //B E H 2 5 8 = 4
    //B E H 3 6 9 = 5
    //C F I 1 4 7 = 6
    //C F I 2 5 8 = 7
    //C F I 3 6 9 = 8

    if (row === "A" || row === "D" || row === "G") {
      if (column === "1" || column === "4" || column === "7") {
        position = 0;
      } else if (column === "2" || column === "5" || column === "8") {
        position = 1;
      } else {
        position = 2;
      }
    } else if (row === "B" || row === "E" || row === "H") {
      if (column === "1" || column === "4" || column === "7") {
        position = 3;
      } else if (column === "2" || column === "5" || column === "8") {
        position = 4;
      } else {
        position = 5;
      }
    } else {
      if (column === "1" || column === "4" || column === "7") {
        position = 6;
      } else if (column === "2" || column === "5" || column === "8") {
        position = 7;
      } else {
        position = 8;
      }
    }

    // console.log('Row given:', row, 'Column given:', column);
    // console.log("Position inserting:", position)

    regionValues[position] = value;

    // console.log('Value given:', value)
    // console.log('Region values plus value:', regionValues)

    // check if the updated array has duplicates
    // console.log('Duplicates pre:', duplicates)
    duplicates = regionValues
      .join("")
      .match(/[1-9]/g)
      .filter((e, i, a) => a.indexOf(e) !== i);
    // console.log('Duplicates post:', duplicates)

    // console.log('Duplicates found:', Boolean(duplicates.length != 0), duplicates)
    // console.log('If true, should return invalid, if false should return valid')

    // if has duplicates return invalid, else return valid
    return duplicates.length === 0 ? "valid" : "invalid";
  }

  solve(puzzleString) {
    let validatedPuzzle = this.validate(puzzleString);
    // if (validatedPuzzle != 'validated') { res.json(validatedPuzzle) } else {
    if (validatedPuzzle != "validated") {
      return validatedPuzzle;
    } else {
      let initialPuzzleState = puzzleString.split("");
      let recursivePuzzleState = puzzleString.split("");
      let updatedPuzzleString;

      let coordinateArray = [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "D9",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "E8",
        "E9",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "H7",
        "H8",
        "H9",
        "I1",
        "I2",
        "I3",
        "I4",
        "I5",
        "I6",
        "I7",
        "I8",
        "I9",
      ];

      // find next empty position
      let findEmptyCell = (puzzle) => {
        for (let cell = 0; cell < 81; cell++) {
          if (recursivePuzzleState[cell] == ".") {
            // console.log('Empty cell found:', cell, 'Cell is:', recursivePuzzleState[cell]);
            return cell;
          }
        }
        // console.log('Ending recursion, returning -1');
        return -1;
      };

      // recursive backtracker
      let backtracker = (puzzle) => {
        let emptyCell = findEmptyCell(recursivePuzzleState);

        if (emptyCell === -1) {
          console.log("Ending recursion");
          return recursivePuzzleState;
        }

        let coordinate = coordinateArray[emptyCell].split("");
        let row = coordinate[0].toUpperCase();
        let column = coordinate[1];
        // console.log('Testing:', emptyCell, coordinate, row, column)

        for (let value = 1; value < 10; value++) {
          // console.log('Testing value:', value);
          let rowCheck = this.checkRowPlacement(
            recursivePuzzleState.join(""),
            row,
            column,
            value
          );
          let colCheck = this.checkColPlacement(
            recursivePuzzleState.join(""),
            row,
            column,
            value
          );
          let regCheck = this.checkRegionPlacement(
            recursivePuzzleState.join(""),
            row,
            column,
            value
          );
          // console.log(rowCheck, colCheck, regCheck);
          if (
            rowCheck == "valid" &&
            colCheck == "valid" &&
            regCheck == "valid"
          ) {
            // console.log('Adding value to cell:', value, emptyCell);
            recursivePuzzleState[emptyCell] = value.toString();
            backtracker(recursivePuzzleState);
          }
        }

        // if cant find a valid value, set to '.'
        if (findEmptyCell(recursivePuzzleState) !== -1) {
          recursivePuzzleState[emptyCell] = ".";
        }
      };

      backtracker(initialPuzzleState);

      // console.log('Initial puzzle state was:', initialPuzzleState);
      // console.log('Ending updated puzzle state was:', recursivePuzzleState)

      updatedPuzzleString = recursivePuzzleState.join("");
      return { solution: updatedPuzzleString };
    }
  }
}

module.exports = SudokuSolver;
