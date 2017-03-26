function Comida(x, y, largura, altura) {
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.timer = 5;

	//Metodos
	this.desenharComida = function(frames, largura, altura, calda1, calda2){
		if(frameCount % frames == 0){
			this.timer -= 1;
			if(this.timer == 0){
				this.mover(largura, altura, calda1, calda2);
			}
		}

		if(this.timer > 2){fill(255, 255, 0);}
		else{fill(random(50, 255), random(50, 255), random(50, 255));};
		noStroke();
		rect(this.x, this.y, this.largura, this.altura);
	}

	this.mover = function(largura, altura, calda1, calda2){
		this.timer = 5;

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

		if(calda1 == null){calda1 = [10, 10];}
		if(calda2 == null){calda2 = [10, 10];}

		for(var i=0; i<calda1.length; i++){
			if(px == calda1[i][0] && py == calda1[i][1]){
				this.mover(largura, altura, calda1, calda2);
			}
		}
		
		for(var i=0; i<calda2.length; i++){
			if(px == calda2[i][0] && py == calda2[i][1]){
				this.mover(largura, altura, calda1, calda2);
			}
		}
		
	}
}