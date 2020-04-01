//Tornando as imgens chamadas no HTML invisíveis
document.getElementById("cactos").style.display='none';
document.getElementById("caçador").style.display='none';
document.getElementById("chao").style.display='none';
document.getElementById("perdeu").style.display='none';
document.getElementById("ganhou").style.display='none';
document.getElementById("menu").style.display='inline';
document.getElementById("animacaovitoria").style.display='none';
document.getElementById("canvas").style.display='none';
document.getElementById("animacaotiroerrado").style.display='none';
document.getElementById("animacaotirocerto").style.display='none';
document.getElementById("animacaoderrota").style.display='none';
document.getElementById("inicio").style.display='none';
//Declaração de variáveis
var myGamePiece, cont,ind,aux,y,contX,contY,tamArr;
var veloc;
var marcianoX;
var marcianoY;
var sorteioX;
var sorteioY;
var lingua = 1;
var tiro = 5;
var tempo=0;

if (lingua == 1) {
		document.getElementById("en").style.display='none';
		document.getElementById("pt").style.display='inline';
}
else {
		document.getElementById("pt").style.display='none';
		document.getElementById("en").style.display='inline';
}

function menu() {
	document.getElementById("inicio").style.display='none';
	document.getElementById("perdeu").style.display='none';
	document.getElementById("ganhou").style.display='none';
	document.getElementById("menu").style.display='inline';

}

function vitoria() {
	tiro=5;	
	document.getElementById("canvas").style.display='none';
	document.getElementById("animacaovitoria").style.display='none';
	document.getElementById("ganhou").style.display='inline';
	if (lingua == 1) {
		document.getElementById("mnsg5").innerHTML="Parabéns";
	}
	else {
		document.getElementById("mnsg5").innerHTML="Congratulations";
	}
}

function derrota() {
	tiro=5;
	document.getElementById("canvas").style.display='none';
	document.getElementById("animacaoderrota").style.display='none';
	document.getElementById("perdeu").style.display='inline';
	if (lingua == 1) {
		document.getElementById("mnsg5").innerHTML="Você foi abduzido";
	}
	else {
		document.getElementById("mnsg5").innerHTML="You've been abducted";
	}
}

function mudarLingua() {
	if (lingua == 1) {
		lingua = 2;
		document.getElementById("pt").style.display='none';
		document.getElementById("pt2").style.display='none';
		document.getElementById("pt3").style.display='none';
		document.getElementById("en").style.display='inline';
		document.getElementById("en2").style.display='inline';
		document.getElementById("en3").style.display='inline';
	}
	else {
		lingua = 1;
		document.getElementById("en").style.display='none';
		document.getElementById("en2").style.display='none';
		document.getElementById("en3").style.display='none';
		document.getElementById("pt").style.display='inline';
		document.getElementById("pt2").style.display='inline';
		document.getElementById("pt3").style.display='inline';
	}
}

//Função que inicia o jogo
function startGame() {
	veloc=5;
	document.getElementById("mnsg5").style.display='none';
	document.getElementById("inicio").style.display='inline';
	setTimeout(function(){
		document.getElementById("inicio").style.display='none';
		document.getElementById("canvas").style.display='inline';},18200);
	//Escondendo o menu
	document.getElementById("menu").style.display='none';
	document.getElementById("perdeu").style.display='none';
	document.getElementById("ganhou").style.display='none';
	//Gera o campo do jogo
    myGameArea.start();
	//Gera o caçador
    myGamePiece = new component(0, 0, 32,32,330,330);
}
//Objeto onde ficam as propriedades e funções do campo
var myGameArea = {
	//Gera o canvas
    canvas : document.getElementById("canvas"),
    start : function() {
		//Chama o contexto de desenho
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//Conta o intervalo de atualização do campo
        this.interval = setInterval(updateGameArea, 20);
		//Lê o teclado
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
	//Redesenhar cenário
    clear : function(){
		var c = 0;
		this.img=document.getElementById("chao");
        this.context = myGameArea.context;
        this.context.drawImage(this.img,0,0);
		this.context.fillStyle = "#000000";
		this.context.fillRect(1250,0,50,620)
		this.context.font = "40px Arial";
		this.context.fillStyle = "white";
		this.context.fillText(tiro,1255,310)
		var img = document.getElementById("cactos");
		for (j=10; j<=610; j+=140)
		{
			for (i=10; i<=1220; i +=63)
			{
				this.context.drawImage(img, c,0,32,32,i,j,38,38);
			if (c<64)
			{
			c+=32;
			}
			else
			c=0;
			}			
		}
    }
}
//Função para gerar o caçador
function component(px,py,width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
	this.y1 = y;
	this.px=px;
	this.py=py;  
	this.img=document.getElementById("caçador");
    this.update = function() {
        this.context = myGameArea.context;
        this.context.drawImage(this.img, this.px,this.py,this.width,this.height,this.x,this.y,this.width,this.height);
    }
	//Calculando nova posição do caçador
    this.newPos = function() {
       this.x += this.speedX;
       this.y += this.speedY;
	//Iniciando validação de árvores
    myGameArea.clear()
	   //Animando sprites
			if (this.speedX!=0){
				if (this.speedX>0 && this.px<=64){
				this.py=64;
				this.px+=32;
				}else{
					if (this.px<=64){
						this.py=96;
				}else{
						this.px=0;
					}
				}
			}
			if (this.speedY!=0){
				if (this.speedY>0 && this.px<=64){
					this.py=0;
					this.px+=32;
				}else {
					if(this.px<=64){
					this.py=32;
					this.px+=32
					}else{
						this.px=0;
					}
				}
			}
			if (this.speedX==0 && this.speedY==0){
				this.px=0;
			}
		}
    }
	
	sorteioX = (Math.floor(Math.random() * 20));
	sorteioY = (Math.floor(Math.random() * 5));
	cont=0;
	console.log(sorteioX);
	console.log(sorteioY);
	marcianoX=sorteioX*63+10;
	marcianoY=sorteioY*140-5;
	var marcianoXMax=marcianoX+40;
	var marcianoYMax=marcianoY+40;
//Atualizando campo de jogo;
function updateGameArea() {
	contY=0;
	contX=0;
	for (j=10; j<=610; j+=140){
		aux=j;
		if (myGamePiece.y>=aux-38 && myGamePiece.y<=aux+38){
			y=true;
		}else{
			contY++
		}
	}
	if (contY==5){y=false}
	for (i=10; i<=1220; i +=63){
		aux=i;
		if(myGamePiece.x>=aux-15 && myGamePiece.x<=aux+15){
			x=true;
		}else{
			contX++
		}
	}
	if (contX==20){x=false}
	//Atualizando velocidade do caçador
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
	//Estrutura de decisão para o resultado da leitura do teclado
    if (myGameArea.key == 37) {
    	if (myGamePiece.x != 0) {
    		myGamePiece.speedX = -veloc;
    	}
    	else {
    		myGamePiece.speedX = 0;
    	} 
    }
    if (myGameArea.key == 39) {
    	if (myGamePiece.x != 1230) {
    		myGamePiece.speedX = +veloc;
    	}
    	else {
    		myGamePiece.speedX = 0;
    	} 
    }
    if (myGameArea.key == 38) {
    	if (myGamePiece.y != 0) {
    		myGamePiece.speedY = -veloc;
    	}
    	else {
    		myGamePiece.speedY = 0;
    	}
    }
    if (myGameArea.key == 40) {
    	if (myGamePiece.y !=600) {
    		myGamePiece.speedY = +veloc;
    	}
    	else {
    		myGamePiece.speedY = 0;
    	} 
    }
    if (myGameArea.key == 32 && tempo ==0){ tempo++;setTimeout( function atirar (){
		tempo=0;
		if (x==true && y==true){
			console.log(myGamePiece.y);
			console.log(myGamePiece.x);
			if (myGamePiece.x>=marcianoX && myGamePiece.x<=marcianoXMax && myGamePiece.y>=marcianoY && myGamePiece.y<=marcianoYMax){
				document.getElementById("animacaotirocerto").style.display='inline';
				document.getElementById("canvas").style.display='none';
				setTimeout(function(){
				document.getElementById("animacaotirocerto").style.display='none';
				document.getElementById("canvas").style.display='inline';
				if (lingua == 1) {
					document.getElementById("mnsg").innerHTML="Acertou";
				}
				else {
					document.getElementById("mnsg").innerHTML="You've hit him";
				}},18700);
				vitoria();
				
			}else{
				tiro-=1;
				document.getElementById("animacaotiroerrado").style.display='inline';
				document.getElementById("canvas").style.display='none';
				setTimeout(function(){
				document.getElementById("animacaotiroerrado").style.display='none';
				document.getElementById("canvas").style.display='inline';},2000);
				if (lingua == 1) {
				document.getElementById("mnsg").style.display='inline';
					document.getElementById("mnsg").innerHTML="Errou";
					setTimeout(function(){document.getElementById("mnsg").style.display='none';},2000);
				}
				else {
				document.getElementById("mnsg").style.display='inline';
					document.getElementById("mnsg").innerHTML="You missed";
					setTimeout(function(){document.getElementById("mnsg").style.display='none';},2000);
				}
				if (myGamePiece.y > marcianoY+38 &&myGamePiece.y >marcianoY-5) {
					if (lingua == 1) {
				document.getElementById("mnsg3").style.display='inline';
						document.getElementById("mnsg3").innerHTML="Mais para cima";
					setTimeout(function(){document.getElementById("mnsg3").style.display='none';},2000);
					}
					else {
				document.getElementById("mnsg3").style.display='inline';
						document.getElementById("mnsg3").innerHTML="He's higher";
					setTimeout(function(){document.getElementById("mnsg3").style.display='none';},2000);
					}
						if (myGamePiece.x > marcianoX+38 && myGamePiece.x> marcianoX) {
							if (lingua == 1) {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="À esquerda";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
							else {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="To the left";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
						}
						else if (myGamePiece.x < marcianoX-5 && myGamePiece.x< marcianoX+38) {
							if (lingua == 1) {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="À direita";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
							else {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="To the right";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
						}
				}
				else if (myGamePiece.y < marcianoY-5 && myGamePiece.y <marcianoY+38) {
					if (lingua == 1) {
				document.getElementById("mnsg3").style.display='inline';
						document.getElementById("mnsg3").innerHTML="Mais para baixo";
					setTimeout(function(){document.getElementById("mnsg3").style.display='none';},2000);
					}
					else {
				document.getElementById("mnsg3").style.display='inline';
						document.getElementById("mnsg3").innerHTML="He's lower";
					setTimeout(function(){document.getElementById("mnsg3").style.display='none';},2000);
					}
						if (myGamePiece.x > marcianoX+38&& myGamePiece.x> marcianoX) {
							if (lingua == 1) {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="À esquerda";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
							else {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="To the left";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
						}
						else if (myGamePiece.x < marcianoX-5&& myGamePiece.x< marcianoX+38) {
							if (lingua == 1) {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="À direita";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
							else {
				document.getElementById("mnsg2").style.display='inline';
								document.getElementById("mnsg2").innerHTML="To de right";
					setTimeout(function(){document.getElementById("mnsg2").style.display='none';},2000);
							}
						}
				}
			}
			}
		},1000);
	}
	//Chamando funções para atualizar posição do caçador
    myGamePiece.newPos();
    myGamePiece.update();
	if (tiro==0){
		derrota();
	}
}