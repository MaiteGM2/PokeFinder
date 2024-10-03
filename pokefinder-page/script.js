async function fetchPokemons () {
    try {
        const offset = 0;
        const limit = 25;
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=25');
        data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error in fetch API:', error);
    };
}

fetchPokemons ();
