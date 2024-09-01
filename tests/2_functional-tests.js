const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  // 1 Solve a puzzle with valid puzzle string: POST request to /api/solve
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function () {
    this.timeout(10000);
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle:
          "37....6...9..3..8..4...5.79..3..2..18.......39..5..7..65.9...3..3..1..2...2....97",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "solution",
          "response should contain solution property"
        );
        assert.equal(
          res.body.solution,
          "378249615596137284241865379763492851825671943914583762657924138439718526182356497",
          "solution should be correct"
        );
      });
  });

  // 2 Solve a puzzle with missing puzzle string: POST request to /api/solve
  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function () {
    chai
      .request(server)
      .post("/api/solve")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Required field missing",
          'error should be "Required field missing"'
        );
      });
  });

  // 3 Solve a puzzle with invalid characters: POST request to /api/solve
  test("Solve a puzzle with invalid characters: POST request to /api/solve", function () {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle:
          "!.0..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Invalid characters in puzzle",
          'error should be "Invalid characters in puzzle"'
        );
      });
  });

  // 4 Solve a puzzle with incorrect length: POST request to /api/solve
  test("Solve a puzzle with incorrect length: POST request to /api/solve", function () {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle:
          ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      }) // 80 chars
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long",
          'error should be "Expected puzzle to be 81 characters long"'
        );
      });
  });

  // 5 Solve a puzzle that cannot be solved: POST request to /api/solve
  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function () {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle:
          "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Puzzle cannot be solved",
          'error should be "Puzzle cannot be solved"'
        );
      });
  });

  // 6 Check a puzzle placement with all fields: POST request to /api/check
  test("Check a puzzle placement with all fields: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "7",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "response should contain valid property"
        );
        assert.equal(res.body.valid, true, "valid property should be true");
      });
  });

  // 7 Check a puzzle placement with single placement conflict: POST request to /api/check
  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "2",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "response should contain valid property"
        );
        assert.equal(res.body.valid, false, "valid property should be false");
        assert.property(
          res.body,
          "conflict",
          "response should contain conflict property"
        );
        assert.equal(
          res.body.conflict.length,
          1,
          "conflict property should contain only one value"
        );
        console.log(res.body.conflict);
        assert.include(
          res.body.conflict,
          "region",
          'conflict property should equal [ "region" ]'
        );
      });
  });

  // 8 Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "1",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "response should contain valid property"
        );
        assert.equal(res.body.valid, false, "valid property should be false");
        assert.property(
          res.body,
          "conflict",
          "response should contain conflict property"
        );
        assert.equal(
          res.body.conflict.length,
          2,
          "conflict property should contain two values"
        );
        assert.notStrictEqual(
          res.body.conflict,
          ["row", "column"],
          'conflict property should contain [ "row", "column" ]'
        ); // check order, perhaps use contain or shallow equal
      });
  });

  // 9 Check a puzzle placement with all placement conflicts: POST request to /api/check
  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "5",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "valid",
          "response should contain valid property"
        );
        assert.equal(res.body.valid, false, "valid property should be false");
        assert.property(
          res.body,
          "conflict",
          "response should contain conflict property"
        );
        assert.equal(
          res.body.conflict.length,
          3,
          "conflict property should contain three values"
        );
        assert.notStrictEqual(
          res.body.conflict,
          ["row", "column", "region"],
          'conflict property should contain [ "row", "column", "region" ]'
        ); // check order, perhaps use contain or shallow equal
      });
  });

  // 10 Check a puzzle placement with missing required fields: POST request to /api/check
  test("Check a puzzle placement with missing required fields: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Required field(s) missing",
          'error property should be "Required field(s) missing"'
        );
      });
  });

  // 11 Check a puzzle placement with invalid characters: POST request to /api/check
  test("Check a puzzle placement with invalid characters: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "!.0..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "5",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Invalid characters in puzzle",
          'error property should be "Invalid characters in puzzle"'
        );
      });
  });

  // 12 Check a puzzle placement with incorrect length: POST request to /api/check
  test("Check a puzzle placement with incorrect length: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "5",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long",
          'error property should be "Expected puzzle to be 81 characters long"'
        );
      });
  });

  // 13 Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A0",
        value: "5",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Invalid coordinate",
          'error property should be "Invalid coordinate"'
        );
      });
  });

  // 14 Check a puzzle placement with invalid placement value: POST request to /api/check
  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function () {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle:
          "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "0",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isObject(res.body, "response should be an object");
        assert.property(
          res.body,
          "error",
          "response should contain error property"
        );
        assert.equal(
          res.body.error,
          "Invalid value",
          'error property should be "Invalid value"'
        );
      });
  });
});
