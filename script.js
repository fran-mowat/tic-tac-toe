let squares = document.getElementsByClassName("board-square")
let square_contents = document.getElementsByClassName("board-text")

let set_square_contents = (e) => {
    e.target.innerHTML = "x"
    e.target.classList.add("x")
    remove_square_listeners()
    if (check_board() == -1){
        setTimeout(computer_turn, 600) //delay computer move by 600ms
    } else {
        console.log("winner detected.")
    }
}

let add_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        squares[i].addEventListener("click", set_square_contents)
    }
}

let remove_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        squares[i].removeEventListener("click", set_square_contents)
    }
}

let check_rows = () => {
    for (let i=0; i<9; i+=3){
        if (square_contents[i].innerHTML == "x" && square_contents[i+1].innerHTML == "x" && square_contents[i+2].innerHTML == "x"){
            return "user" 
        } else if (square_contents[i].innerHTML == "o" && square_contents[i+1].innerHTML == "o" && square_contents[i+2].innerHTML == "o"){
            return "computer"
        } 
    }
    return -1
}

let check_columns = () => {
    for (let i=0; i<3; i++){
        if (square_contents[i].innerHTML == "x" && square_contents[i+3].innerHTML == "x" && square_contents[i+6].innerHTML == "x"){
            return "user" 
        } else if (square_contents[i].innerHTML == "o" && square_contents[i+3].innerHTML == "o" && square_contents[i+6].innerHTML == "o"){
            return "computer"
        }
    }
    return -1
}

let check_diagonals = () => {
    if (square_contents[0].innerHTML == "x" && square_contents[4].innerHTML == "x" && square_contents[8].innerHTML == "x"){
        return "user" 
    } else if (square_contents[0].innerHTML == "o" && square_contents[4].innerHTML == "o" && square_contents[8].innerHTML == "o"){
        return "computer"
    } else if (square_contents[2].innerHTML == "x" && square_contents[4].innerHTML == "x" && square_contents[6].innerHTML == "x"){
        return "user"
    } else if (square_contents[2].innerHTML == "o" && square_contents[4].innerHTML == "o" && square_contents[6].innerHTML == "o"){
        return "computer"
    } else {
        return -1
    }
}

let computer_turn = () => {
    /*
     * check if 2 in a row for computer 
     * check if 2 in a row for user 
     * look to make 2 in a row for computer 
     * pick random square 
     */
    let valid_move = false
    while (valid_move == false){
        let choice = Math.floor(Math.random() * 9) //generating random number between 0 and 8 (inclusive)
        if (square_contents[choice].innerHTML == ""){
            square_contents[choice].innerHTML = "o"
            square_contents[choice].classList.add("o")
            valid_move = true 
        }
    }
    if (check_board() == -1){
        add_square_listeners()
    } else{
        console("WINNER")
    }
    
        
}

let check_board = () => {
    let row = check_rows()
    if (row == -1){
        columns = check_columns()
        if (columns == -1){
            diagonals = check_diagonals()
            if (diagonals == -1){
                return -1 //board is not in winning position 
            }
        } 
    }
}

let round = () => {
    console.log("round entered")
    let turn = "computer"
    if (turn == "user"){
        console.log("t")
        add_square_listeners()
    } else if (turn == "computer"){
        computer_turn()
    }
}

round()