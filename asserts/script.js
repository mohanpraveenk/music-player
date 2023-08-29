//storing all the details of music in an array
let allMusic=[
    {
        name:"haiyoda from Jawaan",
        genre:"melody 💕",
        img:"haiyoda",
        src:"haiyoda"
    },
    {
      name:"Hukkum from jailer",
      genre:"motivation  🔥 ",
      img:"jailer",
      src:"jailer"
  },
  {
    name:"whatever it takes Song by Imagine Dragons",
    genre:"motivation  🔥",
    img:"whatever",
    src:"whatever"
},
{
  name:"enemy Song by Arcane, Imagine Dragons",
  genre:"motivation  🔥",
  img:"enemy",
  src:"enemy"
},
];

const musicplayer = document.querySelector(".musicplayer"),
musicImg = musicplayer.querySelector(".img img"),
musicName = musicplayer.querySelector(".songdetails .name"),
musicArtist = musicplayer.querySelector(".songdetails .genre"),

playPauseBtn = musicplayer.querySelector(".play-pause"),

prevBtn = musicplayer.querySelector("#previous"),
nextBtn = musicplayer.querySelector("#next"),

mainAudio = musicplayer.querySelector("#main-audio"),

musicArea = musicplayer.querySelector(".music-area"),
musicBar = musicArea.querySelector(".music-bar"),

musicList = musicplayer.querySelector(".music-list"),
moreMusicBtn = musicplayer.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].genre;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}


//play music function
function playMusic(){
  musicplayer.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic(){
  musicplayer.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//prev music function
function prevMusic(){
  musicIndex--; 
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

//next music function
function nextMusic(){
  musicIndex++; 
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = musicplayer.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//previous music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});


// still more works are avaliable in js
