// Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id"));
let lightboxIdx = 0;


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
    media.forEach((itemMedia, idx) => {
        const photographerGaleryModel = photographerMediaFactory(itemMedia);
        const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom(idx);
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
                if (a.title < b.title) {
                    return -1;
                }
                return 1;
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
        setGalleryEvent()
    })
}


// Calcul Slide Image Lightbox
function setLightboxEvents(mediaLength) {
    const nextButton = document.querySelector('.lightbox-next')
    const prevButton = document.querySelector('.lightbox-prev')
    const lightbox = document.querySelector('.lightbox');
    const lightboxSlide = document.querySelector('.lightbox li');
    const closeLightbox = document.querySelector(".lightbox-close");
    const lightboxModal = document.querySelector(".lightbox-container");
    const lightboxBg = document.querySelector(".lightbox-bg");
    const slideWidth = lightboxSlide.clientWidth

    // Fermeture de la modale via la touche Echap
    const keyCodes = {
        escape: "Escape",
        previous: 'ArrowLeft',
        next: 'ArrowRight'
    };
    window.addEventListener('keydown', (event) => {
        if (event.code === keyCodes.escape) {
            closeModal();
        }
        if (event.code === keyCodes.previous) {
            previousSlide();
        }
        if (event.code === keyCodes.next) {
            nextSlide();
        }
    })

    // Fermeture de la lightbox
    closeLightbox.addEventListener("click", closeModal);
    // Flèche de gauche, précédente
    prevButton.addEventListener('click', previousSlide)
    // Flèche de droite, suivante
    nextButton.addEventListener('click', nextSlide)

    function closeModal() {
        lightboxModal.style.opacity = 0;
        setTimeout(() => {
            lightboxModal.style.visibility = "hidden";
        }, 500)
        lightboxBg.style.visibility = "hidden";
    }

    function nextSlide() {
        lightboxIdx += 1
        if (lightboxIdx === mediaLength) {
            lightboxIdx = 0
        }
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }

    function previousSlide() {
        lightboxIdx -= 1
        if (lightboxIdx === -1) {
            lightboxIdx = mediaLength - 1
        }
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }

}

function setGalleryEvent(){
	const galleryMedias = document.querySelectorAll('.photographer-galery-media')
    const lightboxContainer = document.querySelector('.lightbox-container')
    const lightbox = document.querySelector('.lightbox')
    const lightboxBg = document.querySelector('.lightbox-bg')
    const lightboxSlide = document.querySelector('.lightbox li');
    const slideWidth = lightboxSlide.clientWidth
	galleryMedias.forEach((galleryMedia) => {
		galleryMedia.addEventListener('click', (event) => {
            lightboxIdx = parseInt(event.currentTarget.dataset.idx)
			lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
            lightboxContainer.style.visibility = 'visible'
            lightboxContainer.style.opacity = 1
            lightboxBg.style.visibility = 'visible'

		})
	})
}


async function init() {
    const {photographer} = await getPhotographer();
    const {media} = await getMedia();
    let sortedMedia = sortMedia(media, 'popularite'); // Par défaut select est sur popularite
    displayDataPhotographer(photographer);
    displayDataGalery(sortedMedia);
    selectData(media);
    getLikesPrice(media, photographer);
    displayDataLightbox(sortedMedia);
    setLightboxEvents(media.length);
	setGalleryEvent()
}

init();
