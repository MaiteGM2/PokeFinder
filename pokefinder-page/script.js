let currentPage = 1;
let totalPages = 0;
let allPokemons = [];
let pokemonsOnPage = [];
let filteredPokemons = [];

async function fetchPokemons (page) {
    try {
        const dataPokemonsPagination = await fetchPokemonsPagination(page);

        const countPokemons = dataPokemonsPagination.count;
        pokemonsOnPage = dataPokemonsPagination.pokemons;

        if(allPokemons.length === 0){
            fetchAllPokemons(countPokemons);
        }

        updatePokemons(pokemonsOnPage);
        updatePaginationControls();
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

async function fetchOnePokemon(pokemon) {
    try{
        const response = await fetch(pokemon.url);
        const data = await response.json();
        
        return data;
    } catch (error){
        console.error('Error in fetch on pokemon:', error);
    }
}

async function updatePokemons (pokemons) {
    const pokemonContainer = document.getElementById ('pokemons-container');
    pokemonContainer.innerHTML = '';

    for(let pokemon of pokemons){
        try{
            const data = await fetchOnePokemon(pokemon);
            const type = data.types.map((types) => {
                return types.type.name;
              });

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
        if (filteredPokemons.length > 0) {
            pokemonsPagination(filteredPokemons);
        } else {
            fetchPokemons(currentPage); 
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        if (filteredPokemons.length > 0) {
            pokemonsPagination(filteredPokemons);
        } else {
            fetchPokemons(currentPage);
        }
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

function searchPokemon() {
    const inputSearch = document.getElementById('input-search');
    const inputData = inputSearch.value.trim().toLowerCase();
    filteredPokemons = [];

    if (!inputData) {
        currentPage = 1;
        fetchPokemons(currentPage);
        return;
    }

    filteredPokemons = allPokemons.filter(pokemon => {
        const name = pokemon.name.toLowerCase();
        return name.includes(inputData)
    });

    pokemonsPagination(filteredPokemons);
}

function pokemonsPagination(pokemons){
    const quantityPerPage = 25;

    pokemonsOnPage = [];
    
    const offset = (currentPage - 1) * quantityPerPage;
    const limit = currentPage * quantityPerPage;

    for (let i = offset; i < limit && i < pokemons.length; i++) {
        pokemonsOnPage.push(pokemons[i]);
    }
    
    totalPages = Math.ceil(pokemons.length / quantityPerPage);

    updatePaginationControls();
    updatePokemons(pokemonsOnPage);
}

document.getElementById('input-search').addEventListener('input', searchPokemon);

window.onload = fetchPokemons (currentPage);
