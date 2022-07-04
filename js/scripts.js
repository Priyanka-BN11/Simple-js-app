//Array of 4 pokemons
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
//Printing the pokemon names and there height

for (i=0; i<pokemonList.length; i++){
    let msg =' ';
    if(pokemonList[i].height > 1.0)
    {
        msg =" - Wow, that's big";
    }
    document.write(pokemonList[i].name + ' '  + '(height: ' + pokemonList[i].height + 'm)' + msg + '<br>');
}