Vue.component('click-counter', {
    template: '<button @click="count++">{{count}}</button>',
    data() {
        return {
            count: 0
        }
    }
})

let cat = 'cat'

const rangeVar = [...Array(200).keys()]



new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        charmander: '',
        
    },
    methods: {
        
        makeGrid() {
            const grid = document.getElementById('grid')

            for (let i = 0; i < 1000; i++){
                grid.innerHTML += '<div class="squares"></div>'
            
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

    }
  })
