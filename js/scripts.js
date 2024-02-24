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
        let mainList = document.querySelector('.pokemon-List')
        let listItem = document.createElement('li')
        let button = document.createElement('button')
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
        button.innerText = pokemon.name
        button.classList.add("mainButton")
        listItem.appendChild(button)
        mainList.appendChild(listItem)

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
        })
    }
//loads details from the pokeapi to be used elsewhere
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }


//function to populate modal with pokemon details (name. height, and image)
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
        });
    }

//function to create a modal that will store pokemon info
    function showModal(title, text, img) {

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');


        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal)

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement('img');
        imageElement.src = img;


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);



        modalContainer.classList.add('is-visible');
//hides the modal if the user clicks outside the modal window
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
//function to hide the displayed modal by removing the 'is-visible' tag.
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
//hides the modal if the user presses the escape key
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        showModal: showModal,
        hideModal: hideModal
    }

})();


let pokelist = pokemonRepository.getAll();


pokemonRepository.loadList().then(function () {
    pokelist.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

