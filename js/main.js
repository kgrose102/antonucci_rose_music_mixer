console.log("javascript is linked up");

(() => {

	// for audio
	let theAudio = document.querySelector("audio"),
		controlButtons = document.querySelectorAll("button"),
		albumArt = document.querySelectorAll(".track-ref"),
		volume = document.querySelector('#volume-control');

	// for dragging
	const trackSelector = document.querySelectorAll("#musicTracks img"),
			dropZoneContainer = document.querySelector(".dropCon"),
			dragZone = document.querySelectorAll(".dragTracks"),
			dragImages = document.querySelectorAll(".track-ref"),
			dropZones = document.querySelectorAll(".mixArea");

	// functions
	function loadTrack(){
		let targetTrack = this.dataset.trackref;
		theAudio.src = `sounds/track${targetTrack}.wav`;
		theAudio.load();
		console.log(theAudio.id)
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
		console.log('Audio Level', volume.value);
	}

	function resetTracks(){
		console.log('trackReset')
	}

	function dragStart(event) {
		console.log('stated dragging');
		event.dataTransfer.setData("savedID", this.id);
	}

	function draggedOver(event){
		event.preventDefault();
		console.log('dragged over me');
	}

	function dropped(event) {
		event.preventDefault();

		// check to see if there's an element here already
		// if so, then kill this function
		if (this.childElementCount > 0) { return; } //like an exit keyword don't execute anything past return.

		console.log('dropped something on me');
		let targetID = event.dataTransfer.getData("savedID");
		console.log("I dragged this image,", targetID);
		event.target.appendChild(document.querySelector(`#${targetID}`));
	}

	for (cover of albumArt){
		cover.addEventListener("click", loadTrack);
	}

	function audioNumb(e){
		console.log(this.id);
	}

	volume.addEventListener("change", adjustVolume);
	controlButtons[0].addEventListener("click", playTrack);
	controlButtons[1].addEventListener("click", stopTrack);
	controlButtons[2].addEventListener("click", resetTracks);
	dragImages.forEach(piece => piece.addEventListener("dragstart", dragStart));
	// dragImages.addEventListener("click", audioNumb);
	dropZones.forEach(zone =>{
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", dropped);
	})

})();

