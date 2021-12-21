
const grid = document.getElementById('grid')
let counter = 0

let player = ''
let playerId = ''

for (let i = 0; i < 100; i++){
    if (i == 50){
        grid.innerHTML += '<div id="player" class='+counter+'></div>'
        counter += 1
    }
    else{
        grid.innerHTML += '<div class="'+counter+' squares"></div>'
        counter += 1
    }
}
var tl = gsap.timeline({ repeat: -1})
tl.to('#pressEnter', {duration: 1, color: 'white'})
tl.to('#pressEnter', {duration: 1, color: 'silver'})


document.addEventListener("keydown", function (event) {
    if (event.key == 'Enter'){
        document.getElementById('introScreen').style.display = 'none'
    }
})

let squares = Array.from(document.querySelectorAll('#grid div'))

let battleCounter = 0
let battleTrigger = 5

// Player Moves Right
document.addEventListener("keydown", function (event) {

    function encounter() {
        battleCounter += 1
        console.log(battleCounter)
        if (battleCounter == battleTrigger) {
            
            document.getElementById('battleScreen').style.display = 'flex'







            battleCounter = -1
            battleTrigger = Math.floor(Math.random() * 5)
        }
    }


    if (event.key == 'ArrowRight'){
        player = document.getElementById('player')

        // Stop player from moving outside boundary
        if (player.classList[0] % 10 == 9){
        }
        else{
            playerId = player.className
            playerId = parseInt(playerId)
            squares[playerId].removeAttribute('id')
            squares[playerId].classList.add('squares')
            squares[playerId].style.backgroundImage = "url('images/grass.png')"
            squares[playerId + 1].id = 'player'
            squares[playerId + 1].classList.remove('squares')
            squares[playerId + 1].style.backgroundImage = "url('images/redRight.png'), url('images/grass.png')"
            encounter()
            }
        }

    // Player Moves Left
    else if (event.key == 'ArrowLeft'){
        player = document.getElementById('player')
        
        // Stop player from moving outside boundary
        if (player.classList[0] % 10 == 0){
        }

        else{ 
            playerId = player.className
            playerId = parseInt(playerId)
            squares[playerId].removeAttribute('id')
            squares[playerId].classList.add('squares')
            squares[playerId].style.backgroundImage = "url('images/grass.png')"
            squares[playerId - 1].id = 'player'
            squares[playerId - 1].classList.remove('squares')
            squares[playerId - 1].style.backgroundImage = "url('images/redLeft.png'), url('images/grass.png')"
            encounter()
            }
        }

    // Player Moves Down
    else if (event.key == 'ArrowDown'){
        player = document.getElementById('player')

        // Stop player from moving outside boundary
        if (player.classList[0] > 89){
        }
        else {
            playerId = player.className
            playerId = parseInt(playerId)
            squares[playerId].removeAttribute('id')
            squares[playerId].classList.add('squares')
            squares[playerId].style.backgroundImage = "url('images/grass.png')"
            squares[playerId + 10].id = 'player'
            squares[playerId + 10].classList.remove('squares')
            squares[playerId + 10].style.backgroundImage = "url('images/redFront.png'), url('images/grass.png')"
            encounter()
            }
        }
    
    // Player Moves Up
    else if (event.key == 'ArrowUp'){
        player = document.getElementById('player')

        // Stop player from moving outside boundary
        if (player.classList[0] < 10){
        }
        else{
            playerId = player.className
            playerId = parseInt(playerId)
            squares[playerId].removeAttribute('id')
            squares[playerId].classList.add('squares')
            squares[playerId].style.backgroundImage = "url('images/grass.png')"
            squares[playerId - 10].id = 'player'
            squares[playerId - 10].classList.remove('squares')
            squares[playerId - 10].style.backgroundImage = "url('images/redBack.png'), url('images/grass.png')"
            encounter()
            }
        }
    })