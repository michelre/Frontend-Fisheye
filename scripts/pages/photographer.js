// Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 


// Récupération des datas des différents photographes via un fetch
async function getPhotographer() {
    const photographers = await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then(data => data.photographers)
	return {
		photographer: photographers.find(p => p.id === photographerId)           
	};
}


// Récupération des datas MEDIA des différents photographes via un fetch 
async function getMedia() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (media = data.media));
	return {
		media: media.filter(m => m.photographerId === photographerId)         
	};
}


// Page photographe : Affichage des datas liées au profil des protographes
async function displayDataPhotographer(photographer) {
	photographerInfosHeader(photographer);
}


// Affichage des photos dans la gallerie dédiée
async function displayDataGalery(media) {
	const photographerGalery = document.querySelector('.photographer-galery');
	photographerGalery.innerHTML = '';
	media.forEach(itemMedia => {
		const photographerGaleryModel = photographerMediaFactory(itemMedia);
		const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom();
		photographerGalery.appendChild(userGaleryCardDOM);    
	})
}

// Affichage Lightbox
function displayDataLightbox(medias) {
	const lightbox = document.querySelector('.lightbox');
	lightbox.innerHTML = '';
	medias.forEach(itemMedia => {
		const photographerLightboxModel = photographerMediaFactory(itemMedia);
		const userLightboxDOM = photographerLightboxModel.createLightboxDOM();
		lightbox.appendChild(userLightboxDOM);    
	})	
}


// Fonction de tri via le Select 
function sortMedia(media, triValue) {

	switch (triValue) {
		case "popularite": {
			return media.sort((a, b) => b.likes - a.likes);
		}

		case "date": {
			return media.sort((a, b) => new Date(a.date) - new Date(b.date));
		}
			
		case "titre": {
			return media.sort((a, b) => {
				if (a.title < b.title) { return -1; } return 1;
			});
		}
	}
}

// Ecoute de l'évènement Select et affichage du résultat du tri 
function selectData(media) {
    const select = document.querySelector('#test-select');
    select.addEventListener('change', (e) => {
        const sortedMedia = sortMedia(media, e.target.value);
        displayDataGalery(sortedMedia);
			displayDataLightbox(sortedMedia)
    })
}


// Calcul Slide Image Lightbox
function setLightboxEvents(mediaLength){
	const nextButton = document.querySelector('.lightbox-next')
	const prevButton = document.querySelector('.lightbox-prev')
	const lightbox = document.querySelector('.lightbox');
	const lightboxSlide = document.querySelector('.lightbox li');
	const slideWidth = lightboxSlide.clientWidth
	let idx = 0;
	
	// Flèche de gauche, précédente 
	prevButton.addEventListener('click', () => {
		idx -= 1
		if(idx === -1){
			idx = mediaLength - 1
		}
		console.log(idx)
		lightbox.style.transform = `translateX(-${slideWidth * idx}px)`
	})
	// Flèche de droite, suivante
	nextButton.addEventListener('click', () => {
		idx += 1
		if(idx === mediaLength){
			idx = 0
		}
		lightbox.style.transform = `translateX(-${slideWidth * idx}px)`
	})

}


async function init() {
	const { photographer } = await getPhotographer();
	const { media } = await getMedia();
	let sortedMedia = sortMedia(media, 'popularite'); // Par défaut select est sur popularite 
	displayDataPhotographer(photographer);
	displayDataGalery(sortedMedia);
	selectData(media);
	getLikesPrice(media, photographer);
	displayDataLightbox(sortedMedia);
		setLightboxEvents(media.length);
}
init();
