// Variaveis Imgs

let imgBackground;

let imgCat;
let imgCat2;
let imgCat3;
let imgCat4;
let imgCat5;
let imgCat6;
let imgCat7;
let imgCat8;
let imgCat9;
let imgCat10;

let cats;
let animals;

let imgOtheranimal;
let imgOtheranimal2;
let imgOtheranimal3;
let imgOtheranimal4;
let imgOtheranimal5;
let imgOtheranimal6;

// Variaveis Sounds
let soundBackground;
let soundHit;
let soundMiss;
let soundWinner;
let soundGameover;

// Preload Imgs & Sounds

function preload() {
    imgBackground = loadImage("assets/city.png");

    imgCat = loadImage("assets/gato-1.png");
    imgCat2 = loadImage("assets/gato-2.png");
    imgCat3 = loadImage("assets/gato-3.png");
    imgCat4 = loadImage("assets/gato-4.png");
    imgCat5 = loadImage("assets//gato-5.png");
    imgCat6 = loadImage("assets/gato-6.png");
    imgCat7 = loadImage("assets/gato-7.png");
    imgCat8 = loadImage("assets/gato-8.png");
    imgCat9 = loadImage("assets/gato-9.png");
    imgCat10 = loadImage("assets/gato-10.png");

    imgAnimal = loadImage("assets/other.png");
    imgAnimal2 = loadImage("assets/other-2.png");
    imgAnimal3 = loadImage("assets/other-3.png");
    imgAnimal4 = loadImage("assets/other-4.png");
    imgAnimal5 = loadImage("assets/other-5.png"); 
    imgAnimal6 = loadImage("assets/other-6.png");   

    cats = [imgCat, imgCat2, imgCat3, imgCat4, imgCat5, imgCat6, imgCat7, imgCat8, imgCat9, imgCat10];
    animals = [imgAnimal, imgAnimal2, imgAnimal3, imgAnimal4, imgAnimal5, imgAnimal6];

    soundBackground = loadSound("som/game-loop.mp3");
    soundHit = loadSound("som/hit.mp3");
    soundMiss = loadSound("som/miss.mp3");
    soundWinner = loadSound("som/winner.mp3");
    soundGameover = loadSound("som/gameover.mp3");
}

// Sketch

var screen = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {

  // Display the before screen
	if (screen == 0) {

		background(34,212,253);
		fill('white');
		textAlign(CENTER);
    textFont('Courier New', 30);
		text('🐱 WELCOME TO CATCH THE CAT 🐱', width / 2, height / 2);
    textFont('Courier New', 20);
    fill(51);
    textStyle(BOLD);
		text('click to start the game', width / 2, height / 2 + 20);
    cursor('grab');
  
  // If the screen variable was changed to 1, display the game screen
	} else if (screen == 1) {

    background(imgBackground);

    showCats();
    showAnimals();

    cursor('grab');
    
    verifyHit();
    verifyMiss();

    missBlock();

    sucess();
  
    addScoreBoard();
  
    timerCountDown();
		
	// If the screen variable was changed to 2, show the game over screen	
	} else if (screen == 2) {
		
		background(34,212,253)
		textAlign(CENTER);

    fill('white');
    textFont('Courier New',50);
    textStyle(BOLD);
    text('❌',width/2,height/3);

    fill('red');
    strokeWeight(0);
    rect(150, 273, 300, 50, 10);
    
    fill('white');
    textFont('Courier New',35);
    textStyle(BOLD);
    text('GAME OVER! 😵',width/2,height/2);

    fill('white');
    strokeWeight(0);
    rect(110, 373, 375, 50, 10);

    fill('red');
    textFont('Courier New',20);
    text("Please, click to try again.",width/2,height/1.5);

  // If the screen variable was changed to 3, show the winner screen	
  } else if (screen == 3) {
      
    background(34,212,253)
    textAlign(CENTER);

    fill('white');
    textFont('Courier New',50);
    textStyle(BOLD);
    text('🏆',width/2,height/3.5);

    fill('green');
    strokeWeight(0);
    rect(150, 225, 290, 50, 10);
    
    fill('white');
    textFont('Courier New',35);
    textStyle(BOLD);
    text('YOU WON! 🥳',width/2,height/2.4);

    fill('white');
    strokeWeight(0);
    rect(50, 324, 500, 50, 10);

    fill('green');
    textFont('Courier New',20);
    text("Congratulations! You found all the cats.",width/2,height/1.7);

    fill('white');
    textFont('Courier New',18);
    text("You might like rescuing a kitten in real life. ❤️",width/2,height/1.4);
  }
}

function mousePressed() {
	if (screen == 0) {
		screen = 1;
    soundBackground.loop();
	}else if (screen == 2) {
		screen = 0;
    timer = 60;
	}
}

// Cats & Animals

let yCats = [130, 365, 300, 250, 120, 541, 445, 280, 80, 280];
let xCats = [-1, 20, 520, 154, 498, 341, 513, 430, 230, 308];

let yAnimals = [30, 445, 425, 70, 210];
let xAnimals = [370, 362, 125, 545, 230];

function showCats() {
    for (i = 0; i < cats.length; i++) { 
    image(cats[i], xCats[i], yCats[i], 17, 17);
    }
}

function showAnimals() {
    for (i = 0; i < animals.length; i++) { 
    image(animals[i], xAnimals[i], yAnimals[i], 17, 17);
    }
}

// Hit & Miss

let hit = false;
let miss = false;
let discountMade = false;

let points = 0;

let speed = 1;

function verifyHit() {
  for (let i = 0; i < cats.length; i++) {
    hit = collidePointRect(mouseX, mouseY, xCats[i], yCats[i], 17, 17);
    if(mouseIsPressed === true) {
      if (hit) {
        console.log("Good job! You saved a lost cat!");
        points++;
        soundHit.play(); 
        xCats[i] = 670;
      }
    }
  }
}

function missBlock() {
  if(mouseIsPressed === false) {
    discountMade = false;
  }  
}

function verifyMiss() {
  for (let i = 0; i < animals.length; i++) {
    miss = collidePointRect(mouseX, mouseY, xAnimals[i], yAnimals[i], 17, 17);
    if(mouseIsPressed === true && !discountMade) {
      if (miss) {
        discountMade = true;
        console.log("Sorry! This is a dog, not a lost cat.");
        soundMiss.play();
        xAnimals[i] += random(-speed, speed);
        yAnimals[i] += random(-speed, speed);
          if (points > 0){
            points--; 
          }
        }
    } 
  }
}

// Add Score

function addScoreBoard() {
  fill(51);
  strokeWeight(3);
  rect(280, 10, 70, 38, 10);
  textSize(25);
  text('⭐', 300, 31);
  fill('white');
  textFont('Courier New', 20);
  textAlign(CENTER);
  text(points, 330, 31);
}

// Add Timer CountDown

let timer = 60;

function timerCountDown() { 
  fill(30);
  strokeWeight(3);
  rect(520, 550, 70, 35, 10);
  textSize(25);
  text('⏳', 538, 570);

  fill('palegreen');
  textFont('Courier New',25);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(timer, 568, 568);

  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }

  if (timer === 0) {
    screen = 2;
    soundBackground.pause();
    soundGameover.play();
  }
}

// Winner

function sucess() {

  function checkCatsFound(xCats) {
    return xCats === 670;
  }

  if (xCats.every(checkCatsFound) === true){
    screen = 3;
    soundBackground.pause();
    soundWinner.play();
  }
}


/* O que eu preciso fazer?

DONE - Preload as imagens:  do fundo e dos assets (gatos e outros animais).
DONE - Criar variavel para cada asset - contando sons.
DONE - Posicionar cada asset na imagem. 
DONE - Criar uma função para verificar hit com clique no asset, seguindo a condição: 
DONE - se for um gato, contar um ponto e tocar música de sucesso;
DONE - se for outro animal,  perde um ponto e toca música de fracasso;
DONE - Criar um placar com visual que mostre os pontos.
DONE - Criar um temporizador decrecente a partir de 60 segundos.
DONE - Fazer a pontução aumentar uma vez apenas por hit. E diminuir apenas um por miss.
DONE - Mudar o ponteiro para uma imagem de mao pegando os animais.
DONE - Fazer o gato desaparecer quando acontecer o hit. 
DONE - Fazer o cachorro tremer, como um erro, quando tentar grab ele. 
DONE - Se temporizador terminar e todos os gatos não foram encontrados, aparecer mensagem "GAME OVER" com música; 
DONE - Mudar as funções de verify hit e miss para reconhecer no click e não collide.
DONE - Diminuir apenas 1 ponto por click no cachorro. 

Criar 4 telas distintas para fazer a divisão dos elementos do jogo: 
DONE - uma pre-game, 
DONE - uma onde vai rodar o jogo 
DONE - uma para game over.
DONE - uma para game sucesso.

Criar uma função com condição para alternar entre as 4 telas do jogo:
DONE - quando a pessoa apertar o mouse na tela pre-game, mudar para tela do jogo.
DONE - quando o tempo chegar em 0, mudar para tela game over com música.
DONE - quando a pessoa clicar na tela game over, mudar para tela inicial pre-game. Para isso, precisamor reset o temporizador toda vez que o jogo restart.

DONE - Criar uma condicional SE todos os objetos dentro do array "cats" estiverem com "xCats = 670" mudar para tela sucesso com música.

*/


