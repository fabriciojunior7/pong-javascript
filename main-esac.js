var frames;
var largura;
var altura;
var tela;
var logo;
var score1;
var score2;
var pontosMeta;

var iniciar;
var start;
var hit;
var aplausos;
var errou, peido1, peido2, peido3, peido4, se_vc_chegar, hector, ta_fedendo, pode_nao, adonai;
var mercin2, prazer, pato, neuma, jorge_roberto;
var somAleatorio;

function preload(){
	iniciar = loadSound("sons/iniciar.mp3");
	start = loadSound("sons/start.mp3");
	hit = loadSound("sons/hit.mp3");
	errou = loadSound("sons/errou.mp3");
	peido1 = loadSound("sons/peido1.mp3");
	peido2 = loadSound("sons/peido2.mp3");
	peido3 = loadSound("sons/peido3.mp3");
	peido4 = loadSound("sons/peido4.mp3");
	se_vc_chegar = loadSound("sons/se-vc-chegar.mp3");
	hector = loadSound("sons/hector.mp3");
	ta_fedendo = loadSound("sons/ta-fedendo.mp3");
	pode_nao = loadSound("sons/pode-nao.mp3");
	adonai = loadSound("sons/adonai.mp3");
	aplausos = loadSound("sons/aplausos.mp3");
	mercin2 = loadSound("sons/mercin2.mp3");
	prazer = loadSound("sons/prazer.mp3");
	pato = loadSound("sons/pato.mp3");
	neuma = loadSound("sons/neuma.mp3");
	jorge_roberto = loadSound("sons/jorge-roberto.mp3");
	bater_ponto = loadSound("sons/bater-ponto.mp3");
}

function setup(){
	largura = windowWidth;
	altura = windowHeight;
	tela = createCanvas(largura, altura);

	somAleatorio = int(random(1, 3));
	if(somAleatorio == 1){
		iniciar.play();
	}
	else if(somAleatorio == 2){
		prazer.play();
	}

	jogador1 = new Jogador(40, (altura/2 - 35), 20, 70, "W", "S", 0, 255, 0);
	jogador2 = new Jogador((largura - 60), (altura/2 - 35), 20, 70, "&", "(", 255, 0, 0);
	bola = new Bola((largura/2 - 5), (altura/2 - 5), 10, 10, 20);
	frames = 60;
	score1Y = 40;
	score2Y = 40;
	pontosMeta = 5;
}

function draw(){
	frameRate(frames);
	background(0, 0, 0);
	fill(255);
	textSize(10);
	logo = text("Fabricio Junior", 5, 15);
	textSize(38);
	stroke(255, 255, 255);
	line(largura/2, 0, largura/2, altura);
	//Atualizar Posicoes
	jogador1.atualizarPosicao();
	jogador2.atualizarPosicao();
	bola.atualizarPosicao(altura);
	if(bola.x < 0){
		jogador2.score++;
		bola.movimentar = false;
		bola.x = largura/2 - 5;
		bola.y = altura/2 - 5;
		bola.velocidadeX = bola.velocidadeXInicial;
		bola.velocidadeY = 0;
		if(jogador2.score >= pontosMeta){
			fim(2);
		}
		else{
			perdeuSom();
		}
	}
	else if(bola.x > largura){
		jogador1.score++;
		bola.movimentar = false;
		bola.x = largura/2 - 5;
		bola.y = altura/2 - 5;
		bola.velocidadeX = -bola.velocidadeXInicial;
		bola.velocidadeY = 0;
		if(jogador1.score >= pontosMeta){
			fim(1);
		}
		else{
			perdeuSom();
		}
	}
	//Desenhar
	jogador1.desenhar();
	jogador2.desenhar();
	bola.desenhar();
	//text(bola.velocidadeX, 50, 50);
	fill(jogador1.r, jogador1.g, jogador1.b);
	score1 = text(jogador1.score, (largura/2 - largura*0.055), score1Y);
	fill(jogador2.r, jogador2.g, jogador2.b);
	score2 = text(jogador2.score, (largura/2 + largura*0.03), score2Y);

	//Colisao
	bolaP1 = collideRectRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura, bola.x, bola.y, bola.largura, bola.altura);
	bolaP2 = collideRectRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura, bola.x, bola.y, bola.largura, bola.altura);

	if(bolaP1 == true){
		bola.x = jogador1.x + jogador1.largura + bola.largura + 5;
		bola.bateu((bola.y+(bola.altura/2)) - (jogador1.y+(jogador1.altura/2)));
		hit.play();
	}
	else if(bolaP2 == true){
		bola.x = jogador2.x - bola.largura - 5;
		bola.bateu((bola.y+(bola.altura/2)) - (jogador2.y+(jogador2.altura/2)));
		hit.play();
	}

	if(frameCount % 300 == 0 && bola.x > largura*0.4 && bola.x < largura*0.6 && bola.movimentar == true){
		perdeuSom();
	}

	//if(frameCount % 480 == 0 && bola.movimentar == true){
	//	print("OI");
	//}
}

function keyPressed(){
	jogador1.botaoPressionado(key);
	jogador2.botaoPressionado(key);
	if(keyCode == 36){
		window.location.href = "ping-pong.html";
	}
}

function keyReleased(){
	jogador1.botaoSolto(key);
	jogador2.botaoSolto(key);
	if(key == " " && bola.movimentar == false){
		start.play();
		bola.movimentar = true;
		bola.velocidadeY = random(-6, 6);
	}
	if(key == " " && (jogador1.score >= 5 || jogador2.score >= 5)){
		window.location.href = "ping-pong-esac.html";
	}
}

function perdeuSom(){
	somAleatorio = int(random(1, 15));
	if(somAleatorio == 1 || somAleatorio == 2){
		errou.play();
	}
	else if(somAleatorio == 3){
		peido1.play();
	}
	else if(somAleatorio == 4){
		peido2.play();
	}
	else if(somAleatorio == 5){
		peido3.play();
	}
	else if(somAleatorio == 6){
		peido4.play();
	}
	else if(somAleatorio == 7){
		hector.play();
	}
	else if(somAleatorio == 8){
		ta_fedendo.play();
	}
	else if(somAleatorio == 9){
		pode_nao.play();
	}
	else if(somAleatorio == 10){
		adonai.play();
	}
	else if(somAleatorio == 11){
		mercin2.play();
	}
	else if(somAleatorio == 12){
		pato.play();
	}
	else if(somAleatorio == 13){
		neuma.play();
	}
	else if(somAleatorio == 14){
		jorge_roberto.play();
	}
}

function fim(vencedor) {
	jogador1.y = 2*altura;
	jogador2.y = 2*altura;
	bola.y = 2*altura;
	score1Y = 2*altura;
	score2Y = 2*altura;

	//Som
	somAleatorio = int(random(1, 5));
	if(somAleatorio == 1){
		aplausos.setVolume(0.2);
		aplausos.play();
	}
	else if(somAleatorio == 2){
		se_vc_chegar.play();
	}
	else if(somAleatorio == 3){
		bater_ponto.play();
	}
	else if(somAleatorio == 4){
		jorge_roberto.play();
	}

	if(vencedor == 1){
		background(0, 255, 0);
		fill(255);
		textSize(50);
		text("Verde Venceu!", largura/2-150, altura/2);
	}
	else if(vencedor == 2){
		background(255, 0, 0);
		fill(255);
		textSize(50);
		text("Vermelho Venceu!", largura/2-190, altura/2);
	}
	noLoop();
}