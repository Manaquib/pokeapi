import './App.css';
import {useState} from 'react'
import axios from 'axios';

function App() {
  const [pokemonName, setPokemonName]=useState('')
  const [pokemonChosen, setPokemonChosen]=useState(false)
  const [pokemon, setPokemon]=useState({
    name: '',
    sprites: '',
    species: '',
    hp: '',
    attack: '',
    defense: '',
    type: ''
  })

  function searchPokemon(e){
    e.preventDefault()

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response=>{
        setPokemon({
          name: pokemonName,
          sprites: response.data.sprites.front_default,
          species: response.data.species.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name
        })
        setPokemonChosen(true)
        setPokemonName('')

      })
      .catch(err=>console.log('Invalid'+err))
  }

  return (
    <div className="App">
      <InputPokemon searchPokemon={searchPokemon} pokemonName={pokemonName} setPokemonName={setPokemonName}/>
      <div>{!pokemonChosen? (<div>Search a Pokemon...</div>) : (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites} alt='' />
          <h4>Species: {pokemon.species}</h4>
          <h4>Type: {pokemon.type}</h4>
          <h4>HP: {pokemon.hp}</h4>
          <h4>Defense: {pokemon.defense}</h4>
          <h4>Attack: {pokemon.attack}</h4>
        </>
      )}</div>
    </div>
  );  
}

function InputPokemon(props){
  return(
    <form onSubmit={props.searchPokemon} action='' className='container'>
      <h2>Pokemon Stats</h2>
      <input value={props.pokemonName} onChange={e=>props.setPokemonName(e.target.value)} type="text" placeholder="Pokemon Name..."/>
      <button>Search</button>
    </form>
  )
}
export default App;
