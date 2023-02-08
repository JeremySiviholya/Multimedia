const wrapper=document.querySelector('.wrapper'),
musiImg=wrapper.querySelector('img'),
musicName=wrapper.querySelector('.name'),
musicArtist=w.querySelector('.artist'),
playpauseBtn=wrapper.querySelector('.play-pause'),
prevBtn=wrapper.querySelector('#prev'),
nextBtn=wrapper.querySelector('#next'),
mainAudi=wrapper.querySelector('#main-audio'),
progressArea=wrapper.querySelector('.progress-area'),
progressBar=progressArea.querySelector('progress-bar');

let musicIndex=Math.floor((Math.random() * allMusic.lenght)+1)