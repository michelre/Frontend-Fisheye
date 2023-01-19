// AJOUTER ICI LA FACTORY SPECIFIQUES AUX MEDIAS DES PHOTOGRAPHES (Images et vidéo) 
// LA CREATION DU DOM SE FAIT ICI


// Test ajout d'une fonction pour récupérer les infos sur le profil du photographe 
function photographerInfosHeader(photographer) {
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
	photographerPortrait.setAttribute("alt", `Photo de ${portrait}`);
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(BlocPhotographerProfile);
	return photographerHeader;
}



/* Ex media img/video 
function mediaFactory() {
	if (media.type === 'video') {
		'video' // Créer une balise video
	} else {
		'img' // Créer une balise image
	}
}
*/