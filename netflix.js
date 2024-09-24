const publicKey = 'aa89fec6c95ae3eb6839bde7e9477b1d'; // Ta clé API publique
const privateKey = 'f07c0cd4011d2d212a893db6e01aa0665b61809c'; // Ta clé API privée
const general = document.getElementById('general');
const paragraphe = document.querySelector('.paragraphe')
const equipeContainer = document.querySelector('.equipe-container')

// Fonction pour générer le hash MD5
function generateHash(ts, privateKey, publicKey) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}

// Fonction pour récupérer les personnages Marvel
async function getMarvelCharacters() {
    console.log("hey" + paragraphe.style.display)
    if(general.classList.contains('accueil')){
        general.classList.remove("accueil")
        general.classList.add('movies-grid')
    }
    titre = document.querySelector('.titre');
    titre.textContent='Personnages Marvel';
    moviesGrid = document.querySelector('.movies-grid');
    const loading = document.createElement('p')
    loading.innerHTML = 'Loading...'
    loading.classList.add('loading')
    general.innerHTML = ''
    general.appendChild(loading)
    const ts = new Date().getTime();
    const hash = generateHash(ts, privateKey, publicKey);
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=12`;
    try {
        const response = await fetch(url);
        if (!response.ok) { // Vérification de l'état de la réponse
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Vérifie la structure des données
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Erreur lors du fetch des données Marvel', error);
    }
}

// Fonction pour afficher les personnages Marvel
function displayCharacters(characters) {
    general.innerHTML = ''; // Effacer le contenu précédent
    characters.forEach(character => {
        
        const movieTile = document.createElement('div');
        movieTile.classList.add('movie-tile');
        movieTile.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h3>${character.name}</h3>
        `;
        moviesGrid.appendChild(movieTile);
    });
}
// Fonction pour récupérer les personnages Marvel
async function getMarvelComics() {
    if(general.classList.contains('accueil')){
        general.classList.remove("accueil")
        general.classList.add('movies-grid')
    }
    const loading = document.createElement('p')
    loading.innerHTML = 'Loading...'
    loading.classList.add('loading')
    general.innerHTML = ''
    general.appendChild(loading)
    titre = document.querySelector('.titre');
    titre.textContent='Comics Marvel'
    const ts = new Date().getTime();
    const hash = generateHash(ts, privateKey, publicKey); 
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=12`;
    try {
        const response = await fetch(url);
        if (!response.ok) { // Vérification de l'état de la réponse
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Vérifie la structure des données
        displayComics(data.data.results); // data.data.results contient les comics
    } catch (error) {
        console.error('Erreur lors du fetch des données Marvel', error);
    }
}

// Fonction pour afficher les comics Marvel
function displayComics(comics) {
    general.innerHTML = ''; // Effacer le contenu précédent
    comics.forEach(comic => {
        const movieTile = document.createElement('div');
        movieTile.classList.add('movie-tile');
        const thumbnail = comic.thumbnail && comic.thumbnail.path && comic.thumbnail.extension
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            : 'path_to_placeholder_image.jpg';
    
        movieTile.innerHTML = `
            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
            <h3>${comic.title}</h3>
        `;
        general.appendChild(movieTile);
    });
}

function showHome(){
    if(general.classList.contains('movies-grid')){
        general.classList.remove('movies-grid')
        general.classList.add("accueil")
    }
    moviesGrid.innerHTML = '';
    titre = document.querySelector('.titre');
    titre.textContent='Welcome to CPUflix'
    general.appendChild(paragraphe)
    general.appendChild(equipeContainer)
}
