// Récupération des identifiants des photographes dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getUrlIdPhotographers = parseInt(urlParams.get("id"));

