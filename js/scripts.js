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

function showDetails(pokemon){

 console.log(pokemon);
}
function imageDisplay(){
  //creating a image element
  let img = new Image();
  img.src = "https://img.captain-droid.com/wp-content/uploads/2017/04/pokemonwallpaper-icon.png.webp";
  //displays on body of the html page
  document.body.appendChild(img);
}
function addListItem(pokemons) {
    let ul = document.querySelector('.pokemon-list');
    //creating a list element
    let listItem = document.createElement('li');
    //creating a button element
    let button = document.createElement('button');
    button.innerText = pokemons.name;
    //adding classname to button
    button.classList.add('button');
    //appendng button to listItem
    listItem.appendChild(button);
    //appending listitem to ul
    ul.appendChild(listItem);
    //adding eventlistener for button click
    button.addEventListener('click', function(event){
    event.preventDefault();
    showDetails(pokemons);
  })
  }
return {
    add: add,
    getAll : getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    imageDisplay: imageDisplay
};
})();

pokemonRepository.add({name:'Meowth',height:0.4,weight:4.2, type:['normal']});
console.log(pokemonRepository.getAll());

//Printing the pokemon names and there height using forEach loop
pokemonRepository.getAll().forEach(function(pokemons){
//on pokemon name Button clicks displays pokemons details
pokemonRepository.addListItem(pokemons);
});

//calling imageDisplay function
pokemonRepository.imageDisplay();

