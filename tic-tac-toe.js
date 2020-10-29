window.addEventListener('DOMContentLoaded', () => {
   let player = "x";
   const board = document.getElementById("tic-tac-toe-board")
   const winningMoves = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
   const player1Moves = []
   const player2Moves = []
//! winning moves
   const gameStatus = (event) => {
      winningMoves.forEach((moves) => {
         let player1count = 3
         let player2count = 3
         for(let i = 0; i < moves.length; i++) {
            let move = moves[i]
            player1Moves.forEach((id) => {
               if (id.endsWith(`${move}`)) {
                  player1count --
               }
            })

            player1Moves.forEach((id) => {
               if (id.endsWith(`${move}`)) {
                  player2count --
               }
            })
         }
         if (player1count === 0) {
            console.log('player1')
         }
         else if (player2count === 0) {
            console.log('player2')
         }



      })
   }
   const changePlayer = () => {
      if (player === 'x') {
         player = 'o'
      }
      else if (player === 'o') {
         player = 'x'
      }
   }

   board.addEventListener("click", (event) => {
      event.preventDefault()
      // console.log(player)
      let target = event.target;
      if (target.id === "filled") {
         return
      }

      if (target.id.startsWith("square-")) {

         //  console.log(target.value)

         if (player === 'x') {
            let img = document.createElement('img')
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${player}.svg`;
            img.setAttribute('id', 'filled')
            event.target.appendChild(img)
            player1Moves.push(target.id)


         }

         if (player === 'o') {
            let img = document.createElement('img')
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${player}.svg`;
            img.setAttribute('id', 'filled')
            event.target.appendChild(img)
            player2Moves.push(target.id)

         }
         changePlayer()
         gameStatus()

      }



   })


})
