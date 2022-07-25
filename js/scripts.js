//Array in variable pokemonRepository(in IIFE) 
const pokemonRepository = (function () {
const pokemonList =[ ];
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';
function add(pokemon){
   if (
      typeof pokemon === 'object'&&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
}
function getAll(){
    return pokemonList;
}
function addListItem(pokemons) { 
    const ul = document.querySelector('.pokemon-list');
    //creating a list element
    const listItem = document.createElement('li');
    //creating a button element
    const button = document.createElement('button');
    button.innerText = pokemons.name.toUpperCase();
    //adding classname to button
    button.classList.add('button', 'btn', 'btn-primary');
    //adding an attributes to the button 
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    //adding class to listItem 
    listItem.classList.add('group-list-item','list');  
    //appendng button to listItem
    listItem.appendChild(button);
    //appending listitem to ul
    ul.appendChild(listItem);
    listButtonEventListener(button, pokemons);
  }
  
  function listButtonEventListener(listButton, pokemon) {
    listButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  function loadList(){
    return fetch(apiUrl).then(function(response)
    {
        return response.json();
    }).then(function (json){
        json.results.forEach(function (item){
            const pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            //console.log(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}
function loadDetails(pokemon){
 const url = pokemon.detailsUrl;
 return fetch(url).then(function (response){
    return response.json();  
}).then(function (details){
     pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map((type) => type.type.name).join(',');
    }).catch(function (e) {
      console.error(e);
    });
}
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
    const modalBody = $('.modal-body');
    const modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();
 
    const img = new Image();
    img.src = pokemon.imageUrl;
    const pokemonname= document.createElement('h2');
    pokemonname.innerHTML= `<h2>${pokemon.name.toUpperCase()}<h2>`;
    const pokemonheight = document.createElement('h4');
    pokemonheight.innerHTML= `<h4>Height:${pokemon.height}</h4>`;
    const pokemonweight = document.createElement('h4');
    pokemonweight.innerHTML= `<h4>Weight:${pokemon.weight} </h4>`;
    const pokemontypes = document.createElement('h4');
    pokemontypes.innerHTML = `<h4>Types:${pokemon.types}</h4>`;
    //appending elements to modal(body,title)
    modalBody.append(img);
    modalBody.append(pokemonheight);
    modalBody.append(pokemonweight);
    modalBody.append(pokemontypes);
    modalTitle.append(pokemonname);
    });
  }
return {
    add: add,
    getAll : getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
};
})();
//Printing the pokemon names and there height using forEach loop
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemons){
    //displays pokemon name Button 
    pokemonRepository.addListItem(pokemons);
    }); 
});

//search function
function searchFunction() {
  const pokemonButton = document.getElementsByClassName('button');

  const filter =$('#myInput').val().toLowerCase();
  for (const pokemonName of pokemonButton) {
    let pokemonname = pokemonName.textContent.toLowerCase();
    console.log(pokemonname);
    if (pokemonname.includes(filter)) {
      pokemonName.closest('li').style.display = 'inline-block';
    } else {
      pokemonName.closest('li').style.display = 'none';
    }
  }
}

const search = document.getElementById('myInput');
search.addEventListener('keyup', searchFunction);