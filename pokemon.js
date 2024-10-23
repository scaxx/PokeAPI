document.addEventListener("DOMContentLoaded", function() {
    const displayPokemon = document.getElementById("pokemon-container");
    const URL = "https://pokeapi.co/api/v2/pokemon/";

    
    function showPokemon(data) {
        let types = data.types.map(ptype => `<h3 class="type ${ptype.type.name}">${ptype.type.name}</h3>`);
        types = types.join("");

        const div = document.createElement("div");
        div.classList.add("pokemon-card");
        div.innerHTML = `
        <div class="card-top">
            <img src="${data.sprites.front_default}" class="sprite" alt="${data.name}">
        </div>
        <div class="card-bottom">
            <h2 class="name">${data.name}</h2>
            ${types}
            <h4 class="id">ID: ${data.id}</h4>
            <button class="more-info">More info</button> 
        </div>
        `;
        displayPokemon.append(div);

        const moreInfo = div.querySelector(".more-info");
        moreInfo.addEventListener("click", function() {
            localStorage.setItem('selectedPokemonId', data.id);
            window.location.href = "card.html";
        });
    }

    
    function fetchPokemonById(id) {
        return fetch(`${URL}${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching Pokémon:', error);
                return null;
            });
    }

    
    function loadPokemonForGeneration(start, end) {
        const promises = [];
        for (let i = start; i <= end; i++) {
            promises.push(fetchPokemonById(i));
        }

        Promise.all(promises)
            .then(results => {
                results.forEach(data => {
                    if (data) {
                        showPokemon(data);
                    }
                });
            })
            .catch(error => console.error('Error handling Pokémon data:', error));
    }


    function displayGen() {
        const currentUrl = window.location.href;

        if (currentUrl.includes("all.html")) {
            loadPokemonForGeneration(1, 1025);
        } else if (currentUrl.includes("gen1.html")) {
            loadPokemonForGeneration(1, 151);
        } else if (currentUrl.includes("gen2.html")) {
            loadPokemonForGeneration(152, 251);
        } else if (currentUrl.includes("gen3.html")) {
            loadPokemonForGeneration(252, 386);
        } else if (currentUrl.includes("gen4.html")) {
            loadPokemonForGeneration(387, 493);
        } else if (currentUrl.includes("gen5.html")) {
            loadPokemonForGeneration(494, 649);
        } else if (currentUrl.includes("gen6.html")) {
            loadPokemonForGeneration(650, 721);
        } else if (currentUrl.includes("gen7.html")) {
            loadPokemonForGeneration(722, 809);
        } else if (currentUrl.includes("gen8.html")) {
            loadPokemonForGeneration(810, 898);
        } else if (currentUrl.includes("gen9.html")) {
            loadPokemonForGeneration(899, 1025);
        }
    }

    displayGen();
});


function scrollToTop() {

    window.scrollTo({top: 0, behavior: "smooth"});

}


window.addEventListener('scroll', () => {

    if (document.documentElement.scrollTop > 100) {
        up.style.display = 'block';
    } else {
        up.style.display = 'none';
    }

});


up.addEventListener("click", scrollToTop);