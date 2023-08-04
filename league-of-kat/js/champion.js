document.addEventListener("DOMContentLoaded", () => {
    const championDetailsDiv = document.getElementById("championDetails");
    const urlParams = new URLSearchParams(window.location.search);
    const championName = urlParams.get("name");

    if (championName) {
        const url = `http://ddragon.leagueoflegends.com/cdn/11.12.1/data/pt_BR/champion/${championName}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const championData = data.data[championName];
                const championInfo = {
                    name: championData.name,
                    title: championData.title,
                    lore: championData.lore,
                    tags: championData.tags,
                    stats: championData.stats,
                    passive: {
                        name: championData.passive.name,
                        description: championData.passive.description,
                        image: `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/passive/${championData.passive.image.full}`
                    },
                    abilities: championData.spells.map(spell => ({
                        name: spell.name,
                        description: spell.description,
                        image: `http://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${spell.image.full}`
                    })),
                    skins: championData.skins.map(skin => ({
                        name: skin.name,
                        num: skin.num,
                        splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skin.num}.jpg`,
                        loading: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skin.num}.jpg`,
                        tile: `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${championName}_${skin.num}.jpg`
                    }))
                };

                championDetailsDiv.innerHTML = `
                    <h1>${championInfo.name}</h1>
                    <h2>${championInfo.title}</h2>
                    <p>${championInfo.lore}</p>
                    <p><strong>Tags:</strong> ${championInfo.tags.join(", ")}</p>
                    <h3>Passiva: ${championInfo.passive.name}</h3>
                    <img class="ability-img" src="${championInfo.passive.image}" alt="${championInfo.passive.name}">
                    <p>${championInfo.passive.description}</p>
                    <h3>Habilidades:</h3>
                    <div class="ability-container">
                        ${championInfo.abilities.map(ability => `
                            <div class="ability">
                                <h4>${ability.name}</h4>
                                <img class="ability-img" src="${ability.image}" alt="${ability.name}">
                                <p>${ability.description}</p>
                            </div>
                        `).join("")}
                    </div>
                    <h3>Skins:</h3>
                    <div class="skin-container">
                        ${championInfo.skins.map(skin => `
                            <div class="skin">
                                <h4>${skin.name}</h4>
                                <img class="skin-img" src="${skin.splash}" alt="${skin.name}">
                                <img class="skin-img" src="${skin.loading}" alt="${skin.name}">
                                <img class="skin-img" src="${skin.tile}" alt="${skin.name}">
                            </div>
                        `).join("")}
                    </div>
                `;
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
            });
    } else {
        championDetailsDiv.innerHTML = "<p>Nenhum campeão selecionado.</p>";
    }
});

function goBack() {
    window.history.back();
}

// ... código existente ...

function createAbility(ability) {
    const abilityDiv = document.createElement("div");
    abilityDiv.className = "ability";
    abilityDiv.innerHTML = `
        <h4>${ability.name}</h4>
        <button class="show-description">Mostrar Descrição</button>
        <img class="ability-img" src="${ability.image}" alt="${ability.name}">
        <p class="ability-description">${ability.description}</p>
    `;

    const showDescriptionButton = abilityDiv.querySelector(".show-description");
    const abilityDescription = abilityDiv.querySelector(".ability-description");

    showDescriptionButton.addEventListener("click", () => {
        abilityDescription.classList.toggle("visible");
    });

    return abilityDiv;
}

function createSkinCarousel(championInfo) {
    const skinCarouselDiv = document.getElementById("skinCarousel");
    const skins = championInfo.skins;

    let currentIndex = 0;

    function showSkin(index) {
        skinCarouselDiv.innerHTML = `
            <div class="skin-carousel-container">
                <button class="prev" onclick="prevSkin()">&#10094;</button>
                <img class="skin-img" src="${skins[index].splash}" alt="${skins[index].name}">
                <button class="next" onclick="nextSkin()">&#10095;</button>
            </div>
        `;
    }

    function prevSkin() {
        currentIndex = (currentIndex - 1 + skins.length) % skins.length;
        showSkin(currentIndex);
    }

    function nextSkin() {
        currentIndex = (currentIndex + 1) % skins.length;
        showSkin(currentIndex);
    }

    showSkin(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    // ... código existente ...

    if (championName) {
        // ... código existente ...

        championDetailsDiv.innerHTML = `
            <!-- código existente -->

            <h3>Habilidades:</h3>
            <div class="ability-container">
                ${championInfo.abilities.map(ability => createAbility(ability)).join("")}
            </div>

            <h3>Skins:</h3>
            <div class="skin-carousel" id="skinCarousel"></div>
        `;

        createSkinCarousel(championInfo);
    }
});
