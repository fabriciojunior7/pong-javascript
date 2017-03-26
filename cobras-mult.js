function Cobra(x, y, largura, altura, velocidade, botoes, r, g, b, jogador){
	//Atributos
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.r = r;
	this.g = g;
	this.b = b;
	this.velocidade = velocidade;
	this.tamanhoCalda = 0;
	//this.calda = [[-100, -100], [-100, -100], [-100, -100], [-100, -100], [-100, -100], [-100, -100], [-100, -100]];
	this.calda = [[-100, -100]];
	this.up = botoes[0];
	this.down = botoes[1];
	this.left = botoes[2];
	this.right = botoes[3];
	this.udlr = [false, false, false, false];
	this.movimentacao = false;
	this.jogador = jogador;

	//Metodos
	this.desenharCobra = function(){
		stroke(0);
		//Calda
		if(this.calda.length > 0){
			fill(this.r, this.g, this.b);
			for(var i=0; i<=this.tamanhoCalda; i++){
				rect(this.calda[i][0], this.calda[i][1], this.largura, this.altura);
			}
		}

		//Cabeca
		fill(this.r-150, this.g-150, this.b-150);
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
			return(true);
		}
		else if(this.x >= largura){
			return(true);
		}
		//Y
		if(this.y < 0){
			return(true);
		}
		else if(this.y >= altura){
			return(true);
		}

		//Game Over
		for(var i=0; i<this.tamanhoCalda; i++){
			if(this.x == this.calda[i][0] && this.y == this.calda[i][1]){
				return(true);
			}
		}


	}

	this.gameOver = function(){
		if(this.jogador == 1){
			j2Venceu();
		}
		else if(this.jogador == 2){
			j1Venceu();
		}
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