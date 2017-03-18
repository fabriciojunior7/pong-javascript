function Bola(x, y, largura, altura){
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.velocidadeX = 5.0;
	this.velocidadeXMAX = 20.0
	this.velocidadeY = 0.0;
	this.r = 255;
	this.g = 255;
	this.b = 255;

	//Metodos
	this.desenhar = function(){
		noStroke();
		fill(this.r, this.g, this.b);
		rect(this.x, this.y, this.largura, this.altura);
	};

	this.atualizarPosicao = function(){
		this.x += this.velocidadeX;
	};

	this.bateu = function() {
		//Eixo X
		this.velocidadeX *= -1;
		if(this.velocidadeX > 0 && this.velocidadeX < this.velocidadeXMAX){
			this.velocidadeX += 0.5;
		}
		else if(this.velocidadeX < 0 && this.velocidadeX > -this.velocidadeXMAX){
			this.velocidadeX -= 0.5;
		}

		//Eixo Y
		
	}






}