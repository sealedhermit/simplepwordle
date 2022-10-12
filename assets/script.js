$(document).ready(function(){


const word = ["Q", "Q", "R", "T", "Y"]
var compareWord = [["Q","0"], ["Q","0"], ["R","0"], ["T","0"], ["Y","0"]]


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
        keyboardButton.setAttribute("id", "key-"+querty[i])
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row1").appendChild(keyboardButton)
    }
}
function makeMiddleRowOfKeyboard(){
    for(var i = 10; i < 19; i++){
        keyboardButton = document.createElement("button")
        keyboardButton.setAttribute("class", "keyboard-button container")
        keyboardButton.setAttribute("id", "key-"+querty[i])
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
        keyboardButton.setAttribute("id", "key-"+querty[i])
        keyboardButton.innerHTML = querty[i]
        document.getElementById("keyboard-row3").appendChild(keyboardButton)
    }

    var deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "keyboard-button container big-keyboard-button")
    deleteButton.setAttribute("id", "key-DEL")
    deleteButton.innerHTML = "DEL"
    document.getElementById("keyboard-row3").appendChild(deleteButton)
}
function checkForWin(){
    if (currentUserWord[0] == word[0][0]&&currentUserWord[1]==word[1][0]&&currentUserWord[2]==word[2][0] && currentUserWord[3]==word[3][0] && currentUserWord[4]==word[4][0]){

    }
}
function checkLetterForOrangeAndReturnIndex(letter){
    for(var i = 0; i < 5; i++){
        if(letter == compareWord[i][0] && compareWord[i][1]=="0"){
            return [true, i]
        }
    }
    return [false, false]
}


function checkForTrueMatches(){
    for(var i = 0;i<5;i++){
        document.getElementById("letter-box"+eval(currentGuess*5+i)).setAttribute("class", "letter-box") //
    }
    for (var i = 0; i < 5;i++){

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
function checkForOranges(){
   

    //TODO: shit is all fucked up
    for(var i = 0;i<5;i++){
        if((checkLetterForOrangeAndReturnIndex(currentUserWord[i])[0]==true) && currentUserWord[i] != compareWord[i][0]) {
            var hashtagIndex = checkLetterForOrangeAndReturnIndex(currentUserWord[i])[1]
            

            console.log(hashtagIndex)
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









    // //then for each leter of the user word
    // for(var i = 0; i<5; i++){
    //     //check each letter of the compare word
    //     for(var x = 0; x < 5;x++){
            // if((currentUserWord[i] == compareWord[x][0]) && (compareWord[x][1] =="0") && (currentUserWord[i] != compareWord[i][0])){
            //     compareWord[x][1] = "#"
                // document.getElementById("letter-box"+eval(currentGuess*5+i)).style.backgroundColor = "orange"
                // document.getElementById("letter-box"+eval(currentGuess*5+i)).style.color = "white"
                // document.getElementById("letter-box"+eval(currentGuess*5+1)).setAttribute("class","letter-box custom-orange")
            //     if(document.getElementById("letter-box"+eval(currentGuess*5+i)).className == "letter-box custom-green"){
                    
            //     }else{
            //         document.getElementById("key-"+currentUserWord[i]).style.backgroundColor = "orange"
            //         document.getElementById("key-"+currentUserWord[i]).style.color = "white"
            //         document.getElementById("key-"+currentUserWord[i]).setAttribute("class","letter-box custom-orange")

            //     }
                
              
            //  } 

    //     }
    // }

}
function checkForGrays(){
    for(var i = 0; i < 5; i++){
        if((document.getElementById("letter-box"+eval(currentGuess*5+i)).className == "letter-box custom-green"||
            document.getElementById("letter-box"+eval(currentGuess*5+i)).className == "letter-box custom-orange")){

        }else{
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.backgroundColor = "gray"
            document.getElementById("letter-box"+eval(currentGuess*5+i)).style.color = "white"
            document.getElementById("key-"+currentUserWord[i]).style.backgroundColor = "gray"
                    document.getElementById("key-"+currentUserWord[i]).style.color = "white"
        }
    }
}
function resetCompareWord(){
    for (var i = 0; i< 5; i++){
        compareWord[i][1] = "0"
    }
}



//================================When buttons are clicked======

document.getElementById("keyboard-container").addEventListener("click", function(event){
    var buttonClicked = event.target
    if(buttonClicked.tagName != "BUTTON"){
        return
    }
    if(buttonClicked.innerHTML == "DEL"){

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
        //check guess against word
        

        checkForWin()
        checkForTrueMatches()
        checkForOranges()
        checkForGrays()
        resetCompareWord()
        //compareWord = word
        currentGuess += 1
        currentUserWord = []
        return

    }
    if(currentUserWord.length >=5){
        return
    }

    currentBoxIndex = (currentGuess * 5)+currentUserWord.length
    document.getElementById("letter-box"+currentBoxIndex).innerHTML = buttonClicked.innerHTML
    currentUserWord.push(buttonClicked.innerHTML)
    





})


//=================================================================================================

drawLetterBoxes()
makeTopRowOFKeyboard()
makeMiddleRowOfKeyboard()
MakeBottomRowOfKeyboard()


})
