const axios = require('axios');
const Pokemon = require('./Pokemon.js');

const getPokemon = async (pokemon = 'pikachu') => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const newPokemon = new Pokemon(res.data.name, res.data.sprites.front_default, res.data.abilities, res.data.types[0].type.name);
        return newPokemon;
    } catch (e) {
        console.log(e);
    }
}

module.exports.getPokmeon = getPokemon;
