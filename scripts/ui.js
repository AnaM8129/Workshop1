const pokemonsContainer = document.getElementById("pokemons-container");
const iconsContainer = document.getElementById("iconsContainer");
const pokemonName = document.getElementById("pokemonName");
const pokemonImgBig = document.querySelector(".image-charizard");
const noPokemon = document.getElementById("no");
const levelPokemon = document.getElementById("level");
const typePokemon = document.getElementById("type");
const abilityPokemon = document.getElementById("ability");
const heightPokemon = document.getElementById("height");
const weightPokemon = document.getElementById("weight");

// RENDER POKEMONS MINI CARD
export const renderPokemons = (arrayPokemons) => {
  pokemonsContainer.innerHTML = '';

  arrayPokemons.forEach((element) => {
    pokemonsContainer.innerHTML += `
        <div class="figure-container" >
          <img
            src="${element.image}"
            alt="pokemon"
            class="clickMe"
            id="${element.id}"
          />
        </div>
        `;
  });
};

//RENDER POKEMONS BIG CARD
export const popUp = (arrayPokemons) => {
  pokemonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clickMe")) {
      iconsContainer.innerHTML = "";
      arrayPokemons.forEach((pokemon) => {
        if (pokemon.id == e.target.id) {
          pokemonName.innerText = pokemon.name.toUpperCase();
          pokemon.iconElement.forEach((element) => {
            iconsContainer.innerHTML += `
            <img
              src="${element}"
              alt="llama"
            />`;
          });
          pokemonImgBig.innerHTML = `<img
            src="${pokemon.image}"
            alt="pokemonImg"
          />`;
          noPokemon.innerText = pokemon.number;
          levelPokemon.innerText = pokemon.level;
          typePokemon.innerText = "";
          abilityPokemon.innerText = "";
          pokemon.type.forEach((type) => {
            typePokemon.innerHTML += `${type.toUpperCase()} <span class="hidden">_</span>`;
          });
          pokemon.abilities.forEach((abilitie) => {
            abilityPokemon.innerHTML += `${abilitie.toUpperCase()} <span class="hidden">_</span>`;
          });
          heightPokemon.innerText = `${pokemon.height} m`;
          weightPokemon.innerText = `${pokemon.weight} kg`;
        }
      });
    }
  });
};
