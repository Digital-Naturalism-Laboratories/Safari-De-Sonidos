	
	function drawEqualizer(){
		var freqstep= (maxFreq-minFreq-1)/height;
		colorMode(RGB);
		stroke(0);
strokeWeight(3*width/1920);
		fill(255, 255, 0, 150);


beginShape();
curveVertex(width * 1/3, height*5/8);
for (let i = minFreq; i < maxFreq; i += 8*parseInt(freqstep)) { //make our computations easier by skipping!
				let index = i - minFreq;

	let y = (1 - spectrum[index] / 255) * width * (1-1080/1920);
	let x = (i - minFreq) / (maxFreq - minFreq - 1) * height;
	curveVertex(width - x, height - y);
}
curveVertex(width * 2/3, height*5/8);

textAlign(RIGHT);
			textSize(30*width/1920);
//	noStroke();

//text("ALTA Frecuencia \n(5,000Hz)", width-20, 40);
//		 		text("BAJA Frecuencia\n(100Hz)", width-20, height-80);

		 textAlign(CENTER);

endShape(CLOSE);

	}
	


	//Draw the spectra all big
	function drawSpectra() {


let positionLevels= 1525/1920; // Relative position of the bars level




		//Show Live Spectrogram Below
	//	var freqstep = spectrum.length / height;
		var freqstep= (maxFreq-minFreq-1)/height;
		//print(spectrum.length);

				//DRAW HISTOGRAM 0
				let hOffset = 6;
				historygram.image(historygram, -hOffset, 0);
				for (let i = minFreq; i < maxFreq; i += 1*parseInt(freqstep)) { //make our computations easier by skipping!
					
		
					colorMode(HSB);
						//make background color of histogram
			historygram.fill(189,63,88);
		
			//historygram.rect(historygram.width - hOffset, 0, historygram.width, height);
		
		
					
					let index = i - minFreq;
					//	let index= i;//(i - minFreq) / (maxFreq - minFreq - 1) * height;
					let intensity = (spectrum[index] - averageSpectrum[index]);
					//var hue = intensity;
					var hue = 240 - map(intensity, 0, 255, 0, 360);
					historygram.stroke(hue, intensity, 255 - intensity, intensity/360);
					//fill(hue,255,255);
		
					//		historygram.stroke(255-intensity,255-intensity/2,intensity);
					//historygram.fill(255-intensity,255-intensity/2,intensity,intensity);	
					let y = index / parseInt(freqstep);
		
					//Kid Mode
					//	historygram.circle(historygram.width-1,height- y, intensity/10);
					//historygram.strokeWeight(4);
					
					//High Resolution Mode
					//historygram.point(historygram.width-hOffset,height- y);
					historygram.line(historygram.width - hOffset, height - y, historygram.width, height - y);
					
				}
				//fill(255);
				fill(0);
				image(historygram, 0, 0, width * positionLevels, height);

		//DRAW MIC SPECTRUM
		colorMode(RGB);
				stroke(0);
		strokeWeight(3*width/1920);
				fill(255, 255, 0, 150);

		
		beginShape();
		curveVertex(width * positionLevels, height);
		for (let i = minFreq; i < maxFreq; i += 8*parseInt(freqstep)) { //make our computations easier by skipping!
						let index = i - minFreq;

			let x = (1 - spectrum[index] / 255) * width * (1-positionLevels);
			let y = (i - minFreq) / (maxFreq - minFreq - 1) * height;
			curveVertex(width - x, height - y);
		}
		curveVertex(width * positionLevels, 0);
		
		textAlign(RIGHT);
					textSize(30*width/1920);
	//	noStroke();

		//text("ALTA Frecuencia \n(5,000Hz)", width-20, 40);
		//		 		text("BAJA Frecuencia\n(100Hz)", width-20, height-80);

				 textAlign(CENTER);

		endShape(CLOSE);
		//DRAW AVERAGE SPECTRUM 
		/*
		stroke(0);
		fill(0, 150);
		beginShape();
		vertex(width * 3 / 4, height);

		for (let i = minFreq; i < maxFreq; i += 8*parseInt(freqstep)) { //make our computations easier by skipping!
			let index = i - minFreq;
			let x = (1 - averageSpectrum[index] / 255) * width / 4;

			let y = (i - minFreq) / (maxFreq - minFreq - 1) * height;
			//let y = index / (height - 1) * width / 2;
			vertex(width - x, height - y);
		}
		vertex(width * 3 / 4, 0);
		endShape(CLOSE);

*/



	}
	//End Draw Spectra Function




	function setState(s) {
		state = s;
		startTime = new Date().getTime();
		switch (state) {
			case STATES.CALIBRATING:
				duration = calibrationDuration;
				nextState = STATES.RECORDING;
				break;
			case STATES.RECORDING:
				duration = recordDuration;
				nextState = STATES.PLAYING;
				break;
			case STATES.PLAYING:
				break;
		}
	}

	function createKey(midi, type, x, w) {
		let h = keyHeight;
		if (type == "BLACK") {
			x -= w * 0.3;
			w /= 1.5;
			h /= 2;
		}

		let envelope = new p5.Envelope();
		envelope.setRange(0.07, 0); //attackLevel, releaseLevel
		envelope.setADSR(0.001, 0.8, 0.1, 0.5); //attackTime, decayTime, sustainRatio, releaseTime
		let osc = new p5.SinOsc();
		osc.freq(midiToFreq(midi));
		piano[midi] = {
			envelope: envelope,
			osc: osc,
			midi: midi,
			freq: midiToFreq(midi),
			x: x,
			w: w,
			h: h,
			type: type,
			played: false
		};
	}


			/*
	
		//FIND THE HIGHEST LEVEL OF AUDIO FREQUENCY
		let selectedFreq = -1;
		let selectedDist = 0;
		for (let i = minFreq; i < maxFreq; i++) {
			let index = i - minFreq;
			if(spectrum[i] - averageSpectrum[index] > selectedDist){
				selectedDist = spectrum[i] - averageSpectrum[index];
				selectedFreq = i;
			}
		}

		//DRAW HIGHEST LEVEL
		const magicNumber = 1.091;//I had to multiply to this magic number, to be able to get the right Hz, I dont know why...
		let freq = selectedFreq * freqSteps/2 * magicNumber;
		let tempPressedKey = freqToMidi(freq);
		if(selectedDist > hitKeyThreshold){
			let xSelected = (selectedFreq-minFreq) / (maxFreq-minFreq) *height;
			stroke(255, 0, 255);
			line(width*3/4,height- xSelected,width,height-xSelected);
			noStroke();
			fill(255, 0,255);
			text(freq.toFixed(2) + "Hz",width*7/8, height- xSelected-20);
			let note = scaleIndexToNote[tempPressedKey % 12] + (floor(tempPressedKey/12)-1);
			text(note, width*7/8, height- xSelected+30);
		}
		*/

			/*
		if(state == STATES.RECORDING){
			//RECORD
			if(selectedDist > hitKeyThreshold && piano[tempPressedKey]){
				if(pressedKey != tempPressedKey) {
					//PRESS KEY
					pressedKey = tempPressedKey;
					recordedSequence.push({
						key: pressedKey,
						start: new Date().getTime() - startTime,
						duration: 100
					});
				}else{
					//still pressing the same key
					let lastIndex = recordedSequence.length-1;
					recordedSequence[lastIndex].duration = new Date().getTime() - startTime - recordedSequence[lastIndex].start;
				}
			}else{
				//RELEASE KEY
				pressedKey = -1;
			}
	
			//DRAW RECORDING SEQUENCE
			let scrollY = (new Date().getTime() - startTime)/10;
			stroke(0,150);
		strokeWeight(3);
			fill(255,0,0,150);
			for(let i = recordedSequence.length-1; i >= 0; i--){
				let record = recordedSequence[i];
				let pianoKey = piano[record.key];
				let x = pianoKey.x;
				let y = keyHeight + scrollY - record.start/10;
				let w = pianoKey.w;
				let h = -record.duration/10;
				rect(y, x, h, w);
			}
		}
	
		//DRAW PLAYING SEQUENCE
		if(state == STATES.PLAYING){
			let time = (new Date().getTime() - startTime);
			let scrollY = time/10;
			pressedKey = -1;
			stroke(0,150);
		strokeWeight(3);
			fill(0,255,255,150);
			for(let i = recordedSequence.length-1; i >= 0; i--){
				let record = recordedSequence[i];
				let pianoKey = piano[record.key];
				let x = pianoKey.x;
				let y = keyHeight - scrollY + record.start/10;
				let w = pianoKey.w;
				let h = record.duration/10;
				rect(y, x, h, w);
				
				//PLAY SOUND
				if(time > record.start && time < record.start + record.duration){
					pressedKey = record.key;
					if(!record.played){
						record.played = true;
						pianoKey.osc.start();
						pianoKey.envelope.play(pianoKey.osc, 0, record.duration/1000);
					}
				}else{
					record.played = false;
				}
			}
		}
	
		//DRAW PIANO
		stroke(0,150);
		strokeWeight(1);
		for(let midi = freqToMidi(minFreqHz); midi < freqToMidi(maxFreqHz); midi++){
			if(piano[midi].type == "BLACK"){
				//first draw the next white key
				if(pressedKey == midi+1){
					 fill(255, 255, 0);
				}else{
					 fill(255);
				}
				//rect(piano[midi+1].x, 0, piano[midi+1].w, piano[midi+1].h);
							rect(0, piano[midi+1].x, piano[midi+1].h, piano[midi+1].w);
				
				//then draw the black key
				if(pressedKey == midi){
					 fill(255, 255, 0);
				}else{
					 fill(0);
				}
				//rect(piano[midi].x, 0, piano[midi].w, piano[midi].h);
							rect(0, piano[midi].x, piano[midi].h, piano[midi].w);

				midi++;
			}else{
				//white key
				if(pressedKey == midi){
					 fill(255, 255, 0);
				}else{
					 fill(255);
				}
							rect(0, piano[midi].x, piano[midi].h, piano[midi].w);
			}
		}
		*/

			/*
			//CHECK NEXT STATE
			let time = new Date().getTime();
			let remaining = floor((duration - (time - startTime))/1000);
			fill(255, 0, 255);
			text(state + ": " + remaining + "s", width / 4, height / 2 - 30);
			if(time - startTime > duration){
				setState(nextState);
				
			}
			*/

