// Fonction récupérant les infos sur le profil du photographe 
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


/* Factory Media permettant de trier image et vidéo */
class MediaFactory {
	constructor(media) {
		this.media = media
	}

	render() {
		if (this.media.image) {
			return `<img class="imgGalery" src="assets/photos/${this.media.photographerId}/${this.media.image}" alt="${this.media.title}" tabindex="0">`
		} else {
			return `<video controls class="imgGalery">
				<source src="assets/photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" >`
		}
	}

}



// Fonction de création de la gallerie photos des photographes
function photographerMediaFactory(media) {

/* TEST */
	const {
		id, photographerId, title, image, likes, video
	} = media;

	function CreateGaleryDom() {
		const BlocPhotographerGalery = document.querySelector(".photographer-galery");
		BlocPhotographerGalery.classList.add("container");
		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographer-galery-item");
		// Transformer la div en a (peut être)
		const photographerMedia = document.createElement("div");
		//photographerMedia = setAttribute('href',"#")


		// Section ajoutant le nom de la photo 
		const photographerArticleInfos = document.createElement("div");
		photographerArticleInfos.classList.add("photographer-galery-item-info");
		const photographerArticleTitle = document.createElement("h2");
		photographerArticleTitle.classList.add("title-photo");
		photographerArticleTitle.textContent = `${title}`;
		photographerArticleTitle.setAttribute("tabindex", "0");
		photographerArticleInfos.appendChild(photographerArticleTitle);


		const mediaFactory = new MediaFactory(media);
		photographerMedia.classList.add('photographer-galery-media');
		photographerMedia.innerHTML = mediaFactory.render();

		photographerArticle.appendChild(photographerMedia);
		photographerArticle.appendChild(photographerArticleInfos);
		
		return (photographerArticle);
	}
	return { CreateGaleryDom };
}




/* TEST - CREATION BLOC LIKES & PRICE */
function getLikesPrice (data, photographers) {
	const blocLikesPrice = document.querySelector("#likes-price");

	/* TEST - AFFICHAGE PRIX JOURNALIER PAR PHOTOGRAPHE */ 
	const photographerPrice = document.createElement("span");
	photographerPrice.setAttribute("aria-label", "Tarif journalier du photographe");
	photographerPrice.className = "price";
	blocLikesPrice.appendChild(photographerPrice)
	console.log(photographerPrice);
	for (const photographer of photographers) {
		if (photographerId === photographer.id) {
			photographerPrice.innerHTML = `${photographer.price}€ / jour`;
		}
	}

}


