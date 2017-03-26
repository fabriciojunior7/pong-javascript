var largura, altura;
var frames = 10;
var escala, hit;
var jogador1;
var comida;

var lose, mordida1, mordida2, mordida3, gongo1, gongo2, start, somAleatorio;
var happy1, happy2, happy3;

var rodadas = 0;
var perdeu;

function preload(){
	lose = loadSound("sons/lose.mp3");
	mordida1 = loadSound("sons/mordida1.mp3");
	mordida2 = loadSound("sons/mordida2.mp3");
	mordida3 = loadSound("sons/mordida3.mp3");
	start = loadSound("sons/start.mp3");
	happy1 = loadSound("sons/start.mp3");
	happy2 = happy1;
	happy3 = happy1;
}

function setup(){
	if(!(rodadas > 0)){
		somAleatorio = int(random(1, 4));
		if(somAleatorio == 1){happy1 = loadSound("sons/musicas/happy1.mp3", loaded);}
		else if(somAleatorio == 2){happy2 = loadSound("sons/musicas/happy2.mp3", loaded);}
		else if(somAleatorio == 3){happy3 = loadSound("sons/musicas/happy3.mp3", loaded);}
		else{happy3 = loadSound("sons/musicas/happy3.mp3", loaded);}
	}
	rodadas++;
	perdeu = false;
	//largura = windowWidth;
	//altura = windowHeight;
	largura = 300;
	altura = 300;
	escala = 10;
	tela = createCanvas(largura, altura);
	tela.position((windowWidth/2.0)-150, (windowHeight/2.0)-150);
	frameRate(frames);

	lose.setVolume(0.5);

	//Objetos
	jogador1 = new Cobra(150, 0, escala, escala, escala, [38, 40, 37, 39]);
	jogador1.udlr = [false, true, false, false];
	comida = new Comida(0, 0, escala, escala);
	comida.mover(largura, altura, [jogador1.x, jogador1.y], jogador1.calda);
}

function loaded(){
	if(somAleatorio == 1){
		happy1.setVolume(0.1);
		happy1.loop();
	}
	else if(somAleatorio == 2){
		happy2.setVolume(0.1);
		happy2.loop();
	}
	else if(somAleatorio == 3){
		happy3.setVolume(0.3);
		happy3.loop();
	}
	else{
		happy3.setVolume(0.3);
		happy3.loop();
	}
}

function draw(){
	background(0);
	grade();
	fill(255);
	textSize(8);
	text("Fabricio Junior", 5, 12);
	//Rodar
	hit = collideRectRect(jogador1.x+1, jogador1.y+1, jogador1.largura-2, jogador1.altura-2, comida.x, comida.y, comida.largura, comida.altura);
	if(hit == true){
		jogador1.comeu();
		comida.mover(largura, altura, [jogador1.x, jogador1.y], jogador1.calda);
		somAleatorio = int(random(1, 4));
		if(somAleatorio == 1){mordida1.play();}
		else if(somAleatorio == 2){mordida2.play();}
		else if(somAleatorio == 3){mordida3.play();}
	}
	jogador1.atualizarPosicao(largura, altura);
	//Desenhar
	comida.desenharComida();
	jogador1.desenharCobra();
	//print("X: " + jogador1.x + "| Y: " + jogador1.y);
	fill(0, 255, 0);
	textSize(12);
	//text(jogador1.calda.length, 5, 24);
	if(jogador1.calda.length <= 9){text(jogador1.calda.length, 285, 15);}
	else if(jogador1.calda.length > 9 && jogador1.calda.length <= 99){text(jogador1.calda.length, 280, 15);}
	else if(jogador1.calda.length > 99 && jogador1.calda.length <= 999){text(jogador1.calda.length, 275, 15);}
	else{text(jogador1.calda.length, 270, 15);}
	
}

function keyPressed(){
	jogador1.botaoPressionado(keyCode);
	if(keyCode == 32 && perdeu == true){
		setup();
		loop();
	}
}

function grade(){
	stroke(255);
	//Topo
	line(0, 0, largura, 0);
	//Base
	line(0, altura-1, largura-1, altura-1);
	//Esquerda
	line(0, 0, 0, altura-1);
	//Direita
	line(largura-1, 0, largura-1, altura-1);
	stroke(0);
}