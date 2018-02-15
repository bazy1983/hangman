var categoryArray = ["Car make", "Fruit", "Country", "Female Celebrity", "Male Celebrity", "Animal", "Common phrase", "Song title"],
    itemArray = [
        ["Lamborghini", "Volkswagen", "General Motors", "Aston Martin", "Chevrolet", "Renault", "Tesla"],
        ["Cranberry", "Avocado", "Cantaloupe", "Lemon", "Papaya", "Watermelon", "Apricot"],
        ["Australia", "Canada", "Germany", "Algeria", "Azerbaijan", "Colombia", "Luxembourg"],
        ["Angelina Jolie", "Oprah Winfrey", "Megan Fox", "Rihanna", "Salma Hayek", "Charlize Theron", "Halle Berry"],
        ["Johnny Depp", "Brad Pitt", "Will Smith", "Hugh Jackman", "George Clooney", "Morgan Freeman", "Gabriel Iglesias"],
        ["Jellyfish", "Alligator", "Chameleon", "Hammerhead shark", "Koala", "Weasel", "Woodpecker"],
        ["Back to Square One", "A Piece of Cake", "Down To Earth", "clean as a whistle", "It's Not Rocket Science", "Making a Scene", "Needle In a Haystack"],
        ["Thriller", "I Wanna Dance With Somebody", "Baby One More Time", "Like a Prayer", "When Doves Cry", "Rolling in the Deep", "Call Me Maybe"]
    ],
    informationBubble = {
        helloStatement : "Hello, I'm your Information bubble, I'm your friend!",
        correctGuess: ["Awesome!", "Good job!", "Nicely done!"],
        wrongGuess: ["It's Okay, try again", "Oops!", "Things happen, you know!"],
        invalidKey: " is invalid input!"
    },
    wrongInput = [], //to store user wrong inputs
    matchInput = [], //to store matching letters
    randomCat = Math.floor(Math.random()*categoryArray.length),
    randomItem = Math.floor(Math.random()*7),
    computerThink = categoryArray[randomCat],
    computerPick = itemArray[randomCat][randomItem],
    wordContainer,
    gameResume = true //this will make the game keep going until it's over then will prevent logic from taking more inputs
    attempts = 9,
    //choiceArray will store chosen phrases into seperate words
    choiceArray = computerPick.toLowerCase().split(" "),
    wordLowerNoSpaces = computerPick.replace(/\s/g, "").toLowerCase(); //will remove spaces between words
    


document.getElementById ("category").textContent = computerThink; // output category item on top of screen


choiceArray.forEach(function(value){// loops through all items in the array

    //this will make a div for each word
    var div1 = document.createElement('div');
    div1.className = "wrap";
    

    //this will make div box for each character inside wrap div
    for(var i = 0; i < value.length; i++){
        var div2 = document.createElement('div');
        div2.className = "userBubble";
        div1.appendChild(div2); 
    };
    //creating wrap div inside of #gamebox div
    document.getElementById("gameBox").appendChild(div1);
});


//this will change star color that represent user remaining attempts
function starAttempt(x) {
    var star = document.getElementsByClassName("fas");
    star[x].classList.add("red");
};


//(event.keyCode >= 65 && event.keyCode <= 90)


document.onkeyup = function (event) {

    //the code will work only if the key is alphabetic character and user haven't won or lost the game
    if (event.keyCode >= 65 && event.keyCode <= 90 && gameResume || event.keyCode ===222) {
        var keyValue = event.key.toLowerCase(), //capture user input 
            wordIndex = wordLowerNoSpaces.indexOf(keyValue);
        var audio = new Audio('./media/stroke.wav');
        audio.play();

        if (attempts >=0){
                //loops through all the characters 
                // if key pressed matches letters in computerPick it will store 
                // key value to the div of the same index
            for(var x = 0; x < wordLowerNoSpaces.length; x++) {
                if (wordLowerNoSpaces[x] == keyValue) {
                    document.getElementsByClassName("userBubble")[x].textContent = keyValue;
                    matchInput[x] = keyValue //this will build array of all matching characters 
                    var y = Math.floor(Math.random()*3);
                    informationfunction(informationBubble.correctGuess[y]);
                    // if any wrong key pressed for first time and not found in the original word
                } else if (wrongInput.indexOf(keyValue) == -1 && wordLowerNoSpaces.indexOf(keyValue) == -1) { 
                    
                    wrongInput.push(keyValue);

                    //this will create div w/ style and the wrong character
                    var ele = document.createElement("div");
                    ele.className = "userBubble boxAlign";
                    ele.textContent = keyValue;
                    document.getElementById("wrongLetters").appendChild(ele);
                    var y = Math.floor(Math.random()*3);
                    informationfunction(informationBubble.wrongGuess[y]);
                    //excute this function to change star color
                    
                    starAttempt(attempts);
                    attempts--;
                        
                    };
            };
        } else { //LOSING the game
                document.getElementById("losing").classList.toggle("hidden");
                document.getElementById("losingText").classList.toggle("fadeIn");
                var audio = new Audio('./media/fail.mp3');
                audio.play();
                gameResume = false;
                document.getElementById("info").classList.add("hidden");
        };

        matchChecker()
    } else { // information bubble will display invalid input message
        var invalidInfo = event.key + informationBubble.invalidKey;
        informationfunction(invalidInfo);
    };
};
 
// will build a word from matchInput array and matches it to original word
function matchChecker (){
    wordContainer = ""
    for (var i = 0; i <matchInput.length; i++){
        if (matchInput[i] != undefined){ // this will remove empty values in the array
            wordContainer += matchInput[i];
        };
    };


    if (wordContainer === wordLowerNoSpaces){
        // WINNING the game
        document.getElementById("winning").classList.toggle("hidden");
        document.getElementById("stripe").classList.toggle("slide");
        var audio = new Audio('./media/tada.mp3');
        audio.play();
        gameResume = false;
        document.getElementById("info").classList.add("hidden");
    };
}
var audio = new Audio('./media/start.ogg');
        audio.play();

function reset() {
    window.location.reload()
}

function informationfunction(text) {
    
    document.getElementById("informationBubble").classList.add("expandWidth");
    setTimeout (function(){document.getElementById("informationBubble").classList.remove("expandWidth"); }, 3500)
    document.getElementById("informationText").textContent = text;
};

informationfunction(informationBubble.helloStatement);


