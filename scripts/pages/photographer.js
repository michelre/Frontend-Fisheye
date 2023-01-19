/* Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 
*/


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


// TEST AFFICHAGE DATAS PROFIL PHOTOGRAPHE 
async function displayDataPhotographer(photographers) {
	photographers.forEach(photographer => {
		if(photographerId === photographer.id) {
			photographerInfos(photographer);
		}
	});
}

async function init() {
	const { photographers } = await getPhotographers();
	//const { media } = await getMedia();
	displayDataPhotographer(photographers);
}
init();