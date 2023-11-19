let squares = document.getElementsByClassName("board-square")
let square_contents = document.getElementsByClassName("board-text")

let set_square_contents = (e) => {
    e.target.innerHTML = "x"
    e.target.classList.add("x")
    remove_square_listeners()
    setTimeout(computer_turn, 600) //delay computer move by 600ms
}

let add_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        squares[i].addEventListener("click", set_square_contents)
    }
    squares[0].setAttribute("listener", "true")
}

let remove_square_listeners = () => {
    for (let i=0; i<squares.length; i++){
        squares[i].removeEventListener("click", set_square_contents)
    }
}

let check_rows = () => {
    for (let i=0; i<9; i+4){
        if (square_contents[i] == "x" || square_contents[i+1] == "x" || square_contents[i+3] == "x"){
            let winner = "user"
            break 
        } else if (square_contents[i] == "o" || square_contents[i+1] == "o" || square_contents[i+3] == "o"){
            winner = "computer"
        }
    }
}

let check_columns = () => {
    for (let i=0; i<3; i++){
        if (square_contents[i] == "x" || square_contents[i+3] == "x" || square_contents[i+6] == "x"){
            let winner = "user"
            break 
        } else if (square_contents[i] == "o" || square_contents[i+3] == "o" || square_contents[i+6] == "o"){
            winner = "computer"
        }
    }
}

let check_diagonals = () => {
    if (square_contents[0] == "x" || square_contents[4] == "x" || square_contents[8] == "x"){
        let winner = "user" 
    } else if (square_contents[0] == "o" || square_contents[4] == "o" || square_contents[8] == "o"){
        winner = "computer"
    } else if (square_contents[2] == "x" || square_contents[4] == "x" || square_contents[6] == "x"){
        winner = "user"
    } else if (square_contents[2] == "o" || square_contents[4] == "o" || square_contents[6] == "o"){
        winner = "computer"
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
        
}

let round = () => {
    let turn = "user"
    if (turn == "user"){
        add_square_listeners()
    }
}

round()