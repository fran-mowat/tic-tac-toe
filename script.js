let squares = document.getElementsByClassName("board-square")
let square_contents = document.getElementsByClassName("board-text")

let set_square_contents = (e) => {
    e.target.innerHTML = "x"
    e.target.classList.add("x")
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

add_square_listeners()
remove_square_listeners()