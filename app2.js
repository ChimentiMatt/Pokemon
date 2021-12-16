const Counter2 = {
    data() {
      return {
        counter2: 0,
        charmander: ''
      }
    },
    mounted() {
        fetch('https://pokeapi.co/api/v2/pokemon/charmander')
          .then(response => response.json())
          .then(data => {
              this.charmander = data.sprites.front_default
          })


      setInterval(() => {
        this.counter2++
      }, 1000)
    }
  }
  
  Vue.createApp(Counter2).mount('#counter2')