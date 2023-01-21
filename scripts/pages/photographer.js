// Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 


// Récupération des datas des différents photographes via un fetch
async function getPhotographers() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (photographers = data.photographers));
	return {
		photographers: [...photographers]            
	};
}


// Récupération des datas MEDIA des différents photographes via un fetch 
async function getMedia() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (media = data.media));
	return {
		media: [...media]            
	};
}


// Page photographe : Affichage des datas liées au profil des protographes
async function displayDataPhotographer(photographers) {
	const photographer = photographers.find(photographer => {
		return photographerId === photographer.id
	});
	photographerInfosHeader(photographer);
}


// TEST AFFICHAGE DES PHOTOS DANS LA SECTION GALERIE 
async function displayDataGalery(media) {
	const photographerGalery = document.querySelector('.photographer-galery');
	media.forEach(itemMedia => {
		if (photographerId === itemMedia.photographerId) {
			const photographerGaleryModel = photographerMediaFactory(itemMedia);
			const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom();
			photographerGalery.appendChild(userGaleryCardDOM);    
		}
	})
}



async function init() {
	const { photographers } = await getPhotographers();
	const { media } = await getMedia();
	displayDataPhotographer(photographers);
	displayDataGalery(media);
}
init();