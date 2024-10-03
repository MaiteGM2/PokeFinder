async function fetchPokemons () {
    try {
        const offset = 0;
        const limit = 25;
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=25');
        data = await response.json();
        console.log(data);
        updatePokemons(data);
    } catch (error) {
        console.error('Error in fetch API:', error);
    };
}

async function updatePokemons (data) {
    const pokemonContainer = document.getElementById ('pokemons-container');
    pokemonContainer.innerHTML = '';

    const pokemons = data.results;

    for(let pokemon of pokemons){
        try{
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const type = data.types[0].type.name;

            const card =  `
                <div class="pokemon-card">
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>${type}</p>
                </div>
            `;

            pokemonContainer.innerHTML += card;
        } catch (error) {
            console.error('Error getting Pokémon details', error);
        }
    }
}

fetchPokemons ();
