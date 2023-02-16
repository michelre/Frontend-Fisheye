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
		id, photographerId, title, image, video
	} = media;
	let likes = media.likes;

	function createLightboxDOM() {
		const mediaItem = document.createElement('li');
		const mediaFactory = new MediaFactory(media)
		mediaItem.innerHTML = mediaFactory.render()
		return mediaItem;
	}

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

		// Section ajoutant les likes sur les photos
		const likesElement = document.createElement('button');
		likesElement.classList.add("btn-like-photo")
		const likesHeart = document.createElement('i');
		likesHeart.classList = "fas fa-heart";
		const likesCount = document.createElement('span');
		likesCount.innerText = likes;
		likesElement.appendChild(likesCount);
		likesElement.appendChild(likesHeart);
		photographerArticleInfos.appendChild(likesElement);


		const mediaFactory = new MediaFactory(media);
		photographerMedia.classList.add('photographer-galery-media');
		photographerMedia.innerHTML = mediaFactory.render();

		photographerArticle.appendChild(photographerMedia);
		photographerArticle.appendChild(photographerArticleInfos);

		/* Ajout au clic d'un like par photo*/ 
		likesElement.addEventListener('click', () => {
			likes += 1;
			likesCount.innerText = likes;
			const totalLike = document.querySelector('.total-like');
			totalLike.innerText = parseInt(totalLike.innerText) + 1;
			likesElement.setAttribute('disabled', ''); // Ajouter un aria une fois le bouton désactiver pour indiquer à l'utilisateur qu'il ne peut que liker qu'une fois 
		})
		
		return (photographerArticle);
	}
	return { CreateGaleryDom, createLightboxDOM };
}





/* TEST - CREATION BLOC LIKES & PRICE */
function getLikesPrice (media, photographer) {
	const blocLikesPrice = document.querySelector("#likes-price");


	/* TEST - AFFICHAGE LIKES */
	const photographerLikes = document.createElement("div");
	photographerLikes.className = "bloc-likes";
	blocLikesPrice.appendChild(photographerLikes);
	const totalLike = document.createElement("span");
	totalLike.className = "total-like";
	photographerLikes.appendChild(totalLike);
	const photographerLikesHeart = document.createElement("i");
	photographerLikesHeart.className = "fas fa-heart";
	photographerLikes.appendChild(photographerLikesHeart);

	// Calcul de l'affichage des likes globale 
	const likeCount = media.reduce((acc, curr) => acc + curr.likes, 0 );
	totalLike.innerHTML = likeCount;


	/* TEST - AFFICHAGE PRIX JOURNALIER PAR PHOTOGRAPHE */ 
	const photographerPrice = document.createElement("span");
	photographerPrice.setAttribute("aria-label", "Tarif journalier du photographe");
	photographerPrice.className = "photographer-price";
	blocLikesPrice.appendChild(photographerPrice)
	photographerPrice.innerHTML = `${photographer.price}€ / jour`;
}

