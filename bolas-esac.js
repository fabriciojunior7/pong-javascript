function Bola(x, y, largura, altura, velocidadeXInicial){
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.velocidadeXInicial = velocidadeXInicial;
	this.velocidadeX = this.velocidadeXInicial;
	this.velocidadeXMAX = 40.0;
	this.velocidadeY = 0.0;
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.movimentar = false;
	this.crescerVelocidadeX = 1.0;

	//Metodos
	this.desenhar = function(){
		noStroke();
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.largura, this.altura);
	};

	this.atualizarPosicao = function(altura){
		if(this.movimentar == true){
			this.x += this.velocidadeX;
			this.y += this.velocidadeY;
		}

		if(this.y < 0 || this.y > altura-this.altura){
			this.velocidadeY *= -1;
			if(this.y <= 0){
				this.y += 5;
			}
			else if(this.y > altura-this.altura){
				this.y -= 5;
			}
		}
	};

	this.bateu = function(y) {
		//Eixo X
		this.velocidadeX *= -1;
		if(this.velocidadeX > 0 && this.velocidadeX < this.velocidadeXMAX){
			this.velocidadeX += this.crescerVelocidadeX;
		}
		else if(this.velocidadeX < 0 && this.velocidadeX > -this.velocidadeXMAX){
			this.velocidadeX -= this.crescerVelocidadeX;
		}

		//Eixo Y
		this.velocidadeY = y*0.4;
	};






}