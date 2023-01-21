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




/* TEST FACTORY MEDIA */
class MediaFactory {
	constructor(data) {
		if (data.type === "image") {
			return new Img(media);
		} else if (data.type === "video") {
			return new Video(media);
		} else {
			throw "Unknown type format"
		}
	}
}

/*
class MediaFactory {
	build(data) {
		if (data.hasOwnProperty("image")) {
			data.src = data.image;
  
			return new Image(data);
		} else {
			data.src = data.video;
  
			return new Video(data);
		}
	}
  }
  */


// TEST FONCTION CREATION DE LA GALLERIE PHOTOS 
function photographerMediaFactory(media) {
	const {  photographerId, title, image, video } = media;

	function CreateGaleryDom() {
		const BlocPhotographerGalery = document.querySelector(".photographer-galery");
		BlocPhotographerGalery.classList.add("container");

		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographer-galery-item");

		const photographerMediaImg = document.createElement("div");
		const photographerMediaVideo = document.createElement("div");
		if (image) {
			photographerMediaImg.classList.add("photographer-galery-media")
			photographerMediaImg.innerHTML = `<img class="imgGalery" src="assets/photos/${photographerId}/${image}" alt="${title}" tabindex="0">`;
		} else if (video) {
			photographerMediaVideo.classList.add("photographer-galery-media")
			photographerMediaVideo.innerHTML = `<img class="imgGalery" src="assets/photos/${photographerId}/${video}" alt="${title}" tabindex="0">`;
		}
		photographerArticle.appendChild(photographerMediaImg);
		photographerArticle.appendChild(photographerMediaVideo);
		return (photographerArticle);
	}
	return { CreateGaleryDom };
}