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




/* TEST FACTORY MEDIA 
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
*/

class MediaFactory {
	constructor(media) {
		this.media = media
	}

	render() {
		if (this.media.image) {
			return `<img class="imgGalery" src="assets/photos/${this.media.photographerId}/${this.media.image}" alt="${this.media.title}" tabindex="0">`
		} else {
			return `<video controls width="250">
				<source src="assets/photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" >`
		}
	}

}



// TEST FONCTION CREATION DE LA GALLERIE PHOTOS 
function photographerMediaFactory(media) {

	function CreateGaleryDom() {
		const BlocPhotographerGalery = document.querySelector(".photographer-galery");
		BlocPhotographerGalery.classList.add("container");

		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographer-galery-item");

		// Transformer la div en a (peut être)
		const photographerMedia = document.createElement("div");
		//photographerMedia = setAttribute('href',"#")

		const mediaFactory = new MediaFactory(media);
		photographerMedia.classList.add('photographer-galery-media');
		photographerMedia.innerHTML = mediaFactory.render();
		photographerArticle.appendChild(photographerMedia);
		
		return (photographerArticle);
	}
	return { CreateGaleryDom };
}




// SELECT OPTION CLASSIQUE POUR LE TRI 