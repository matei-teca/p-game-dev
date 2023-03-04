import {atom} from 'jotai'

const state = {
    locations: atom(null),
    modalShow: atom(false),
    level: atom({
        level: 1,
        exp: 0,
        maxExp: 300
    }),
    collectionSlides: atom([]),
    pokemonCollection: atom(null),
    userPokemons: atom({}),
    enemyPokemon: atom(null),
    ifEnemyLost: atom(false),
    pokemonSelected: atom(null),
}

export default state