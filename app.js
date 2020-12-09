 
const obtenirDetails = async (filmID) => {    
    const api = 'f3146eec5df1fca7cb7304bc37d7d87f'
    const urlFilm = `https://api.themoviedb.org/3/movie/${ filmID }?api_key=${ api }`;
    const reponse = await fetch(urlFilm);
    const data = await reponse.json();

    const title = data.title;
    const overview = data.overview;
    const potatometer = data.vote_average;
    const popularity = parseInt(data.popularity);

    const urlPoster = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    const respPoster = await fetch(urlPoster);
    const poster = respPoster.url;

    const urlReviews = `https://api.themoviedb.org/3/movie/${ filmID }/reviews?api_key=${ api }`;
    const reponseCritiqes = await fetch(urlReviews);
    const contentJSON = await reponseCritiqes.json();
    const reviews = contentJSON.results;

    var titrefilm = `<h2 id="filmtitre">${ title }</h2>`;
    var imageposter = `<img id="posterimage" src="${ poster }">`;
    var filmpotatometer = `<p>POTATOMETER</p><div id="filmpotatometer">${ potatometer*10 }%</div>`;
    var filmpopularite = `<p>POPULARITY</p><div id="filmpopularite">${ popularity }</div>`;
    var filmoverview = `<p>OVERVIEW</p><div id="filmoverview">${ overview }</div>`;
    var filmreviews ="";
    filmreviews += `<ul id=reviewslist>`;
    for(i = 0; i < reviews.length; i++){ 
        filmreviews += `<li id="filmreview">${ reviews[i].content }</li>`;
    }
    filmreviews += "</ul>";

    var button = `<button id="buttonrevenir" type="button"> Back </button>`;
    const goback = document.querySelector('section#filmdetails');
    goback.addEventListener('click', revenir);

    const ChercherElemFilm = document.querySelector('section#chercherfilm');
    const elemTendence = document.querySelector('section#tendance');
    const infoElemFilm = document.querySelector('section#filmdetails'); 
    const titreElemApp = document.querySelector('section#filmtitreapp');
    const formElem = document.querySelector('section#filmform');

    ChercherElemFilm.innerHTML = "";
    elemTendence.innerHTML = "";
    titreElemApp.innerHTML = "";
    formElem.innerHTML = "";
    
    const filmDetails = titrefilm + imageposter + filmpotatometer + filmpopularite + filmoverview + filmreviews + button;       
    infoElemFilm.innerHTML = filmDetails;
};

const ObtenirID = async () => {
    document.querySelector('#filmlist').addEventListener('click', async (evt) => {
        const el = evt.target;
        const filmid = el.getAttribute('data-id');
        const filmDetails = await obtenirDetails(filmid);
    });
};

const obtenirTendence = async () => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=3573d31a4ab61b8307c11b4661db6f97`;
    const reponse = await fetch(url);
    const contentJSON = await reponse.json();
    return contentJSON.results;
};

const afficherTendence = async() =>{
    const elemTendence = document.querySelector('section#tendance');

    const filmTendence = await obtenirTendence(); 

    var films ="";
    films += `<ul id=filmlist>`;
    for(i = 0; i < filmTendence.length; i++){ 
        films += `<li id="film" data-id="${filmTendence[i].id}">${filmTendence[i].title}</li>`;
        elemTendence.innerHTML = films;
    }
    films += "</ul>";

    const getID = ObtenirID();
};

const chercher = async (titreFilm) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=3573d31a4ab61b8307c11b4661db6f97&query=${ titreFilm }`;
    const reponse = await fetch(url);
    const dataTitreFilm = await reponse.json();
    return dataTitreFilm.results;
};

const doSearch = async (event) => {
    event.preventDefault();
    const inputElem = document.querySelector('input');
    const elemTendence = document.querySelector('section#tendance');
   
    const titreFilm = inputElem.value;
    if (titreFilm == "") {
        const filmTendance = afficherTendence();
    } else {
        const ChercherElemFilm = document.querySelector('section#chercherfilm');
        const recherche = await chercher(titreFilm);

        var films ="";
        films += '<ul id=filmlist>';
        for(i = 0; i < recherche.length; i++){
            films += `<li id="film" data-id=${recherche[i].id}>${recherche[i].title}</li>`;
            ChercherElemFilm.innerHTML = films; 
        }
        films += "</ul>";

        elemTendence.innerHTML = "";
        const getID = ObtenirID(); 
    }

};

const revenir = async () => {
    const infoElemFilm = document.querySelector('section#filmdetails'); 
    infoElemFilm.innerHTML = "";
    const buttonRevenir = main();
};

const barreRecherche = async () => {
    const formElem = document.querySelector('section#filmform');
    formElem.innerHTML = `<form id="search"><input type="text" name="filmtitre" placeholder="Search..."></form>`;
    const form = document.querySelector('form#search');
    form.addEventListener('submit', doSearch);  
};

const afficherTitreApp = async () => {
    const titreElemApp = document.querySelector('section#filmtitreapp');
    titreElemApp.innerHTML = `<h1 id="titresite">Rotten Potatoes</h1>`;
};

const main = async () => {
    const appTitle = afficherTitreApp();
    const chercherFilmForm = barreRecherche(); 
    const filmTendence = afficherTendence();
};

document.addEventListener('DOMContentLoaded', main);