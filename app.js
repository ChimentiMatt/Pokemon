
const grid = document.getElementById('grid')
let counter = 0

let player = ''
let playerId = ''

const pokemonList = [
'Bulbasaur',
'Ivysaur',
'Venusaur',
'Charmander',
'Charmeleon',
'Charizard',
'Squirtle',
'Wartortle',
'Blastoise',
'Caterpie',
'Metapod',
'Butterfree',
'Weedle',
'Kakuna',
'Beedrill',
'Pidgey',
'Pidgeotto',
'Pidgeot',
'Rattata',
'Raticate',
'Spearow',
'Fearow',
'Ekans',
'Arbok',
'Pikachu',
'Raichu',
'Sandshrew',
'Sandslash',
'Nidoran (Female)',
'Nidorina',
'Nidoqueen',
'Nidoran (Male)',
'Nidorino',
'Nidoking',
'Clefairy',
'Clefable',
'Vulpix',
'Ninetales',
'Jigglypuff',
'Wigglytuff',
'Zubat',
'Golbat',
'Oddish',
'Gloom',
'Vileplume',
'Paras',
'Parasect',
'Venonat',
'Venomoth',
'Diglett',
'Dugtrio',
'Meowth',
'Persian',
'Psyduck',
'Golduck',
'Mankey',
'Primeape',
'Growlithe',
'Arcanine',
'Poliwag',
'Poliwhirl',
'Poliwrath',
'Abra',
'Kadabra',
'Alakazam',
'Machop',
'Machoke',
'Machamp',
'Bellsprout',
'Weepinbell',
'Victreebell',
'Tentacool',
'Tentacruel',
'Geodude',
'Graveler',
'Golem',
'Ponyta',
'Rapidash',
'Slowpoke',
'Slowbro',
'Magnemite',
'Magneton',
'Farfetchd',
'Doduo',
'Dodrio',
'Seel',
'Dewgong',
'Grimer',
'Muk',
'Shelder',
'Cloyster',
'Gastly',
'Haunter',
'Gengar',
'Onix',
'Drowzee',
'Hypno',
'Krabby',
'Kingler',
'Voltorb',
'Electrode',
'Exeggcute',
'Exeggutor',
'Cubone',
'Marowak',
'Hitmonlee',
'Hitmonchan',
'Lickitung',
'Koffing',
'Weezing',
'Rhyhorn',
'Rhydon',
'Chansey',
'Tangela',
'Kangaskhan',
'Horsea',
'Seadra',
'Goldeen',
'Seaking',
'Staryu',
'Starmie',
'Mr. Mime',
'Jynx',
'Electabuzz',
'Magmar',
'Pinsir',
'Tauros',
'Magikarp',
'Gyrados',
'Lapras',
'Ditto',
'Eevee',
'Vaporeon',
'Jolteon',
'Flareon',
'Porygon',
'Omanyte',
'Omastar',
'Kabuto',
'Kabutops',
'Aerodactyl',
'Snorlax',
'Articuno',
'Zapdos',
'Moltres',
'Dratini',
'Dragonair',
'Dragonite',
'Mewtwo',
]
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
        if (!inBattle){
            document.getElementById('introScreen').style.display = 'none'
        }
        else if (inBattle){
            if (fight){

            }
            else if (run){
                inBattle = false
                document.getElementById('battleScreen').style.display = 'none'
                battleCounter = 0
            }
        }
    }
})

let squares = Array.from(document.querySelectorAll('#grid div'))

let battleCounter = 0
let battleTrigger = 5
let inBattle = false
let fight = true
let bag = false
let pokemon = false
let run = false

// Player Moves Right
document.addEventListener("keydown", function (event) {

    function encounter() {
        if (inBattle){

        }
        else if (inBattle == false && battleCounter != battleTrigger){
            battleCounter += 1
            console.log(battleCounter, 'battle counter')
            console.log(battleTrigger)
        }
        else if (battleCounter == battleTrigger && inBattle == false ) {
            
            inBattle = true
            document.getElementById('battleScreen').style.display = 'flex'
            let battleText = document.getElementById('battleUILeft')
            gsap.to('#battleUIRight', {delay: 1.5, display: 'block'})
            gsap.to('#charBack', {x: '-15rem'})
            setTimeout(() => {battleText.innerHTML = 'What will Charmander do?'}, 1500)
            battleCounter = -1
            battleTrigger = Math.floor(Math.random() * 10)
            battle()
        }
    }
    function battle() {
        let randomPokemon = Math.floor(Math.random() * 149)
        let newPokemon = pokemonList[randomPokemon]
        document.getElementById('newPokemonName').innerHTML = newPokemon + '&nbspLv5'
        let newPokemonLowercase = newPokemon.toLowerCase()

        fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemonLowercase}`)
        .then(response => response.json())
        .then(data => {
            let newPokemonLowercase = document.getElementById('newPokemonFront')
            let sprite = data.sprites.front_default
            console.log(data)
            newPokemonLowercase.src=sprite
        })
    }

    if (event.key == 'ArrowRight'){
        player = document.getElementById('player')

        if (inBattle){
            if (fight){
                document.getElementById('fightArrow').style.display = 'none'
                document.getElementById('bagArrow').style.display = 'flex'
                bag = true
                fight = false
            }
            else if (pokemon){
                document.getElementById('pokeArrow').style.display = 'none'
                document.getElementById('runArrow').style.display = 'flex'
                pokemon = false
                run = true
            }
        }
        else{
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
        }


    // Player Moves Left
    else if (event.key == 'ArrowLeft'){
        player = document.getElementById('player')
        
        if (inBattle){
            if (bag){
                document.getElementById('fightArrow').style.display = 'flex'
                document.getElementById('bagArrow').style.display = 'none'
                bag = false
                fight = true
            }
            else if (run){
                document.getElementById('pokeArrow').style.display = 'flex'
                document.getElementById('runArrow').style.display = 'none'
                run = false
                pokemon = true    
            }
        }
        else{ 
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
        }

    // Player Moves Down
    else if (event.key == 'ArrowDown'){
        player = document.getElementById('player')


        if (inBattle){
            if (fight){
                document.getElementById('fightArrow').style.display = 'none'
                document.getElementById('pokeArrow').style.display = 'flex'
                fight = false
                pokemon = true
            }
            else if (bag){
                document.getElementById('bagArrow').style.display = 'none'
                document.getElementById('runArrow').style.display = 'flex'
                bag = false
                run = true   
            }

        }
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
        
        if (inBattle){
            if (pokemon){
                document.getElementById('pokeArrow').style.display = 'none'
                document.getElementById('fightArrow').style.display = 'flex'
                fight = true
                pokemon = false
            }
            else if (run){
                document.getElementById('runArrow').style.display = 'none'
                document.getElementById('bagArrow').style.display = 'flex'
                bag = true
                run = false
            }
        }

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


    