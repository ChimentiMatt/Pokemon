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

        document.addEventListener("keydown", function (event) {
            if (event.key == 'ArrowRight'){
                // let playernum = document.getElementById('player')
                
                }
            })
    }

  })
