//working code
//http://jsfiddle.net/a603smud/4/
//http://jsfiddle.net/a603smud/5/
$(document).ready(function(){
	createGrid(8);
});
var N = 8;
var solutionArray = [];
var chess = [
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0]
			];
function simulate(arr){
	var white= false;
	for(var i=0;i<N;i++){
	  white=!(white);
	  for(var j=0;j<N;j++){
  		if(white){
  			if(arr[i][j]==1)
    			$('#'+(i*N+j+1)).css("background-image","url(queen1.jpg)");
    		white = false;
  		}
  		else{
  			if(arr[i][j]==1)
  				$('#'+(i*N+j+1)).css("background-image","url(queen2.jpg)");
    		white = true;
  		}
	  }
	}
}
function removeSimulation(arr){
	var white= false;
	for(var i=0;i<N;i++){
	  white=!(white);
	  for(var j=0;j<N;j++){
	  	if(white){
	    	$('#'+(i*N+j+1)).css("background-color","white");
     		$('#'+(i*N+j+1)).css('background-image', 'none');
	    	white = false;
	  	}
	    else{
	    	$('#'+(i*N+j+1)).css("background-color","black");
	    	$('#'+(i*N+j+1)).css('background-image', 'none');
	    	white = true;
	    }
	  }
	}
}
function check(row,col){
	for(var i=row-1;i>=0;i--){
	  if(chess[i][col]==1)
	    return false;
	}
	for(var i=row-1,j=col-1;i>=0 && j>=0;i--,j--){
	  if(chess[i][j]==1)
	    return false;
	}
	for(var i=row-1,j=col+1;i>=0 && j<N;i--,j++){
	  if(chess[i][j]==1)
	    return false;
	}
	return true;
}
function placeQueen(row){
	for(var i=0;i<N && row<N;i++){
	  chess[row][i] = 1;
	  var temp = row*8+i+1;
	  if(check(row,i)){
	    if(row==N-1){
	      var tempArray = JSON.parse(JSON.stringify(chess));
	      solutionArray.push(tempArray);
	    }
	    else{
	      placeQueen(row+1);
	    }
	  }
	  chess[row][i]=0;
	}
}
function simulatioUtility(){
	var counter=0;
    var myVar = setInterval(function(){ 
    	simulate(solutionArray[counter++]);
    	if(counter>=92){
    		clearInterval(myVar);
    	    var child = $("<div class='child'></div>");
    	    child.css("position", "absolute");
    	    child.css("top", "180px");
    	    child.css("right", "0");
    	    child.css("bottom", "0");
    	    child.css("left", "180px");
    	    child.css("opacity", ".9");
    	    child.css("background-image", "url(play2.png)");
    	    child.css("background-repeat", "no-repeat");
    	    $("#gameArea").append(child);
    	    $(".child").click(function(){
    	    	setTimeout(function(){
    	    		$(".child").remove();
    	    		simulatioUtility();
    	    	},1200);
	    	    var c=0;
	    	    $('.child').css("background-image", "url(loadCat3.gif)");
    	    });
    	}
    	setTimeout(function(){
    		removeSimulation(solutionArray[counter]);
    	},800);
    }, 1000);
}
function main() { 
    placeQueen(0);
    simulatioUtility();
}
function createGrid(n){
	var gameArea = $("#gameArea");
	var table = $("<table></table>");
	var k=1;
	for(var i=0;i<n;i++){
		var row = $("<tr></tr>");
		for(var j=0;j<n;j++){
			row.append("<td id="+ k + "></td>");
			k++;
		}
		table.append(row);
	}
	gameArea.append(table);
	removeSimulation();
	main();
}