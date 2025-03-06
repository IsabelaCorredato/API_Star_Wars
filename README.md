Star Wars API Explorer
Este projeto é uma aplicação web que utiliza a API pública do Star Wars (SWAPI) para exibir informações sobre personagens, naves e filmes da franquia Star Wars. A aplicação permite filtrar personagens por gênero, ordenar naves por diferentes critérios e recomendar filmes em ordem de lançamento ou cronológica.

Estrutura do Projeto
Arquivos
index.html: Contém a estrutura HTML da aplicação.
script.js: Contém o código JavaScript para buscar e exibir dados da API.
style.css: Contém os estilos CSS para a aplicação.
assets/logo star wars.png: Imagem do logo do Star Wars.
Funcionalidades
Personagens
Exibe os 10 primeiros personagens da API.
Permite filtrar personagens por gênero (masculino, feminino, desconhecido).
Exibe detalhes do personagem ao clicar no botão "Ver Detalhes".
Naves
Exibe uma lista de naves.
Permite ordenar as naves por tamanho, tripulação ou passageiros.
Filmes
Recomenda filmes em ordem de lançamento ou cronológica.
Como Usar
Clone o repositório para sua máquina local.
Abra o arquivo index.html em um navegador web.
Código
HTML
O arquivo index.html contém a estrutura HTML da aplicação, incluindo seções para personagens, naves e filmes.

CSS
O arquivo style.css contém os estilos CSS para a aplicação, incluindo estilos para o corpo, logo, nav-bar, seções, filtros e cards.

JavaScript
O arquivo script.js contém o código JavaScript para buscar e exibir dados da API.

Funções Principais
fetchCharacters(): Busca e exibe os 10 primeiros personagens.
displayCharacters(characters): Exibe os personagens na página.
showCharacterDetails(url): Exibe detalhes do personagem.
filterCharacters(): Filtra personagens por gênero.
fetchStarships(sortBy): Busca e exibe naves, ordenadas por um critério.
sortAndDisplayStarships(starships, sortBy): Ordena e exibe as naves.
displayStarships(starships): Exibe as naves na página.
recommendFilms(order): Recomenda filmes em ordem de lançamento ou cronológica.
displayRecommendedFilms(films): Exibe os filmes recomendados na página.
