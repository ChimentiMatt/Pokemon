Vue.component('click-counter', {
    template: '<button @click="count++">{{count}}</button>',
    data() {
        return {
            count: 0
        }
    }
})

let cat = 'cat'

// const rangeVar = [...Array(50).keys()]



new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        charmander: '',
        player: '',
        playerId: '',
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
                    grid.innerHTML += '<div class="squares '+counter+'"></div>'
                    counter += 1
                }
            
            }
        },
    },
    mounted() {
        fetch('https://pokeapi.co/api/v2/pokemon/charmander')
        .then(response => response.json())
        .then(data => {
            this.charmander = data.sprites.front_default
            console.log('test')
        })
        this.makeGrid()
 
        let squares = Array.from(document.querySelectorAll('#grid div'))

        // Player Moves Right
        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowRight'){
                this.player = document.getElementById('player')
                this.playerId = this.player.className
                this.playerId = parseInt(this.playerId)
                squares[this.playerId].removeAttribute('id')
                squares[this.playerId].classList.add('squares')
                squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                squares[this.playerId + 1].id = 'player'
                squares[this.playerId + 1].classList.remove('squares')
                squares[this.playerId + 1].style.backgroundImage = "url('images/redRight.png'), url('images/grass.png')"
                }
            })
        // Player Moves Left
        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowLeft'){
                this.player = document.getElementById('player')
                this.playerId = this.player.className
                this.playerId = parseInt(this.playerId)
                squares[this.playerId].removeAttribute('id')
                squares[this.playerId].classList.add('squares')
                squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                squares[this.playerId - 1].id = 'player'
                squares[this.playerId - 1].classList.remove('squares')
                squares[this.playerId - 1].style.backgroundImage = "url('images/redLeft.png'), url('images/grass.png')"
                }
            })


        // Player Moves Down
        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowDown'){
                this.player = document.getElementById('player')
                this.playerId = this.player.className
                this.playerId = parseInt(this.playerId)
                squares[this.playerId].removeAttribute('id')
                squares[this.playerId].classList.add('squares')
                squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                squares[this.playerId + 10].id = 'player'
                squares[this.playerId + 10].classList.remove('squares')
                squares[this.playerId + 10].style.backgroundImage = "url('images/redFront.png'), url('images/grass.png')"
                }
            })

        // Player Moves Up
        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowUp'){
                this.player = document.getElementById('player')
                this.playerId = this.player.className
                this.playerId = parseInt(this.playerId)
                squares[this.playerId].removeAttribute('id')
                squares[this.playerId].classList.add('squares')
                squares[this.playerId].style.backgroundImage = "url('images/grass.png')"
                squares[this.playerId - 10].id = 'player'
                squares[this.playerId - 10].classList.remove('squares')
                squares[this.playerId - 10].style.backgroundImage = "url('images/redBack.png'), url('images/grass.png')"
                }
            })
    }

  })
