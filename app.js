Vue.component('click-counter', {
    template: '<button @click="count++">{{count}}</button>',
    data() {
        return {
            count: 0
        }
    }
})

new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      charmander: ''
    },
    mounted() {
        fetch('https://pokeapi.co/api/v2/pokemon/charmander')
        .then(response => response.json())
        .then(data => {
            this.charmander = data.sprites.front_default
            console.log('test')
        })
    
    }
  })
