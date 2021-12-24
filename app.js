
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
'29',
'Nidorina',
'Nidoqueen',
'32',
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
'122',
'Scyther',
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

const caughtList = ['Charmander']


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
let pokedexScreen = false

let battleCounter = 0
let battleTrigger = 5
let inBattle = false
let fight = true
let bag = false
let pokemon = false
let run = false

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
    keyDown(event.key)
})

function keyDown(event) {
        if (event == 'Enter'){

        // removes intro screen
        if (!inBattle){
            document.getElementById('introScreen').style.display = 'none'
            //play music first time
            audio = document.getElementById("audioCont")
            audio.play()
            // make music loop
            setInterval(() => { audio.play()
            }, 120000);

        }
        else if (inBattle && disableEnter == false ){
            disableEnter = true

            //if enter on fight
            if (fight){
                playerDamage -= Math.floor(Math.random() * (10 + 25)+  10) 
                newPokeDamage -= Math.floor(Math.random() * (10 + 30)+  10) 

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
                    gsap.to('#charBack', {delay: 4, x: '14rem', duration: 0})
                }
                

                // if pokemon takes damage
                else {
                    setTimeout(() => {battleText.innerHTML = `${currentName} attacks`}, 2200)
                    gsap.to('#charBack', {delay: 2.5, duration: .2, rotation: 5})
                    gsap.to('#charBack', {delay: 2.7, duration: .2, rotation: 0})
                    setTimeout(() => {battleText.innerHTML = `It's not ever effective`}, 3400)
                    gsap.to('#hpBarInner', {delay: 3.3, width: playerDamage+'%'})

                    // if charmander faints
                    if (playerDamage <= 0){
                        setTimeout(() => {battleText.innerHTML = `Charmander has fainted`}, 4400)
                        gsap.to('#battleScreen', {delay: 5.4, display: 'none'})
                        inBattle = false
                    }
                }
            }
            // if enter is hit on run
            else if (run){
                inBattle = false
                document.getElementById('battleScreen').style.display = 'none'
                battleCounter = 0
                gsap.to('#newPokemonFront', {delay: .5, opacity: 1, duration: 1})
                gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                disableEnter = false
                gsap.to('#charBack', {x: '14rem', duration: 0})
                
            }
            // if enter is hit on catch
            else if (bag){
                let catchAttempt = Math.floor(Math.random() * 100)

                // successful catch
                if (catchAttempt > newPokeDamage){
                    // reset pokeball if already used
                    gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                    document.getElementById('pokeball').src = 'images/pokeball.png'

                    document.getElementById('pokeball').style.display = 'block'
                    gsap.to('#pokeball', {y: '-9rem', x: '-.5rem', duration: .8, scale: .2, rotation: 15})
                    gsap.to('#newPokemonFront', {delay: .8, duration: 0, opacity: 0})
                    gsap.to('#pokeball', {delay: 1.5, rotation: 0})
                    gsap.to('#pokeball', {delay: 1.7, rotation: 25})
                    gsap.to('#pokeball', {delay: 2.3, rotation: 0})
                    gsap.to('#pokeball', {delay: 2.5, rotation: 25})

                    setTimeout(() => {battleText.innerHTML = `You caught ${currentName}!`}, 3400 )
                    
                    inBattle = false
                    gsap.to('#battleScreen', {delay: 4, display: 'none'})
                    setTimeout(() => gsap.to('#charBack', {x: '14rem', duration: 0}), 5000 )
                    battleCounter = 0
                    caughtList.push(currentName)

                    setTimeout(() => {disableEnter = false}, 4000)
                }
                // if catch attempt fails
                else{
                    // reset pokeball if already used
                    gsap.to('#pokeball', {delay: 0, duration: 0, y: '0rem', x: '0rem', scale: 1})
                    document.getElementById('pokeball').src = 'images/pokeball.png'

                    document.getElementById('pokeball').style.display = 'block'
                    gsap.to('#pokeball', {y: '-9rem', x: '-.5rem', duration: .8, scale: .2, rotation: 15})
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
            // if enter is hit on pokedex
            else if (pokemon){
                let pokdedexDom = document.getElementById('pokedex')
                // toggles screen on hitting enter
                if (pokedexScreen){
                    pokdedexDom.style.display = 'none'
                    disableEnter = false
                    pokedexScreen = false
                }
                // shows pokedex
                else{
                    pokedexScreen = true
                    disableEnter = false
                    pokdedexDom.style.display = 'block'
                    let newElement = ''
                    console.log(pokemonList)
                    console.log(caughtList)
                    for (let i = 0; i < pokemonList.length; i++){
                        // if Nidoran
                        if (i == 29 -1){
                            // if caught
                            if (caughtList.includes('Nidoran m') ){
                                newElement += `<p class="pokedexItems">${i + 1} Nidoran m <img class="caughtBall" src='images/pokeball.png'/></p>` 
                            }
                            // if not caught
                            else{
                                newElement += `<p class="pokedexItems">${i + 1} Nidoran</p>` 
                            }
                        }
                        // if Nidoqueen
                        else if (i == 32 -1){
                            // if caught
                            if (caughtList.includes('Nidoran f') ){
                                // alert('caught')
                                newElement += `<p class="pokedexItems">${i + 1} Nidoran f <img class="caughtBall" src='images/pokeball.png'/></p>` 
                            }
                            // if not caught
                            else{
                                newElement += `<p class="pokedexItems">${i + 1}  Nidoqueen</p>`
                            }
                        }
                        // If Mr. Mime
                        else if (i == 122 -1){
                            // if caught
                            if (caughtList.includes('Mr. Mime') ){
                                newElement += `<p class="pokedexItems">${i + 1} Mr. Mime <img class="caughtBall" src='images/pokeball.png'/></p>` 
                            }
                            // if not caught
                            else{
                                newElement += `<p class="pokedexItems">${i + 1}  Mr. Mime</p>`
                            }
                        }
                        else{
                            // if caught
                            if (caughtList.includes(pokemonList[i]) ){
                                // console.log(pokemonList[i],'i pokemon')
                                newElement += `<p class="pokedexItems">${i + 1} ${pokemonList[i]} <img class="caughtBall" src='images/pokeball.png'/></p>`
                            }
                            // if not caught
                            else{
                                newElement += `<p class="pokedexItems">${i + 1} ${pokemonList[i]}</p>`
                            }
                        }
                    }
                    pokdedexDom.innerHTML = newElement
                    //Srroll through pokedex screen
                    gsap.to('.pokedexItems', {delay: 1, duration: 40, y: '-225rem', ease: 'none'})
                    gsap.to('.pokedexItems', {delay: 42, duration: 40, y: '0rem', ease: 'none'})
                }
            }
        }
    }
}

//make square on grid
let squares = Array.from(document.querySelectorAll('#grid div'))

// Player Moves Right
document.addEventListener("keydown", function (event) {

    if (event.key == 'ArrowRight'){
        arrowRight()
    }
 
    // Player Moves Left
    if (event.key == 'ArrowLeft'){
        arrowLeft()
        }

    // Player Moves Down
    if (event.key == 'ArrowDown'){
        arrowDown()
        }
    
    // Player Moves Up
    if (event.key == 'ArrowUp'){
        arrowUp()
        }

})

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
        battle()
        
        inBattle = true
        document.getElementById('battleScreen').style.display = 'flex'

        gsap.to('#battleUIRight', {delay: 1.5, display: 'block'})
        gsap.to('#charBack', {x: '-14rem'})
        setTimeout(() => {battleText.innerHTML = 'What will Charmander do?'}, 1500)
        battleCounter = -1
        battleTrigger = Math.floor(Math.random() *(1 + 10) + 1)
    }
}

function battle() {
    let randomPokemon = Math.floor(Math.random() * pokemonList.length)
    let newPokemon = pokemonList[randomPokemon]
    currentName = newPokemon
    if (currentName == '122'){
        currentName = 'Mr. Mime'
        document.getElementById('battleUILeft').innerHTML =`A wild Mr. Mime appears!`
    }
    else if (currentName == '29'){
        currentName = 'Nidoran m'
        document.getElementById('battleUILeft').innerHTML =`A wild Nidoran m appears!`
    }
    else if (currentName =='32'){
        currentName = 'Nidoran f'
        document.getElementById('battleUILeft').innerHTML =`A wild Nidoran f appears!` 
    }
    else{
        document.getElementById('battleUILeft').innerHTML =`A wild ${newPokemon} appears!`
    }

    document.getElementById('newPokemonName').innerHTML = currentName + '&nbspLv5'
    let newPokemonLowercase = newPokemon.toLowerCase()
    gsap.to('#newPokemonFront', {opacity: 0, duration: 0})
    fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemonLowercase}`)
    .then(response => response.json())
    .then(data => {
        let newPokemonLowercase = document.getElementById('newPokemonFront')
        let sprite = data.sprites.front_default
        // console.log(data)
        newPokemonLowercase.src=sprite
        gsap.to('#newPokemonFront', {delay: .5, opacity: 1, duration: 1})
    })
}

function arrowRight() {

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


function arrowLeft() {
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

function arrowDown() {
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

function arrowUp() {
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



document.getElementById('arrowRight').onclick = function() {
    arrowRight()
}

document.getElementById('arrowLeft').onclick = function() {
    arrowLeft()
}
document.getElementById('arrowDown').onclick = function() {
    arrowDown()
}

document.getElementById('arrowUp').onclick = function() {
    arrowUp()
}

document.getElementById('introScreen').onclick = function() {
    let event = "Enter"
    keyDown(event)
}

document.getElementById('enterBtn').onclick = function() {
    let event = "Enter"
    keyDown(event)
}


// if fight button is clicked on
document.getElementById('fightBtn').onclick = function() {
    let event = "Enter"
    fight = true
    bag = false
    pokemon = false
    run = false
    document.getElementById('fightArrow').style.display = 'flex'
    document.getElementById('bagArrow').style.display = 'none'
    document.getElementById('pokeArrow').style.display = 'none'
    document.getElementById('runArrow').style.display = 'none'
    keyDown(event)
}

// if catch button is clicked on
document.getElementById('bagBtn').onclick = function() {
    let event = "Enter"
    fight = false
    bag = true
    pokemon = false
    run = false
    document.getElementById('fightArrow').style.display = 'none'
    document.getElementById('bagArrow').style.display = 'flex'
    document.getElementById('pokeArrow').style.display = 'none'
    document.getElementById('runArrow').style.display = 'none'
    keyDown(event)
}

// if Pokedex button is clicked on
document.getElementById('pokedexBtn').onclick = function() {
    let event = "Enter"
    fight = false
    bag = false
    pokemon = true
    run = false
    document.getElementById('fightArrow').style.display = 'none'
    document.getElementById('bagArrow').style.display = 'none'
    document.getElementById('pokeArrow').style.display = 'flex'
    document.getElementById('runArrow').style.display = 'none'
    keyDown(event)
}

// if Run button is clicked on
document.getElementById('runBtn').onclick = function() {
    let event = "Enter"
    fight = false
    bag = false
    pokemon = false
    run = true
    document.getElementById('fightArrow').style.display = 'none'
    document.getElementById('bagArrow').style.display = 'none'
    document.getElementById('pokeArrow').style.display = 'none'
    document.getElementById('runArrow').style.display = 'flex'

    pokedexScreen = false
    keyDown(event)
}


// if click inside of pokedex screen
document.getElementById('pokedex').onclick = function() {
    document.getElementById('pokedex').style.display = 'none'
    pokedexScreen = false
}