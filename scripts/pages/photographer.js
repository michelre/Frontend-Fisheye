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
		media: media.filter(m => m.photographerId === photographerId)         
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
	photographerGalery.innerHTML = '';
	media.forEach(itemMedia => {
		const photographerGaleryModel = photographerMediaFactory(itemMedia);
		const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom();
		photographerGalery.appendChild(userGaleryCardDOM);    
	})
}


/* TEST FONCTION DE TRI VIA LE SELECT */
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


function selectData(media) {
	const select = document.querySelector('#test-select');
	select.addEventListener('change', (e) => {
		const sortedMedia = sortMedia(media, e.target.value);
		displayDataGalery(sortedMedia);
	})
}


async function init() {
	const { photographers } = await getPhotographers();
	const { media } = await getMedia();
	let sortedMedia = sortMedia(media, 'popularite'); // Par défaut select est sur popularite 
	displayDataPhotographer(photographers);
	displayDataGalery(sortedMedia);
	selectData(media);
}
init();

// total like
// const totalLike = media.reduce((acc, curr) => acc + curr.likes, 0 )