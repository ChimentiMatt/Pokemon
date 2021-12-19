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
                    grid.innerHTML += '<div class="squares"'+counter+'></div>'
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
                let playerId = player.className
                
                playerId = parseInt(playerId)
                document.getElementById('player').removeAttribute('player')
                playerId += 1
                console.log(squares[playerId])
                squares[playerId].classList.add('player')

                console.log(this.player.id, 'a')
                   
                }
            })
    }

  })
