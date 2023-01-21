//CAPTURAR DATOS SOBRE LA API
const URL_API = "https://pokeapi.co/api/v2/pokemon";
const pokemonsContainer = document.getElementById("pokemons-container");
const arrayPokemons = [];

//OBTENER POKEMONES
const getPokemons = async () => {
  const response = await axios.get(URL_API);
  console.log(response.data.results);
  response.data.results.forEach(async (element, index) => {
    const dataPokemon = await axios.get(element.url);
    // console.log(dataPokemon);
    const newPokemon = {
      name: element.name,
      number: dataPokemon.data.order,
      image: dataPokemon.data.sprites.front_default,
      weight: dataPokemon.data.weight,
      height: dataPokemon.data.height,
      type: dataPokemon.data.types[0].type.name,
      abilities: dataPokemon.data.abilities[0].ability.name,
      level: dataPokemon.data.base_experience,
    };
    arrayPokemons.push(newPokemon);

    if (index + 1 === response.data.results.length) {
      console.log(arrayPokemons);
      renderPokemons(arrayPokemons);
    }
  });
};
getPokemons();

const renderPokemons = (arrayPokemons) => {
  pokemonsContainer.innerHTML = " ";
  arrayPokemons.forEach((element) => {
    pokemonsContainer.innerHTML += `
        <div class="figure-container">
          <img
            src="${element.image}"
            alt="pokemon"
          />
        </div>
        `;
    // console.log(element);
  });
};
