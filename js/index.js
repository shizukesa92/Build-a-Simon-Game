$(document).ready(function(){

  var turn = 0,
      strict = 0,
      combination = [],
      userInput = [],
      proceed = 0,
      done = 0,
      timer,
      timer2;
  
  var colors = {
    b1: ["#00a74a", "#13ff7c"],
    b2: ["#9f0f17", "#ff4c4c"],
    b3: ["#cca707", "#fed93f"],
    b4: ["#094a8f", "#1c8cff"]
  }  
  
  function compareArray(a1, a2){
    return (a1.length == a2.length) && a1.every(function(element, index) {
      return element === a2[index]; 
    });
  }
  
  function compareArray2(a1, a2){
    return (a1.length == a2.length) && a1.every(function(element) {
      return a2.indexOf(element) !== -1; 
    });
  }
  
  function check(){
    
    timer = setTimeout(function(){

      var type = strict === 0 ? compareArray2(userInput, combination) : compareArray(userInput, combination);

      if (type){
        proceed = 1;
        done = 0;
        userInput = [];
      } else {
        proceed = 0;
        done = 0;
        userInput = [];
      }}, turn*5000);
    
  }
  
  
  function flash(z){
    function buttonFlashOn(buttonID, colorID){
      $(buttonID).css("background-color", colors[colorID][1]);
    }

    function buttonFlashOff(buttonID, colorID){
      $(buttonID).css("background-color", colors[colorID][0]);
    }
    
    //must use function() instead of buttonflashon(random) directly, otherwise the function will happen immediately. settimeout will not work
    setTimeout(function(){
      buttonFlashOn(combination[z], combination[z].slice(1));      
    }, 500);

    setTimeout(function(){
      buttonFlashOff(combination[z], combination[z].slice(1));
    }, 1000);
  }
  
  function randomizer(){
    
    var randomID = "#b" + (Math.floor(Math.random()*4)+1).toString();
    
    combination.push(randomID);
    $("#console").html(combination);
  }
 
  function playGame(){
    var x = 0;
    
    function flashInit(){

      flash(x);
      x++;

      if (x < turn){
        setTimeout(function(){
          flashInit();
        }, turn*1000);
      }
      
      if (x == turn){
        done = 1;
        userInput = [];   
        check();
      }
      
    }
    flashInit();
  }
  
  $(".buttons").click(function(){
    if (done === 0){
      return;
    }

    userInput.push("#" + this.id);
    clearTimeout(timer);
    check();
  });
  
  $("#start").click(function(){
    if (turn === 0){
      return;
    }
    
    if (proceed === 0){
      playGame();
      return;
    } 
    
    turn++;
    $("#count").html(turn);
    randomizer();
    playGame();
  });

  $("#switch").click(function(){
    turn == 0 ? (turn = 1, $("#on").css("left", "21px")) : (turn = 0, $("#on").css("left", "3px"), $("#count").html("--"));
    if (turn == 1){
      $("#count").html(turn);
      randomizer();
      playGame();
    }
  });

});

$("#strict").click(function(){
  strict = strict === 0 ? 1 : 0;
  
  if (strict == 1){
    $("#led").css("background-color", "#DC0D29");
  }
  
  if (strict === 0){
    $("#led").css("background-color", "#32050C");
  }
  
});