var frames;
var largura;
var altura;

function setup(){
	largura = windowWidth;
	altura = windowHeight;
	tela = createCanvas(largura, altura);

	jogador1 = new Jogador(50, (altura/2 - 35), 12, 70, "W", "S", 0, 255, 0);
	jogador2 = new Jogador(largura-60, (altura/2 - 35), 12, 70, "&", "(", 255, 0, 0);
	bola = new Bola(largura/2, altura/2, 10, 10);
	frames = 60;
	textSize(32);
}

function draw(){
	frameRate(frames);
	background(0, 0, 0);
	stroke(255, 255, 255);
	line(largura/2, 0, largura/2, altura);
	//Atualizar Posicoes
	jogador1.atualizarPosicao();
	jogador2.atualizarPosicao();
	bola.atualizarPosicao();
	//Desenhar
	jogador1.desenhar();
	jogador2.desenhar();
	bola.desenhar();
	text(bola.velocidadeY, 50, 50);

	bolaP1 = collideRectRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura, bola.x, bola.y, bola.largura, bola.altura);
	bolaP2 = collideRectRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura, bola.x, bola.y, bola.largura, bola.altura);
	if(bolaP1 == true || bolaP2 == true){
		bola.bateu();
		print("oi");
	}
}

function keyPressed(){
	jogador1.botaoPressionado(key);
	jogador2.botaoPressionado(key);
}

function keyReleased(){
	jogador1.botaoSolto(key);
	jogador2.botaoSolto(key);
}