let squares = document.getElementsByClassName("board-square")
let board = document.getElementById("board")
let round_number = 0
let player_turn = 0

let set_square_contents = (e) => {
    e.target.className = "board-square ×"
    remove_square_listeners(set_square_contents)
    if (check_board() == -1 && document.getElementById("player-score").firstElementChild.innerHTML == "PLAYER"){ //winner is not found on board 
        setTimeout(computer_turn, 400) //delay computer move by 400ms
    } else{
        for (let i = 0; i < squares.length; i++){
            squares[i].removeEventListener("click", set_square_contents)
        }
        player2_turn()
    }
}

let set_player2_square = (e) => {
    e.target.className = "board-square ⚬"
    remove_square_listeners(set_player2_square)
    if (check_board() == -1){ //winner is not found on board 
        for (let i = 0; i < squares.length; i++){
            squares[i].removeEventListener("click", set_player2_square)
        }
        player1_turn()
    }
}

let add_square_listeners = (event_listener) => {
    for (let i=0; i<squares.length; i++){
        if ((!squares[i].classList.contains("⚬")) && (!squares[i].classList.contains("×"))){ //checking that the square does not already contain an element
            squares[i].addEventListener("click", event_listener)
        }
    }
}

let remove_square_listeners = (event_listener) => {
    for (let i=0; i<squares.length; i++){
        squares[i].removeEventListener("click", event_listener)
    }
}

let check_rows = () => {
    for (let i=0; i<9; i+=3){
        if (squares[i].classList.contains("×") && squares[i+1].classList.contains("×") && squares[i+2].classList.contains("×")){
            winner("user", i, i+1, i+2)
            return 0
        } else if (squares[i].classList.contains("⚬") && squares[i+1].classList.contains("⚬") && squares[i+2].classList.contains("⚬")){
            winner("computer", i, i+1, i+2)
            return 0
        } 
    }
    return -1
}

let check_columns = () => {
    for (let i=0; i<3; i++){
        if (squares[i].classList.contains("×") && squares[i+3].classList.contains("×") && squares[i+6].classList.contains("×")){
            winner("user", i, i+3, i+6)
            return 0
        } else if (squares[i].classList.contains("⚬") && squares[i+3].classList.contains("⚬") && squares[i+6].classList.contains("⚬")){
            winner("computer", i, i+3, i+6)
            return 0
        }
    }
    return -1
}

let check_diagonals = () => {
    if (squares[0].classList.contains("×") && squares[4].classList.contains("×") && squares[8].classList.contains("×")){
        winner("user", 0, 4, 8) 
    } else if (squares[0].classList.contains("⚬") && squares[4].classList.contains("⚬") && squares[8].classList.contains("⚬")){
        winner("computer", 0, 4, 8)
    } else if (squares[2].classList.contains("×") && squares[4].classList.contains("×") && squares[6].classList.contains("×")){
        winner("user", 2, 4, 6)
    } else if (squares[2].classList.contains("⚬") && squares[4].classList.contains("⚬") && squares[6].classList.contains("⚬")){
        winner("computer", 2, 4, 6)
    } else {
        return -1
    }
}

let computer_move = (i) => {
    let move_made = false  
    if (squares[i].classList == "board-square" && document.getElementById("player-score").firstElementChild.innerHTML == "PLAYER"){
        squares[i].classList.add("⚬")
        move_made = true 
    }
    return move_made
}

let two_column_check = (symbol) => {
    for (let i = 0; i<3; i++){
        if ((squares[i].classList.contains(symbol)) && (squares[i+3].classList.contains(symbol))){
            if (computer_move(i+6)){
                return true 
            }
        }
        else if ((squares[i].classList.contains(symbol)) && (squares[i+6].classList.contains(symbol))){
            if (computer_move(i+3)){
                return true 
            }
        }
        else if ((squares[i+3].classList.contains(symbol)) && (squares[i+6].classList.contains(symbol))){
            if (computer_move(i)){
                return true 
            }
        }
    }
}

let two_row_check = (symbol) => {
    for (let i=0; i<9; i+=3){
        if ((squares[i].classList.contains(symbol)) && (squares[i+1].classList.contains(symbol))){
            if (computer_move(i+2)){
                return true 
            }
        }
        else if ((squares[i].classList.contains(symbol)) && (squares[i+2].classList.contains(symbol))){
            if (computer_move(i+1)){
                return true 
            }
        }
        else if ((squares[i+1].classList.contains(symbol)) && (squares[i+2].classList.contains(symbol))){
            if (computer_move(i)){
                return true 
            }
        }
    }
}

let two_diagonal_check = (symbol) => {
    if ((squares[0].classList.contains(symbol)) && (squares[4].classList.contains(symbol))){
        if (computer_move(8)){
            return true 
        }
    }
    else if ((squares[0].classList.contains(symbol)) && (squares[8].classList.contains(symbol))){
        if (computer_move(4)){
            return true 
        }
    }
    else if ((squares[4].classList.contains(symbol)) && (squares[8].classList.contains(symbol))){
        if (computer_move(0)){
            return true 
        }
    }
    else if ((squares[2].classList.contains(symbol)) && (squares[4].classList.contains(symbol))){    
        if (computer_move(6)){
                return true 
            }
    }
    else if ((squares[2].classList.contains(symbol)) && (squares[6].classList.contains(symbol))){
        if (computer_move(4)){
            return true 
        }
    }
    else if ((squares[4].classList.contains(symbol)) && (squares[6].classList.contains(symbol))){
        if (computer_move(2)){
            return true 
        }
    }
    else if ((squares[4].classList.contains(symbol)) && (squares[6].classList.contains(symbol))){
        if (computer_move(2)){
            return true 
        }
}
}

let check_empty = () => {
    for (let i=0; i<9; i++){
        if (squares[i].classList.contains("×")){
            return false //board is not empty 
        }
    }
    return true //board is empty 
}

let find_adjacent = (i) => {
    if (i == 0){
        return [1,3]
    } else if (i == 1){
        return [0, 1, 2]
    } else if (i == 2){
        return [1, 5]
    } else if (i == 3){
        return [0, 4, 6]
    } else if (i == 4){
        return [1, 3, 5, 7]
    } else if (i == 5){
        return [2, 4, 8]
    } else if (i == 6){
        return [3, 7]
    } else if (i == 7){
        return [4, 6, 8]
    } else if (i == 8){
        return [5, 7]
    } else{
        return "number outside valid range 0-8"
    }
}

let double_xs = () => {
    for (let i=0; i<9; i++){
        if (squares[i].classList.contains("⚬")){
            adjacent = find_adjacent(i) //returns list of adjacent squares to i
            for (let j = 0; j < adjacent.length; j++){
                val = adjacent[j] //iterating through adjacent list
                if (computer_move(val)){
                    return true 
                }
            }
        }
    }
    return false 
}

let computer_turn = () => {
    /*
     * computer 'intelligent' move rules:
    - looks to make 3 in a row for computer 
    - looks to stop 3 in a row for user 
    - looks to make 2 in a row for computer 
    - selects a random square  
     */
    
    if (document.getElementById("player-score").firstElementChild.innerHTML == "PLAYER"){
        let valid_move = false

        if (two_column_check("⚬") == true){
            valid_move = true
        }

        if (valid_move == false){
            if (two_row_check("⚬") == true){
                valid_move = true
            }
        }

        if (valid_move == false){
            if (two_diagonal_check("⚬") == true){
                valid_move = true
            }
        }

        if (valid_move == false){
            if (two_column_check("×") == true){
                valid_move = true 
            }
        }

        if (valid_move == false){
            if (two_row_check("×") == true){
                valid_move = true 
            }
        }

        if (valid_move == false){
            if (two_diagonal_check("×") == true){
                valid_move = true
            }
        }

        if (valid_move == false){
            if (check_empty() == false){ //checks that there is at least 1 computer piece on the board  
                if (double_xs() == true){ //looks to make two in a row for the computer 
                    valid_move = true 
                }
            }
        }

        while (valid_move == false){
            let choice = Math.floor(Math.random() * 9) //generating random number between 0 and 8 (inclusive)
            if (squares[choice].classList == "board-square"){
                squares[choice].classList.add("⚬")
                valid_move = true 
            }
        }

        if (check_board() == -1 && document.getElementById("player-score").firstElementChild.innerHTML == "PLAYER"){ //board is not in a winning position 
            player_turn_1P()
        }
    }
}

let draw_status = () => {
    for (let i=0; i<squares.length; i++){
        if (!((squares[i].classList.contains("×")) || (squares[i].classList.contains("⚬")))){
            return -1 //the board is not full
        }
    }
    winner("draw")
    return "draw" //all board squares are filled  
}

let check_board = () => {
    row = check_rows()
    if (row == -1){
        columns = check_columns()
        if (columns == -1){
            diagonals = check_diagonals()
            if (diagonals == -1){
                draw = draw_status()
                if (draw == -1){
                    return -1 //board is not in winning position and board is not filled 
                }
                
            }
        }
    }
}

let reset_board = () => {
    remove_square_listeners(set_square_contents)
    remove_square_listeners(set_player2_square)

    board.removeEventListener("click", reset_board)
    for (let i=0; i<squares.length; i++){
        squares[i].className = "board-square"
        squares[i].style.backgroundImage = ""
    }
    check_turn()
}

let board_click = () => {
    let board = document.getElementById("board")
    board.addEventListener("click", reset_board)

    for (let i=0; i<squares.length; i++){
        squares[i].removeEventListener("click", set_square_contents)
        squares[i].removeEventListener("click", set_player2_square)
    }
}

let winner = (winner, pos1=0, pos2=0, pos3=0) => {
    let user_score = document.getElementById("player-score").children
    let computer_score = document.getElementById("computer-score").children
    let tie_score = document.getElementById("tie-score").children

    if (winner == "user"){
        user_score[1].innerHTML = Number(user_score[1].innerHTML) + 1

        user_score[0].style.color = "white" //setting colour of winner to white and remainder to grey 
        user_score[1].style.color = "white"

        computer_score[0].style.color = "#8a8a8a"
        computer_score[1].style.color = "#8a8a8a"
        
        tie_score[0].style.color = "#8a8a8a"
        tie_score[1].style.color = "#8a8a8a"

        winner_flash("user", pos1, pos2, pos3)

    } else if (winner == "computer"){
        console.log("computer win")
        computer_score[1].innerHTML = Number(computer_score[1].innerHTML) + 1

        computer_score[0].style.color = "white" //setting colour of winner to white and remainder to grey 
        computer_score[1].style.color = "white"

        user_score[0].style.color = "#8a8a8a"
        user_score[1].style.color = "#8a8a8a"
        
        tie_score[0].style.color = "#8a8a8a"
        tie_score[1].style.color = "#8a8a8a"

        winner_flash("computer", pos1, pos2, pos3)

    } else if (winner == "draw"){
        tie_score[1].innerHTML = Number(tie_score[1].innerHTML) + 1

        tie_score[0].style.color = "white" //setting colour of winner to white and remainder to grey 
        tie_score[1].style.color = "white"

        user_score[0].style.color = "#8a8a8a"
        user_score[1].style.color = "#8a8a8a"
        
        computer_score[0].style.color = "#8a8a8a"
        computer_score[1].style.color = "#8a8a8a"

        winner_flash("draw")
    }

    setTimeout(board_click, 600) 

    //add event listener to get user click then reset board on click 
}

let change_colour = () => {
    if (board.style.backgroundColor == "white"){
        board.style.backgroundColor = "rgb(50, 50, 50)"
    } else{
        board.style.backgroundColor = "white"
    }
}

let change_cross_colour = (pos1, pos2, pos3) => {
    if (squares[pos1].style.backgroundImage == 'url("./images/grey-cross.svg")'){
        squares[pos1].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
        squares[pos2].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
        squares[pos3].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
    } else{
        squares[pos1].style.backgroundImage = 'url("./images/grey-cross.svg")'
        squares[pos2].style.backgroundImage = 'url("./images/grey-cross.svg")'
        squares[pos3].style.backgroundImage = 'url("./images/grey-cross.svg")'
    }
}

let change_circle_colour = (pos1, pos2, pos3) => {
    if (squares[pos1].style.backgroundImage == 'url("./images/grey-circle.svg")'){
        squares[pos1].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
        squares[pos2].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
        squares[pos3].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
    } else{
        squares[pos1].style.backgroundImage = 'url("./images/grey-circle.svg")'
        squares[pos2].style.backgroundImage = 'url("./images/grey-circle.svg")'
        squares[pos3].style.backgroundImage = 'url("./images/grey-circle.svg")'
    }
}

let winner_flash = (winner, pos1=0, pos2=0, pos3=0) => {
    if (winner == "draw"){
        i = setInterval(change_colour, 200)
        setTimeout(function() {clearInterval(i)
        }, 1200)
        board.style.backgroundColor = "white"
    } else if (winner == "user"){
        i = setInterval(change_cross_colour, 200, pos1, pos2, pos3)
        setTimeout(function() {clearInterval(i)
        }, 1200)
        setTimeout(function(){
            squares[pos1].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
            squares[pos2].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
            squares[pos3].style.backgroundImage = 'url("./images/white-cross-svg.svg")'
        }, 1200)
    } else if (winner == "computer"){
        i = setInterval(change_circle_colour, 200, pos1, pos2, pos3)
        setTimeout(function() {clearInterval(i)
        }, 1200)
        setTimeout(function(){
            squares[pos1].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
            squares[pos2].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
            squares[pos3].style.backgroundImage = 'url("./images/white-circle-svg.svg")'
        }, 1200)
    }
}

let player1_turn = () => {
    let player1_score = document.getElementById("player-score").children
    let player2_score = document.getElementById("computer-score").children

    player1_score[0].style.color = "white"
    player1_score[1].style.color = "white"

    player2_score[0].style.color = "#8a8a8a"
    player2_score[1].style.color = "#8a8a8a"

    for (let i=0; i<squares.length; i++){
        if ((!squares[i].classList.contains("⚬")) && (!squares[i].classList.contains("×"))){ //checking that the square does not already contain an element
            squares[i].addEventListener("click", set_square_contents)
        }
    }
}

let player2_turn = () => {
    let player1_score = document.getElementById("player-score").children
    let player2_score = document.getElementById("computer-score").children

    player2_score[0].style.color = "white"
    player2_score[1].style.color = "white"

    player1_score[0].style.color = "#8a8a8a"
    player1_score[1].style.color = "#8a8a8a"

    for (let i=0; i<squares.length; i++){
        if ((!squares[i].classList.contains("⚬")) && (!squares[i].classList.contains("×"))){ //checking that the square does not already contain an element
            squares[i].addEventListener("click", set_player2_square)
        }
    }
}

let two_player = () => {
    player_turn += 1
    if (player_turn % 2 == 0){
        player1_turn()
    } else {
        player2_turn() 
    }
}

let player_turn_1P = () => {
    for (let i=0; i<squares.length; i++){
        if ((!squares[i].classList.contains("⚬")) && (!squares[i].classList.contains("×"))){ //checking that the square does not already contain an element
            squares[i].addEventListener("click", set_square_contents)
        }
    }
}

let round = () => {
    if (round_number % 2 == 0){ //user turn 
        round_number += 1 //global variable 
        player_turn_1P()
    } else { //computer turn 
        round_number += 1
        setTimeout(computer_turn, 400)
    }
}

let check_turn = () => {
    if (document.getElementById("player-score").firstElementChild.innerHTML == "PLAYER"){ //in 1P mode 
        round()
    } else { //in 2P mode 
        two_player()
    }
}

let switch_mode = () => {
    reset_board()
    document.getElementById("player-number").innerHTML = 0
    document.getElementById("tie-number").innerHTML = 0
    document.getElementById("computer-number").innerHTML = 0

    let player_score = document.getElementById("player-score").firstElementChild
    let computer_score = document.getElementById("computer-score").firstElementChild
    let mode = document.getElementById("game-mode")

    if (player_score.innerHTML == "PLAYER"){ //swapping into 2P mode
        player_score.innerHTML = "PLAYER 1 (X)"
        computer_score.innerHTML = "PLAYER 2 (O)"
        mode.classList.remove("one-player")
        mode.classList.add("two-player")
        mode.children[1].innerHTML = "1P"

        document.getElementById("tie-score").children[0].style.color = "#8a8a8a"
        document.getElementById("tie-score").children[1].style.color = "#8a8a8a"

        document.getElementById("computer-score").children[0].style.color = "#8a8a8a"
        document.getElementById("computer-score").children[1].style.color = "#8a8a8a"
        
        player_turn = 0 
        setTimeout(player1_turn, 200)

    } else{ //swapping into 1P mode 
        player_score.innerHTML = "PLAYER"
        computer_score.innerHTML = "COMPUTER"
       
        mode.classList.remove("two-player")
        mode.classList.add("one-player")
        mode.children[1].innerHTML = "2P"

        computer_score.style.color = "white"
        document.getElementById("computer-score").children[1].style.color = "white"

        document.getElementById("tie-score").children[0].style.color = "white"
        document.getElementById("tie-score").children[1].style.color = "white"

        player_score.style.color = "white"
        document.getElementById("player-score").children[1].style.color = "white"

        round_number = 0
        setTimeout(round, 200)
    }
}

check_turn()

