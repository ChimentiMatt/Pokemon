const App = {
    data() {
        return{ 
            message: 'Hello Vue!',
            charmander: '',
            player: '',
            playerId: '',
            }
    },
    methods: {
        makeGrid() {
            const grid = document.getElementById('grid')
            let counter = 0
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
        },
        
        randomEncounter() {
            console.log('battle')
        },
    },
    
    mounted() {
        fetch('https://pokeapi.co/api/v2/pokemon/charmander')
        .then(response => response.json())
        .then(data => {

            this.charmander = data.sprites.front_default
            console.log(this.charmander)
        })
        this.makeGrid()
        
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
                   alert('battle')
                   battleCounter = -1
                   battleTrigger = Math.floor(Math.random() * 5)
                }
            }


            if (event.key == 'ArrowRight'){
                this.player = document.getElementById('player')

                // Stop player from moving outside boundary
                if (this.player.classList[0] % 10 == 9){
                }
                else{
                    this.playerId = this.player.className
                    this.playerId = parseInt(this.playerId)
                    squares[this.playerId].removeAttribute('id')
                    squares[this.playerId].classList.add('squares')
                    squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                    squares[this.playerId + 1].id = 'player'
                    squares[this.playerId + 1].classList.remove('squares')
                    squares[this.playerId + 1].style.backgroundImage = "url('images/redRight.png'), url('images/grass.png')"
                    encounter()
                    }
                }
      
            // Player Moves Left
            else if (event.key == 'ArrowLeft'){
                this.player = document.getElementById('player')
                
                // Stop player from moving outside boundary
                if (this.player.classList[0] % 10 == 0){
                }

                else{ 
                    this.playerId = this.player.className
                    this.playerId = parseInt(this.playerId)
                    squares[this.playerId].removeAttribute('id')
                    squares[this.playerId].classList.add('squares')
                    squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                    squares[this.playerId - 1].id = 'player'
                    squares[this.playerId - 1].classList.remove('squares')
                    squares[this.playerId - 1].style.backgroundImage = "url('images/redLeft.png'), url('images/grass.png')"
                    encounter()
                    }
                }

            // Player Moves Down
            else if (event.key == 'ArrowDown'){
                this.player = document.getElementById('player')

                // Stop player from moving outside boundary
                if (this.player.classList[0] > 89){
                }
                else {
                    this.playerId = this.player.className
                    this.playerId = parseInt(this.playerId)
                    squares[this.playerId].removeAttribute('id')
                    squares[this.playerId].classList.add('squares')
                    squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                    squares[this.playerId + 10].id = 'player'
                    squares[this.playerId + 10].classList.remove('squares')
                    squares[this.playerId + 10].style.backgroundImage = "url('images/redFront.png'), url('images/grass.png')"
                    encounter()
                    }
                }
          
            // Player Moves Up
            else if (event.key == 'ArrowUp'){
                this.player = document.getElementById('player')

                // Stop player from moving outside boundary
                if (this.player.classList[0] < 10){
                }
                else{
                    this.playerId = this.player.className
                    this.playerId = parseInt(this.playerId)
                    squares[this.playerId].removeAttribute('id')
                    squares[this.playerId].classList.add('squares')
                    squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                    squares[this.playerId - 10].id = 'player'
                    squares[this.playerId - 10].classList.remove('squares')
                    squares[this.playerId - 10].style.backgroundImage = "url('images/redBack.png'), url('images/grass.png')"
                    encounter()
                    }
                }
            })

    }

  }
  Vue.createApp(App).mount('#app')