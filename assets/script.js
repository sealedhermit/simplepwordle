// $(document).ready(function(){


let possibleWordGuessesArray = possibleWordGuessesUnparesed.split(" ")
let wordAsString = "SHIRT"
let currentWordleNumber = 128  //<---------Change wordle number here


if (usedWords.includes(wordAsString)){
    console.log(`${wordAsString} has already been used!`)
} else {console.log(`${wordAsString} has not been used!`)}
let word = []
word = wordAsString.split("")
  
let compareWord = [["!","0"], ["!","0"], ["!","0"], ["!","0"], ["!","0"]]
for(let i = 0; i < word.length; i++){
    compareWord[i][0] = word[i]
}

const querty = ["Q", "W", "E", "R", "T","Y", "U","I","O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
let currentGuess = 0
let currentUserWord = []
let currentBoxIndex = 0

let oldWordleNumber = JSON.parse(localStorage.getItem("wordleNumber"))
if(currentWordleNumber != oldWordleNumber){
    localStorage.clear()
    }

let topHeader = document.getElementById("top-header")
topHeader.textContent = "Mike's Wordle! #"+currentWordleNumber

let shareButton = document.createElement("button")
shareButton.setAttribute("id", "share-button")
document.getElementById("top-header").appendChild(shareButton)
shareButton.style.display = "none"



//fifteen random words
for (let i = 0; i < 15; i++){
    console.log(possibleWordGuessesArray[Math.floor(Math.random()*possibleWordGuessesArray.length)])
}

const greenTile = "🟩"
const orangeTile = "🟨"
const whiteTile = "⬜"
    
function makeTilesForSharing(){
    let tilesString = "Mike's Wordle #"+currentWordleNumber+"\n"
    let count =0
    for(let i = 0; i < 30; i++){
        count += 1
        if(document.getElementById("letter-box"+i).classList.contains("custom-green")){
            tilesString += greenTile
        }else if(document.getElementById("letter-box"+i).classList.contains("custom-orange")){
            tilesString += orangeTile
        }else if(document.getElementById("letter-box"+i).classList.contains("custom-gray")){
            tilesString += whiteTile
        }else {
            return tilesString
        }
        if(count % 5 == 0){
            tilesString = tilesString+"\n"
        }
    }
    return tilesString
}
function makeShareButton(){
    shareButton.textContent = "Share"
    shareButton.style.display = "inline"
    document.getElementById("top-header").appendChild(shareButton)
}
function drawLetterBoxes(){
    for(let i = 0; i<30;i++){
        let letterBox = $("<div>")
        letterBox.attr("class", "letter-box")
        letterBox.attr("id", "letter-box"+i)
        $(".letter-container").append(letterBox)
    }
}
function makeTopRowOFKeyboard (){
    for(let i = 0; i < 10;i++){
        keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.setAttribute("id", "key-"+querty[i])
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row1").appendChild(keyboardButton)
    }
}
function makeMiddleRowOfKeyboard(){
    for(let i = 10; i < 19; i++){
        keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.setAttribute("id", "key-"+querty[i])
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row2").appendChild(keyboardButton)
    }
}
function MakeBottomRowOfKeyboard(){
    let enterButton = document.createElement("button")
    enterButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    enterButton.setAttribute("id", "enter-button")
    enterButton.innerHTML = "ENTER"
    document.getElementById("keyboard-row3").appendChild(enterButton)

    for(let i = 20; i <27; i++){
        let keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.setAttribute("id", "key-"+querty[i])
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row3").appendChild(keyboardButton)
    }

    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    deleteButton.setAttribute("id", "key-DEL")
    deleteButton.innerHTML = "DEL"
    document.getElementById("keyboard-row3").appendChild(deleteButton)
}
function checkForValidGuess(){
    let wordString = currentUserWord.join("")
    if(possibleWordGuessesArray.includes(wordString)){
        topHeader.textContent = "Mike's Wordle! #"+currentWordleNumber
        return true
    }else {
        topHeader.textContent = "Not a Valid Guess"
        return false
    }
}
function checkForWin(){
    if (currentUserWord[0] == word[0][0]&&currentUserWord[1]==word[1][0]&&currentUserWord[2]==word[2][0] && currentUserWord[3]==word[3][0] && currentUserWord[4]==word[4][0]){    
        removeKeyboardListener()
        removeClickListener()
        if(currentGuess == 0){
            topHeader.innerHTML = "You Won in 1 Guess!!<br/>"
            makeShareButton()
        }
        else{
            topHeader.innerHTML = "You Won in "+(currentGuess+1)+" Guesses!<br/>"
            makeShareButton()
        }
    }else if(currentGuess >= 5){
            topHeader.innerHTML = "You Lose!! Bummer! The word was "+wordAsString+'<br/>'
             makeShareButton()
    }
}
function checkLetterForOrangeAndReturnIndex(letter){
    for(let i = 0; i < 5; i++){
        if(letter == compareWord[i][0] && compareWord[i][1]=="0"){
            return [true, i]
        }
    }
    return [false, false]
}
//color code green squares after guess
function checkForTrueMatches(){
    for(let i = 0;i<5;i++){
        document.getElementById("letter-box"+eval(currentGuess*5+i)).setAttribute("class", "letter-box") //
    }
    for (let i = 0; i < 5;i++){

        if(currentUserWord[i] == compareWord[i][0]){
            compareWord[i][1] = "*"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).setAttribute("class", "letter-box custom-green")
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.backgroundColor = "green"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.color = "white"


            document.getElementById("key-"+currentUserWord[i]).style.backgroundColor = "green"
            document.getElementById("key-"+currentUserWord[i]).style.color = "white"

            document.getElementById("key-"+currentUserWord[i]).setAttribute("class","keyboard-button container custom-green")  
            
        }
    }

}
//color code orange quares after guess, but don't change keyboard button color if it was already green
function checkForOranges(){
    for(let i = 0;i<5;i++){
        if((checkLetterForOrangeAndReturnIndex(currentUserWord[i])[0]==true) && currentUserWord[i] != compareWord[i][0]) {
            let hashtagIndex = checkLetterForOrangeAndReturnIndex(currentUserWord[i])[1]
            
            compareWord[hashtagIndex][1] = "#"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.backgroundColor = "orange"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.color = "white"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).setAttribute("class","letter-box custom-orange")
            if(document.getElementById("key-"+currentUserWord[i]).className == "keyboard-button container custom-green"){
                    
            }else{
                document.getElementById("key-"+currentUserWord[i]).style.backgroundColor = "orange"
                document.getElementById("key-"+currentUserWord[i]).style.color = "white"
                document.getElementById("key-"+currentUserWord[i]).setAttribute("class","keyboard-button container custom-orange")

            }
        }
    }

}
//color code gray squares, but dont override orange or green keyboard buttons
function checkForGrays(){
    for(let i = 0; i < 5; i++){
        if((document.getElementById("letter-box"+eval(currentGuess*5+i)).className == "letter-box custom-green"||
            document.getElementById("letter-box"+eval(currentGuess*5+i)).className == "letter-box custom-orange")){

        }else{
            document.getElementById("letter-box"+eval(currentGuess*5+i)).setAttribute("class","letter-box custom-gray")
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.backgroundColor = "gray"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.color = "white"
            

            if(document.getElementById("key-"+currentUserWord[i]).className == "keyboard-button container custom-green"
            || document.getElementById("key-"+currentUserWord[i]).className == "keyboard-button container custom-orange"){
                    
            }else{
                document.getElementById("key-"+currentUserWord[i]).style.backgroundColor = "gray"
                document.getElementById("key-"+currentUserWord[i]).style.color = "white"
                document.getElementById("key-"+currentUserWord[i]).setAttribute("class","keyboard-button container custom-gray")

            }
            document.getElementById("key-"+currentUserWord[i]).style.color = "white"
        }
    }
}
//each guess starts with a fresh compare word
function resetCompareWord(){
    for (let i = 0; i< 5; i++){
        compareWord[i][1] = "0"
    }
}
function buttonsClicked (e){
    let buttonClicked = event.target
    if(buttonClicked.tagName != "BUTTON"){
        return
    }
    //delete button
    if(buttonClicked.innerHTML == "DEL"){
        topHeader.textContent = "Mike's Wordle! #"+currentWordleNumber
        if(currentUserWord.length == 0){
            return
        }
        currentUserWord.pop()
        document.getElementById("letter-box"+currentBoxIndex).innerHTML = ""
        currentBoxIndex -= 1
        return
    }
    //enter button
    if(buttonClicked.innerHTML == "ENTER"){

        if(currentUserWord.length < 5){
            return
        }
        //check guess against word
        if(checkForValidGuess()){
        checkForValidGuess()
        checkForWin()
        checkForTrueMatches()
        checkForOranges()
        checkForGrays()
        //insert local storage here
        storeGuess()
        resetCompareWord()
        //compareWord = word
        currentGuess += 1
        currentUserWord = []
        return
        }
        

    }
    if(currentUserWord.length >=5){
        return
    }
    //if letter button is clicked
    currentBoxIndex = (currentGuess * 5)+currentUserWord.length
    document.getElementById("letter-box"+currentBoxIndex).innerHTML = buttonClicked.innerHTML
    currentUserWord.push(buttonClicked.innerHTML)
}
function removeClickListener(){
    document.getElementById("keyboard-container").removeEventListener("click", buttonsClicked)
}
function storeGuess(){
    let array = []
    for(let i = 0; i <= currentBoxIndex; i++){
        array.push(document.getElementById("letter-box"+i).innerHTML)
    }
    localStorage.setItem("guess", JSON.stringify(array))
    localStorage.setItem("wordleNumber", JSON.stringify(currentWordleNumber))
}
function loadGuess(){
    
    let oldGuesses = JSON.parse(localStorage.getItem("guess"))
    if (oldGuesses == null){
        return
    }
    for (let i = 0; i < oldGuesses.length; i++){
        if((i + 1)%5 == 0){
            currentBoxIndex = (currentGuess * 5)+currentUserWord.length
            document.getElementById("letter-box"+currentBoxIndex).innerHTML = oldGuesses[i]
            currentUserWord.push(oldGuesses[i])
            if(checkForValidGuess()){
                checkForValidGuess()
                checkForWin()
                checkForTrueMatches()
                checkForOranges()
                checkForGrays()
                //insert local storage here
                storeGuess()
                resetCompareWord()
                //compareWord = word
                currentGuess += 1
                currentUserWord = []
                
                }
        }else{
            currentBoxIndex = (currentGuess * 5)+currentUserWord.length
            document.getElementById("letter-box"+currentBoxIndex).innerHTML = oldGuesses[i]
            currentUserWord.push(oldGuesses[i])
        }
    }


}

//================================screen click event listener======

document.getElementById("keyboard-container").addEventListener("click", buttonsClicked)
    //=============================================Share button
    $('#share-button').on('click', () => {
        let tileText  = makeTilesForSharing()
        if (navigator.share) {
          navigator.share({
              title: "Results From Mike's Wordle:",
              text: tileText,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
          console.log('Share not supported on this browser, do it the old way.');
        }
      });
//===========================Keyboard event listener===========================================
function keyboardLetterPress(e){
    let keyPressed = event.key.toUpperCase()
    if(keyPressed == "BACKSPACE"){
        topHeader.textContent = "Mike's Wordle! #"+currentWordleNumber
        if(currentUserWord.length == 0){
            return
        }
        currentUserWord.pop()
        document.getElementById("letter-box"+currentBoxIndex).innerHTML = ""
        currentBoxIndex -= 1
        return
    }
    if(keyPressed == "ENTER"){
        if(currentUserWord.length < 5){
            return
        }
        //check guess against compare wordword
        if(checkForValidGuess()){
            checkForValidGuess()
        checkForWin()
        checkForTrueMatches()
        checkForOranges()
        checkForGrays()
        storeGuess()
        resetCompareWord()
        //compareWord = word
        currentGuess += 1
        currentUserWord = []
        return
        }
    }
    if(currentUserWord.length >=5){
        return
    }
    if(querty.includes(keyPressed)){
    
    currentBoxIndex = (currentGuess * 5)+currentUserWord.length
    document.getElementById("letter-box"+currentBoxIndex).innerHTML = keyPressed
    currentUserWord.push(keyPressed)
    }
}
function removeKeyboardListener(){
    document.removeEventListener("keydown", keyboardLetterPress)
}
document.addEventListener("keydown", keyboardLetterPress)
//==================================Page Laod===========================================================

drawLetterBoxes()
makeTopRowOFKeyboard()
makeMiddleRowOfKeyboard()
MakeBottomRowOfKeyboard()
loadGuess()


// })
