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
const elementsIcons = [
        {
            id:1,
            name:'bug',
            icon:'./elementsIcons/bug.svg'
        },
        {
            id:2,
            name:'dark',
            icon: './elementsIcons/dark.svg'
        },
        {
            id:3,
            name:'dragon',
            icon:"./elementsIcons/dragon.svg"
        },
        {
            id:4,
            name:"electric",
            icon:"./elementsIcons/electric.svg"
        },
        {
            id:5,
            name:"fairy",
            icon:"./elementsIcons/fairy.svg"
        },
        {
            id:6,
            name:"fighting",
            icon:"./elementsIcons/fighting.svg"
        },
        {
            id:7,
            name:"fire",
            icon:"./elementsIcons/fire.svg"
        },
        {
            id:8,
            name:"flying",
            icon:"./elementsIcons/flying.svg"
        },
        {
            id:9,
            name:"ghost",
            icon:"./elementsIcons/ghost.svg"
        },
        {
            id:10,
            name:"grass",
            icon:"./elementsIcons/grass.svg"
        },
        {
            id:11,
            name:"ground",
            icon:"./elementsIcons/ground.svg"
        },
        {
            id:12,
            name:"ice",
            icon:"./elementsIcons/ice.svg"
        },
        {
            id:13,
            name:"normal",
            icon:"./elementsIcons/normal.svg"
        },
        {
            id:14,
            name:"poison",
            icon:"./elementsIcons/poison.svg"
        },
        {
            id:15,
            name:"psychic",
            icon:"./elementsIcons/psychic.svg"
        },
        {
            id:16,
            name:"rock",
            icon:"./elementsIcons/rock.svg"
        },
        {
            id:17,
            name:"steel",
            icon:"./elementsIcons/steel.svg"
        },
        {
            id:18,
            name:"water",
            icon:"./elementsIcons/water.svg"
        }
    ]



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
      types.forEach((type) => {
        typesList.push(type.type.name);
        pruebas = elementsIcons.filter((poke) => poke.name.includes(type.type.name));
        iconsList.push(pruebas[0].icon);
      });
      const newPokemon = {
        id: id,
        name: name,
        number: order,
        image: front_default,
        weight: Number((weight * 0.1).toFixed(2)),
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
  getPokemons(inputValue);
});
