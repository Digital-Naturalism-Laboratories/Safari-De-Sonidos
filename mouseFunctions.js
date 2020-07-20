	function mouseClicked() {

		if (state == STATES.STARTSCREEN) {
			//if (mouseX > width / 2 - 40 && mouseY > height / 2 - 40 - 25 && mouseY < height / 2 + 40 + 25) {
						if (mouseX < width *3/ 4 &&mouseX > width / 4 && mouseY > height / 2 - 100 && mouseY < height / 2 + 300) { //make it bigger since we just want people to click

				setState(STATES.INTRO);

			}
			textSize(30);
			text("Sound Safari", width / 2, height / 2 - 40);

			textSize(20);
			ellipse(width / 2, height / 2 + 40, 80, 50);
		}

		else if (state == STATES.QUIZ) {

			//If we are clicking the play button
			if (dist(mouseX, mouseY, eX, eY) < playWidth / 2) {
				secretSound.play();
			}

			if (enableNextRound == true) {

			if (mouseX > -playWidth / 2 + eX && mouseX < -playWidth / 2 + eX + playWidth && mouseY > eY + playWidth / 2 + 120*width/1920 && mouseY < eY + playWidth / 2 + 120*width/1920 + 80*width/1920) {

					enableNextRound = false;
					currentRound++;

					//Play the game over
					if (currentRound > quizRounds - 1) {
						currentRound = 0;
						previousAnswers = [];
						score = 0;
						reloadQs();

					}
					chooseQuestions();
				}

			}


			//if we are clicking one of the three quiz questions

			//Q0
			if (mouseX > width - qwidth - imgwidth && mouseY > 0 && mouseY < height / 3) {
				chosen3[0].sound.play();
				chosen3[0].clicked = true;
				enableNextRound = true;
				if (chosen3[0].correct) {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 1; //and they won the round!
					}
					//print("Correct Choice!");
				} else {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 0; //and they LOST the round!
					}
					//print("Wrong!");
				}
			}

			//Q1
			if (mouseX > width - qwidth - imgwidth && mouseY > height / 3 && mouseY < height * 2 / 3) {
				chosen3[1].sound.play();
				chosen3[1].clicked = true;
				enableNextRound = true;

				if (chosen3[1].correct) {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 1; //and they won the round!
					}
					//print("Correct Choice!");
				} else {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 0; //and they LOST the round!
					}
					//print("Wrong!");
				}
			}

			//Q2
			if (mouseX > width - qwidth - imgwidth && mouseY > height * 2 / 3 && mouseY < height) {
				chosen3[2].sound.play();
				chosen3[2].clicked = true;
				enableNextRound = true;

				if (chosen3[2].correct) {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 1; //and they won the round!
					}
					//print("Correct Choice!");
				} else {
					if (Rounds[currentRound] == -1) { //then this was the first Q they clicked
						Rounds[currentRound] = 0; //and they LOST the round!
					}
					//print("Wrong!");
				}
			}

		}


	else	if (state == STATES.INTRO) {

		let tunwidth=300*width/1920;
	let tunheight=170*width/1920;
	if (mouseX > width / 2 - tunwidth/2 && mouseY > height / 2 - tunheight/2 && mouseX < width / 2 - tunwidth/2 +tunwidth && mouseY < height / 2 - tunheight/2+tunwidth) {

				sound.play();
					frogclicked=true;
			}
		if(mouseX>bbox.x-20&&mouseY>bbox.y&&mouseX<bbox.x-20+bbox.w+30&&mouseY<bbox.y+bbox.h+20){
						setState(STATES.QUIZ);
sound.stop();
		}

	

		}
	}