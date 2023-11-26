let squares = document.getElementsByClassName("board-square")
let square_contents = document.getElementsByClassName("board-text")
let round_number = 0

let set_square_contents = (e) => {
    e.target.innerHTML = "×"
    e.target.classList.add("×")
    remove_square_listeners()
    if (check_board() == -1){ //winner is not found on board 
        setTimeout(computer_turn, 600) //delay computer move by 600ms
    }
}

let add_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        if ((!square_contents[i].classList.contains("o")) && (!square_contents[i].classList.contains("×"))){ //checking that the square does not already contain an element
            squares[i].addEventListener("click", set_square_contents)
        }
    }
}

let remove_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        squares[i].removeEventListener("click", set_square_contents)
    }
}

let check_rows = () => {
    for (let i=0; i<9; i+=3){
        if (square_contents[i].innerHTML == "×" && square_contents[i+1].innerHTML == "×" && square_contents[i+2].innerHTML == "×"){
            winner("user")
            return 0
        } else if (square_contents[i].innerHTML == "o" && square_contents[i+1].innerHTML == "o" && square_contents[i+2].innerHTML == "o"){
            winner("computer")
            return 0
        } 
    }
    return -1
}

let check_columns = () => {
    for (let i=0; i<3; i++){
        if (square_contents[i].innerHTML == "×" && square_contents[i+3].innerHTML == "×" && square_contents[i+6].innerHTML == "×"){
            winner("user")
            return 0
        } else if (square_contents[i].innerHTML == "o" && square_contents[i+3].innerHTML == "o" && square_contents[i+6].innerHTML == "o"){
            winner("computer")
            return 0
        }
    }
    return -1
}

let check_diagonals = () => {
    if (square_contents[0].innerHTML == "×" && square_contents[4].innerHTML == "×" && square_contents[8].innerHTML == "×"){
        winner("user") 
    } else if (square_contents[0].innerHTML == "o" && square_contents[4].innerHTML == "o" && square_contents[8].innerHTML == "o"){
        winner("computer")
    } else if (square_contents[2].innerHTML == "×" && square_contents[4].innerHTML == "×" && square_contents[6].innerHTML == "×"){
        winner("user")
    } else if (square_contents[2].innerHTML == "o" && square_contents[4].innerHTML == "o" && square_contents[6].innerHTML == "o"){
        winner("computer")
    } else {
        return -1
    }
}

let computer_move = (i) => {
    let move_made = false  
    if (square_contents[i].innerHTML == ""){
        square_contents[i].innerHTML = "o"
        square_contents[i].classList.add("o")
        move_made = true 
    }
    return move_made
}

let two_column_check = (symbol) => {
    for (let i = 0; i<3; i++){
        if ((square_contents[i].innerHTML == symbol) && (square_contents[i+3].innerHTML == symbol)){
            if (computer_move(i+6)){
                return true 
            }
        }
        else if ((square_contents[i].innerHTML == symbol) && (square_contents[i+6].innerHTML == symbol)){
            if (computer_move(i+3)){
                return true 
            }
        }
        else if ((square_contents[i+3].innerHTML == symbol) && (square_contents[i+6].innerHTML == symbol)){
            if (computer_move(i)){
                return true 
            }
        }
    }
}

let two_row_check = (symbol) => {
    for (let i=0; i<9; i+=3){
        if ((square_contents[i].innerHTML == symbol) && (square_contents[i+1].innerHTML == symbol)){
            if (computer_move(i+2)){
                return true 
            }
        }
        else if ((square_contents[i].innerHTML == symbol) && (square_contents[i+2].innerHTML == symbol)){
            if (computer_move(i+1)){
                return true 
            }
        }
        else if ((square_contents[i+1].innerHTML == symbol) && (square_contents[i+2].innerHTML == symbol)){
            if (computer_move(i)){
                return true 
            }
        }
    }
}

let two_diagonal_check = (symbol) => {
    if ((square_contents[0].innerHTML == symbol) && (square_contents[4].innerHTML == symbol)){
            if (computer_move(8)){
                return true 
            }
    }
    else if ((square_contents[0].innerHTML == symbol) && (square_contents[8].innerHTML == symbol)){
            if (computer_move(4)){
                return true 
            }
    }
    else if ((square_contents[4].innerHTML == symbol) && (square_contents[8].innerHTML == symbol)){
            if (computer_move(0)){
                return true 
            }
    }
    else if ((square_contents[2].innerHTML == symbol) && (square_contents[4].innerHTML == symbol)){
            if (computer_move(6)){
                return true 
            }
    }
    else if ((square_contents[2].innerHTML == symbol) && (square_contents[6].innerHTML == symbol)){
            if (computer_move(4)){
                return true 
            }
    }
    else if ((square_contents[4].innerHTML == symbol) && (square_contents[6].innerHTML == symbol)){
            if (computer_move(2)){
                return true 
            }
    }
}

let check_empty = () => {
    for (let i=0; i<9; i++){
        if (! (square_contents[i].innerHTML == "" || square_contents[i].innerHTML == "×")){
            return false
        }
    }
    return true 
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
        if (square_contents[i].innerHTML == "o"){
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
    
    let valid_move = false

    if (two_column_check("o") == true){
        valid_move = true
    }

    if (valid_move == false){
        if (two_row_check("o") == true){
            valid_move = true
        }
    }

    if (valid_move == false){
        if (two_diagonal_check("o") == true){
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
        if (check_empty() == false){
            if (double_xs() == true){ //looks to make two in a row for the computer 
                valid_move = true 
            }
        }
    }

    while (valid_move == false){
        let choice = Math.floor(Math.random() * 9) //generating random number between 0 and 8 (inclusive)
        if (square_contents[choice].innerHTML == ""){
            square_contents[choice].innerHTML = "o"
            square_contents[choice].classList.add("o")
            valid_move = true 
        }
    }

    if (check_board() == -1){ //board is not in a winning position 
        add_square_listeners()
    }
}

let draw_status = () => {
    for (let i=0; i<squares.length; i++){
        if (!((square_contents[i].innerHTML == "×") || (square_contents[i].innerHTML == "o"))){
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
    remove_square_listeners()
    board.removeEventListener("click", reset_board)
    for (let i=0; i<square_contents.length; i++){
        square_contents[i].innerHTML = ""
        square_contents[i].classList = "board-te×t" //resets class lists 
    } 
    round(round_number)
}

let board_click = () => {
    let board = document.getElementById("board")
    board.addEventListener("click", reset_board)
}

let winner = (winner) => {
    if (winner == "user"){
        let user_score = document.getElementById("player-number")
        user_score.innerHTML = Number(user_score.innerHTML) + 1
    } else if (winner == "computer"){
        let computer_score = document.getElementById("computer-number")
        computer_score.innerHTML = Number(computer_score.innerHTML) + 1
    } else if (winner == "draw"){
        let tie_score = document.getElementById("tie-number")
        tie_score.innerHTML = Number(tie_score.innerHTML) + 1
    }

    setTimeout(board_click, 600) 

    //add event listener to get user click then reset board on click 
}

let round = (round) => {
    if (round % 2 == 0){ //user turn 
        round_number += 1 //global variable 
        add_square_listeners()
    } else { //computer turn 
        round_number += 1
        computer_turn()
    }
}

round(0)

/**
 * make computer guesses intelligent as listed within the function 
*/