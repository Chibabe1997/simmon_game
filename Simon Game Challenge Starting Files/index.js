
let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let randomNumber;

let userClickedPattern = [];
var started = false;


var level = 0;

$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
   
});


function nextSequence() {
        randomNumber = Math.random();
        randomNumber = randomNumber * 4;
        randomNumber = Math.floor(randomNumber);
    //console.log(randomNumber);
    
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;
    $("#level-title").text("level " + level);
    userClickedPattern = [];
     //var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
     //audio.play();
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor) {
       $("#" + currentColor).addClass("pressed");
       setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
       }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log ("success");
    } if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
    


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    //var audio = new Audio("sounds/" + userChosenColor + ".mp3");
     //audio.play();
  });

nextSequence();
console.log(gamePattern);





   