const poke_container = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemon = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    createPokemonCard(data)
}

//create a card for each pokemon
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')
    //pokemon name will have first letter uppercase - else all lowercase
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    //will add zeros to the start of number
    const id = pokemon.id.toString().padStart(3, '0')

    //pokemon type
    const poke_types = pokemon.types.map(type => type.type.name)
    //abilities for each pokemon
    const poke_ability = pokemon.abilities.map(ability => ability.ability.name)
    // const poke_move = pokemon.moves.map(move => move.move.name)
    //above -1 will return a type
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    //will set color to match type
    const color = colors[type]
    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            <br>
            <small class="type">Abilities: <span>${poke_ability}</span></small>
            <br>
            <small class="type">Height: <span>${pokemon.height}</span></small>
            <br>
            <small class="type">Weight: <span>${pokemon.weight}</span></small>
            
        </div>
    `
    // <br>
    {/* <small class="type">Abilities: <span>${poke_move}</span></small> */}

    pokemonEl.innerHTML = pokemonInnerHTML
    poke_container.appendChild(pokemonEl)
}

fetchPokemon()