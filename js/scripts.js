let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] },
        { name: 'Venusaur', height: 2, type: ['grass', 'poison'] },
        { name: 'Charmander', height: 0.6, type: ['fire'] },
        { name: 'Charmeleon', height: 1.1, type: ['fire'] },
        { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
        { name: 'Squirtle', height: 0.5, type: ['water'] },
        { name: 'Wartortle', height: 1, type: ['water'] },
        { name: 'Blastoise', height: 1.6, type: ['water'] }
    ];


    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let mainList = document.querySelector('.pokemon-List')
        let listItem = document.createElement('li')
        let button = document.createElement('button')
        button.addEventListener('click', function(){
            showDetails(pokemon)
        })
        button.innerText = pokemon.name
        button.classList.add("mainButton")
        listItem.appendChild(button)
        mainList.appendChild(listItem)
        
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    }

})();


let pokelist = pokemonRepository.getAll();


pokelist.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
})
