$(document).ready(function () {
    
    var options = [
        {
            question: "In what year was Captain America born?",
            choice: ["1912", "1948", "1920", "1935"],
            answer: 2,
            photo: "assets/images/captain-america.gif"
        },
        {
            question: "Who was the enemy in first Avenger's movie?",
            choice: ["Loki", "Thanos", "Doomsday", "Kree"],
            answer: 0,
            photo: "assets/images/loki.gif"
        },
        {
            question: "What is Iron Man's nickname for Thor?",
            choice: ["Ice Man", "Point Break", "God of Thunder", "Strongest Avenger"],
            answer: 1,
            photo: "assets/images/thor.gif"
        },
        {
            question: "What is the name of T'Challa's sister?",
            choice: ["T'Chaka", "Shuri", "Shaka", "okoye"],
            answer: 1,
            photo: "assets/images/shuri.gif"
        },
        {
            question: "How many 'Infinity Stones' are said to exist in the Marvel Cinematic Universe?",
            choice: ["12", "6", "20", "13"],
            answer: 1,
            photo: "assets/images/stone.gif"
        },
        {
            question: "In which Marvel movie did Samuel L. Jackson first appear as Nick Fury?",
            choice: ["Iron Man 2", "Thor", "The Incredible Hulk", "Iron Man"],
            answer: 3,
            photo: "assets/images/iron-man.gif"
        },
        {
            question: "In 'The Avengers,' what S.H.I.E.L.D. agent does Black Widow say first brought her into the fold?",
            choice: ["Hawkeye", "Agent Coulson", "Peggy Carter", "Nick Furry"],
            answer: 0,
            photo: "assets/images/black-widow.gif"
        },
        {
            question: "Which of these phrases did the Hulk NOT say?",
            choice: ["Leave me alone", "Betty", "Hulk is the strongest one there is", "Hulk smash"],
            answer: 2,
            photo: "assets/images/hulk.gif"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    //music clip
    var marvelSound = new Audio("./assets/sound/marvel-intro-music.mp3");
    $(document).ready(function() {
        marvelSong.play();
    });
   
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //display question and loop through answers
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    }
    
    
    //display answers and loop through questions
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })