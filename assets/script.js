$(document).ready(function(){
    for(var i = 0; i<30;i++){
        var letterBox = $("<div>")
        letterBox.attr("class", "letter-box")
        $(".letter-container").append(letterBox)
    }
var querty = ["Q", "W", "E", "R", "T","Y", "U","I","O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]

// var testKeyboardButton = document.createElement("div")
// testKeyboardButton.setAttribute("class", "keyboard-button container")
// console.log(testKeyboardButton)
// document.getElementById("keyboard-container").appendChild(testKeyboardButton)

function makeTopRowOFKeyboard (){
    for(var i = 0; i < 10;i++){
        keyboardButton = document.createElement("div")
        keyboardButton.setAttribute("class", "keyboard-button container")
        console.log(keyboardButton)
        keyboardButton.innerHTML = querty[i]
        
        document.getElementById("keyboard-row1").appendChild(keyboardButton)
    }
}
function makeMiddleRowOfKeyboard(){
    for(var i = 10; i < 19; i++){
        keyboardButton = document.createElement("div")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row2").appendChild(keyboardButton)
    }
}
function MakeBottomRowOfKeyboard(){
    var enterButton = document.createElement("div")
    enterButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    enterButton.innerHTML = "ENTER"
    document.getElementById("keyboard-row3").appendChild(enterButton)

    for(var i = 20; i <27; i++){
        var keyboardButton = document.createElement("div")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row3").appendChild(keyboardButton)
    }

    var deleteButton = document.createElement("div")
    deleteButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    deleteButton.innerHTML = "DEL"
    document.getElementById("keyboard-row3").appendChild(deleteButton)
}
//=================================================================================================

makeTopRowOFKeyboard()
makeMiddleRowOfKeyboard()
MakeBottomRowOfKeyboard()


})
