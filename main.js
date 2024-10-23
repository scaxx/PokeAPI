const dropdownBtn = document.getElementById("dropdown-btn");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const title = document.getElementById("title");
const dropdownCont = document.getElementById("dropdown");
const welcomeText1 = document.getElementById("welcome1");
const welcomeText2 = document.getElementById("welcome2");
const up = document.getElementById("up");

const all = document.querySelector(".gen-btn.all");
const one = document.querySelector(".gen-btn.one");
const two = document.querySelector(".gen-btn.two");
const three = document.querySelector(".gen-btn.three");
const four = document.querySelector(".gen-btn.four");
const five = document.querySelector(".gen-btn.five");
const six = document.querySelector(".gen-btn.six");
const seven = document.querySelector(".gen-btn.seven");
const eight = document.querySelector(".gen-btn.eight");
const nine = document.querySelector(".gen-btn.nine");

const displayPokemon = document.getElementById("pokemon-container");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Función para los botones de generaciones

function showMenu() {
    
    if (dropdownCont.style.display === "none" || dropdownCont.style.display === "") {
        dropdownCont.style.display = "block";
        welcomeText1.style.display = "none";
        welcomeText2.style.display = "none";
        searchBar.style.display = "none";
    } else {
        dropdownCont.style.display = "none";
        welcomeText1.style.display = "block";
        welcomeText2.style.display = "block";
    }

}


function displayBar() {

    if (searchBar.style.display === "none" || searchBar.style.display === "") {
        searchBar.style.display = "block";
        dropdownCont.style.display = "none";
        welcomeText1.style.display = "none";
        welcomeText2.style.display = "none";
    } else {
        searchBar.style.display = "none";
        welcomeText1.style.display = "block";
        welcomeText2.style.display = "block";
    }

}


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


function search(event) {

    if (event.key === "Enter") {

        const searchTerm = searchBar.value.toLowerCase();
        const searchURL = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

        fetch(searchURL)
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                
                displayPokemon.innerHTML = "";
                showPokemon(data);
            })
            .catch(error => {

                console.error('Error fetching data:', error);
            });

        searchBar.style.display = "none";

    }

}


function navigateToIndex() {

    window.location.href = "index.html";

}


function navigateToGen(event) {

    const targetClass = event.target.classList[1];
    const pages = {
        'all': 'all.html',
        'one': 'gen1.html',
        'two': 'gen2.html',
        'three': 'gen3.html',
        'four': 'gen4.html',
        'five': 'gen5.html',
        'six': 'gen6.html',
        'seven': 'gen7.html',
        'eight': 'gen8.html',
        'nine': 'gen9.html'
    };

    const page = pages[targetClass];

    if (page) {

        window.location.href = page;

    }

}


dropdownBtn.addEventListener("click", showMenu);

searchBtn.addEventListener("click", displayBar);

searchBar.addEventListener("keypress", search);

title.addEventListener("click", navigateToIndex);

const genButtons = document.querySelectorAll(".gen-btn");
    
genButtons.forEach(button => button.addEventListener("click", navigateToGen));