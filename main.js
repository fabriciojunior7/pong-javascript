var frames;
var largura;
var altura;

function setup(){
	largura = windowWidth;
	altura = windowHeight;
	tela = createCanvas(largura, altura);

	jogador1 = new Jogador(50, (altura/2 - 35), 12, 70, "W", "S", 0, 255, 0);
	jogador2 = new Jogador((largura - 60), (altura/2 - 35), 12, 70, "&", "(", 255, 0, 0);
	bola = new Bola((largura/2 - 5), (altura/2 - 5), 10, 10, int(largura*0.007));
	frames = 60;
}

function draw(){
	frameRate(frames);
	background(0, 0, 0);
	fill(255);
	textSize(10);
	text("Fabricio Junior", 5, 15);
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
	}
	//Desenhar
	jogador1.desenhar();
	jogador2.desenhar();
	bola.desenhar();
	//text(bola.velocidadeX, 50, 50);
	fill(jogador1.r, jogador1.g, jogador1.b);
	text(jogador1.score, (largura/2 - largura*0.055), 40);
	fill(jogador2.r, jogador2.g, jogador2.b);
	text(jogador2.score, (largura/2 + largura*0.03), 40);

	bolaP1 = collideRectRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura, bola.x, bola.y, bola.largura, bola.altura);
	bolaP2 = collideRectRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura, bola.x, bola.y, bola.largura, bola.altura);

	if(bolaP1 == true){
		bola.bateu((bola.y+(bola.altura/2)) - (jogador1.y+(jogador1.altura/2)));
	}
	else if(bolaP2 == true){
		bola.bateu((bola.y+(bola.altura/2)) - (jogador2.y+(jogador2.altura/2)));
	}
}

function keyPressed(){
	jogador1.botaoPressionado(key);
	jogador2.botaoPressionado(key);
}

function keyReleased(){
	jogador1.botaoSolto(key);
	jogador2.botaoSolto(key);
	if(key == " "){
		bola.movimentar = true;
	}
}

function fim(vencedor) {
	if(vencedor == 1){
		background(jogador1.r, jogador1.g, jogador1.b);
		fill(255);
		textSize(50);
		text("Verde Venceu!", largura/2-150, altura/2);
	}
	else if(vencedor == 2){
		background(jogador2.r, jogador2.g, jogador2.b);
		fill(255);
		textSize(50);
		text("Vermelho Venceu!", largura/2-190, altura/2);
	}
	noLoop();
}