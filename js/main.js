console.log("javascript is linked up");

(() => {

	let theAudio = document.querySelector("audio"),
		controlButtons = document.querySelectorAll("button"),
		albumArt = document.querySelectorAll(".track-ref")
		volume = document.querySelector('#volume-control')

	function loadTrack(){
		let targetTrack = this.dataset.trackref;
		    theAudio.src = `sounds/${targetTrack}.wav`;
		theAudio.load();
    // theAudio.play();
    // the above function is inside the playTrack function
    	playTrack();
	}

	function playTrack(){
		theAudio.play();
		theAudio.loop = true;
	}

	function stopTrack(){
		theAudio.pause();
	}

	function adjustVolume(){
		theAudio.volume = volume.value / 100;
		console.log('fired', theAudio.volume);
	}

	for (cover of albumArt){
		cover.addEventListener("click", loadTrack);
	}

	volume.addEventListener("change", adjustVolume);
	controlButtons[0].addEventListener("click", playTrack);
	controlButtons[1].addEventListener("click", stopTrack);

})();

