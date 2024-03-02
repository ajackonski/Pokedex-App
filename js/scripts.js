//IIFE containing the list of pokemon and modal creation code
let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');
//accesses the pokemonlist array variable
    function getAll() {
        return pokemonList;
    }
//appends entries to the pokemonlist array
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
//function to display the list of pokemon as interactable buttons
    function addListItem(pokemon) {
        let mainList = document.querySelector('.pokemon-List');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("btn");
        button.classList.add("btn-info");
        button.classList.add("col-8");
        button.setAttribute("data-toggle", 'modal');
        button.setAttribute("data-target", '#infoModal');
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
        listItem.appendChild(button);
        mainList.appendChild(listItem);

    }
//pulls entries from the pokeapi and populates the pokelist array with the first 150 pokemon
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }
//loads details from the pokeapi to be used elsewhere
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }


//function to populate modal with pokemon details (name. height, and image)
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h1>" + item.name + "</h1>");

        let imageElementFront = $('<img class="modal-image" style="width:50%>');
        imageElementFront.attr("src", item.imageUrlFront);

        let imageElementBack = $('<img class="modal-image" style="width:50%>');
        imageElementBack.attr("src", item.imageUrlBack);

        let heightElement = $("<p>" + "height : " + item.height);
        let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
        let typesElement = $("<p>" + "types : " + item.types + "</p>");
        let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);


    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        showModal: showModal,
    }

})();


let pokelist = pokemonRepository.getAll();


pokemonRepository.loadList().then(function () {
    pokelist.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

