$(document).ready(function(){



var querty = ["Q", "W", "E", "R", "T","Y", "U","I","O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
var currentGuess = 0
var currentUserWord = []
var currentBoxIndex = 0

function drawLetterBoxes(){
    for(var i = 0; i<30;i++){
        var letterBox = $("<div>")
        letterBox.attr("class", "letter-box")
        letterBox.attr("id", "letter-box"+i)
        $(".letter-container").append(letterBox)
    }
}
function makeTopRowOFKeyboard (){
    for(var i = 0; i < 10;i++){
        keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.innerHTML = querty[i]
        
        document.getElementById("keyboard-row1").appendChild(keyboardButton)
    }
}
function makeMiddleRowOfKeyboard(){
    for(var i = 10; i < 19; i++){
        keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row2").appendChild(keyboardButton)
    }
}
function MakeBottomRowOfKeyboard(){
    var enterButton = document.createElement("button")
    enterButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    enterButton.setAttribute("id", "enter-button")
    enterButton.innerHTML = "ENTER"
    document.getElementById("keyboard-row3").appendChild(enterButton)

    for(var i = 20; i <27; i++){
        var keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row3").appendChild(keyboardButton)
    }

    var deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    deleteButton.innerHTML = "DEL"
    document.getElementById("keyboard-row3").appendChild(deleteButton)
}

//================================When buttons are clicked======

document.getElementById("keyboard-container").addEventListener("click", function(event){
    var buttonClicked = event.target
    console.log(buttonClicked.tagName)
    if(buttonClicked.tagName != "BUTTON"){
        return
    }
    if(buttonClicked.innerHTML == "DEL"){
        //TODO: write delete function
        if(currentUserWord.length == 0){
            return
        }
        currentUserWord.pop()
        document.getElementById("letter-box"+currentBoxIndex).innerHTML = ""
        currentBoxIndex -= 1
        
        return
    }
    if(buttonClicked.innerHTML == "ENTER"){
        //TODO: handle enter
        if(currentUserWord.length < 5){
            return
        }
        currentGuess += 1
        currentUserWord = []
        return
       
    }
    if(currentUserWord.length >=5){
        return
    }
    console.log(currentUserWord)
    currentBoxIndex = (currentGuess * 5)+currentUserWord.length
    console.log(document.getElementById("letter-box"+currentBoxIndex).innerHTML)
    document.getElementById("letter-box"+currentBoxIndex).innerHTML = buttonClicked.innerHTML
    currentUserWord.push(buttonClicked.innerHTML)





})


//=================================================================================================

drawLetterBoxes()
makeTopRowOFKeyboard()
makeMiddleRowOfKeyboard()
MakeBottomRowOfKeyboard()


})
