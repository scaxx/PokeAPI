const goBack = document.getElementById("go-back");

function displayPokemonCard(data) {
    let types = data.types.map(ptype => 
        `<h3 class="type ${ptype.type.name}">${ptype.type.name}</h3>`);
    types = types.join("");

    const container = document.getElementById("pokemon-container");
    container.innerHTML = `
    <div class="pokemon-card">
        <div class="card-top">
            <img src="${data.sprites.front_default}" class="sprite" alt="${data.name}">
        </div>
        <div class="card-bottom">
            <h2 class="name">${data.name}</h2>
            ${types}
            <br>
            <hp class="id">ID: ${data.id}</hp>
            <br>
            <hp class="exp">Exp: ${data.base_experience}</hp>
            <br>
            <hp class="height">Height: ${data.height} m</hp>
            <br>
            <hp class="weight">Weight: ${data.weight} kg</hp>
        </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    const pokemonId = localStorage.getItem('selectedPokemonId');

    if (pokemonId) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonCard(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.error('No Pokémon ID found in local storage.');
    }
});

function back() {
    
    window.history.back();

}

goBack.addEventListener("click", back);