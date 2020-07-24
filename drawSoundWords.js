var font;
var vehicles = [];

var texts = ['Safari de Sonidos'];
var nextT = 0;
var maxChangeForce = 20;

var instructions = [];
var insText = 'Cliiiiiiiiick :)';

const fontFile = "fonts/Bogle-Black.otf";
var soundcolor;

function drawSoundsAsWords() {

colorMode(HSB);
		var bounds = font.textBounds(texts[nextT], 0, 0, introTextTitleSize);
	var posx = width / 2;// - bounds.w / 2;
	var posy = height / 2;// + bounds.h / 2;

textSize(introTextTitleSize);
	for (var i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		let topfreq= (spectrum.length-2)/10; //10 gets across SOUND SAFARI well
				let spectrachooser = map(i, 0,vehicles.length-2,0,topfreq);
spectrachooser = parseInt(constrain(spectrachooser,0,topfreq));
		v.behaviors( spectrum[spectrachooser] *4 / 255); //
		v.update();
		
		let thecolor = color(255 - spectrum[spectrachooser], 30 +spectrum[spectrachooser], 100);
		v.show(thecolor);
	}
	
				soundcolor = color( fft.getEnergy(100, 3000), 30 + fft.getEnergy(100, 3000), 200,.5);
//fill(220,255,100);
	noStroke();
	fill(soundcolor);
		text(texts[nextT], width/2+width/240,height/2+width/240); //need to shift by the size of the dots (default is 8)

	colorMode(RGB);
	stroke(soundcolor);
	
}

function setupSoundWords() {
soundcolor =color(255,255,0);
	introTextTitleSize=220*width/1920; //smaller for spanish
textFont(font);
	var bounds = font.textBounds(texts[nextT], 0, 0, introTextTitleSize);
	var posx = width / 2 - bounds.w / 2;
	var posy = height / 2 + bounds.h / 2;

	var points = font.textToPoints(texts[nextT], posx, posy, introTextTitleSize, {
		sampleFactor: 0.1
	});

vehicles = [];
	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);
		vehicles.push(vehicle);
	}

	var boundsIns = font.textBounds(insText, 0, 0, 30);
	var posxIns = width / 2 - boundsIns.w / 2;
	var posyIns = height / 6 + boundsIns.h / 2;

	var insAr = split(insText, ' ');

	for (var i = 0; i < insAr.length; i++) {
		var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
		var posx2 = posxIns;
		var posy2 = posyIns;

		posxIns += bounds2.w + 10;

		var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
			sampleFactor: 0.1
		});

		for (var j = 0; j < points2.length; j++) {
			var pt = points2[j];
			var v = new Vehicle(pt.x, pt.y, 3);
			instructions.push(v);
		}
	}

}