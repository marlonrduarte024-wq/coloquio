// Base de datos local simulada para el LP de Thriller
const albumData = {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    sides: {
        A: [
            { id: 1, title: "Wanna Be Startin' Somethin'", duration: "6:03", lyrics: "I said you're a vegetable, you're a vegetable\nStill they eat you out of house and home, eat you out of house and home...\n(Let's take it from the top)" },
            { id: 2, title: "Baby Be Mine", duration: "4:20", lyrics: "Baby be mine, baby be mine\nNow that I've found you, somehow you've got to be mine...\nShare my life, be my wife, make it right." },
            { id: 3, title: "The Girl Is Mine (with Paul McCartney)", duration: "3:42", lyrics: "Every night she walks right in my dreams\nSince I met her from the start\nI'm so proud I am the only one\nWho is special in her heart..." },
            { id: 4, title: "Thriller", duration: "5:57", lyrics: "It's close to midnight and something evil's lurking in the dark\nUnder the moonlight you see a sight that almost stops your heart...\nYou try to scream as terror takes you before you hear it too late\nYou start to freeze as horror looks you right between the eyes, you're paralyzed!" }
        ],
        B: [
            { id: 5, title: "Beat It", duration: "4:18", lyrics: "They told him, 'Don't you ever come around here'\n'Don't want to see your face, you better disappear'\nThe fire's in their eyes and their words are really clear\nSo beat it, just beat it!" },
            { id: 6, title: "Billie Jean", duration: "4:54", lyrics: "Billie Jean is not my lover\nShe's just a girl who claims that I am the one\nBut the kid is not my son\nShe says I am the one, but the kid is not my son..." },
            { id: 7, title: "Human Nature", duration: "4:06", lyrics: "Looking out across the night-time\nThe city winks a greedy eye\nIm an alleyway of shadows\nAnd a cold wind blows in my face..." },
            { id: 8, title: "P.Y.T. (Pretty Young Thing)", duration: "3:59", lyrics: "Where did you come from, lady?\nAnd ooh won't you take me there?\nRight where the music's playin'\n(Let's take it higher, oh yeah)..." },
            { id: 9, title: "The Lady in My Life", duration: "5:00", lyrics: "There'll be no comprimes\nFor the passion inside\nTonight is the night\nTwo hearts will beat as one..." }
        ]
    }
};

let currentSide = 'A';
let activeTrack = null;

// Elementos del DOM
const albumCover = document.getElementById('album-cover');
const albumTitle = document.getElementById('album-title');
const artistName = document.getElementById('artist-name');
const trackListEl = document.getElementById('track-list');
const vinylLabelText = document.getElementById('vinyl-label-text');
const sideBtns = document.querySelectorAll('.side-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currentTrackTitle = document.getElementById('current-track-title');
const lyricsContainer = document.getElementById('lyrics-container');
const appContainer = document.querySelector('.app-container');

// Inicializar vista
function initApp() {
    albumCover.src = albumData.cover;
    albumTitle.textContent = albumData.title;
    artistName.textContent = albumData.artist;
    renderTracks();
}

// Renderizar la lista de canciones según el lado (A o B)
function renderTracks() {
    trackListEl.innerHTML = '';
    const tracks = albumData.sides[currentSide];

    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = `track-item ${activeTrack && activeTrack.id === track.id ? 'active' : ''}`;
        li.innerHTML = `
            <div class="track-info">
                <span class="track-num">0${index + 1}</span>
                <span class="track-name">${track.title}</span>
            </div>
            <span class="track-duration">${track.duration}</span>
        `;
        li.addEventListener('click', () => selectTrack(track));
        trackListEl.appendChild(li);
    });
}

// Seleccionar canción y mostrar letra
function selectTrack(track) {
    activeTrack = track;
    appContainer.classList.add('playing');
    
    // Actualizar UI de lista
    document.querySelectorAll('.track-item').forEach(item => item.classList.remove('active'));
    renderTracks();

    // Mostrar letras
    currentTrackTitle.textContent = track.title;
    lyricsContainer.textContent = track.lyrics;

    // Opcional: Cambiar automáticamente a la pestaña de letras al hacer clic en móvil/tablet
    // switchTab('lyrics');
}

// Cambiar Lado A / Lado B
sideBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        sideBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentSide = e.target.getAttribute('data-side');
        vinylLabelText.textContent = `SIDE ${currentSide}`;
        activeTrack = null;
        appContainer.classList.remove('playing');
        renderTracks();
        currentTrackTitle.textContent = "Selecciona una canción";
        lyricsContainer.innerHTML = '<p class="placeholder-text">Cambiado al Lado ' + currentSide + '. Selecciona una pista.</p>';
    });
});

// Control de Pestañas (Tracks / Letras)
function switchTab(tabName) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    if (tabName === 'tracks') {
        document.querySelector('.tabs button:nth-child(1)').classList.add('active');
        document.getElementById('tracks-view').classList.add('active');
    } else {
        document.querySelector('.tabs button:nth-child(2)').classList.add('active');
        document.getElementById('lyrics-view').classList.add('active');
    }
}

// Arrancar al cargar
initApp();
