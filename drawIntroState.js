var bbox;

function drawIntro() {
	noStroke();

	textSize(30*width/1920);
	//text("Espectogramas", width / 2, 20*width/1920);

	textSize(20*width/1920);
	//ellipse(width / 2, height / 2+40, 80,50);
	image(infoBlue, 0, 0, width, height);

	drawSpectra();

	
	noStroke();

	textAlign(CENTER, TOP);
	if (frogclicked) {
		image(infoImg[0], 0, 0, width, height);

		/*text("Los espectrogramas muestran los sonidos como una imagen. \n \n" +
			"Los sonidos de ALTA frecuencia se muestran en la parte superior. ↑\n" +
			"Los sonidos de BAJA frecuencia están en la parte inferior.  ↓\n" +
			"Las frecuencias ALTAS se muestran en diferentes colores. \n\n" +
			"Al hacer clic en la rana,\n ¿ves cómo crea un patrón único de frecuencias? \n\n" +

			"Ahora intenta cantar o silbar en tu micrófono.\n ¡Observa el patrón de frecuencias que vas creando!" , width / 2,  60*width/1920);


*/
		let rectCorners = 20;


		let rectwidth = 100;
		let rectheight = 60;

		fill(100, 200, 255, 150);

		//	rect(width/2-rectwidth,height-60-rectheight, rectwidth,rectheight,rectCorners);
		let textString = '¡Juega YA!';
		bbox = font.textBounds(textString, width / 2, height - 80*width/1920, 60*width/1920);

		stroke(250, 200, 200, 200);
		strokeWeight(3);
		colorMode(HSB);
		soundcolor = color(fft.getEnergy(100, 3000), 30 + fft.getEnergy(100, 3000), 200, .5);
		if (mouseX > bbox.x - 20 && mouseY > bbox.y && mouseX < bbox.x - 20 + bbox.w + 30 && mouseY < bbox.y + bbox.h + 20) {
			fill(100, 100);
			strokeWeight(8);
		} else {
			fill(soundcolor);
		}
		//rect(bbox.x - 20, bbox.y, bbox.w + 30, bbox.h + 20, rectCorners);
		//	fill(100,200,255,150);
		//							soundcolor = color( fft.getEnergy(100, 3000), 30 + fft.getEnergy(100, 3000), 200,.5);

		fill(0, 0, 0, .7);

		textSize(60*width/1920);
		strokeWeight(1);

		//text(textString, width / 2, height - 80*width/1920);

		colorMode(RGB);

	} else {
		/*text("En selvas densas con vegetación, los científicos no siempre pueden\n ver los animales que están buscando.  \n" +
			"En cambio, a menudo tienen que buscar a los animales por los sonidos que emiten. \n \n" +
			"Para hacer esto, usan una herramienta llamada espectrograma." , width / 2, 60*width/1920);
			*/
			image(infoImg[0], 0, 0, width, height);

	}

let tunwidth=300*width/1920;
	let tunheight=170*width/1920;
	
	if(sound.isPlaying()){
		push();
		translate(width/2, height/2);
		drawSpectrumCircleFrog();
		pop();
	}
	
	//image(tunfrogimg, width / 2 - tunwidth/2, height / 2 - tunheight/2, tunwidth, tunheight);
	image(infoFrog, 0, 0, width, height);

	if (mouseX > width / 2 - tunwidth/2 && mouseY > height / 2 - tunheight/2 && mouseX < width / 2 - tunwidth/2 +tunwidth && mouseY < height / 2 - tunheight/2+tunwidth) {
		push();
		tint(0,240, 0,100); // Tint blue and set transparency
	//	image(tunfrogimg, width / 2 - tunwidth/2, height / 2 - tunheight/2, tunwidth, tunheight);
	image(infoFrog, 0, 0, width, height);

	pop();
	}
			textSize(30*width/1920);

	if (!frogclicked) {
		//text(			"¡Haz clic en la rana Túngara para comenzar!", width/2, height/2+tunheight);
	} else{
			//	text(			"Cuando estés listo, haz clic a continuación \n para analizar qué tan bien puedes reconocer\n los espectrogramas de sonidos de animales. ", width/2, height/2+tunheight);

	}
	
}