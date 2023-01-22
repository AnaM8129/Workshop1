//CAPTURAR DATOS SOBRE LA API
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const pokemonsContainer = document.getElementById("pokemons-container");
const arrayPokemons = [];
const pokemonName = document.getElementById("pokemonName");
const pokemonImgBig = document.querySelector(".image-charizard");
const noPokemon = document.getElementById("no");
const levelPokemon = document.getElementById("level");
const typePokemon = document.getElementById("type");
const abilityPokemon = document.getElementById("ability");
const heightPokemon = document.getElementById("height");
const weightPokemon = document.getElementById("weight");
const form = document.getElementById("form");

//OBTENER POKEMONES
const getPokemons = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(URL_API);
    results.forEach(async (result, index) => {
      const abilitiesList = [];
      const typesList = [];
      const {
        data: {
          id,
          name,
          order,
          base_experience,
          height,
          weight,
          types,
          abilities,
          sprites: {
            other: {
              dream_world: { front_default },
            },
          },
        },
      } = await axios.get(result.url);
      abilities.forEach((abilitie) => {
        abilitiesList.push(abilitie.ability.name);
      });
      types.forEach((type) => {
        typesList.push(type.type.name);
      });
      const newPokemon = {
        id: id,
        name: name,
        number: order,
        image: front_default,
        weight: weight * 0.1,
        height: Number((height * 0.1).toFixed(2)),
        level: base_experience,
        type: typesList,
        abilities: abilitiesList,
      };
      arrayPokemons.push(newPokemon);
      if (index + 1 === results.length) {
        renderPokemons(arrayPokemons);
        popUp(arrayPokemons);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
getPokemons();

// RENDER POKEMONS MINI
const renderPokemons = (arrayPokemons) => {
  pokemonsContainer.innerHTML = " ";
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

//RENDER POKEMONS BIG
const popUp = (arrayPokemons) => {
  pokemonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clickMe")) {
      console.log("hice Click");
      console.log(e.target.id);
      arrayPokemons.forEach((pokemon) => {
        if (pokemon.id == e.target.id) {
          console.log(pokemon);
          pokemonName.innerText = pokemon.name.toUpperCase();
          pokemonImgBig.innerHTML = `<img
            src="${pokemon.image}"
            alt="pokemonImg"
          />`;
          noPokemon.innerText = pokemon.number;
          levelPokemon.innerText = pokemon.level;
          typePokemon.innerText = "";
          abilityPokemon.innerText = "";
          pokemon.type.forEach((type) => {
            typePokemon.innerText += type.toUpperCase();
          });
          pokemon.abilities.forEach((abilitie) => {
            abilityPokemon.innerText += abilitie.toUpperCase();
          });
          heightPokemon.innerText = `${pokemon.height} m`;
          weight.innerText = `${pokemon.weight} kg`;
        }
      });
    }
  });
};

//FILTER
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputPokemon = document.getElementById("input");
  const inputValue = inputPokemon.value;
  // if (inputValue) {
  //   console.log(inputValue)
  //   getPokemonsDos(URL_API, inputValue);
  // }
});
