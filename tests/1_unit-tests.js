const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  // 1 Logic handles a valid puzzle string of 81 characters
  test("Logic handles a valid puzzle string of 81 characters", function () {
    let validPuzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.equal(
      solver.validate(validPuzzleString),
      "validated",
      "A puzzle string (that is 81 characters with only valid values) passed to the validate function of the solver returns validated"
    );
  });

  // 2 Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    let invalidCharactersPuzzleString =
      "!.0..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let validationLogic = solver.validate(invalidCharactersPuzzleString);
    let invalidCharacterError = { error: "Invalid characters in puzzle" };
    assert.property(
      validationLogic,
      "error",
      "The validation logic returns an object that has an error property"
    );
    assert.equal(
      validationLogic.error,
      invalidCharacterError.error,
      'The value of the error property in the returned object equals the string "Invalid characters in puzzle"'
    );
  });

  // 3 Logic handles a puzzle string that is not 81 characters in length
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    let invalidLengthPuzzleString =
      ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."; // 80 characters
    let validationLogic = solver.validate(invalidLengthPuzzleString);
    let invalidPuzzleLengthError = {
      error: "Expected puzzle to be 81 characters long",
    };
    assert.property(
      validationLogic,
      "error",
      "The validation logic returns an object that has an error property"
    );
    assert.equal(
      validationLogic.error,
      invalidPuzzleLengthError.error,
      'A puzzle string (that is not 81 characters in length) passed to the validate function of the solver returns the correct error object ({ "error": "Expected puzzle to be 81 characters long" })'
    );
  });

  // 4 Logic handles a valid row placement
  test("Logic handles a valid row placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "2";
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      "valid",
      'Row check function handles a valid row placement by returing the correct string: "valid"'
    );
  });

  // 5 Logic handles an invalid row placement
  test("Logic handles an invalid row placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "1";
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      "invalid",
      'Row check function handles an invalid row placement by returing the correct string: "invalid"'
    );
  });

  // 6 Logic handles a valid column placement
  test("Logic handles a valid column placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "2";
    assert.equal(
      solver.checkColPlacement(puzzleString, row, column, value),
      "valid",
      'Column check function handles a valid column placement by returing the correct string: "valid"'
    );
  });

  // 7 Logic handles an invalid column placement
  test("Logic handles an invalid column placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "1";
    assert.equal(
      solver.checkColPlacement(puzzleString, row, column, value),
      "invalid",
      'Column check function handles an invalid column placement by returing the correct string: "invalid"'
    );
  });

  // 8 Logic handles a valid region (3x3 grid) placement
  test("Logic handles a valid region placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "1";
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      "valid",
      'Region check function handles a valid region placement by returing the correct string: "valid"'
    );
  });

  // 9 Logic handles an invalid region (3x3 grid) placement
  test("Logic handles an invalid region placement", function () {
    let puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let row = "A";
    let column = "1";
    let value = "2";
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      "invalid",
      'Region check function handles an invalid region placement by returing the correct string: "invalid"'
    );
  });

  // 10 Valid puzzle strings pass the solver
  test("Valid puzzle strings pass the solver", function () {
    this.timeout(10000);
    let puzzleString =
      "37....6...9..3..8..4...5.79..3..2..18.......39..5..7..65.9...3..3..1..2...2....97";
    let solvedPuzzle = solver.solve(puzzleString);
    let expectedSolution = {
      solution:
        "378249615596137284241865379763492851825671943914583762657924138439718526182356497",
    };
    assert.property(
      solvedPuzzle,
      "solution",
      "The solution logic returns an object that has a solution property"
    );
    assert.equal(
      solvedPuzzle.solution,
      expectedSolution.solution,
      "A valid puzzle string passed into the solve function of solver equals the expected solution to the valid puzzle"
    );
  });

  // 11 Invalid puzzle strings fail the solver
  test("Invalid puzzle strings fail the solver", function () {
    let invalidPuzzleString =
      "............................................................1945....4.37.4.3..6..";
    let failedSolution = solver.solve(invalidPuzzleString);
    let unsolvablePuzzleError = { error: "Puzzle cannot be solved" };
    assert.property(
      failedSolution,
      "error",
      "The solution logic returns an object that has an error property"
    );
    assert.equal(
      failedSolution.error,
      unsolvablePuzzleError.error,
      'An invalid puzzle string when passed into the solve function of solver returns the object {"error":"Puzzle cannot be solved"}'
    );
  });

  // 12 Solver returns the expected solution for an incomplete puzzle, meaning... that is it is a valid puzzle string? how does this differ from the test above?
  test("Solver returns the expected solution for an incomplete puzzle", function () {
    let incompletePuzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    let solvedPuzzle = solver.solve(incompletePuzzle);
    let expectedSolution = {
      solution:
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625",
    };
    assert.property(
      solvedPuzzle,
      "solution",
      "The solution logic returns an object that has a solution property"
    );
    assert.equal(
      solvedPuzzle.solution,
      expectedSolution.solution,
      "An incomplete valid puzzle string passed into the solve function of solver equals the expected solution to the valid puzzle"
    );
  });
});
