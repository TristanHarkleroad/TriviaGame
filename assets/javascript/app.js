$(document).ready(function() {
  // Create a function that creates the start button and initial screen
  
  function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
    $(".mainArea").html(startScreen);
  }
  
  initialScreen();
  
  //Create a function, generateHTML(), that is triggered by the start button
  
  $("body").on("click", ".start-button", function(event){
    event.preventDefault();  // added line to test issue on GitHub Viewer

    generateHTML();
  
    timerWrapper();
  
  }); // Closes start-button click
  
  $("body").on("click", ".answer", function(event){
    //answeredQuestion = true;
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
      //alert("correct");
      console.log("right");
      clearInterval(theClock);
      generateWin();
    }
    else {
      //alert("wrong answer!");
      clearInterval(theClock);
      generateLoss();
    }
  }); // Close .answer click
  
  $("body").on("click", ".reset-button", function(event){
    
    resetGame();
  }); // Closes reset-button click
  
  });  //  Closes jQuery wrapper
  
  function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  //  change to 4000 or other amount
  }
  
  function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  //  change to 4000 or other amount
  }
  
  function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='images/incorrect.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); //  change to 4000 or other amount
  }
  
  function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);
  }
  
  function wait() {
    if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 10;
    timerWrapper();
    }
    else {
      finalScreen();
    }
  }
  
  function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(theClock);
        generateLossDueToTimeOut();
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  }
  
  function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Here are your results rookie!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
  }
  
  function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 10;
    generateHTML();
    timerWrapper();
  }
  
  var startScreen;
  var gameHTML;
  var counter = 10;

  var questionArray = [
    "What did Peggy Carter promise to Steve Rogers (Captain America) before he crashed Red Skull's bomber?",
   "What race is Ronan the Accuser?", 
   "Who ends up with the Aether after the events of 'Thor: The Dark World'?",
   "'Guardians of the Galaxy' director James Gunn confirmed via Twitter that the Orb holds which Infinity Stone?",
   "What was the final movie in Phase I of the Marvel Cinematic Universe?",
   "In which Marvel movie did Samuel L. Jackson first appear as Nick Fury?",
   "Who gives Loki his powerful scepter as a gift?",
   ' "You are deluded, Captain. You pretend to be a simple soldier, but in reality you are just afraid to admit that we have left humanity behind." '];

  var answerArray = [
  ["A dance"," A kiss", "Higher security clearance", "A date"], 
  ["Human","Kree","Skrull","Mutant"], 
  ["Thor", "Loki", "The Collector", "Starlord"], 
  ["The Mind Stone","The Soul Stone","The Power Stone","The Space Stone"], 
  ["Captain American: The Winter Soldier", "Iron Man II", "The Avengers", "Thor"], 
  ["Iron Man","The Incredible Hulk","Captain America","Guardians Of The Galaxy"], 
  ["Odin", "Thanos", "He steals it", "Tricks Nick Fury to giving it to him"], 
  ["Thanos","Ultron","The Winter Soldier","Red Skull"]];

  var imageArray = [
  "<img class='center-block img-right' src='../images/peggy.jpg'>", 
  "<img class='center-block img-right' src='../images/ronan.jpg'>", 
  "<img class='center-block img-right' src='../images/aether.jpg'>", 
  "<img class='center-block img-right' src='../images/purple.jpg'>",
  "<img class='center-block img-right' src='../images/avengers.jpg'>", 
  "<img class='center-block img-right' src='../images/nick.png'>", 
  "<img class='center-block img-right' src='../images/sceptre.jpg'>", 
  "<img class='center-block img-right' src='../images/skull.jpg'>"];

  var correctAnswers = [
  "A. A dance", 
  "B. Kree", 
  "C. The Collector", 
  "C. The Power Stone", 
  "D. The Avengers", 
  "A. Iron Man", 
  "B. Thanos", 
  "D. Red Skull"];

  var questionCounter = 0;
  var selecterAnswer;
  var theClock;
  var correctTally = 0;
  var incorrectTally = 0;
  var unansweredTally = 0;
  
  //What did Peggy Carter promise to Steve Rogers (Captain America) before he crashed Red Skull's bomber? A dance
  //What race is Ronan the Accuser? Kree
  //Who ends up with the Aether after the events of 'Thor: The Dark World'? The Collector
  //'Guardians of the Galaxy' director James Gunn confirmed via Twitter that the Orb holds which Infinity Stone? The Power Stone
  //What was the final movie in Marvel's "Phase I"? The Avengers
  //In which Marvel movie did Samuel L. Jackson first appear as Nick Fury? Iron man
  //Who gives Loki his powerful scepter as a gift? Thanos
  //"You are deluded, Captain. You pretend to be a simple soldier, but in reality you are just afraid to admit that we have left humanity behind." Red Skull