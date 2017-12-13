var current_item = 0;
var total_item = 3;

function navigation(direction) {
	$("#" + current_item).removeClass("selected_btn");
	if (direction == "UP") {
		if (current_item == 1)
			current_item = total_item;
		else
			current_item--;

	} else if (direction == "DOWN") {
		if (current_item == total_item)
			current_item = 1;
		else
			current_item++;
	}
	$("#" + current_item).addClass("selected_btn");

};
$(document)
		.ready(
				function() {

					if (sessionStorage.getItem("alertQuiz") != 1) {
				
						sessionStorage.setItem("alertQuiz", 1);
					}
					$("#1").addClass("selected_btn");
					document.addEventListener('keydown', function(e) {
						switch (e.keyCode) {
						case 37: //LEFT arrow 	
							alert("USE UP AND DOWN BUTTONS ONLY");
							break;
						case TvKeyCode.KEY_UP: //UP arrow
							navigation("UP")
							break;
						case 39: //RIGHT arrow 		
							alert("USE LEFT AND RIGHT BUTTONS ONLY");
							break;
						case TvKeyCode.KEY_DOWN: //DOWN arrow
							navigation("DOWN");
							break;
						case 13: //OK button
							go_to(current_item);
							console.log("ENTER Button");
							break;
						case 10009: //Back button
							parent.location = "index.html";
							console.log("Back Button");
							break;
						default:
							console.log("Key code : " + e.keyCode);
							break;
						}
					});

					var questionNumber = 0;
					var questionBank = new Array();
					var stage = "#game1";
					var stage2 = new Object;
					var questionLock = false;
					var numberOfQuestions;
					var score = 0;
					var x;
					var current_level = sessionStorage.getItem("level");

					$
							.getJSON(
									'js/activity.json',
									function(data) {
										if (current_level == "btn_1") {
											for (i = 0; i < data.quizlist.length; i++) {
												questionBank[i] = new Array;
												questionBank[i][0] = data.quizlist[i].question;
												questionBank[i][1] = data.quizlist[i].option1;
												questionBank[i][2] = data.quizlist[i].option2;
												questionBank[i][3] = data.quizlist[i].option3;
											}
										} else if (current_level == "btn_2") {
											for (i = 0; i < data.quizlist.length; i++) {
												questionBank[i] = new Array;
												questionBank[i][0] = data.quizlist1[i].question;
												questionBank[i][1] = data.quizlist1[i].option1;
												questionBank[i][2] = data.quizlist1[i].option2;
												questionBank[i][3] = data.quizlist1[i].option3;
											}

										} else if (current_level == "btn_3") {
											for (i = 0; i < data.quizlist.length; i++) {
												questionBank[i] = new Array;
												questionBank[i][0] = data.quizlist2[i].question;
												questionBank[i][1] = data.quizlist2[i].option1;
												questionBank[i][2] = data.quizlist2[i].option2;
												questionBank[i][3] = data.quizlist2[i].option3;
											}

										} else if (current_level == "btn_4") {
											for (i = 0; i < data.quizlist.length; i++) {
												questionBank[i] = new Array;
												questionBank[i][0] = data.quizlist3[i].question;
												questionBank[i][1] = data.quizlist3[i].option1;
												questionBank[i][2] = data.quizlist3[i].option2;
												questionBank[i][3] = data.quizlist3[i].option3;
											}

										}
										numberOfQuestions = questionBank.length;
										displayQuestion();
									}) //getjson

					function displayQuestion() {

						current_item = 0;
						navigation("DOWN");
						var rnd = Math.random() * 3;
						rnd = Math.ceil(rnd);
						var q1, q2, q3;

						if (rnd == 1) {
							q1 = questionBank[questionNumber][1];
							q2 = questionBank[questionNumber][2];
							q3 = questionBank[questionNumber][3];
						}
						if (rnd == 2) {
							q2 = questionBank[questionNumber][1];
							q3 = questionBank[questionNumber][2];
							q1 = questionBank[questionNumber][3];
						}
						if (rnd == 3) {
							q3 = questionBank[questionNumber][1];
							q1 = questionBank[questionNumber][2];
							q2 = questionBank[questionNumber][3];
						}

						$(stage).append(
								'<div class="questionText">'
										+ questionBank[questionNumber][0]
										+ '</div><div id="1" class="option">'
										+ q1
										+ '</div><div id="2" class="option">'
										+ q2
										+ '</div><div id="3" class="option">'
										+ q3 + '</div>');
						x = rnd;
						console.log("X rnd= " + x);
					} //display question
					function go_to(current_item) {

						if (current_item == 4) {
							location.reload();
						}

						console.log("ID question= " + current_item);
						if (questionLock == false) {

							questionLock = true;
							//correct answer

							if (current_item == x) {
								$(stage).append(
										'<div class="feedback1">CORRECT</div>');
								score++;
							}
							//wrong answer	
							if (current_item != x) {
								$(stage).append(
										'<div class="feedback2">WRONG</div>');
							}
							setTimeout(function() {
								changeQuestion()

							}, 1000);
						}

					}
					function changeQuestion() {

						questionNumber++;

						if (stage == "#game1") {
							stage2 = "#game1";
							stage = "#game2";
						} else {
							stage2 = "#game2";
							stage = "#game1";
						}

						if (questionNumber < numberOfQuestions) {
							displayQuestion();

						} else {
							displayFinalSlide();
						}

						$(stage2).animate({
							"right" : "+=800px"
						}, "slow", function() {
							$(stage2).css('right', '-800px');
							$(stage2).empty();
						});
						$(stage).animate({
							"right" : "+=800px"
						}, "slow", function() {
							questionLock = false;
							$("#1").addClass("selected_btn");
						});

						// current_item=0;
					} //change question

					function displayFinalSlide() {
						var next;
						$(stage)
								.append(
										'<br><br><div class="finalSlide">You have finished the quiz!<br><br>Total questions: '
												+ numberOfQuestions
												+ '<br>Correct answers: '
												+ score + '</div>');
						switch (sessionStorage.getItem("level")) {
						case "btn_1":
							next = "btn_2";
							lev = "Level 2";
							break;
						case "btn_2":
							next = "btn_3";
							lev = "Level 3";
							break;
						case "btn_3":
							next = "btn_4";
							lev = "Level 4";
							break;
						case "btn_4":
							next = "btn_1";
							lev = "Level 1";
							break;

						}
						current_item = 4;
						sessionStorage.setItem("level", next);
						$(stage)
								.append(
										'<div class="main_btn" id="'
												+ next
												+ '"><label class="main_level" id="lev_1">'
												+ lev + '</label></div>');
						console.log("Current level: " + current_item);
					} //display final slide

				}); //doc ready