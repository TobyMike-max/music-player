const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


// Song title
const songs = [
  'Falz', 'Joeboy', 'Tems'
];


// Keep track of songs
let songIndex = 2;

// Initially load song into document
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}



// Create playSong function
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}


// Create pauseSong function
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}


// Create prevsong function

function prevSong() {
  songIndex--

  if(songIndex < 0){
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex]);

  playSong();
}


// Create nextSong function

function nextSong() {
  songIndex++

  if(songIndex > songs.length - 1){
    songIndex = (songs.length) - (songs.length)
  }

  loadSong(songs[songIndex]);

  playSong();
}


// function to update the progress div

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`
}


// function to change te progress div on a click event
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX
  const duration = audio.duration;


  audio.currentTime = (clickX / width) * duration
}




// Event Listeners

playBtn.addEventListener('click', ()=> {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying){
    pauseSong()
  } else{
    playSong()
  }
})


// Change song events

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);











// Theme changer creation

let theme = localStorage.getItem('theme');

if(theme === null){
  setTheme('red')
} else {
  setTheme(theme)
}




let themeDots = document.getElementsByClassName('theme-dot')

for( var i=0; themeDots.length > i; i++){
    themeDots[i].addEventListener('click', (e) => {
    let mode = e.target.dataset.mode;
    setTheme (mode);
    })
}

function setTheme (mode) {
  if (mode === 'red') {
    document.getElementById('theme-style').href = 'default.css'
  }
  if (mode === 'blue') {
    document.getElementById('theme-style').href = 'blue.css'
  }
  if (mode === 'green') {
    document.getElementById('theme-style').href = 'green.css'
  }


localStorage.setItem('theme', mode);
}
