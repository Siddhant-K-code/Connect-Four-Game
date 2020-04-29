function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var emptyGrid = [[{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}]];
var game = new Vue({
  el: "#game",
  data: function data() {
    return {
      grid: emptyGrid,
      redTurn: true,
      //if false, it's yellow's turn. Better to use a boolean than strings.
      gameOver: false
    };
  },
  //Prevent users from navigating away from a game accidentally
  mounted: function mounted() {
    var _this = this;

    window.onbeforeunload = function () {
      if (_this.areThereMoves) return "Are you sure you want to leave this game?"; //if we return nothing here (just calling return;) then there will be no pop-up question at all
    };
  },
  methods: {
    dropPiece: function dropPiece(e) {
      if (this.gameOver) return; //No more plays once the game is done

      var column = e.target.dataset.column;

      for (var i = this.grid.length - 1; i >= 0; i--) {
        if (!this.grid[i][column].color) {
          this.grid[i][column].color = this.currentTurnColor;
          this.refreshGrid();
          var isGameOver = this.victoryCheck();

          if (isGameOver) {
            this.gameOver = true;
          } else {
            this.switchTurn();
          }

          break;
        }
      }
    },
    handleMoveCursor: function handleMoveCursor(e, x) {
      var currentBtn = parseInt(e.target.dataset.column);
      if (!e.key) return; //Do nothing if we don't have an identified key press

      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        this.focusAdjacentBtn(e, currentBtn, 1);
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        this.focusAdjacentBtn(e, currentBtn, -1);
      } // Do nothing if the key pressed was not an arrow key

    },
    //Move focus to next or previous button
    focusAdjacentBtn: function focusAdjacentBtn(e, currentBtn, direction) {
      e.preventDefault();
      if (!direction) return;
      var adjacentBtn = document.querySelector("button[data-column=\"".concat(currentBtn + direction, "\"]"));

      if (adjacentBtn) {
        adjacentBtn.focus();
      } else if (direction > 0) {
        document.querySelector("button[data-column]").focus(); //wrap to beginning if at the end
      } else {
        document.querySelector("button[data-column=\"7\"]").focus(); //wrap to end if at the beginning
      }
    },
    //Helps prevent multiple "drop" cursors when hovering after a button has focus
    handleHover: function handleHover(e) {
      e.target.focus();
    },
    //Adds the "drop" indicator above a hovered column
    handleSlotHover: function handleSlotHover(e) {
      var column = e.target.dataset.column;
      document.querySelector("#button-board button[data-column=\"".concat(column, "\"]")).focus();
    },
    switchTurn: function switchTurn() {
      this.redTurn = !this.redTurn;
    },
    //Necessary to get Vue to recognize changes, because changes to an object in an array of objects won't trigger a re-render
    refreshGrid: function refreshGrid() {
      this.grid = _toConsumableArray(this.grid);
    },
    getPieceIcon: function getPieceIcon(color) {
      return color == "yellow" ? "⭐" : "🔴";
    },
    //Runs through all possible win scenarios (and some impossible) to see if the game is over
    victoryCheck: function victoryCheck() {
      var _this2 = this;

      var isGameOver = false; //Loop over every victory method (some impossible, to keep the code simple; hence the optional chaining)

      this.grid.forEach(function (row, rowIndex) {
        row.forEach(function (column, colIndex) {
          var _this2$grid, _this2$grid$rowIndex, _this2$grid$rowIndex2, _this2$grid2, _this2$grid2$rowIndex, _this2$grid2$rowIndex2, _this2$grid3, _this2$grid3$rowIndex, _this2$grid3$rowIndex2, _this2$grid4, _this2$grid5, _this2$grid5$colIndex, _this2$grid6, _this2$grid7, _this2$grid7$colIndex, _this2$grid8, _this2$grid9, _this2$grid9$colIndex, _this2$grid10, _this2$grid11, _this2$grid12, _this2$grid13, _this2$grid14, _this2$grid15, _this2$grid16, _this2$grid17, _this2$grid18, _this2$grid19, _this2$grid20, _this2$grid21, _this2$grid22, _this2$grid23, _this2$grid24, _this2$grid25, _this2$grid26, _this2$grid27;

          var slotColor = column.color; //If we already know the game is over, get outta there

          if (!slotColor || isGameOver) return;

          if ( //Horizontal row
          slotColor == ((_this2$grid = _this2.grid) === null || _this2$grid === void 0 ? void 0 : (_this2$grid$rowIndex = _this2$grid[rowIndex]) === null || _this2$grid$rowIndex === void 0 ? void 0 : (_this2$grid$rowIndex2 = _this2$grid$rowIndex[colIndex + 1]) === null || _this2$grid$rowIndex2 === void 0 ? void 0 : _this2$grid$rowIndex2.color) && slotColor == ((_this2$grid2 = _this2.grid) === null || _this2$grid2 === void 0 ? void 0 : (_this2$grid2$rowIndex = _this2$grid2[rowIndex]) === null || _this2$grid2$rowIndex === void 0 ? void 0 : (_this2$grid2$rowIndex2 = _this2$grid2$rowIndex[colIndex + 2]) === null || _this2$grid2$rowIndex2 === void 0 ? void 0 : _this2$grid2$rowIndex2.color) && slotColor == ((_this2$grid3 = _this2.grid) === null || _this2$grid3 === void 0 ? void 0 : (_this2$grid3$rowIndex = _this2$grid3[rowIndex]) === null || _this2$grid3$rowIndex === void 0 ? void 0 : (_this2$grid3$rowIndex2 = _this2$grid3$rowIndex[colIndex + 3]) === null || _this2$grid3$rowIndex2 === void 0 ? void 0 : _this2$grid3$rowIndex2.color) || //Vertical column
          slotColor == ((_this2$grid4 = _this2.grid) === null || _this2$grid4 === void 0 ? void 0 : (_this2$grid5 = _this2$grid4[rowIndex - 1]) === null || _this2$grid5 === void 0 ? void 0 : (_this2$grid5$colIndex = _this2$grid5[colIndex]) === null || _this2$grid5$colIndex === void 0 ? void 0 : _this2$grid5$colIndex.color) && slotColor == ((_this2$grid6 = _this2.grid) === null || _this2$grid6 === void 0 ? void 0 : (_this2$grid7 = _this2$grid6[rowIndex - 2]) === null || _this2$grid7 === void 0 ? void 0 : (_this2$grid7$colIndex = _this2$grid7[colIndex]) === null || _this2$grid7$colIndex === void 0 ? void 0 : _this2$grid7$colIndex.color) && slotColor == ((_this2$grid8 = _this2.grid) === null || _this2$grid8 === void 0 ? void 0 : (_this2$grid9 = _this2$grid8[rowIndex - 3]) === null || _this2$grid9 === void 0 ? void 0 : (_this2$grid9$colIndex = _this2$grid9[colIndex]) === null || _this2$grid9$colIndex === void 0 ? void 0 : _this2$grid9$colIndex.color) || //Diagonal ascending
          slotColor == ((_this2$grid10 = _this2.grid) === null || _this2$grid10 === void 0 ? void 0 : (_this2$grid11 = _this2$grid10[rowIndex - 1]) === null || _this2$grid11 === void 0 ? void 0 : (_this2$grid12 = _this2$grid11[colIndex + 1]) === null || _this2$grid12 === void 0 ? void 0 : _this2$grid12.color) && slotColor == ((_this2$grid13 = _this2.grid) === null || _this2$grid13 === void 0 ? void 0 : (_this2$grid14 = _this2$grid13[rowIndex - 2]) === null || _this2$grid14 === void 0 ? void 0 : (_this2$grid15 = _this2$grid14[colIndex + 2]) === null || _this2$grid15 === void 0 ? void 0 : _this2$grid15.color) && slotColor == ((_this2$grid16 = _this2.grid) === null || _this2$grid16 === void 0 ? void 0 : (_this2$grid17 = _this2$grid16[rowIndex - 3]) === null || _this2$grid17 === void 0 ? void 0 : (_this2$grid18 = _this2$grid17[colIndex + 3]) === null || _this2$grid18 === void 0 ? void 0 : _this2$grid18.color) || //Diagonal descending
          slotColor == ((_this2$grid19 = _this2.grid) === null || _this2$grid19 === void 0 ? void 0 : (_this2$grid20 = _this2$grid19[rowIndex + 1]) === null || _this2$grid20 === void 0 ? void 0 : (_this2$grid21 = _this2$grid20[colIndex + 1]) === null || _this2$grid21 === void 0 ? void 0 : _this2$grid21.color) && slotColor == ((_this2$grid22 = _this2.grid) === null || _this2$grid22 === void 0 ? void 0 : (_this2$grid23 = _this2$grid22[rowIndex + 2]) === null || _this2$grid23 === void 0 ? void 0 : (_this2$grid24 = _this2$grid23[colIndex + 2]) === null || _this2$grid24 === void 0 ? void 0 : _this2$grid24.color) && slotColor == ((_this2$grid25 = _this2.grid) === null || _this2$grid25 === void 0 ? void 0 : (_this2$grid26 = _this2$grid25[rowIndex + 3]) === null || _this2$grid26 === void 0 ? void 0 : (_this2$grid27 = _this2$grid26[colIndex + 3]) === null || _this2$grid27 === void 0 ? void 0 : _this2$grid27.color)) {
            isGameOver = true;
          }
        });
      });
      return isGameOver;
    },
    startNewGame: function startNewGame() {
      if (this.areThereMoves) {
        var areYouSure = confirm("Start a new game? This one will be lost four-ever :)");
        if (!areYouSure) return;
      }

      this.grid.forEach(function (row) {
        row.forEach(function (column) {
          column.color = null;
        });
      });
      this.refreshGrid();
      this.gameOver = false;
      this.redTurn = true;
    }
  },
  computed: {
    currentTurnColor: function currentTurnColor() {
      return this.redTurn ? "red" : "yellow";
    },
    message: function message() {
      if (this.isADraw) {
        return "<b style=\"color: inherit\">DRAW!</b>";
      } else if (this.gameOver) {
        return "<b class=\"".concat(this.currentTurnColor, "\">").concat(this.currentTurnColor, " WINS! \uD83C\uDF89</b>");
      } else {
        return "<b class=\"".concat(this.currentTurnColor, "\">").concat(this.currentTurnColor, "</b>\u2019s turn");
      }
    },
    //Monitor whether at least one move has been made
    areThereMoves: function areThereMoves() {
      var moves = false;
      this.grid.forEach(function (row) {
        row.forEach(function (column) {
          if (column.color) moves = true;
        });
      });
      return moves;
    },
    //Monitor whether the board is full and the game is not over
    isADraw: function isADraw() {
      var draw = true;
      this.grid.forEach(function (row) {
        row.forEach(function (column) {
          if (!column.color) draw = false;
        });
      });
      return draw;
    }
  }
});
