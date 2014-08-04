var colors5 = ['tiger', 'snake', 'bear', 'shark', 'elephant'];
var colors4 = ['tiger', 'snake', 'bear', 'elephant']
var colors3 = ['tiger', 'snake', 'bear']
var tiger = ["Tiger", 'rgba(1, 0, 0, 0)']
var bear = ["Bear", 'rgba(2, 0, 0, 0)']
var snake = ["Snake", 'rgba(3, 0, 0, 0)']
var elephant = ["Elephant", 'rgba(4, 0, 0, 0)']
var shark = ["Shark", 'rgba(5, 0, 0, 0)']
var none = 'none'
var levelNumber = 0

var levels = {
	moves: [15, 15, 15, 20, 15, 15, 25, 20, 20],
	times: [1, 30, 20, 1, 1, 30, 1, 1, 30],
	endOn1: [none, none, none, none, none, none, none, none, none],
	endOn2: [none, none, none, none, none, none, none, none, none],
	option: [colors3, colors3, colors3, colors4, colors4, colors4, colors5, colors5, colors5]
}
var i, north, east, south, west, counter, colors, moveRem, resetMove, tick, moveStart, startTime, fill, fillBG, connectCount, levelOn
colors = levels.option[levelNumber];
moveStart = levels.moves[levelNumber];
startTime = levels.times[levelNumber];
fill = levels.endOn1[levelNumber];
fillBG = levels.endOn2[levelNumber];
connectCount = 0
moveRem = moveStart -1
resetMove = moveStart
tick=startTime;

if(fill == none){
	$('.endBanner').css('display', 'none');
}else{
	$('.endChar').html(fill);
}
if(tick == 1){
	$('.timeBanner').css('display', 'none');
}else{
	$('.timer, .timeNumber').html(startTime);
}
$('.title').html(moveStart);
for (i=1; i<101; i++){
	var rand = colors[Math.floor(Math.random() * colors.length)];	
	$("." + i).addClass(rand);
}
$('.option').hide();
var startColor = $(".1").css("background-color");
// function clickCounter(){
// 	if(typeof(Storage)!=="undefined"){
// 		// if(! localStorage.getItem('level') == 0){
// 		// 	levelNumber = localStorage.getItem('level')
// 		// }else{
// 		// 	localStorage.setItem('level', 0);
// 		// }
// 		localStorage.setItem('level', levelNumber);
// 		console.log(localStorage.getItem("level"))
// 	}
// 	else{
// 		console.log('no memory support')
// 	}
// }
function choice(){
	for(l=1;l<10;l++){
		for(j=1; j<101; j++){
			if($("." + j).hasClass("connect")){
				if(j >= 1 && j <= 90){
					south = (j+10);
					if($('.' + south).css("background-color") === startColor){
						$("." + south).addClass('connect');
					}
				};
				if(j >= 1 && j <= 99){
					if(!(j==20 || j==30 || j==40 || j==50 || j==60 || j==70 || j==80 || j==90)){
						east = (j+1);
						if($('.' + east).css("background-color") === startColor){
							$("." + east).addClass('connect');
						}
					};
				};
				if(j >= 10 && j <= 100){			
					north = (j-10);
					if($('.' + north).css("background-color") === startColor){
						$("." + north).addClass('connect');
					}
				};
				if(j >= 2 && j <= 100){
					if(!(j==11 || j==21 || j==31 || j==41 || j==51 || j==61 || j==71 || j==81 || j==91)){
						west = (j-1);
						if($('.' + west).css("background-color") === startColor){
							$("." + west).addClass('connect');
						}
					};
				};
			};
		};
	};
};
function resetGame(){
	$('.option').show();
	$(".connect").css('background-color', 'none');
	for (i=1; i<101; i++){
		$("." + i).removeClass('tiger');
		$("." + i).removeClass('bear');
		$("." + i).removeClass('snake');
		$("." + i).removeClass('elephant');
		$("." + i).removeClass('shark');
		$("." + i).removeClass('connect');
		$(".1").addClass('connect');
		rand = colors[Math.floor(Math.random() * colors.length)];	
		$("." + i).addClass(rand);
	}
	startColor = $(".1").css("background-color");
	$('.title').html(moveStart);
	choice();
	moveRem = resetMove -1
	clearInterval(counter);
	$('.timer').html(startTime);
	tick=startTime;
	$('.colorPicker').addClass('gameOn');
	connectCount = 0;
	$('.colorPicker').removeClass('loss');
	if(! $('.back').hasClass("backHit")){
		startGame();
	}
	$('.back').removeClass('backHit');
	if(levels.option[levelNumber] === colors3){
		$('.option4').hide();
		$('.option5').hide();
		$('.option1').addClass('char3');
		$('.option1').removeClass('char');
		$('.option1').removeClass('char4');
	}else if(levels.option[levelNumber] === colors4){
		$('.option4').show();
		$('.option5').hide();
		$('.option1').addClass('char4');
		$('.option1').removeClass('char');
		$('.option1').removeClass('char3');
	}else{
		$('.option4').show();
		$('.option5').show();
		$('.option1').addClass('char');
		$('.option1').removeClass('char4');
		$('.option1').removeClass('char3');
	}

}
function count (){
	connectCount = 0
	for(k=1;k<101;k++){
		if($('.' + k).hasClass('connect')){
			connectCount++
		}
	}
	if(connectCount == 100){
		if(fill == none){
			win();
		}else{
			if($('.1').css('background-color') === fillBG){
				win();
				console.log(fillBG)
			}else{
				loss();
			}
		}
	}
}
function startGame(){
	if($('.colorPicker').hasClass('gameOn')){
		if(tick > 1){
		counter=setInterval(timer, 1000); //1000 will  run it every 1 second
		function timer(){
			console.log(tick)
			tick=tick-1;
			if (tick == 0){
				loss();
			}
			$('.timer').html(tick);
		}
		}
		}else{
			$('.colorPicker').removeClass('gameOn');	
		}
	}
function win(){
	$('.option').hide();
	$('.gameInfoBlackScreen, .winScreen').show();
	clearInterval(counter);
	levelNumber = levelNumber +1
	$('.levelNumber').html(levelNumber + 1);
	colors = levels.option[levelNumber];
	moveStart = levels.moves[levelNumber];
	startTime = levels.times[levelNumber];
	fill = levels.endOn1[levelNumber];
	fillBG = levels.endOn2[levelNumber];
	$('.movesNumber').html(moveStart);
	resetMove = moveStart
	moveRem = resetMove -1
	tick = startTime
	if(fill == none){
		$('.endBanner').css('display', 'none');
	}else{
		$('.endChar').html(fill);
	}
	if(tick == 1){
		$('.timeBanner').css('display', 'none');
	}else{
		$('.timer, .timeNumber').html(startTime);
		$('.timeBanner').css('display', 'block');
	}
}
function loss(){
	$('.option').hide();
	$('.gameInfoBlackScreen, .loseScreen').show();
	$('.timer').html(tick);  	
	clearInterval(counter);
	moveRem = moveStart -1;	
	$('.colorPicker').addClass('loss');
	
}
$(window).load(choice);
$('.option1').on('tap', function(){	
	if(connectCount < 100 && moveRem > -1 && tick > 0){
		$(".connect").addClass('tiger');
		$(".connect").removeClass('bear');
		$(".connect").removeClass('snake');
		$(".connect").removeClass('elephant');
		$(".connect").removeClass('shark');
		startColor = 'rgba(1, 0, 0, 0)';
		$('.option2').removeClass('active');
		$('.option3').removeClass('active');
		$('.option4').removeClass('active');
		$('.option5').removeClass('active');
		if(!$(this).hasClass('active')){
			choice();
			$('.title').html(moveRem--);
			if(moveRem == 0){
				loss();
			}
			$(this).addClass('active');
			count();
		}
	}else if (connectCount == 100){
		win();
	}else{
		loss();
	}
});
$('.option2').on('tap', function(){
	if(connectCount < 100 && moveRem > 0 && tick > 0){
		$(".connect").removeClass('tiger');
		$(".connect").addClass('bear');
		$(".connect").removeClass('snake');
		$(".connect").removeClass('elephant');
		$(".connect").removeClass('shark');
		startColor = 'rgba(2, 0, 0, 0)';
		$('.option1').removeClass('active');
		$('.option3').removeClass('active');
		$('.option4').removeClass('active');
		$('.option5').removeClass('active');
		if(!$(this).hasClass('active')){
			choice();
			$('.title').html(moveRem--);
			$(this).addClass('active');
			count();
		}
	}else if (connectCount == 100){
		win();
	}else{
		loss();
	}
});
$('.option3').on('tap', function(){
	if(connectCount < 100 && moveRem > 0 && tick > 0){
		$(".connect").removeClass('tiger');
		$(".connect").removeClass('bear');
		$(".connect").addClass('snake');
		$(".connect").removeClass('elephant');
		$(".connect").removeClass('shark');
		startColor = 'rgba(3, 0, 0, 0)';
		$('.option2').removeClass('active');
		$('.option1').removeClass('active');
		$('.option4').removeClass('active');
		$('.option5').removeClass('active');
		if(!$(this).hasClass('active')){
			choice();
			$('.title').html(moveRem--);
			$(this).addClass('active');
			count();
		}
	}else if (connectCount == 100){
		win();
	}else{
		loss();
	}
});
$('.option4').on('tap', function(){
	if(connectCount < 100 && moveRem > 0 && tick > 0){
		$(".connect").removeClass('tiger');
		$(".connect").removeClass('bear');
		$(".connect").removeClass('snake');
		$(".connect").addClass('elephant');
		$(".connect").removeClass('shark');
		startColor = 'rgba(4, 0, 0, 0)';
		$('.option2').removeClass('active');
		$('.option3').removeClass('active');
		$('.option1').removeClass('active');
		$('.option5').removeClass('active');
		if(!$(this).hasClass('active')){
			choice();
			$('.title').html(moveRem--);
			$(this).addClass('active');
			count();
		}
	}else if (connectCount == 100){
		win();
	}else{
		loss();
	}
});
$('.option5').on('tap', function(){
	if(connectCount < 100 && moveRem > 0 && tick > 0){
		$(".connect").removeClass('tiger');
		$(".connect").removeClass('bear');
		$(".connect").removeClass('snake');
		$(".connect").removeClass('elephant');
		$(".connect").addClass('shark');
		startColor = 'rgba(5, 0, 0, 0)';
		$('.option2').removeClass('active');
		$('.option3').removeClass('active');
		$('.option4').removeClass('active');
		$('.option1').removeClass('active');
		if(!$(this).hasClass('active')){
			choice();
			$('.title').html(moveRem--);
			$(this).addClass('active');
			count();
		}
	}else if (connectCount == 100){
		win();
	}else{
		loss();
	}
});
$('.playButton').on('tap', startGame);
$('.back').on('tap', function(){
	clearInterval(counter);
	$('.colorPicker').addClass('gameOn');
	$(this).addClass("backHit");
	resetGame();
	$('.option').hide();
});
$('.winMenu').on('tap', function(){
	$('.winScreen').hide();
})
$('.reset').on('tap', function(){
	clearInterval(counter);
	$('.colorPicker').addClass('gameOn');
	$(this).addClass("backHit");
	resetGame();
});
$('.playHotSpot').on('tap', function(){
	$('.gameInfoScreen, .gameInfoBlackScreen').show();
})
$('.playButton').on('tap', function(){
	$('.gameInfoScreen, .gameInfoBlackScreen').fadeOut();
	resetGame();
});
$('.nextButton').on('tap', function(){
	$('.winScreen').hide();
	$('.gameInfoScreen').show();
	
});
$('.levelNumber').html(levelNumber + 1);
$('.movesNumber').html(moveStart);
