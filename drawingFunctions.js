var scoresize;
var labelsize;

function drawScore(index) {

	image(roundsDots, 0, 0, width, height);


	textAlign(CENTER,CENTER);
				stroke(250, 200, 200, 200);
			strokeWeight(8 * width / 1920);
			colorMode(HSB);
			soundcolor = color(fft.getEnergy(100, 3000), 30 + fft.getEnergy(100, 3000), 200, .5);
			stroke(soundcolor);

	// 		//display score
	let scoredotsize = width / 4 / quizRounds - 5 * width / 1920;
	 		let score = 0;
	 		scoresize = 20 * width / 1920
	 		textSize(scoresize*2);
	for (let i = 0; i < quizRounds; i++) {

		push();
		if (Rounds[i] == -1) { //havent done it yet 
			//fill(255, 0, 255);
		}
		if (Rounds[i] == 1) {
			//fill(100, 255, 200, .7);//dots are spaced 83 pixels apart
			image(correctRoundDot,i*83*width/1920,0,width,height)
			score += 100;
		}
		if (Rounds[i] == 0) {
			fill(0, 255, 200, .7);
			image(incorrectRoundDot,i*83*width/1920,0,width,height)

		}

		//ellipse((i + 1) * scoredotsize - scoredotsize / 4, scoredotsize*1.1 , scoredotsize, scoredotsize);

		pop();

	}
	colorMode(RGB);
	noStroke();
fill(0,156,221);
	text("RONDA: " + (currentRound + 1), width / 7, height / 4);
	textSize(scoresize * 3);

	//text("Puntuación: " + score, width / 8, 2*scoredotsize);




}

function drawSpectrumCircle() {
	colorMode(RGB);

	for (var i = 0; i < spectrum.length; i += 60) {
		var amt = map(i, 0, spectrum.length, 0, 1);


		let from = this.color(255, 0, 0, 0.2 * 255);
		let to = this.color(0, 0, 255, 0.2 * 255); //since this is in a function for some bizarre reason we have to put this
		var color = lerpColor(from, to, amt);
		//var color = lerpColor(colorA, colorB, amt);
		var diam = map(spectrum[i], 0, 255, playWidth, playWidth * 1.5);
		noFill();
		stroke(color);
		strokeWeight(3);
		ellipseMode(CENTER);
		ellipse(0, 0, diam, diam);
	}
}

function drawSpectrumCircleFrog() { //draw the lines for the tungara
	let tunwidth = 300 * width / 1920;
	for (var i = 0; i < spectrum.length; i += 60) {
		var amt = map(i, 0, spectrum.length, 0, 1);


		let from = this.color(255, 0, 0, 0.2 * 255);
		let to = this.color(0, 0, 255, 0.2 * 255); //since this is in a function for some bizarre reason we have to put this
		var color = lerpColor(from, to, amt);
		//var color = lerpColor(colorA, colorB, amt);
		var diam = map(spectrum[i], 0, 255, tunwidth / 3, tunwidth);
		noFill();
		stroke(color);
		strokeWeight(3);
		ellipseMode(CENTER);
		ellipse(0, 0, diam, diam);
	}
}


function drawQuestions(index) {
	labelsize = 40 * width / 1920;
	strokeWeight(2 * width / 1920);
	stroke(soundcolor);
	fill(0, 180);

	if (chosen3[index].clicked == true) {


		//click RIGHT
		if (chosen3[index].correct) {
			tint(0, 255, 0);
		}
		//Click WRONG
		if (!chosen3[index].correct) {
			tint(255, 0, 0);

		}
	}


	//image(chosen3[index].spectrogram, chosen3[index].x - imgwidth, chosen3[index].y, qwidth, imgheight - padding);
	image(chosen3[index].quizQ,0,0,width,height);
	//image(chosen3[index].pic, chosen3[index].x + qwidth - imgwidth, chosen3[index].y, imgwidth, imgheight - padding);
	//ellipse(chosen3[index].x, chosen3[index].y, 80, 80);

	//textSize(labelsize);
	//text(chosen3[index].name, chosen3[index].x, chosen3[index].y + 70 * width / 1920);

	if (chosen3[index].clicked == true) {


		//click RIGHT
		if (chosen3[index].correct) {

			//textSize(labelsize * 2);
			//text("¡Muy Bien!", chosen3[index].x, chosen3[index].y + 170 * width / 1920);
			image(correctButton,0,0,width,height);
		}
		//Click WRONG
		if (!chosen3[index].correct) {
			image(incorrectButton,0,0,width,height);

			//textSize(labelsize * 2);
			//text("Incorrecta", chosen3[index].x, chosen3[index].y + 170 * width / 1920);
		}
	}





}

function drawPlayButton() {


	//Draw master Quiz Play Button
	eX = width / 8;
	eY = height / 2;
	playWidth = width / 5;
	tsize = playWidth / 4;

	push();
	strokeWeight(8 * width / 1920);
	colorMode(HSB);
	stroke(soundcolor);


	translate(eX, eY);

	//Change Button Color on mouseover
	if (dist(mouseX, mouseY, eX, eY) < playWidth / 2 || secretSound.isPlaying()) {

		if (secretSound.isPlaying()) {
			drawSpectrumCircle();
		}

		strokeWeight(10 * width / 1920);
		fill(150, 100, 255);
	} else {
		strokeWeight(5 * width / 1920);
		fill(155, 30, 90);
	}
	//print(secretSound.currentTime());

	//textSize(scoresize*2);

	//ellipse(0, 0, playWidth, playWidth);
	//strokeWeight(2 * width / 1920);
	//text("Haz clic para averiguar \n el Sonido Misterioso", 0, playWidth / 2 + 60*width/1920);
	//textSize(20 * width / 1920);




	if (enableNextRound == true) {

		if (mouseX > -playWidth / 2 + eX && mouseX < -playWidth / 2 + eX + playWidth && mouseY > eY + playWidth / 2 + 120 * width / 1920 && mouseY < eY + playWidth / 2 + 120 * width / 1920 + 80 * width / 1920) {
			fill(0, 255, 255, .9);

			strokeWeight(8 * width / 1920);

		} else {
			fill(0, 255, 255, .4);
			//image(playSoundButt,0,0,width,height);

			strokeWeight(3 * width / 1920);
		}
		let rectCorners = 20;
		//		 rect(-playWidth/2,playWidth / 2 + 90,playWidth, 90,rectCorners);



		rect(-playWidth / 2, playWidth / 2 + 120 * width / 1920, playWidth, 80 * width / 1920, rectCorners);
		fill(100, 10, 255, 150);
		textSize(40 * width / 1920);

		if (currentRound < quizRounds - 1) {
			//text("¡Siguiente ronda!", 0, playWidth / 2 + 160 * width / 1920);

		} else {
			fill(255, 10, 255, 150);
			textSize(30 * width / 1920);

			//text("Intenta nuevamente?", 0, playWidth / 2 + 160 * width / 1920);

		}
	}

	/*
				//Draw Triangle
			translate(20* width / 1920, 0);
			strokeWeight(3 * width / 1920);
			fill(0, 255, 255, 150);
	
			triangle(-tsize, -tsize, -tsize, tsize, tsize, 0);
			//textSize(100*width/1920);
			textSize(30 * width / 1920);
	*/

	pop();

}




function funcQuestions(x, y, spectrogram,  index) {
	this.x = x;
	this.y = y;

}