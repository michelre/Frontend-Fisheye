// AJOUTER ICI LA FACTORY SPECIFIQUES AUX MEDIAS DES PHOTOGRAPHES (Images et vidéo) 
// LA CREATION DU DOM SE FAIT ICI

// Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 


// Test ajout d'une fonction pour récupérer les infos sur le profil du photographe 
function photographerInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const { name, portrait, city, country, tagline } = photographer;

    const BlocPhotographerProfile = document.createElement("div");
	BlocPhotographerProfile.classList.add("photographerProfile");
	BlocPhotographerProfile.innerHTML = `<h1 class="photographerName">${name}</h1>
                                        <p class="photographerCity">${city}, ${country}
                                        <p class="photographerTagline">${tagline}</p>`;
	const photographerPortraitContainer = document.createElement("div");
	photographerPortraitContainer.classList.add("photographer-portrait-container");
	const photographerPortrait = document.createElement("img");
	photographerPortrait.setAttribute("src", `assets/photographers/${portrait}`);
	photographerPortrait.setAttribute("alt", "");
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(BlocPhotographerProfile);
	return photographerHeader;
}