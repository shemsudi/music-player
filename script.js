const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const playBtn=document.getElementById('play');
const music=document.querySelector('audio');
const image=document.querySelector('img');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');


let isPlaying=false;
const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'Front Row',
        artist:'Jacinto Design'
    },
];

function playMusic(){
    music.play();
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}
function pauseMusic(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();

}
let songIndex=0;

function loadSong(song){
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
    title.textContent=song.displayName;
    artist.textContent=song.artist;

}
function nextsong(){
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
function prevsong(){
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// Update Progress Bar
function UpdateProgerssBar(e){
    if(isPlaying){
        const {duration,currentTime}=e.srcElement;
        // Update progress bar width
        const progressPercent=(currentTime/duration)*100;
        progress.style.width=`${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes=Math.floor(duration/60);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes=Math.floor(currentTime/60);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressbar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration}=music;
    music.currentTime=(clickX/width)*duration;
}

playBtn.addEventListener('click',()=> isPlaying? pauseMusic():playMusic());
nextBtn.addEventListener('click',()=>nextsong());
prevBtn.addEventListener('click',()=>prevsong());
music.addEventListener('timeupdate',UpdateProgerssBar);
progressContainer.addEventListener('click', setProgressbar);
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        isPlaying? pauseMusic():playMusic()    }
    if (event.code === 'ArrowRight') {
        nextsong();
    }
    if (event.code === 'ArrowLeft') { 
        prevsong();
    }
  })
music.addEventListener('ended',nextsong);


