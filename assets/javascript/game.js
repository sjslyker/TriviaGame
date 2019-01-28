var Questions = [{
    question: "How many points does a compass have?",
    answerChoices: ["40", "28", "32", "7"],
    answer: 2
},{
    question: "Who wrote a series of novels about orcs, hobbits, goblins and elves?",
    answerChoices: ["J.K. Rowling", "J.R.R. Tolkien", "George Lucas", "Dr. Suess"],
    answer: 1
},{
    question: "Which hormone controls the supply of sugar between muscles and blood? ",
    answerChoices: ["Insulin", "Zyrtec", "Dextromethorphan", "Testosterone"],
    answer: 0
},{
    question: "In Japanese, what is the word for goodbye?",
    answerChoices: ["Kon'nichiwa", "Sayonara", "Ohayou Gozaimasu", "Hisashiburi"],
    answer: 1
},{
    question: "How many strings does a cello have?",
    answerChoices: ["6", "3", "8", "4"],
    answer: 3
},{
    question: "What is the average temperature of the human body, in degrees centigrade?",
    answerChoices: ["33", "37", "98", "35"],
    answer: 1
},{
    question: "What is rum distilled from?",
    answerChoices: ["Sugar cane", "Potatos", "Coconut", "Fruit"],
    answer: 0
},{
    question: "What were the names of the two mythological children who were raised by a wolf in Italy?",
    answerChoices: ["Bert and Ernie", "Cain and Abel", "Hector and Paris", "Romulus and Remus"],
    answer: 3
},{
    question: "How many symphonies did Beethoven compose?",
    answerChoices: ["13", "21", "9", "16"],
    answer: 2
},{
    question: "What Building is at 1600 Pennsylvania Avenue?",
    answerChoices: ["The First McDonalds", "Wayne Manor", "The White House", "Sears Tower"],
    answer: 2
}];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var answered;
var seconds;
var time;
var userSelection;
var messages = {
    correct: "Yes, that is correct!",
    incorrect: "No, that is not correct.",
    endTime: "Time's Up!",
    endGame: "You completed the quiz, Let's see the resutls."
}

$('#startButton').on('click', function(){
    $(this).hide();
    newGame();
});

$('#strtOver').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#lastMessage').empty();
    $('#correctGuess').empty();
    $('#incorrectGuess').empty();
    $('#didntAnswer').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
    console.log("buttonclikced");
}

function newQuestion(){
    $('#messageText').empty();
    $('#realAnswer').empty();
    answered = true;

    $('#crntQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
    $('.question').html('<h2>' + Questions[currentQuestion].question + '<h2>');
    for (var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(Questions[currentQuestion].answerChoices[i]);
        choices.attr({'data-index': i });
        choices.addClass('currentChoice');
        $('.answerChoices').append(choices);
    }

    // ----------------- Below does not work but I wish to keep it for future reference. --------------------
    // for (var i = 0; i < 4; i++){
    //     var choices = Questions[currentQuestion].answerChoices[i];
    //     $('.answerChoices').append('<h4 class=allAnswers id=' + i + '>' + answerChoices + '</h4>');
    // }

    countdown();
    $('.currentChoice').on('click', function(){
        userSelection = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown(){
    seconds = 30;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#crntQuestion').empty();
	$('.currentChoice').empty();
    $('.question').empty();
    
    var correctAnswerText = Questions[currentQuestion].answerChoices[Questions[currentQuestion].answer];
    var correctAnswerIndex = Questions[currentQuestion].answer;

    if ((userSelection === correctAnswerIndex) && (answered === true)){
        correctAnswer++;
        $('#messageText').html(messages.correct);
    } else if ((userSelection != correctAnswerIndex) && (answered === true)){
        incorrectAnswer++;
        $('#messageText').html(messages.incorrect);
        $('#realAnswer').html('The correct answer was: ' + correctAnswerText);
    } else { 
        unanswered++;
        $('#messageText').html(messages.endTime);
        $('#realAnswer').html('The correct answer was: ' + correctAnswerText);
        answered = true;
    }

    if(currentQuestion == (Questions.length-1)){
		setTimeout(scoreboard, 3000);
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#messageText').empty();
	$('#realAnswer').empty();

	$('#lastMessage').html(messages.finished);
	$('#correctGuess').html("Correct Answers: " + correctAnswer);
	$('#incorrectGuess').html("Incorrect Answers: " + incorrectAnswer);
	$('#didntAnswer').html("Unanswered: " + unanswered);
	$('#strtOver').addClass('reset');
	$('#strtOver').show();
	$('#strtOver').html('Start Over?');
}
