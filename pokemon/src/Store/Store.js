
export function createPokemonStore () {
  return {
    // This is the stored state
    pokemon: null,
    active: false,
    selected: {
      name: '',
      selected: false,
      type: null,
      ability: null
    },
    caughtPokemon: [],

    // Function that makes a fetch call and returns a random list of 10 pokemon
    GetPokemon () {
      const offset = Math.floor(Math.random() * 100)
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`,
        {
          method: 'get'
        }
      )
        .then(response => response.json())
        .then(data => {
          this.pokemon = data.results
        })
    },

    // Function that takes in the pokemons url and name to set the pokemons types and abilites in the selected state
    Selected (url, name) {
      fetch(
        `${url}`,
        {
          method: 'get'
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log(data,'data')
          this.selected = {
            name: name,
            selected: true,
            type: data.types,
            ability: data.abilities
          }
        })
    },

    // Function that checks to see if the pokemon is selected and then changes the name if desired and moves it to the caught pokemon arr
    ChangeName (name) {
      this.pokemon.forEach(item => {
        if (item.name === name.selected.name) {
          item.name = name.name
          const caughtPoke = this.pokemon.splice(this.pokemon.indexOf(item), 1)
          console.log(caughtPoke[0], 'Caught poke')
          this.caughtPokemon.push(caughtPoke[0])
          return this.pokemon
        }
      })
    },

    // Function that allows User to change the pokemon name if desired on the caught pokemon list
    ChangeCaughtPokeName (name) {
      this.caughtPokemon.forEach(item => {
        if (item.name === name.selected.name) {
          item.name = name.name
        }
      })
    }
  }
}
