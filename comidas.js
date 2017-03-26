function Comida(x, y, largura, altura) {
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	//Metodos
	this.desenharComida = function(){
		fill(255, 255, 0);
		noStroke();
		rect(this.x, this.y, this.largura, this.altura);
	}

	this.mover = function(largura, altura, cobra, calda){
		px = int(random(10, largura-20));
		py = int(random(10, altura-20));

		if(px % 10 != 0){
			px -= px % 10;
		}
		if(py % 10 != 0){
			py -= py % 10;
		}
		this.x = px;
		this.y = py;

		for(var i=0; i<calda.length; i++){
			if(px == calda[i][0] && py == calda[i][1]){
				this.mover(largura, altura, cobra, calda);
				print("Ocorreu");
			}
		}
	}
}