let currentPage = 1;
let totalPages = 0;

async function fetchPokemons (page = 1) {
    try {
        const quantityPerPage = 25;
        const offset = (page - 1)  * quantityPerPage;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${quantityPerPage}`);
        data = await response.json();
        totalPages = Math.ceil(data.count / quantityPerPage);

        updatePokemons(data, quantityPerPage);
        updatePaginationControls();
    } catch (error) {
        console.error('Error in fetch API:', error);
    };
}

async function updatePokemons (data, quantityPerPage) {
    const pokemonContainer = document.getElementById ('pokemons-container');
    pokemonContainer.innerHTML = '';

    const pokemons = data.results;
    const visiblePokemons = pokemons.slice(0, quantityPerPage);

    for(let pokemon of visiblePokemons){
        try{
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const type = data.types[0].type.name;

            const card =  `
                <div class="pokemon-card">
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.other.showdown.front_default}">
                    <p>${type}</p>
                </div>
            `;

            pokemonContainer.innerHTML += card;
        } catch (error) {
            console.error('Error getting Pokémon details:', error);
        }
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchPokemons(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchPokemons(currentPage);
    }
}

fetchPokemons (currentPage);
