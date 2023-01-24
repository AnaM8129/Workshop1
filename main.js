//IMPORTS
import { APIPokemons, getAPIPokemonsURL } from "./scripts/services.js";
import { elementsIcons } from "./scripts/icons.js";
import { styleNumber } from "./scripts/helpers.js";
import { renderPokemons, popUp } from "./scripts/ui.js";

const form = document.getElementById("form");
const arrayPokemons = [];

document.addEventListener("DOMContentLoaded", async () => {
  //CALL API POKEMONS
  const results = await APIPokemons();

  const getPokemons = (inputValue = "") => {
    //CREATE POKEMONS ARRAY BASED ON SEARCHES
    const pokeFilter = inputValue
      ? results.filter((poke) =>
          poke.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : results;
    //GOES THROUGH EACH POKEMON
    pokeFilter.forEach(async (result, index) => {
      const abilitiesList = [];
      const typesList = [];
      const iconsList = [];
      //CALL API API POKEMONS'URL
      const dataURL = await getAPIPokemonsURL(result);
      //CREATE ABILITIES ARRAY
      dataURL.abilities.forEach((abilitie) => {
        abilitiesList.push(abilitie.ability.name);
      });
      //CREATE TYPES ARRAY & FILTER ICON ELEMENT BASED ON TYPE & CREATE ICON ARRAY
      dataURL.types.forEach((type) => {
        typesList.push(type.type.name);
        const pruebas = elementsIcons.filter((poke) =>
          poke.name.includes(type.type.name)
        );
        iconsList.push(pruebas[0].icon);
      });
      // CREATE OBEJECT THAT CONTAINS ALL POKEMON INFO REQUIRED
      const newPokemon = {
        id: dataURL.id,
        name: dataURL.name,
        number: dataURL.order,
        image: dataURL.sprites.other.dream_world.front_default,
        weight: styleNumber(dataURL.weight),
        height: styleNumber(dataURL.height),
        level: dataURL.base_experience,
        type: typesList,
        abilities: abilitiesList,
        iconElement: iconsList,
      };
      //PUSH TO POKEMONS'ARRAY GENERAL
      arrayPokemons.push(newPokemon);
      console.log(newPokemon);
      //CONDITION TO CALL BACK POKEMONS'ARRAY GENERAL
      if (index + 1 === pokeFilter.length) {
        renderPokemons(arrayPokemons);
        popUp(arrayPokemons);
        console.log(arrayPokemons);
      }
    });
  };
  getPokemons();

  //FILTER
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputPokemon = document.getElementById("input");
    const inputValue = inputPokemon.value;
    getPokemons(inputValue);
  });
});
