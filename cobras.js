function Cobra(x, y, largura, altura, velocidade, botoes){
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.velocidade = velocidade;
	this.tamanhoCalda = 0;
	this.calda = [];
	this.up = botoes[0];
	this.down = botoes[1];
	this.left = botoes[2];
	this.right = botoes[3];
	this.udlr = [false, false, false, false];
	this.movimentacao = false;

	//Metodos
	this.desenharCobra = function(){
		stroke(0);
		//Calda
		if(this.calda.length > 0){
			fill(255);
			for(var i=0; i<=this.tamanhoCalda; i++){
				rect(this.calda[i][0], this.calda[i][1], this.largura, this.altura);
			}
		}

		//Cabeca
		fill(255, 0, 0);
		rect(this.x, this.y, this.largura, this.altura);
		
	}

	this.atualizarPosicao = function(largura, altura){
		//Calda
		if(this.calda.length > 0){
			for(var i=this.tamanhoCalda; i>=0; i--){
				if(i != 0){
					this.calda[i] = this.calda[i-1];
				}
				else{
					this.calda[i] = [this.x, this.y];
				}
			}
		}

		//Movimento
		if(this.movimentacao == true){
			if(this.udlr[0] == true){
				this.y -= this.velocidade;
			}
			else if(this.udlr[1] == true){
				this.y += this.velocidade;
			}
			else if(this.udlr[2] == true){
				this.x -= this.velocidade;
			}
			else if(this.udlr[3] == true){
				this.x += this.velocidade;
			}
		}

		//X
		if(this.x < 0){
			this.gameOver();
		}
		else if(this.x >= largura){
			this.gameOver();
		}
		//Y
		if(this.y < 0){
			this.gameOver();
		}
		else if(this.y >= altura){
			this.gameOver();
		}

		//Game Over
		for(var i=0; i<this.tamanhoCalda; i++){
			if(this.x == this.calda[i][0] && this.y == this.calda[i][1]){
				this.gameOver();
			}
		}


	}

	this.gameOver = function(){
		lose.play();
		perdeu = true;
		noLoop();
	}

	this.botaoPressionado = function(key){
		if(key == this.up && this.udlr[1] == false){
			this.udlr = [true, false, false, false];
		}
		else if(key == this.down && this.udlr[0] == false){
			this.udlr = [false, true, false, false];
		}
		else if(key == this.left && this.udlr[3] == false){
			this.udlr = [false, false, true, false];
		}
		else if(key == this.right && this.udlr[2] == false){
			this.udlr = [false, false, false, true];
		}

		if(key == 32){
			if(this.movimentacao == false){
				this.movimentacao = true;
				start.play();
			}
		}

	}

	this.botaoSolto = function(key){
		print("oi");
	}

	this.comeu = function(){
		this.calda.push([-10, -10]);
		this.tamanhoCalda = this.calda.length - 1;
	}

}