//storing all the details of music in an array
let allMusic=[
    {
        name:"hayyoda from Jawaan",
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
{
  name:"Naan Un Song by Arijit Singh and Chinmayi ",
  genre:"melody 💞 ",
  img:"24",
  src:"24"
},
{
  name:"Ambikapathy - Music by: A.R.Rahman",
  genre:"love 💛",
  img:"Ambikapathy",
  src:"Ambikapathy"
},

{
  name:"Naan NaanSong by Santhosh Narayanan",
  genre:"movtivation 🔥",
  img:"mahaan",
  src:"mahaan"
},

{
  name:"Master the Blaster (Background Score) Song by Anirudh Ravichander",
  genre:"party 🎉",
  img:"master",
  src:"master"
},

{
  name:"No Lie Song by Sean Paul",
  genre:"party  🎊",
  img:"nolie",
  src:"nolie"
},

{
  name:"Kaarkuzhal Kadavaiye Song for Vada Chennai",
  genre:"melody 💞",
  img:"vadachennai",
  src:"vadachennai"
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

// latest js

// update music bar width according to music current time

mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; 
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  musicBar.style.width = `${progressWidth}%`;

let musicCurrentTime = musicplayer.querySelector(".current"),
    musicDuartion = musicplayer.querySelector(".max");
    mainAudio.addEventListener("loadeddata", ()=>{
  
      // update song total duration
      
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ 
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
  
    // update playing song current time
  
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ 
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
  
  // update playing song currentTime on according to the music bar width
  
  musicArea.addEventListener("click", (e)=>{
    let progressWidth = musicArea.clientWidth; 
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration; 
    
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); 
    playingSong();
  });
  
  //change loop, shuffle, repeat icon onclick
  
  const repeatBtn = musicplayer.querySelector("#repeat-plist");
  repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText; 
    switch(getText){
  
      case "repeat":
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
  
      case "repeat_one":
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffled");
        break;
  
      case "shuffle":
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break;
    }
  });
  
  //after song ends
  mainAudio.addEventListener("ended", ()=>{
      
    let getText = repeatBtn.innerText; 
    switch(getText){
      case "repeat":
        nextMusic();
        break;
  
      case "repeat_one":
        mainAudio.currentTime = 0; 
        loadMusic(musicIndex);
        playMusic(); 
        break;
      case "shuffle":
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{
          randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex; 
        loadMusic(musicIndex);
        playMusic();
        playingSong();
        break;
    }
  });

  //show music list clicking on music icon
  
  moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
  });
  closemoreMusic.addEventListener("click", ()=>{
    moreMusicBtn.click();
  });
  
  const ulTag = musicplayer.querySelector("ul");
  
  for (let i = 0; i < allMusic.length; i++) {
   
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].genre}</p>
                  </div>
                  <span id="${allMusic[i].src}" class="timer">3:40</span>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); 
  
    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", ()=>{
      let duration = liAudioTag.duration;
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if(totalSec < 10){ 
        totalSec = `0${totalSec}`;
      };
      liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
      liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); 
    });
  }
  
  //play particular song from the list 
  
  function playingSong(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".timer");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
  
      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
      }
  
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }
  
  //particular li clicked function
  
  function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
  }
  
