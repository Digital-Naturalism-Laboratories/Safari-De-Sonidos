/******************
Sound Safari por Andrew Quitmeyer de Digital Naturalism Laboratories
www.dinalab.net

Creado para el Instituto Smithsonian de Investigaciones Tropicales
Stri.si.edu

Los grillos fueron grabados por Arne Schmidt,
las ranas fueron grabadas por Mike Ryan y Stan Rand,
May Dixon y Amanda Savage grabaron otros sonidos.

Las imágenes son atribuciones compartidas vinculadas desde sus sitios de alojamiento principalmente en wikimedia commons :)
La imagen de Tungara se adapta con un fondo trans de
Brian Gratwicke - rana tungara (Physalaemus pustulosus)
https://commons.wikimedia.org/w/index.php?search=tungara&title=Special%3ASearch&go=Go&ns0=1&ns6=1&ns12=1&ns14=1&ns100=1&ns106=1#/media/File:Tungara_frog_(Physalae).pustulos


Inspiración extra de
Audacity: el software de edición de sonido de código abierto
https://www.audacityteam.org/

Audiomoth: los dispositivos de monitoreo acústico de código abierto
https://www.openacousticdevices.info/

el héroe de la canción del pájaro del Cornell Bird Lab
https://academy.allaboutbirds.org/bird-song-hero/

Código original de micrófono a piano de Vamoss
Enlace de código original:
https://www.openprocessing.org/sketch/760560

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/


/*
UI images
*/

let titleImg;
let startButton;

let infoImg = []






//const micSampleRate = 44100;
const micSampleRate = 44100;

const freqDefinition = 8192;
const freqSteps = micSampleRate / freqDefinition;
const hitKeyThreshold = 80; //minimum level to hit the piano key


let strokegrows = 0;

const minFreqHz = 130; //C3
//const maxFreqHz = 2903;//C7
const maxFreqHz = 14000; //C7
//const minFreq = Math.floor(minFreqHz / 2 / 1.445); //2/1.445 is a magic number to convert Hz to MIC frequency, dont know why...
//const maxFreq = Math.floor(maxFreqHz / 2 / 1.445); //2/1.445 is a magic number to convert Hz to MIC frequency, dont know why...
minFreq = 150;
maxFreq = 1500;

//Andy update, the default number of frequency bins is 1024 , so maybe something with that?
const magconvertNumber = 2 / 1.445;

const scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let mic, fft, spectrum;
let spectrum1, spectrum2;
let historygram;


let piano = [];
let pressedKey = -1;
let keyHeight;

let frogclicked = false;
let introTextTitleSize = 192;

let state, nextState, startTime, duration;
const STATES = {
	CALIBRATING: "CALIBRATING",
	RECORDING: "RECORDING",
	PLAYING: "PLAYING",
	QUIZ: "QUIZ",
	INTRO: "INTRO",
	STARTSCREEN: "STARTSCREEN"
};

const calibrationDuration = 5 * 1000; //milliseconds
let calibrateSum = [];
let averageSpectrum; //array to threshold the noise from the microphone

const recordDuration = 10 * 1000; //milliseconds
let recordedSequence = [];

let sounds = [];
let pics = [];
let specs = [];
let Questions = [];
let chosen3 = [];
let chosen = false;
let previousAnswers = [];

let names = [];
let comnames = [];
let comnamesESP = [];

let totalQuiznum = 7;
const quizRounds = 5;
let score = 0;
let Rounds = [];
let currentRound = 0;


//the master Quiz Play Button
let eX;
let eY;
let playWidth;
let tsize;

let secretSound, q0Sound, q1Sound, q2Sound;
let samplelength = 2; //All samples 2 seconds long let's say

let padding = 4; // 4 pixels of padding



let enableNextRound = false;

let startButttint, jeugayaButtTint, frogButtTint, playsoundButtTint;
let nextRoundButton, nextRoundButtTint;


function setup() {
	//let cnv = createCanvas(windowWidth, windowHeight);
	//Lock the aspect ratio - 850 by 1920
	let cnv = createCanvas(windowWidth * .90, windowWidth * .9 * 1080 / 1920);
	//cnv.mouseClicked(togglePlay);
	let textString = 'Iniciar!';
	bbox = font.textBounds(textString, width / 2, height - 80, 60);

	setupSoundWords();

	//the master Quiz Play Button
	eX = width / 8;
	eY = height / 2;
	playWidth = width / 5;
	tsize = playWidth / 4;

	//historygram = createGraphics(width/4,maxFreq-minFreq);
	historygram = createGraphics(width / 2, height);
	historygram.colorMode(HSB);

	//Create Graphics for all the buttons for better performance

	startButttint = createGraphics(width, height);
	jeugayaButtTint = createGraphics(width, height);
	frogButtTint = createGraphics(width, height);
	playsoundButtTint = createGraphics(width, height);

	nextRoundButtTint = createGraphics(width, height);

	startButttint.tint(200, 255, 0); //
	jeugayaButtTint.tint(200, 255, 0);
	frogButtTint.tint(200, 255, 0);
	playsoundButtTint.tint(200, 255, 0);
	nextRoundButtTint.tint(200, 255, 0);

	startButttint.image(startButton, 0, 0, width, height);
	frogButtTint.image(frogButt, 0, 0, width, height);
	jeugayaButtTint.image(juegaYabutton, 0, 0, width, height);

	playsoundButtTint.image(playSoundButt, 0, 0, width, height);

	nextRoundButtTint.image(nextRoundButton, 0, 0, width, height);




	//historygram.mouseClicked(togglePlay);
	mic = new p5.AudioIn();
	mic.start();

	fft = new p5.FFT(0.0, 8192 / 2);
	mic.connect(fft);
	//	fft.setInput(sound);

	//setup the Piano array
	let totalKeys = freqToMidi(maxFreqHz) - freqToMidi(minFreqHz);
	let keyX = height;
	let keyWidth = height / (totalKeys / 12 * 7);
	keyHeight = width / 1920 * 100;
	for (let midi = freqToMidi(minFreqHz); midi < freqToMidi(maxFreqHz); midi++) {
		let index = midi % 12;
		//black key indices
		//c c# d d# e f f# g g# a a# b 
		if (index == 1 || index == 3 || index == 6 || index == 8 || index == 10) {
			createKey(midi + 1, "WHITE", keyX, keyWidth);
			createKey(midi, "BLACK", keyX, keyWidth);
			midi++;
		} else {
			createKey(midi, "WHITE", keyX, keyWidth);
		}
		keyX -= keyWidth;
	}

	averageSpectrum = new Array(maxFreq - minFreq);
	averageSpectrum.fill(0);

	textAlign(CENTER, CENTER);
	textSize(24);
	//setState(STATES.QUIZ);

	setState(STATES.STARTSCREEN);
}


/*
Main Loop

*/

function draw() {
	background(255);
	if (width < 1920 / 3 && state == STATES.QUIZ) {//only do FFT for larger screens

	}
	else {
		spectrum = fft.analyze();
	}
	if (state == STATES.STARTSCREEN) {

		drawEqualizer();
		image(titleImg, 0, 0, width, height);


		//drawSoundsAsWords();

		//textSize(30*width/1920);
		//text("Sound Safari", width / 2, height / 2 - 40);
		//if (mouseX > width / 2 - 40 && mouseY > height / 2 - 40 - 25 && mouseY < height / 2 + 40 + 25) { 
		if (mouseX < width * .8 && mouseX > width * .2 && mouseY > height / 2 - 100 && mouseY < height / 2 + 300) { //make it bigger since we just want people to click
			//fill(155, 150);

			image(startButttint, 0, 0, width, height);
		} else {

			//fill(255, 150);
			image(startButton, 0, 0, width, height);

		}





		textSize(50 * width / 1920);
		//	ellipse(width / 2, height / 2 + 260*width/1920, 220*width/1920, 120*width/1920);
		//text("INICIAR", width / 2, height / 2 + 260*width/1920);
		//	fill(100);
		//	strokeWeight(1);
		//	text("(antes de iniciar, enciende tu micrófono o reproduce música)", width / 2, height / 2 + 380*width/1920);


	}

	//INTRODUCTION
	if (state == STATES.INTRO) {


		drawIntro();



	}
	/////// END INTRO STATE

	// The Quiz Game!
	if (state == STATES.QUIZ) {

		image(quizBackgroundPanelLeft, 0, 0, width, height);


		//Draw a selection of the Questions
		qwidth = width / 2;
		imgwidth = qwidth / 2;
		imgheight = height / 3;

		drawScore();



		fill(10, 100);
		stroke(100, 150);

		//	strokegrows++;
		//strokeWeight(strokegrows% 9);
		//strokeWeight( random(1, 3));


		if (chosen == false) {

			chooseQuestions();

		}

		//draw all the questions selected

		push();
		textSize(50 * width / 1920);

		translate(width - qwidth, 0);
		//First Question
		if (mouseX > width - qwidth - imgwidth && mouseY > 0 && mouseY < height / 3) {
			tint(200, 255, 0); //
		}

		drawQuestions(0);

		//Second Q
		translate(0, height / 3);
		if (mouseX > width - qwidth - imgwidth && mouseY > height / 3 && mouseY < height * 2 / 3) {
			tint(200, 255, 0); //
		} else {
			noTint();
		}



		drawQuestions(1);

		//Third Q
		translate(0, height / 3);

		if (mouseX > width - qwidth - imgwidth && mouseY > height * 2 / 3 && mouseY < height) {
			tint(200, 255, 0); //
		} else {
			noTint();
		}

		drawQuestions(2);


		pop();

		//PLAY BUTTON
		if (mouseX > width / 12 && mouseY > height * 1 / 3 && mouseY < height * 2 / 3 && mouseX < width / 4) {
			//tint(200, 255, 0); //
			image(playsoundButtTint, 0, 0, width, height);

		} else {
			image(playSoundButt, 0, 0, width, height);

			//noTint();
		}

		//NEXT ROUND BUTTON

		if (enableNextRound == true) {

			if (currentRound < quizRounds - 1) {
			
			
				if (mouseX > width / 12 && mouseY > height * 2 / 3 && mouseY < height * 5 / 6 && mouseX < width / 4) {
			
					image(nextRoundButtTint, 0, 0, width, height);
					} else {
					
							image(nextRoundButton, 0, 0, width, height);
					}
		

			} else {
			
				image(newRoundButton, 0, 0, width, height);

				//	fill(255, 10, 255, 150);
			//	textSize(30 * width / 1920);

			//	text("Intenta nuevamente?", 0, playWidth / 2 + 160 * width / 1920);

			}
			
			//textSize(40 * width / 1920);

		
		}

		//drawPlayButton();

	}



}


function windowResized() {
	resizeCanvas(windowWidth * .9, windowWidth * .9 * 1080 / 1920);
	setupSoundWords();

	//the master Quiz Play Button
	eX = width / 8;
	eY = height / 2;
	playWidth = width / 5;
	tsize = playWidth / 4;

	//historygram = createGraphics(width/4,maxFreq-minFreq);
	//historygram = createGraphics(width / 2, height);
	historygram.width=width/2;
	historygram.height=height;
	
	//keyHeight = width / 1920 * 100;

}


function togglePlay() {
	if (allSounds[0].isPlaying()) {
		allSounds[0].pause();
	} else {
		allSounds[0].loop();
	}
}

function togglePlay2() {
	if (sound2.isPlaying()) {
		sound2.pause();
	} else {
		sound2.loop();
	}
}
