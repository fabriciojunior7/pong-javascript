var largura, altura;
var frames = 15;
var escala, hit;
var jogador1;
var comida;
var colisaoJ1, colisaoJ2;
var j1TextoX, j1TextoY, j2TextoX, j2TextoY, empateX, empateY; 
var j1colidiu, j2colidiu, jogoEmpatado;

var lose, mordida1, mordida2, mordida3, gongo1, gongo2, start, somAleatorio;
var epic1, epic2, epic3;

var rodadas = 0;

function preload(){
	lose = loadSound("sons/lose-mult.mp3");
	mordida_mult = loadSound("sons/mordida-mult.mp3");
	gongo1 = loadSound("sons/gongo1.mp3");
	gongo2 = loadSound("sons/gongo2.mp3");
	start = loadSound("sons/start-mult.mp3");
	epic1 = loadSound("sons/start.mp3");
	epic2 = epic1;
	epic3 = epic1;
}

function setup(){
	if(!(rodadas > 0)){
		somAleatorio = int(random(1, 4));
		if(somAleatorio == 1){epic1 = loadSound("sons/musicas/epic1.mp3", loaded);}
		else if(somAleatorio == 2){epic2 = loadSound("sons/musicas/epic2.mp3", loaded);}
		else if(somAleatorio == 3){epic3 = loadSound("sons/musicas/epic3.mp3", loaded);}
		else{epic3 = loadSound("sons/musicas/epic3.mp3", loaded);}
	}
	rodadas++;
	//largura = windowWidth;
	//altura = windowHeight;
	largura = 600;
	altura = 600;
	escala = 10;

	lose.setVolume(0.6);
	gongo1.setVolume(0.8);
	gongo2.setVolume(0.8);
	start.setVolume(0.3);

	j1TextoX = -100;
	j1TextoY = -100;
	j2TextoX = -100;
	j2TextoY = -100;
	empateX = -100;
	empateY = -100;
	j1colidiu = false;
	j2colidiu = false;
	jogoEmpatado = false;

	tela = createCanvas(largura, altura);
	tela.position((windowWidth/2.0)-300, (windowHeight/2.0)-300);
	frameRate(frames);

	//Objetos
	jogador1 = new Cobra(300, 0, escala, escala, escala, [38, 40, 37, 39], 255, 0, 0, 1);
	jogador1.udlr = [false, true, false, false];
	jogador2 = new Cobra(300, 590, escala, escala, escala, [87, 83, 65, 68], 0, 255, 0, 2);
	jogador2.udlr = [true, false, false, false];

	comida = new Comida(0, 0, escala, escala);
	comida.mover(largura, altura, jogador1.calda, jogador2.calda);
}

function loaded(){
	if(somAleatorio == 1){
		epic1.setVolume(0.3);
		epic1.loop();
	}
	else if(somAleatorio == 2){
		epic2.setVolume(0.3);
		epic2.loop();
	}
	else if(somAleatorio == 3){
		epic3.setVolume(0.3);
		epic3.loop();
	}
	else{
		epic3.setVolume(0.3);
		epic3.loop();
	}
}

function draw(){
	background(0);
	grade();
	fill(255);
	textSize(10);
	text("Fabricio Junior", 5, 12);
	//Rodar
	//Colisao Comida
	hit1 = collideRectRect(jogador1.x+1, jogador1.y+1, jogador1.largura-2, jogador1.altura-2, comida.x, comida.y, comida.largura, comida.altura);
	hit2 = collideRectRect(jogador2.x+1, jogador2.y+1, jogador2.largura-2, jogador2.altura-2, comida.x, comida.y, comida.largura, comida.altura);
	if(hit1 == true){
		jogador1.comeu();
		comida.mover(largura, altura, jogador1.calda, jogador2.calda);
		mordida_mult.play();

	}
	else if(hit2 == true){
		jogador2.comeu();
		comida.mover(largura, altura, jogador1.calda, jogador2.calda);
		somAleatorio = int(random(1, 4));
		mordida_mult.play();
	}

	if(jogador1.x == jogador2.x && jogador1.y == jogador2.y){empate();}


	//Colisao entre Jogadores
	for(var i=0; i<jogador2.calda.length; i++){
		colisaoJ1 = collideRectRect(jogador1.x+1, jogador1.y+1, jogador1.largura-2, jogador1.altura-2, jogador2.calda[i][0], jogador2.calda[i][1], comida.largura, comida.altura);
		if(colisaoJ1 == true){
			j1colidiu = true;
			break;
		}
	}

	for(var i=0; i<jogador1.calda.length; i++){
		colisaoJ2 = collideRectRect(jogador2.x+1, jogador2.y+1, jogador2.largura-2, jogador2.altura-2, jogador1.calda[i][0], jogador1.calda[i][1], comida.largura, comida.altura);
		if(colisaoJ2 == true){
			j2colidiu = true;
			break;
		}
	}

	if(j1colidiu == true && j2colidiu == true){jogoEmpatado = true; empate();}
	else if(j2colidiu == true){j1Venceu();}
	else if(j1colidiu == true){j2Venceu();}

	j1colidiu = jogador1.atualizarPosicao(largura, altura);
	j2colidiu = jogador2.atualizarPosicao(largura, altura);

	if(j1colidiu == true && j2colidiu == true){jogoEmpatado = true; empate();}
	else if(j2colidiu == true){j1Venceu();}
	else if(j1colidiu == true){j2Venceu();}
	//Desenhar
	comida.desenharComida(frames, largura, altura, jogador1.calda, jogador2.calda);
	jogador1.desenharCobra();
	jogador2.desenharCobra();

	fill(255, 0, 0);
	textSize(12);
	if(jogador1.calda.length <= 9){text(jogador1.calda.length, 585, 15);}
	else if(jogador1.calda.length > 9 && jogador1.calda.length <= 99){text(jogador1.calda.length, 580, 15);}
	else if(jogador1.calda.length > 99 && jogador1.calda.length <= 999){text(jogador1.calda.length, 575, 15);}
	else{text(jogador1.calda.length, 570, 15);}
	fill(0, 255, 0);
	textSize(12);

	if(jogador2.calda.length <= 9){text(jogador2.calda.length, 585, 25);}
	else if(jogador2.calda.length > 9 && jogador2.calda.length <= 99){text(jogador2.calda.length, 580, 25);}
	else if(jogador2.calda.length > 99 && jogador2.calda.length <= 999){text(jogador2.calda.length, 575, 25);}
	else{text(jogador2.calda.length, 570, 25);}

	textSize(40);
	fill(255, 0, 0);
	text("Vermelho Venceu!", j1TextoX, j1TextoY);
	fill(0, 255, 0);
	text("Verde Venceu!", j2TextoX, j2TextoY);
	fill(255, 255, 255);
	text("Empate!", empateX, empateY);
	
}

function keyPressed(){
	jogador1.botaoPressionado(keyCode);
	jogador2.botaoPressionado(keyCode);
	print(j1colidiu);
	print(j2colidiu);
	if((keyCode == 32) && ((j1colidiu == true || j2colidiu == true) || (jogoEmpatado == true))){
		print("Dentro");
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

function j1Venceu(){
	j1TextoX = 140;
	j1TextoY = 200;
	lose.play();
	noLoop();
}

function j2Venceu(){
	j2TextoX = 175;
	j2TextoY = 200;
	lose.play();
	noLoop();
}

function empate(){
	empateX = 235;
	empateY = 200;
	j1TextoY = -200;
	j2TextoY = -200;
	somAleatorio = int(random(1, 3));
	if(somAleatorio == 1){gongo1.play();}
	else if(somAleatorio == 2){gongo2.play();}
	jogoEmpatado = true;
	noLoop();
}