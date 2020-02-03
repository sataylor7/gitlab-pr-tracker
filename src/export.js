// need to export each features reducer, creator and container/component
// this is what is imported into the main app that the user will interact with
export { default as pokemonApp } from "./App/app.reducer";

export * from "./App/pokemon/pokemon.creators";
export { default as PokemonContainer } from "./App/pokemon/pokemon.container";
