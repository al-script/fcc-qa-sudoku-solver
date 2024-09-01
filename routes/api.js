"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
      res.json({ error: "Required field(s) missing" });
    }

    let puzzle = req.body.puzzle;
    let coordinate = req.body.coordinate.split("");
    let row = coordinate[0].toUpperCase();
    let column = coordinate[1];
    let value = req.body.value;
    // console.log('Coordinate given:', coordinate, ' , Value given:', value);

    if (
      coordinate.length != 2 ||
      row.match(/[^A-I]/i) ||
      column.match(/[^1-9]/)
    ) {
      res.json({ error: "Invalid coordinate" });
    }
    if (value.match(/[^1-9]/)) {
      res.json({ error: "Invalid value" });
    }

    let validatedPuzzle = solver.validate(puzzle);
    if (validatedPuzzle != "validated") {
      res.json(validatedPuzzle);
    }

    let rowCheck = solver.checkRowPlacement(puzzle, row, column, value);
    let colCheck = solver.checkColPlacement(puzzle, row, column, value);
    let regCheck = solver.checkRegionPlacement(puzzle, row, column, value);
    // console.log('Checks:', 'rowCheck:', rowCheck, ', colCheck:', colCheck, ', regCheck', regCheck);

    let conflict = [];
    // console.log('Uninitiated conflict, expect []:', conflict);
    if (rowCheck === "invalid") {
      conflict.push("row");
    }
    // console.log('Conflict after rowCheck:', conflict, ', rowCheck was:', rowCheck);
    if (colCheck === "invalid") {
      conflict.push("column");
    }
    // console.log('Conflict after colCheck:', conflict, ', colCheck was:', colCheck);
    if (regCheck === "invalid") {
      conflict.push("region");
    }
    // console.log('Conflict after regCheck:', conflict, ', regCheck was:', rowCheck);
    // console.log('Conflict after 3 checks:', conflict);

    if (conflict.length === 0) {
      // console.log('Returning "valid:true"');
      res.json({ valid: true });
    } else {
      // console.log('Returning invalid, conflict was:', conflict)
      res.json({ valid: false, conflict: conflict });
    }
  });

  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;
    if (!puzzle) {
      res.json({ error: "Required field missing" });
    }

    let validatedPuzzle = solver.validate(puzzle);
    if (validatedPuzzle != "validated") {
      res.json(validatedPuzzle);
    }

    let solvedPuzzle = solver.solve(puzzle);
    res.json(solvedPuzzle);
  });
};
