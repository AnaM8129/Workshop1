//CAPTURAR DATOS SOBRE LA API
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const URL_API_ICONS = "http://localhost:3000/elementsIcons";
const pokemonsContainer = document.getElementById("pokemons-container");
const pokemonName = document.getElementById("pokemonName");
const pokemonImgBig = document.querySelector(".image-charizard");
const noPokemon = document.getElementById("no");
const levelPokemon = document.getElementById("level");
const typePokemon = document.getElementById("type");
const abilityPokemon = document.getElementById("ability");
const heightPokemon = document.getElementById("height");
const weightPokemon = document.getElementById("weight");
const form = document.getElementById("form");
const iconsContainer = document.getElementById("iconsContainer");
let pokeFilter = "";

//OBTENER POKEMONES
const getPokemons = async (inputValue = "") => {
  try {
    const arrayPokemons = [];
    const {
      data: { results },
    } = await axios.get(URL_API);
    pokeFilter = inputValue
      ? results.filter((poke) =>
          poke.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : results;
    pokeFilter.forEach(async (result, index) => {
      const abilitiesList = [];
      const typesList = [];
      const iconsList = [];

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
      types.forEach(async (type) => {
        typesList.push(type.type.name);
        const { data } = await axios.get(
          `${URL_API_ICONS}?name=${type.type.name}`
        );
        iconsList.push(data[0].icon);
        // console.log(iconsList)
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
        iconElement: iconsList,
      };
      arrayPokemons.push(newPokemon);
      if (index + 1 === pokeFilter.length) {
        renderPokemons(arrayPokemons);
        popUp(arrayPokemons);
        getIcons(arrayPokemons);
        console.log(arrayPokemons);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
getPokemons();

//GET ELEMENTS ICONS
const getIcons = async () => {
  try {
    const { data } = await axios.get(`${URL_API_ICONS}?name=bug`);
    console.log(data[0].icon);
  } catch (error) {
    console.log(error);
  }
};

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
      iconsContainer.innerHTML = '';
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
  if (inputValue) {
    getPokemons(inputValue);
  }
});
