var frames;
var largura;
var altura;
var tela;
var logo;
var score1;
var score2;

var iniciar;
var start;
var hit;
var lose;
var win;

function preload(){
	iniciar = loadSound("sons/iniciar.mp3");
	start = loadSound("sons/start.mp3");
	hit = loadSound("sons/hit.mp3");
	win = loadSound("sons/you-win.mp3");
	lose = loadSound("sons/lose.mp3");
}

function setup(){
	largura = windowWidth;
	altura = windowHeight;
	tela = createCanvas(largura, altura);

	iniciar.play();

	jogador1 = new Jogador(50, (altura/2 - 35), 15, 70, "W", "S", 0, 255, 0);
	jogador2 = new Jogador((largura - 60), (altura/2 - 35), 15, 70, "&", "(", 255, 0, 0);
	bola = new Bola((largura/2 - 5), (altura/2 - 5), 10, 10, int(largura*0.0075));
	frames = 60;
	score1Y = 40;
	score2Y = 40;
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
		if(jogador2.score >= 5){
			fim(2);
		}
		else{
			lose.play();
		}
	}
	else if(bola.x > largura){
		jogador1.score++;
		bola.movimentar = false;
		bola.x = largura/2 - 5;
		bola.y = altura/2 - 5;
		bola.velocidadeX = -bola.velocidadeXInicial;
		bola.velocidadeY = 0;
		if(jogador1.score >= 5){
			fim(1);
		}
		else{
			lose.play();
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

	bolaP1 = collideRectRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura, bola.x, bola.y, bola.largura, bola.altura);
	bolaP2 = collideRectRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura, bola.x, bola.y, bola.largura, bola.altura);

	if(bolaP1 == true){
		bola.bateu((bola.y+(bola.altura/2)) - (jogador1.y+(jogador1.altura/2)));
		hit.play();
	}
	else if(bolaP2 == true){
		bola.bateu((bola.y+(bola.altura/2)) - (jogador2.y+(jogador2.altura/2)));
		hit.play();
	}

	//if(frameCount % 480 == 0 && bola.movimentar == true){
	//	print("OI");
	//}
}

function keyPressed(){
	jogador1.botaoPressionado(key);
	jogador2.botaoPressionado(key);
	if(keyCode == 36){
		window.location.href = "ping-pong-esac.html";
	}
}

function keyReleased(){
	jogador1.botaoSolto(key);
	jogador2.botaoSolto(key);
	if(key == " " && bola.movimentar == false){
		start.play();
		bola.movimentar = true;
	}
}

function fim(vencedor) {
	win.play();
	jogador1.y = 2*altura;
	jogador2.y = 2*altura;
	bola.y = 2*altura;
	score1Y = 2*altura;
	score2Y = 2*altura;
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