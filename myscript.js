console.log("Process Started !!");
var player1 = prompt("Enter your name player 1[Your Color will be blue]");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Enter your name player2[Your Color will be red]");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNumber, colNumber){
  console.log("Win Pos:");
  console.log(rowNumber);
  console.log(colNumber);
}
function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);
  for(var row = 5; row>=0; row--)
  {
    colorReport = returnColor(row, colIndex);
    if(colorReport === 'rgb(128, 128, 128)')
      return row;
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function horizontalWinCheck(){
  for(var row = 0; row<6; row++){
    for(var col=0;col<4; col++)
    {
      if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3)))
      {
        console.log("Horizontal Win");
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col = 0; col<7;col++)
  {
    for(var row = 0; row<3; row++)
    {
      if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col)))
      {
        console.log("Vertical Win");
        reportWin(row, col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}
function diagonalWinCheck(){
  for(var col=0; col<5; col++)
  {
    for(var row=0;row<7;row++)
    {
      if(colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3)))
      {
            console.log("Diagonal Win");
            reportWin(row, col);
            return true;
      }
      else if(colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3)))
      {
            console.log("Anti Diagonal Win");
            reportWin(row, col);
            return true;
      }
      else {
        continue;
      }
    }
  }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(currentName+" it is your turn pick a column to drop in!");


$('.board button').on('click', function(){

  var col = $(this).closest('td').index();

  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
  {
    $('h1').text(currentName + " You have Won !!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1;
  if(currentPlayer === 1)
  {
    currentName = player1;
    currentColor = player1Color;
    $('h3').text(currentName+ " it is your turn");
  }
  else {
    currentName = player2;
    currentColor = player2Color;
    $('h3').text(currentName+ " it is your turn");
  }
})
