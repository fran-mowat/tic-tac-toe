let squares = document.getElementsByClassName("board-square")
//let square_contents = document.getElementsByClassName("board-text")

let set_square_contents = (e) => {
    e.target.innerHTML = "x"
    e.target.classList.add("x")
}

for (let i=0; i<squares.length; i++){
    squares[i].addEventListener("click", set_square_contents)
}
