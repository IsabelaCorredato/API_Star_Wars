document.addEventListener('DOMContentLoaded', function () {
    function fetchCharacters() {
        fetch('https://swapi.dev/api/people/')
            .then(response => response.json())
            .then(data => {
                const characters = data.results.slice(0, 10);
                displayCharacters(characters);
            })
            .catch(error => console.error('Erro ao buscar personagens:', error));
    }

    function displayCharacters(characters) {
        const contentDiv = document.getElementById('characters-list');
        contentDiv.innerHTML = '';

        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.innerHTML = `
                <h2>${character.name}</h2>
                <p>Altura: ${character.height} cm</p>
                <p>Peso: ${character.mass} kg</p>
                <button onclick="showCharacterDetails('${character.url}')">Ver Detalhes</button>
            `;
            contentDiv.appendChild(characterCard);
        });
    }

    window.showCharacterDetails = function (url) {
        fetch(url)
            .then(response => response.json())
            .then(character => {
                const detailsDiv = document.getElementById('character-details');
                detailsDiv.innerHTML = `
                    <h2>${character.name}</h2>
                    <p>Altura: ${character.height} cm</p>
                    <p>Peso: ${character.mass} kg</p>
                    <p>Gênero: ${character.gender}</p>
                    <p>Ano de Nascimento: ${character.birth_year}</p>
                    <h3>Filmes:</h3>
                    <div id="films-list" class="films-container"></div>
                `;
    
                character.films.forEach(filmUrl => {
                    fetch(filmUrl)
                        .then(response => response.json())
                        .then(film => {
                            const filmsList = document.getElementById('films-list');
                            const filmCard = document.createElement('div');
                            filmCard.className = 'film-card';
                            filmCard.innerHTML = `
                                <h4>${film.title}</h4>
                                <p>Episódio: ${film.episode_id}</p>
                                <p>Data de Lançamento: ${film.release_date}</p>
                            `;
                            filmsList.appendChild(filmCard);
                        })
                        .catch(error => console.error('Erro ao buscar filme:', error));
                });
            })
            .catch(error => console.error('Erro ao buscar detalhes:', error));
    };

    window.filterCharacters = function () {
        const gender = document.getElementById('gender-filter').value;
        fetch('https://swapi.dev/api/people/')
            .then(response => response.json())
            .then(data => {
                let characters = data.results;
                if (gender !== 'all') {
                    characters = characters.filter(character => character.gender === gender);
                }
                displayCharacters(characters);
            })
            .catch(error => console.error('Erro ao filtrar personagens:', error));
    }

    window.fetchStarships = function (sortBy = 'length') {
        let allStarships = [];
    
        function fetchPage(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    allStarships = allStarships.concat(data.results);
    
                    if (data.next) {
                        fetchPage(data.next);
                    } else {
                        sortAndDisplayStarships(allStarships, sortBy);
                    }
                })
                .catch(error => console.error('Erro ao buscar naves:', error));
        }
    
        fetchPage('https://swapi.dev/api/starships/');
    };
    
    function sortAndDisplayStarships(starships, sortBy) {
        const parseValue = (value) => {
            if (value === "unknown" || isNaN(parseFloat(value))) {
                return 0;
            }
            return parseFloat(value);
        };
    
        if (sortBy === 'length') {
            starships.sort((a, b) => parseValue(a.length) - parseValue(b.length));
        } else if (sortBy === 'crew') {
            starships.sort((a, b) => parseValue(a.crew) - parseValue(b.crew));
        } else if (sortBy === 'passengers') {
            starships.sort((a, b) => parseValue(a.passengers) - parseValue(b.passengers));
        }
    
        displayStarships(starships);
    }
    
    function displayStarships(starships) {
        const starshipsDiv = document.getElementById('starships-list');
        starshipsDiv.innerHTML = '';
    
        starships.forEach(starship => {
            const starshipCard = document.createElement('div');
            starshipCard.className = 'starship-card';
            starshipCard.innerHTML = `
                <h2>${starship.name}</h2>
                <p>Tamanho: ${starship.length} m</p>
                <p>Tripulação: ${starship.crew}</p>
                <p>Passageiros: ${starship.passengers}</p>
            `;
            starshipsDiv.appendChild(starshipCard);
        });
    }

    window.recommendFilms = function (order) {
        fetch('https://swapi.dev/api/films/')
            .then(response => response.json())
            .then(data => {
                let films = data.results;
                if (order === 'release') {
                    films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                } else if (order === 'chronological') {
                    films.sort((a, b) => a.episode_id - b.episode_id);
                }
                displayRecommendedFilms(films);
            })
            .catch(error => console.error('Erro ao buscar filmes:', error));
    }

    function displayRecommendedFilms(films) {
        const recommendedFilmsDiv = document.getElementById('recommended-films-list');
        recommendedFilmsDiv.innerHTML = '';

        films.forEach(film => {
            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <h2>${film.title}</h2>
                <p>Episódio: ${film.episode_id}</p>
                <p>Data de Lançamento: ${film.release_date}</p>
            `;
            recommendedFilmsDiv.appendChild(filmCard);
        });
    }

    fetchCharacters();
    fetchStarships();
});
