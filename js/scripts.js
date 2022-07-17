//Array in variable pokemonRepository(in IIFE) 
let pokemonRepository = (function () {
let pokemonList =[ ];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
 let modalContainer =document.querySelector('#modal-container'); 
 let button = document.createElement('button');
function add(pokemon){
   if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
}
function getAll(){
    return pokemonList;
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
  });
  }
  function loadList(){
    return fetch(apiUrl).then(function(response)
    {
        return response.json();
    }).then(function (json){
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            // console.log(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}
function loadDetails(pokemon){
 let url = pokemon.detailsUrl;
 return fetch(url).then(function (response){
    return response.json();
}).then(function (details){
     pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
}
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
    // console.log(pokemon);
    let img = new Image();
    img.src = pokemon.imageUrl;
    let pokemonname= document.createElement('h1');
    pokemonname.innerHTML= `${pokemon.name}`;
    let pokemonheight = document.createElement('h2');
    pokemonheight.innerHTML= `${pokemon.height}`;
    modalContainer.innerHTML = '';
    //creating the modal
    let modal= document.createElement('div');
    modal.classList.add('modal');
    //add new modal content
    let closeButtonElement = document.createElement('button'); 
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'CLOSE';
    closeButtonElement.addEventListener('click', hideModal);
    //appending all child elements
    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonheight);
    modal.appendChild(pokemonname);
    modal.appendChild(img);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    });
  }
function hideModal() {  
    modalContainer.classList.remove('is-visible');
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
// document.querySelector('button').addEventListener('click', () => {
//   console.log("hello");
// });
return {
    add: add,
    getAll : getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    hideModal: hideModal,
    imageDisplay: imageDisplay
};
})();



//Printing the pokemon names and there height using forEach loop
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemons){
    //on pokemon name Button clicks displays pokemons details
    pokemonRepository.addListItem(pokemons);
    }); 
});




