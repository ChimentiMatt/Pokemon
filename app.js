Vue.component('click-counter', {
    template: '<button @click="count++">{{count}}</button>',
    data() {
        return {
            count: 0
        }
    }
})

let cat = 'cat'

const rangeVar = [...Array(150).keys()]



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
            for (let i = 0; i < 500; i++){
                if (i == 260){
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


        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowRight'){
                this.player = document.getElementById('player')
                this.playerId = this.player.className
                this.playerId = parseInt(this.playerId)

                squares[this.playerId].removeAttribute('id')
                squares[this.playerId].classList.add('squares')
                squares[this.playerId].style.backgroundImage = "none"
                squares[this.playerId + 1].id = 'player'
                squares[this.playerId + 1].classList.remove('squares')
                squares[this.playerId + 1].style.backgroundImage = "url('images/redRight.png')"
                }
            })
    }

  })
