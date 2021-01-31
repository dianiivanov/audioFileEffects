'use strict'
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
function handleFiles(event) {
    const files = event.target.files;
    audioElement.setAttribute("src",  URL.createObjectURL(files[0]))
    audioElement.load();
}

document.querySelector("input").addEventListener("change", handleFiles, false);

audioElement.addEventListener("play",function(){
  if(audioContext.state === 'suspended'){
    audioContext.resume();
  }
}, false);

let track = audioContext.createMediaElementSource(audioElement);

const compressor = audioContext.createDynamicsCompressor();

track.connect(compressor);
compressor.connect(audioContext.destination);

const thresholdControl = document.querySelector('#threshold');
thresholdControl.addEventListener('input', function() {
    compressor.threshold.value = this.value;
}, false);

const kneeControl = document.querySelector('#knee');
kneeControl.addEventListener('input', function() {
    compressor.knee.value = this.value;
}, false);

const ratioControl = document.querySelector('#ratio');
ratioControl.addEventListener('input', function() {
    compressor.ratio.value = this.value;
}, false);

const attackControl = document.querySelector('#attack');
attackControl.addEventListener('input', function() {
    compressor.attack.value = this.value;
}, false);

const releaseControl = document.querySelector('#release');
releaseControl.addEventListener('input', function() {
    compressor.release.value = this.value;
}, false);



