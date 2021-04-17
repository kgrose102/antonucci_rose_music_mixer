console.log("javascript is linked up");

(() => {

	// for audio
	 let theAudio = document.querySelectorAll("audio"),
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
	function loadTrack(entry, num){
		// let targetTrack = this.dataset.trackref;
		// audioref = 'audio' + num ;
		let audioref = theAudio[num]
		audioref.src = `sounds/${entry}.wav`;
		// debugger;
		audioref.load();
		// console.log(entry.id)
	   	playTrack(audioref);
	}

	function playTrack(entry){
		entry.play();
		entry.loop = true;
	}

	function playTracks(){
		theAudio.forEach(function(entry){entry.play();
		entry.loop = true;});
		
	}

	function stopTrack(){
		console.log(theAudio);
		theAudio.forEach(function(entry){entry.pause()})
		// theAudio.pause();
	}

	function adjustVolume(){
		theAudio.forEach(function(entry){entry.volume = volume.value / 100;});
		console.log('Audio Level', volume.value);
	}

	

	function resetTracks(){
		// console.log('trackReset');
		dropZones.forEach(function(entry){console.log(entry)});
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
		var num = this.id.split("");
		console.log('dropped something on me');
		// console.log(event.target.getData(audio-ref));
		let targetID = event.dataTransfer.getData("savedID");
		console.log("I dragged this image,", targetID);
		event.target.appendChild(document.querySelector(`#${targetID}`));
		// var num = target.split("");
		console.log(num);
		// debugger;
		loadTrack(targetID, num[1]);
		// debugger;
	}

	// for (cover of albumArt){
	// 	cover.addEventListener("click", loadTrack);
	// }

	function playOnly(entry){
		// if (entry.target.className.includes('track-ref')) {

		// }
		console.log(entry);
	}

	dropZones.forEach(playOnly);

	function audioNumb(e){
		console.log(this.id);
	}

	volume.addEventListener("change", adjustVolume);
	controlButtons[0].addEventListener("click", playTracks);
	controlButtons[1].addEventListener("click", stopTrack);
	controlButtons[2].addEventListener("click", resetTracks);
	dragImages.forEach(piece => piece.addEventListener("dragstart", dragStart));
	// dragImages.addEventListener("click", audioNumb);
	dropZones.forEach(zone =>{
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", dropped);
	})

})();

