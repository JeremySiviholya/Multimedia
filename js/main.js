const reponse=await fetch('../Assets/js/menuList.json');
const allMusic=await reponse.json();

const wrapper=document.querySelector('.wrapper'),
musicImg=wrapper.querySelector('img'),
musicName=wrapper.querySelector('.name'),
musicArtist=wrapper.querySelector('.artist'),
playpauseBtn=wrapper.querySelector('.play-pause'),
prevBtn=wrapper.querySelector('#prev'),
nextBtn=wrapper.querySelector('#next'),
mainAudio=wrapper.querySelector('#main-audio'),
progressArea=wrapper.querySelector('.progress-area'),
progressBar=progressArea.querySelector('.progress-bar'),
slider=wrapper.querySelector('.slider'),
thumb=wrapper.querySelector('.slider-thumb'),
progress=wrapper.querySelector('.progress'),
volumeSlider=wrapper.querySelector('.volume-slider .slider'),
volumeProgress=wrapper.querySelector('.volume-slider .progress'),
volumeIcon=wrapper.querySelector('.volume-icon');


let musicIndex=Math.floor((Math.random() * allMusic.length) +1);
let isMusicPaused=true;

window.addEventListener('load',()=>{
    loadMusic(musicIndex)
});

function loadMusic(indexNumb){
    musicName.innerText=allMusic[indexNumb -1].name;
    musicArtist.innerText=allMusic[indexNumb -1].artist;
    musicImg.src =`../Assets/images/${allMusic[indexNumb -1].img}.jpg`;
    mainAudio.src=`../Assets/Songs/${allMusic[indexNumb -1].song}.mp3`;
}

function playMusic(){
    wrapper.classList.add('paused');
    musicImg.classList.add('rotate');
    playpauseBtn.innerHTML=`<i class='bx bx-pause'></i>`;
    mainAudio.play();
}


function pauseMusic(){
    wrapper.classList.remove('paused');
    musicImg.classList.remove('rotate');
    playpauseBtn.innerHTML=`<i class='bx bx-play'></i>`;
    mainAudio.pause();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex=1 : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playpauseBtn.addEventListener('click',()=>{
    const isMusicPlay=wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click',()=>{
    prevMusic();
});
nextBtn.addEventListener('click',()=>{
    nextMusic();
});

mainAudio.addEventListener('timeupdate',(e)=>{
    const currentTime=e.target.currentTime;
    const duration=e.target.duration;
    let progressWidth=(currentTime / duration) * 100;
    progressBar.style.width=`${progressWidth}%`;

    let musicCurrentTime=wrapper.querySelector('.current-time');
    let musicDuration=wrapper.querySelector('.max-duration')
    mainAudio.addEventListener('loadeddata',()=>{
        let mainAdDuration=mainAudio.duration;
        let totalMin=Math.floor(mainAdDuration /60);
        let totalSec=Math.floor(mainAdDuration % 60);

        if(totalSec<10)
        {
            totalSec=`0${totalSec}`;
        }
        musicDuration.innerText=`${totalMin}:${totalSec}`;
        
    });
    let currentMin=Math.floor(currentTime /60);
    let currentSec=Math.floor(currentTime %60);
    if(currentSec < 10){
        currentSec=`0${currentSec}`;
    }
    musicCurrentTime.innerText=`${currentMin}:${currentSec}`;
})

progressArea.addEventListener('click',  (e)=>{
    let progressWidth=progressArea.clientWidth;
    let clickedOffsetX=e.offsetX;
    let songDuration=mainAudio.duration;

    mainAudio.currentTime=(clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});
mainAudio.addEventListener('ended',()=>{
    nextMusic();
});

let val;
function customVolumeSlider(){
    //get max attribute value  from slider
    const maxVal=volumeSlider.getAttribute('max');
    //get the percentage
    val=(volumeSlider.value /maxVal)* 100 + "%";
    //set the thumb and progress to the current value
    volumeProgress.style.width=val;
    //set the audio volume to current value
    mainAudio.volume=volumeSlider.value /100;
    //change the volume icons
    //if the volume is high
    if(mainAudio.volume > 0.5)
    {
        volumeIcon.innerHTML=`<i class='bx bx-volume-full'></i>`;
    }
    else if(mainAudio.volume===0)
    {
        volumeIcon.innerHTML=`<i class='bx bx-volume-mute'></i>`;
    }
    else{
        volumeIcon.innerHTML=`<i class='bx bx-volume-low'></i>`;
    }
}

customVolumeSlider();

// run the functions aigain
//  when the volume 
// slider is selected

volumeSlider.addEventListener('input',customVolumeSlider);