//Array in variable pokemonRepository(in IIFE) 
let pokemonRepository = (function () {
let pokemonList =[
    {
        name: 'Bulbasaur',
        height: 0.7,
        weight: 6.9,
        types: ['grass', 'poison']
    },
    {
        name: 'Onix',
        height:8.8,
        weight: 210,
        types: ['rock', 'ground']
    },{
        name:'Togepi',
        height:0.3,
        weight:1.5,
        types: ['fairy']
    },
    {
        name:'Pikachu',
        height: 0.4,
        weight: 6,
        types: ['electric']
    }
];
function add(pokemon){
    pokemonList.push(pokemon);
}
function getAll(){
    return pokemonList;
}
return {
    add: add,
    getAll : getAll
};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({name:'Meowth',height:0.4,weight:4.2, type:['normal']});
console.log(pokemonRepository.getAll());
//height comparision function
function loopFunction(pokemons) {
    document.write(pokemons.name + ' (height: ' + pokemons.height + 'm) ');
    if (pokemons.height > 3) {
      document.write(' - WOW,that is a big pokemon!');
    }
  document.write('<br>')
  }
  
  //Printing the pokemon names and there height using forEach loop
pokemonRepository.getAll().forEach(loopFunction);

pokemonRepository.getAll.filter(name == 'Onix')