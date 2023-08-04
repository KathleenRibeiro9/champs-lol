// URL da API que fornece os dados dos campeões
const url = "http://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json";

// Função para criar o elemento HTML que representa um campeão na galeria
function createChampionCard(championName, championInfo) {
    // Cria um novo elemento <div> com a classe "champion"
    const championDiv = document.createElement("div");
    championDiv.className = "champion";
    
    // Insere uma imagem e o nome do campeão dentro do <div>
    championDiv.innerHTML = `
        <img src="http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${championInfo.image.full}" alt="${championName}">
        <p>${championName}</p>
    `;

    // Adiciona um evento de clique para redirecionar para a página de detalhes do campeão
    championDiv.addEventListener("click", () => {
        window.location.href = `champion.html?name=${championName}`;
    });

    // Retorna o elemento <div> criado
    return championDiv;
}

// Função para filtrar os campeões com base na rota e na busca
function filterChampions(championsData, selectedLane, searchQuery) {
    // Filtra os campeões com base nos critérios selecionados
    const filteredChampions = championsData.filter(champion => {
        const championLane = champion.tags[0].toLowerCase();
        const championName = champion.name.toLowerCase();

        // Aplica os filtros
        if (
            (selectedLane === "all" || championLane === selectedLane) &&
            (searchQuery === "" || championName.includes(searchQuery.toLowerCase()))
        ) {
            return true;
        }

        return false;
    });

    // Retorna a lista de campeões filtrados
    return filteredChampions;
}

// Faz a requisição à API para obter os dados dos campeões
fetch(url)
    .then(response => response.json())
    .then(data => {
        const championData = Object.values(data.data);
        const championGalleryDiv = document.getElementById("championGallery");

        const laneFilter = document.getElementById("laneFilter");
        const searchChampionInput = document.getElementById("searchChampion");

        // Função para atualizar a galeria de campeões com base nos filtros selecionados
        function updateGallery() {
            const selectedLane = laneFilter.value.toLowerCase();
            const searchQuery = searchChampionInput.value;

            const filteredChampions = filterChampions(championData, selectedLane, searchQuery);
            championGalleryDiv.innerHTML = ""; // Limpar a galeria antes de adicionar os campeões filtrados

            // Cria os elementos HTML para cada campeão filtrado e os adiciona à galeria
            filteredChampions.forEach(champion => {
                const championDiv = createChampionCard(champion.name, champion);
                championGalleryDiv.appendChild(championDiv);
            });
        }

        // Adiciona listeners de eventos para os filtros de rota e busca
        laneFilter.addEventListener("change", updateGallery);
        searchChampionInput.addEventListener("input", updateGallery);

        updateGallery(); // Atualiza a galeria inicialmente sem nenhum filtro
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });

// ... código existente ...

// Função para criar o carrossel de skins
function createSkinCarousel(championInfo) {
    // Obtém o elemento que representa o carrossel de skins
    const skinCarouselDiv = document.getElementById("skinCarousel");
    const skins = championInfo.skins;

    let currentIndex = 0;

    // Função para exibir a skin atual no carrossel
    function showSkin(index) {
        skinCarouselDiv.innerHTML = `
            <img src="${skins[index].splash}" alt="${skins[index].name}">
            <button class="prev" onclick="prevSkin()">&#10094;</button>
            <button class="next" onclick="nextSkin()">&#10095;</button>
        `;
    }

    // Função para exibir a skin anterior no carrossel
    function prevSkin() {
        currentIndex = (currentIndex - 1 + skins.length) % skins.length;
        showSkin(currentIndex);
    }

    // Função para exibir a próxima skin no carrossel
    function nextSkin() {
        currentIndex = (currentIndex + 1) % skins.length;
        showSkin(currentIndex);
    }

    showSkin(currentIndex); // Exibe a primeira skin inicialmente
}

// Evento DOMContentLoaded para carregar os detalhes do campeão e criar o carrossel de skins
document.addEventListener("DOMContentLoaded", () => {
    // ... código existente ...

    if (championName) {
        // ... código existente ...

        championDetailsDiv.innerHTML = `
            <!-- código existente -->
        `;

        createSkinCarousel(championInfo); // Cria o carrossel de skins
    }
});
