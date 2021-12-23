
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


// title screen animations
var tl = gsap.timeline({ repeat: -1})
tl.to('#pressEnter', {duration: 1, color: 'white'})
tl.to('#pressEnter', {duration: 1, color: 'silver'})

let battleText = document.getElementById('battleUILeft')
let currentName = ''
let counter = 0
let player = ''
let playerId = ''
let playerDamage = 100
let newPokeDamage = 100
let disableEnter = false

// make grass field 
const grid = document.getElementById('grid')
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

document.addEventListener("keydown", function (event) {
    if (event.key == 'Enter'){
        if (!inBattle){
            document.getElementById('introScreen').style.display = 'none'
        }
        else if (inBattle && disableEnter == false ){
            disableEnter = true
            if (fight){
                playerDamage -= 10
                newPokeDamage -= 30


                battleText.innerHTML = "Charmander uses Scratch"
                gsap.to('#charBack', {y: '-1rem', duration: .2})
                gsap.to('#charBack', {delay: .2, y: '0rem', duration: .2})
                gsap.to('#newPokemonFront', {delay: .3, duration: .2, rotation: 5})
                gsap.to('#newPokemonFront', {delay: .5, duration: .2, rotation: 0})
                setTimeout(() => {battleText.innerHTML = `It's super effective!`}, 1200)
                gsap.to('#newHpBarInner', {delay: 1, width: newPokeDamage+'%'})
                setTimeout(() => {disableEnter = false}, 3400)

                // if pokemon faints
                if (newPokeDamage <= 0){
                    setTimeout(() => {battleText.innerHTML = `${currentName} has fainted`}, 2200)
                    inBattle = false
                    gsap.to('#battleScreen', {delay: 3, display: 'none'})
                    
                    battleCounter = 0
                    gsap.to('#newPokemonFront', {delay: .5, opacity: 1, duration: 1})
                    gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                    gsap.to('#charBack', {delay: 4, x: '15rem', duration: 0})
                }
                else {
                    setTimeout(() => {battleText.innerHTML = `${currentName} attacks`}, 2200)
                    gsap.to('#charBack', {delay: 2.5, duration: .2, rotation: 5})
                    gsap.to('#charBack', {delay: 2.7, duration: .2, rotation: 0})
                    setTimeout(() => {battleText.innerHTML = `It's not ever effective`}, 3400)
                    gsap.to('#hpBarInner', {delay: 3.3, width: playerDamage+'%'})
                }
            }
            else if (run){
                inBattle = false
                document.getElementById('battleScreen').style.display = 'none'
                battleCounter = 0
                gsap.to('#newPokemonFront', {delay: .5, opacity: 1, duration: 1})
                gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                disableEnter = false
                gsap.to('#charBack', {x: '15rem', duration: 0})
                
            }
            else if (bag){
                let catchAttempt = Math.floor(Math.random() * 100)

                // successful catch
                if (catchAttempt > newPokeDamage){
                    // reset pokeball if already used
                    gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                    document.getElementById('pokeball').src = 'images/pokeball.png'

                    document.getElementById('pokeball').style.display = 'block'
                    gsap.to('#pokeball', {y: '-9rem', x: '-10.5rem', duration: .8, scale: .2, rotation: 15})
                    gsap.to('#newPokemonFront', {delay: .8, duration: 0, opacity: 0})
                    gsap.to('#pokeball', {delay: 1.5, rotation: 0})
                    gsap.to('#pokeball', {delay: 1.7, rotation: 25})
                    gsap.to('#pokeball', {delay: 2.3, rotation: 0})
                    gsap.to('#pokeball', {delay: 2.5, rotation: 25})

                    setTimeout(() => {battleText.innerHTML = `You caught ${currentName}!`}, 3400 )
                    
                    inBattle = false
                    gsap.to('#battleScreen', {delay: 4, display: 'none'})
                    setTimeout(() => gsap.to('#charBack', {x: '15rem', duration: 0}), 5000 )
                    battleCounter = 0
                    

                    setTimeout(() => {disableEnter = false}, 4000)
                }
                else{
                    // reset pokeball if already used
                    gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                    document.getElementById('pokeball').src = 'images/pokeball.png'

                    document.getElementById('pokeball').style.display = 'block'
                    gsap.to('#pokeball', {y: '-9rem', x: '-10.5rem', duration: .8, scale: .2, rotation: 15})
                    gsap.to('#newPokemonFront', {delay: .8, duration: 0, opacity: 0})
                    gsap.to('#pokeball', {delay: 1.5, rotation: 0})
                    gsap.to('#pokeball', {delay: 1.7, rotation: 25})
                    gsap.to('#pokeball', {delay: 2.3, rotation: 0})
                    gsap.to('#pokeball', {delay: 2.5, rotation: 25})

                    setTimeout(() => {document.getElementById('pokeball').src = 'images/open.png'}, 3600) 
                    gsap.to('#newPokemonFront', {delay: 3.6, duration: 0, display: 'block'})  
                    gsap.to('#pokeball', {delay: 3.9, display: 'none'})
                    gsap.to('#newPokemonFront', {delay: 3.9, duration: 0, opacity: 1})
                    setTimeout(() => {document.getElementById('battleUILeft').innerHTML = `${currentName} escaped!`}, 3900)

                    setTimeout(() => {battleText.innerHTML = `${currentName} attacks!`}, 4900)
                    gsap.to('#charBack', {delay: 5.5, duration: .2, rotation: 5})
                    gsap.to('#charBack', {delay: 5.7, duration: .2, rotation: 0})
                    setTimeout(() => {battleText.innerHTML = `It's not ever effective`}, 5500)
                    playerDamage -= 10
                    gsap.to('#hpBarInner', {delay: 5.5, width: playerDamage+'%'})

                    setTimeout(() => {disableEnter = false}, 5500)
                }
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
            // reset pokeball image
            gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1, display: 'none'})

            //reset hp bars
            playerDamage = 100
            newPokeDamage = 100
            gsap.to('#newHpBarInner', {delay: 0, duration: 0, width: newPokeDamage+'%'})
            gsap.to('#hpBarInner', {delay: 0, duration: 0, width: playerDamage+'%'})
        }
        else if (battleCounter == battleTrigger && inBattle == false ) {
            
            inBattle = true
            document.getElementById('battleScreen').style.display = 'flex'

            gsap.to('#battleUIRight', {delay: 1.5, display: 'block'})
            gsap.to('#charBack', {x: '-15rem'})
            setTimeout(() => {battleText.innerHTML = 'What will Charmander do?'}, 1500)
            battleCounter = -1
            battleTrigger = Math.floor(Math.random() *(1 + 10) + 1)
            battle()
        }
    }
    function battle() {

        let randomPokemon = Math.floor(Math.random() * 149)
        let newPokemon = pokemonList[randomPokemon]
        currentName = newPokemon
        document.getElementById('newPokemonName').innerHTML = newPokemon + '&nbspLv5'
        let newPokemonLowercase = newPokemon.toLowerCase()
        gsap.to('#newPokemonFront', {opacity: 0, duration: 0})
        fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemonLowercase}`)
        .then(response => response.json())
        .then(data => {
            let newPokemonLowercase = document.getElementById('newPokemonFront')
            let sprite = data.sprites.front_default
            console.log(data)
            newPokemonLowercase.src=sprite
            gsap.to('#newPokemonFront', {delay: .5, opacity: 1, duration: 1})
            
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


    