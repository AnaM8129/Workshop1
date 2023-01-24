//CAPTURAR DATOS SOBRE LA API
const URL_API = "https://pokeapi.co/api/v2/pokemon";

export const APIPokemons = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(URL_API);
      return results;

  } catch (error) {
      console.log(error);
  }
};

export const getAPIPokemonsURL = async (result) => {
    try {
        const { data } = await axios.get(result.url);
        return data;
    } catch (error) {
        console.log(error);
    }
}