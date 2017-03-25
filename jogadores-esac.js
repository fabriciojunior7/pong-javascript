function Jogador(x, y, largura, altura, up, down, r, g, b){
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.velocidadeX = 0;
	this.velocidadeY = 16;
	this.movimentos = [false, false];
	this.up = up;
	this.down = down;
	this.r = r;
	this.g = g;
	this.b = b;
	this.score = 0;

	//Metodos
	this.desenhar = function(){
		noStroke();
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.largura, this.altura);
	};

	this.atualizarPosicao = function(){
		if(this.movimentos[0] == true && this.y > 0){
			this.y -= this.velocidadeY;
		}
		if(this.movimentos[1] == true && this.y < windowHeight-this.altura){
			this.y += this.velocidadeY;
		}
		if(this.score >= 4 && frameCount % 2 == 0){
			this.r = random(100, 255);
			this.g = random(100, 255);
			this.b = random(100, 255);
		}
	};

	this.botaoPressionado = function(key){
		if(key == this.up){
			this.movimentos[0] = true;
		}
		else if(key == this.down){
			this.movimentos[1] = true;
		}
	};

	this.botaoSolto = function(key){
		if(key == this.up){
			this.movimentos[0] = false;
		}
		else if(key == this.down){
			this.movimentos[1] = false;
		}
	}






}