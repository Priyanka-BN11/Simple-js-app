let pokemonRepository=function(){let d=[];function a(a){"object"==typeof a&&"name"in a?d.push(a):console.log("pokemon is not correct")}function b(){return d}function c(a){pokemonRepository.loadDetails(a).then(function(){let b=$(".modal-body"),c=$(".modal-title");c.empty(),b.empty();let d=new Image;d.src=a.imageUrl;let e=document.createElement("h1");e.innerHTML=`<h1>Name:${a.name}<h1>`;let f=document.createElement("h4");f.innerHTML=`<h4>Height:${a.height}</h4>`;let g=document.createElement("h2");g.innerHTML=`<h4>Weight:${a.weight} </h4>`;let h=document.createElement("h2");h.innerHTML=`<h4>Types:${a.types}</h4>`,b.append(d),b.append(f),b.append(g),b.append(h),c.append(e)})}return{add:a,getAll:b,addListItem:function(d){let e=document.querySelector(".pokemon-list"),b=document.createElement("li"),a=document.createElement("button");a.innerText=d.name,a.classList.add("button","btn","btn-primary"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#exampleModal"),b.classList.add("group-list-item","list-inline"),b.appendChild(a),e.appendChild(b),a.addEventListener("click",function(a){a.preventDefault(),c(d)})},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/").then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){a({name:b.name,detailsUrl:b.url})})}).catch(function(a){console.error(a)})},loadDetails:function(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.weight=b.weight,a.types=b.types.map(a=>a.type.name).join(",")}).catch(function(a){console.error(a)})},showDetails:c,imageDisplay:function(){let a=new Image;a.src="https://img.captain-droid.com/wp-content/uploads/2017/04/pokemonwallpaper-icon.png.webp",document.querySelector("#Image"),document.querySelector(".pokemon-list").before(a)}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})}),pokemonRepository.imageDisplay()