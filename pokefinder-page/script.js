let currentPage = 1;
let totalPages = 0;
let allPokemons = [];

async function fetchPokemons (page) {
    try {
        const dataPokemonsPagination = await fetchPokemonsPagination(page);

        const countPokemons = dataPokemonsPagination.count;
        const pokemonsOnPage = dataPokemonsPagination.pokemons;

        if(allPokemons.length === 0){
            fetchAllPokemons(countPokemons);
        }
/*     
        updatePokemons(pokemonsOnPage);
        updatePaginationControls(); */
    } catch (error) {
        console.error('Error in fetch API:', error);
    };
}

async function fetchPokemonsPagination(page = 1) {
    try{
        const quantityPerPage = 25;
        const offset = (page - 1)  * quantityPerPage;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${quantityPerPage}`);
        const data = await response.json();
        const pokemons = data.results;
        const count = data.count;
        totalPages = Math.ceil(count / quantityPerPage);
    
        return {pokemons, count};

    } catch (error) {
        console.error('Error in fetch pokemons pagination:', error);
    }
}

async function fetchAllPokemons(countPokemons) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${countPokemons}`);
        const data = await response.json();
        allPokemons = data.results;

    } catch (error) {
        console.error('Error in fetch all pokemons:', error);
    }
}

/* async function updatePokemons (pokemons) {
    const pokemonContainer = document.getElementById ('pokemons-container');
    pokemonContainer.innerHTML = '';

    for(let pokemon of pokemons){
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

function updatePaginationControls() {
    const pageNumber = document.getElementById('current-page');
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');

    pageNumber.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

async function searchPokemon() {
    const inputSearch = document.getElementById('input-search');
    const inputData = inputSearch.value.trim().toLowerCase();

    if (!inputData) {
        fetchPokemons();
        return;
    }

    const filteredPokemons = pokemonsOnPage.filter(pokemon => pokemon.name.toLowerCase().startsWith(inputData));
    
    await updatePokemons(filteredPokemons);
}

document.getElementById('input-search').addEventListener('input', searchPokemon); */

fetchPokemons (currentPage);
