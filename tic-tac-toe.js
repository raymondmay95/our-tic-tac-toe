window.addEventListener('DOMContentLoaded', () => {
   let player = "x";
   let winner = undefined
   let totalMoves = 0 //commited to storage
   const board = document.getElementById("tic-tac-toe-board")
   const buttons = document.querySelectorAll('button')
   const winningMoves = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
   let player1Moves = []
   let player2Moves = []
   const playerStorage = localStorage.getItem('player')
   const player1Storage = localStorage.getItem('player1')
   const player2Storage = localStorage.getItem('player2')
   const totalMovesStorage = localStorage.getItem('totalMoves')



   //! functions
   const clearCache = () => {
      localStorage.removeItem('player')
      localStorage.removeItem('totalMoves')
      localStorage.removeItem('player1')
      localStorage.removeItem('player2')
   }
   const fetchFromStorage = () => {
      if (Number(totalMovesStorage) > 0) {
         player = playerStorage
         player1Moves = Array.from(player1Storage)
         player2Moves = Array.from(player2Storage)

      }
   }

   const setToStorage = () => {
      localStorage.setItem("player",player)
      localStorage.setItem("totalMoves",totalMoves)
      localStorage.setItem("player1",player1Moves)
      localStorage.setItem("player2",player2Moves)
   }

   const disableNewButton = (totalMoves) => {
      if (totalMoves !== 9) {
         buttons[0].disabled = true
      } else {
         buttons[0].disabled = false
      }
   }
   const disableGiveUp = () => {
      if (buttons[0].disabled === false) {
         buttons[1].disabled = true
      } else {
         buttons[1].disabled = false
      }
   }
   const declareWinner = () => {
      if (winner !== undefined) {
         setTimeout(()=>{alert(winner)},0)
         return true
      }
   }
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

            player2Moves.forEach((id) => {
               if (id.endsWith(`${move}`)) {
                  player2count --
               }
            })
         }
         if (player1count === 0) {
            winner = 'player1'

         }
         else if (player2count === 0) {
            winner = 'player2'
         }

      })
   }
   const changePlayer = () => {
      if (player === 'x') {
         player = 'o'
         totalMoves ++
      }
      else if (player === 'o') {
         player = 'x'
         totalMoves ++

      }
   }

   //! Functions called on initial load
   fetchFromStorage()
   disableNewButton(totalMoves)


   //! Event Listeners
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
         let status = declareWinner()
         setToStorage()
         if (status === true) {
            disableNewButton(totalMoves)
            disableGiveUp()
            clearCache()
            location.reload()
         }


      }


   })

   buttons[0].addEventListener('click', ()=>{
      location.reload()
      clearCache()

   })

   buttons[1].addEventListener('click', ()=>{
      changePlayer()
      alert(`${player.toUpperCase()} wins!`)
      clearCache()
      location.reload()

   })
})
