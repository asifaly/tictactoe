//code for tic tac toe
var isX = true;
var x = 'x';
var o = 'o';
var rows = new Array(3).fill(0).map(row => new Array(3).fill(0));
var cols = new Array(3).fill(0).map(row => new Array(3).fill(0));
var result;
$(document).ready(function () {
  $('.tile').click(function (e) {
    var rowid = e.target.id.split("").map(Number)[0];
    var colid = e.target.id.split("").map(Number)[1];
    if (this.innerHTML === x || this.innerHTML === o) {
      $(this).fadeOut('slow');
      $(this).fadeIn('slow');
    } else {
      if (isX) {
        makeChanges(this, x);
        result = checkResult(rowid, colid, o);
      } else {
        makeChanges(this, o);
        result = checkResult(rowid, colid, x);
      }
      isX = !isX;
    }
    if (result) {
      alert("Game Over");
      gameOver();
    }
    //insert x or o into the div, add classes and update array
    function makeChanges(elem, value) {
      elem.innerHTML = value;
      $(elem).addClass(value);
      rows[rowid][colid] = value;
      cols[colid][rowid] = value;
    }
  });
});

function check(val) {
  var checker = new RegExp(/val,val,val/, 'gi');
  if (rows.toString().search(checker) > 0 || cols.toString().search(checker) > 0) {
    return true;
  }
  if (rows.toString().search(/0/g) < -1) {
    return true;
  }
}
//Check if row, column or diagnol wins
function checkResult(rowid, colid,val) {
  //check rows
  if (rows[rowid].indexOf(val) == -1 && rows[rowid].indexOf(0) == -1) {
    return true;
  }
  //check col
  if (cols[colid].indexOf(val) == -1 && cols[colid].indexOf(0) == -1) {
    return true;
  }
  //check diagnol
  if (rows[1][1] !== 0) {
    //left to right
    if (rows[0][0] === rows[1][1] && rows[1][1] === rows[2][2]) {
      return true;
    }
    //right to left
    if (rows[0][2] === rows[1][1] && rows[1][1] === rows[2][0]) {
      return true;
    }
  }
  if (rows.toString().search(/0/g) < 0) {
    return true;
  }
  return false;
}

function gameOver() {
  $.each($('.tile'), function () {
    $(this).html("");
    $(this).removeClass('x');
    $(this).removeClass('o');
  });
  rows = new Array(3).fill(0).map(row => new Array(3).fill(0));
  cols = new Array(3).fill(0).map(row => new Array(3).fill(0));
  isX = true;
}
