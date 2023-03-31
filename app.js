const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const Pokemon = require("./public/js/Pokemon");


app.use(express.static(path.join(__dirname, "public")))

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render("home.ejs");
})

String.prototype.capitalize = function () {
    const firstLetter = this.charAt(0).toUpperCase();
    const remainingLetters = this.slice(1);
    return firstLetter + remainingLetters;
}

app.post("/search", (req, res) => {
    const pokemon = req.body.name;
    const getPokemon = async (pokemon = 'pikachu') => {
        try {
            const pkData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const newPokemon = new Pokemon(pkData.data.name.capitalize(), pkData.data.sprites.front_default, pkData.data.abilities, pkData.data.types[0].type.name.capitalize());
            return newPokemon;
        } catch (e) {
            console.log(e);
        }
    }
    getPokemon(pokemon).then((data) => {
        res.render("pokemon", { data })
    })


})

app.get('/:pokemon', (req, res) => {
    const { pokemon } = req.params;
    const getPokemon = async (pokemon = 'pikachu') => {
        try {
            const pkData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const newPokemon = new Pokemon(pkData.data.name.capitalize(), pkData.data.sprites.front_default, pkData.data.abilities, pkData.data.types[0].type.name.capitalize());
            return newPokemon;
        } catch (e) {
            console.log(e);
        }
    }
    getPokemon(pokemon).then((data) => {
        res.render("pokemon", { data })
    })


})


app.listen(8080, () => {
    console.log("listening on 8080");
})


