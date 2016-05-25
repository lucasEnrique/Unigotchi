var status;
var gotchi;
var hBar, healthBar;
var pBar, potentialBar;
var transObj;
var carregandoBtn;
var hello, iniciarBtn, vestibularBtn;
var carenagem;
var tutorial1, tutorial2, tutorial3, tutorial4, tutorial5, tutorial6, pularTutorial;
var studyBtn, waterBtn, relaxBtn, eatBtn, playBtn, noCellBtn;
var url;

var firstTime = 0;
var GameState = { /* PRIMEIRO ESTADO A SER CHAMADO*/ 
	preload: function() {
		this.game.stage.backgroundColor = '#94c936';

		this.load.image('minigameMask', 'ASSETS/GENERAL/minigame_mask.png');
		this.load.image('GotchiLogo', "ASSETS/GENERAL/logo.png");
		this.load.image('maskScreen', 'ASSETS/GENERAL/mask_screen.png');
		this.load.image('facebookBtn','ASSETS/GENERAL/facebook_btn.png');
		this.load.image('middleBtn', 'ASSETS/GENERAL/btn_share.png');

		game.load.atlas('loadingSS', 'ASSETS/GENERAL/carregandoSS.png', 'ASSETS/GENERAL/carregandoSS.json');
	},
	create: function() {


		this.game.state.start('PreloadState');

		//layer 1
		this.maskScreen = this.game.add.sprite(189,335, 'maskScreen');
		this.maskScreen.scale.setTo(0.35, 0.35);
		this.maskScreen.anchor.setTo(0.5, 0.5);
		
		//Layer 2
		this.logo = this.game.add.sprite(189,335, 'GotchiLogo');
		this.logo.scale.setTo(0.35, 0.35);
		this.logo.anchor.setTo(0.5, 0.5);

		this.fbBtn = this.add.button(189,475, 'facebookBtn', fbLogin, this); // BOTÃO DO FACEBOOK
		this.fbBtn.scale.setTo(0.35, 0.35);
		this.fbBtn.anchor.setTo(0.5, 0.5);

		//layer 3
		this.minigameMask = this.game.add.sprite(0, 0, 'minigameMask');
		this.minigameMask.scale.setTo(0.35, 0.35);

		this.middleBtn = this.add.button(189,600, 'middleBtn', share, this); // BOTÃO DE COMPARTILHAR
		this.middleBtn.anchor.setTo(0.5, 0.5);
		this.middleBtn.scale.setTo(0.35, 0.35);

		game.stage.disableVisibilityChange = true; //Permite o jogo rodar sem ter o foco na tela

		status = 0; // variável usada para impossibitar do usuário apertar outros botões durante animações

	}
}
var PreloadState = { /* ESTADO CHAMADO DURANTE O GAMESTATE*/
	preload: function() {
		//Preload de imagens
		this.load.image('healthBar', 'ASSETS/HUD/life_bar.png');
		this.load.image('potentialBar', 'ASSETS/HUD/potential_bar.png');
		this.load.image('barFill', 'ASSETS/HUD/bar_fill.png');
		this.load.image('hello', 'ASSETS/GENERAL/hello_.png');
		this.load.image('tutorial1','ASSETS/HUD/TUTORIAL/tutorial_01.png');
		this.load.image('tutorial2','ASSETS/HUD/TUTORIAL/tutorial_02.png');
		this.load.image('tutorial3','ASSETS/HUD/TUTORIAL/tutorial_03.png');
		this.load.image('tutorial4','ASSETS/HUD/TUTORIAL/tutorial_04.png');
		this.load.image('tutorial5','ASSETS/HUD/TUTORIAL/tutorial_05.png');
		this.load.image('tutorial6','ASSETS/HUD/TUTORIAL/tutorial_06.png');
		this.load.image('pularTutorial','ASSETS/HUD/TUTORIAL/PULAR_BTN.png');
		this.load.image('iniciarBtn','ASSETS/GENERAL/start_btn.png');
		this.load.image('vestibularBtn','ASSETS/GENERAL/vest_btn.png');

		//preload de botões
		this.load.spritesheet('studyBtn','ASSETS/HUD/studySS.png', 97, 194);
		this.load.spritesheet('waterBtn','ASSETS/HUD/waterSS.png', 97, 194);
		this.load.spritesheet('eatBtn','ASSETS/HUD/eatSS.png', 97, 194);
		this.load.spritesheet('relaxBtn','ASSETS/HUD/relaxSS.png', 97, 194);
		this.load.spritesheet('playBtn','ASSETS/HUD/playSS.png', 97, 194);
		this.load.spritesheet('noCellBtn','ASSETS/HUD/noCellSS.png', 97, 194);

		//Preload de animações
		game.load.atlas('char1', 'ASSETS/CHARACTER/character1SSjson.png', 'ASSETS/CHARACTER/character1SSjson.json');
		game.load.atlas('transicao', 'ASSETS/CHARACTER/transicaoSS.png', 'ASSETS/CHARACTER/transicaoSS.json');
	}
}
var StartState = { /* ESTADO CHAMADO SOMETE QUANDO O BOTÃO DE CONECTAR AO FACEBOOK FOR APERTADO E PRELOADSTATE ESTIVER 
					  COMPLETAMENTE CARREGADO */
	create: function() {

		Phaser.Canvas.setTouchAction(game.canvas, "auto"); // disable the default "none", i.e."touch-action: none" CSS style
		game.input.touch.preventDefault = false;
		game.stage.backgroundColor = '#94c936';

		this.maskScreen = game.add.sprite(189,335, 'maskScreen');
		this.maskScreen.scale.setTo(0.35, 0.35);
		this.maskScreen.anchor.setTo(0.5, 0.5);

		//Criando sprites

		studyBtn = game.add.button(17,455, 'studyBtn', estudar, this, 0, 0, 1, 0);
		studyBtn.anchor.setTo(0, 0.5);
		studyBtn.scale.setTo(0.38, 0.38);
		studyBtn.alpha = 0;

		waterBtn = game.add.button(17,370, 'waterBtn', banho, this, 0, 0, 1, 0);
		waterBtn.anchor.setTo(0, 0.5);
		waterBtn.scale.setTo(0.38, 0.38);
		waterBtn.alpha = 0;

		eatBtn = game.add.button(17,285, 'eatBtn', comer, this, 0, 0, 1, 0);
		eatBtn.anchor.setTo(0, 0.5);
		eatBtn.scale.setTo(0.38, 0.38);
		eatBtn.alpha = 0;

		relaxBtn = game.add.button(325,455, 'relaxBtn', relax, this, 0, 0, 1, 0);
		relaxBtn.anchor.setTo(0, 0.5);
		relaxBtn.scale.setTo(0.38, 0.38);
		relaxBtn.alpha = 0;

		playBtn = game.add.button(325,370, 'playBtn', jogar, this, 0, 0, 1, 0);
		playBtn.anchor.setTo(0, 0.5);
		playBtn.scale.setTo(0.38, 0.38);
		playBtn.alpha = 0;

		noCellBtn = game.add.button(325,285, 'noCellBtn', noCell, this, 0, 0, 1, 0);
		noCellBtn.anchor.setTo(0, 0.5);
		noCellBtn.scale.setTo(0.38, 0.38);
		noCellBtn.alpha = 0;

		hBar = game.add.sprite(28, 197, 'barFill');
		hBar.scale.setTo(0.33, 0.34);

		if(parseFloat(localStorage.getItem('MyHealth')) < 0.34) //Carregando jogo passado
		{
			var hp = parseFloat(localStorage.getItem('MyHealth'));
			hBar.scale.setTo(hp, 0.34);
		}
		hBar.scale.setTo(0.33, 0.34);
		hBar.alpha = 0;

		pBar = game.add.sprite(347, 197, 'barFill');
		pBar.anchor.setTo(1, 0);
		pBar.scale.setTo(0.33, 0.34);

		if(parseFloat(localStorage.getItem('MyPotential')) < 0.34) //Carregando jogo passado
		{
			var pp = parseFloat(localStorage.getItem('MyPotential'));
			pBar.scale.setTo(pp, 0.34);
		}
		pBar.scale.setTo(0.33, 0.34);
		pBar.alpha = 0;

		healthBar = game.add.sprite(20, 190, 'healthBar');
		healthBar.scale.setTo(0.35, 0.35);
		healthBar.alpha = 0;

		potentialBar = game.add.sprite(355, 190, 'potentialBar');
		potentialBar.anchor.setTo(1, 0);
		potentialBar.scale.setTo(0.35, 0.35);
		potentialBar.alpha = 0;

		gotchi = game.add.sprite(189, 365, 'char1');
		gotchi.anchor.setTo(0.5, 0.5);
		gotchi.scale.setTo(0.38, 0.38);
		gotchi.alpha = 0;
		gotchi.animations.add('idleAnim', [ "neutro__00000.png", "neutro__00001.png", "neutro__00002.png", "neutro__00003.png", "neutro__00004.png", 
											"neutro__00005.png", "neutro__00006.png", "neutro__00007.png", "neutro__00008.png", "neutro__00009.png", 
											"neutro__00010.png", "neutro__00011.png", "neutro__00012.png", "neutro__00013.png", "neutro__00014.png", 
											"neutro__00015.png", "neutro__00016.png", "neutro__00017.png", "neutro__00018.png", "neutro__00019.png" ], 15, true);		
		gotchi.animations.add('relaxAnim',[ "relax__00000.png", "relax__00001.png", "relax__00002.png", "relax__00003.png", "relax__00004.png", 
											"relax__00005.png", "relax__00006.png", "relax__00007.png", "relax__00008.png", "relax__00009.png", 
											"relax__00010.png", "relax__00011.png", "relax__00012.png", "relax__00013.png", "relax__00014.png", 
											"relax__00015.png", "relax__00016.png", "relax__00017.png", "relax__00018.png", "relax__00019.png" ], 15, true);
		gotchi.animations.add('cellAnim', [ "cel__00000.png", "cel__00001.png", "cel__00002.png", "cel__00003.png", "cel__00004.png", 
											"cel__00005.png", "cel__00006.png", "cel__00007.png", "cel__00008.png", "cel__00009.png", 
											"cel__00010.png", "cel__00011.png", "cel__00012.png", "cel__00013.png", "cel__00014.png", 
											"cel__00015.png", "cel__00016.png", "cel__00017.png", "cel__00018.png", "cel__00019.png" ], 15, true);		
		gotchi.animations.add('banhoAnim',[ "banho__00000.png", "banho__00001.png", "banho__00002.png", "banho__00003.png", "banho__00004.png", 
											"banho__00005.png", "banho__00006.png", "banho__00007.png", "banho__00008.png", "banho__00009.png", 
											"banho__00010.png", "banho__00011.png", "banho__00012.png", "banho__00013.png", "banho__00014.png", 
											"banho__00015.png", "banho__00016.png", "banho__00017.png", "banho__00018.png", "banho__00019.png" ], 15, true);		
		gotchi.animations.add('eatAnim',  [ "eat__00000.png", "eat__00001.png", "eat__00002.png", "eat__00003.png", "eat__00004.png", 
											"eat__00005.png", "eat__00006.png", "eat__00007.png", "eat__00008.png", "eat__00009.png", 
											"eat__00010.png", "eat__00011.png", "eat__00012.png", "eat__00013.png", "eat__00014.png", 
											"eat__00015.png", "eat__00016.png", "eat__00017.png", "eat__00018.png", "eat__00019.png" ], 15, true);		
		gotchi.animations.add('playAnim', [ "play__00000.png", "play__00001.png", "play__00002.png", "play__00003.png", "play__00004.png", 
											"play__00005.png", "play__00006.png", "play__00007.png", "play__00008.png", "play__00009.png", 
											"play__00010.png", "play__00011.png", "play__00012.png", "play__00013.png", "play__00014.png", 
											"play__00015.png", "play__00016.png", "play__00017.png", "play__00018.png", "play__00019.png" ], 15, true);		
		gotchi.animations.add('sleepAnim',[ "sleep__00000.png", "sleep__00001.png", "sleep__00002.png", "sleep__00003.png", "sleep__00004.png", 
											"sleep__00005.png", "sleep__00006.png", "sleep__00007.png", "sleep__00008.png", "sleep__00009.png", 
											"sleep__00010.png", "sleep__00011.png", "sleep__00012.png", "sleep__00013.png", "sleep__00014.png", 
											"sleep__00015.png", "sleep__00016.png", "sleep__00017.png", "sleep__00018.png", "sleep__00019.png" ], 15, true);		
		gotchi.animations.add('studyAnim',[ "study__00000.png", "study__00001.png", "study__00002.png", "study__00003.png", "study__00004.png", 
											"study__00005.png", "study__00006.png", "study__00007.png", "study__00008.png", "study__00009.png", 
											"study__00010.png", "study__00011.png", "study__00012.png", "study__00013.png", "study__00014.png", 
											"study__00015.png", "study__00016.png", "study__00017.png", "study__00018.png", "study__00019.png" ], 15, true);
		gotchi.animations.add('helloAnim',[ "hello__00000.png", "hello__00001.png", "hello__00002.png", "hello__00003.png", "hello__00004.png", 
											"hello__00005.png", "hello__00006.png", "hello__00007.png", "hello__00008.png", "hello__00009.png", 
											"hello__00010.png", "hello__00011.png", "hello__00012.png", "hello__00013.png", "hello__00014.png", 
											"hello__00015.png", "hello__00016.png", "hello__00017.png", "hello__00018.png", "hello__00019.png" ], 15, true);

		gotchi.animations.play('idleAnim');


		tutorial6 = game.add.sprite(189,328, 'tutorial6');
		tutorial6.scale.setTo(0.32, 0.34);
		tutorial6.anchor.setTo(0.5, 0.5);
		tutorial6.inputEnabled = true;
		tutorial6.events.onInputDown.addOnce(startGame, tutorial6);
		tutorial6.alpha = 0;

		tutorial5 = game.add.sprite(189,328, 'tutorial5');
		tutorial5.scale.setTo(0.32, 0.34);
		tutorial5.anchor.setTo(0.5, 0.5);
		tutorial5.inputEnabled = true;
		tutorial5.events.onInputDown.addOnce(goTutorial6, tutorial5);
		tutorial5.alpha = 0;

		tutorial4 = game.add.sprite(189,328, 'tutorial4');
		tutorial4.scale.setTo(0.32, 0.34);
		tutorial4.anchor.setTo(0.5, 0.5);
		tutorial4.inputEnabled = true;
		tutorial4.events.onInputDown.addOnce(goTutorial5, tutorial4);
		tutorial4.alpha = 0;

		tutorial3 = game.add.sprite(189,328, 'tutorial3');
		tutorial3.scale.setTo(0.32, 0.34);
		tutorial3.anchor.setTo(0.5, 0.5);
		tutorial3.inputEnabled = true;
		tutorial3.events.onInputDown.addOnce(goTutorial4, tutorial3);
		tutorial3.alpha = 0;

		tutorial2 = game.add.sprite(189,328, 'tutorial2');
		tutorial2.scale.setTo(0.32, 0.34);
		tutorial2.anchor.setTo(0.5, 0.5);
		tutorial2.inputEnabled = true;
		tutorial2.events.onInputDown.addOnce(goTutorial3, tutorial2);
		tutorial2.alpha = 0;

		tutorial1 = game.add.sprite(189,328, 'tutorial1');
		tutorial1.scale.setTo(0.32, 0.34);
		tutorial1.anchor.setTo(0.5, 0.5);
		tutorial1.inputEnabled = true;
		tutorial1.events.onInputDown.addOnce(goTutorial2, tutorial1);
		tutorial1.alpha = 0;

		pularTutorial = game.add.button(game.world.centerX ,475, 'pularTutorial', skipTutorial);
		pularTutorial.scale.setTo(0.5, 0.5);
		pularTutorial.anchor.setTo(0.5, 0.5);
		pularTutorial.alpha = 0;

		iniciarBtn = game.add.sprite(290,405, 'iniciarBtn');
		iniciarBtn.scale.setTo(0.35, 0.35);
		iniciarBtn.anchor.setTo(0.5, 0.5);

		hello = game.add.sprite(184, 335, 'hello');
		hello.scale.setTo(0.31, 0.32);
		hello.anchor.setTo(0.5, 0.5);
		hello.inputEnabled = true;
		hello.events.onInputDown.addOnce(startTutorial1, hello);

		vestibularBtn = game.add.button(290,470, 'vestibularBtn', matriculeSe);
		vestibularBtn.scale.setTo(0.35, 0.35);
		vestibularBtn.anchor.setTo(0.5, 0.5);

		transObj = game.add.sprite(189, 365, 'transicao');
		transObj.anchor.setTo(0.5,0.5);
		transObj.scale.setTo(1,1);
		transObj.animations.add('transAnim',["transicao_00001.png", "transicao_00002.png", "transicao_00003.png", "transicao_00004.png", "transicao_00005.png", "transicao_00006.png",
											"transicao_00007.png", "transicao_00008.png", "transicao_00009.png", "transicao_00010.png", "transicao_00011.png",
											"transicao_00012.png", "transicao_00013.png", "transicao_00014.png", "transicao_00015.png", "transicao_00016.png",
											"transicao_00017.png", "transicao_00018.png", "transicao_00019.png", "transicao_00020.png", "transicao_00021.png",
											"transicao_00022.png", "transicao_00023.png", "transicao_00024.png", "transicao_00025.png", "transicao_00026.png",
											"transicao_00027.png", "transicao_00028.png", "transicao_00029.png", "transicao_00030.png", "transicao_00031.png",
											"transicao_00032.png", "transicao_00033.png", "transicao_00034.png", "transicao_00035.png", "transicao_00036.png", 
											"transicao_00037.png", "transicao_00038.png", ], 15, true);

		carenagem = game.add.sprite(0, 0, 'minigameMask');
		carenagem.scale.setTo(0.35, 0.35);

		this.middleBtn = this.add.button(189,600, 'middleBtn', share, this);
		this.middleBtn.anchor.setTo(0.5, 0.5);
		this.middleBtn.scale.setTo(0.35, 0.35);

		//Adicionar animações
		
	},
	update: function() {
		//Condicionais para o decaimento das barras de Health e Potencial.

		
	}
}

/*

Todas as funções de ações(estudar, banho, relax, jogar, noCell) seguem a mesma estrutura nesta ordem: Condicional(is) 
diária(s), primeira animação de transição, iniciar animação da ação e resetar a barra que esta ação está relacionada, 
segunda animação de transição, voltar para animação de idle.

*/
function estudar() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim'); 

		setTimeout(function() {
			gotchi.y = 390;
			gotchi.animations.play('studyAnim');
			pBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2500);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4500);
		setTimeout(function() {
			gotchi.y = 365;
			gotchi.animations.play('idleAnim');
		}, 5300);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 7000);

		setTimeout(function() {
			status = 0;
		},7001);
	}
}
function banho() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim');
		
		setTimeout(function() {
			gotchi.animations.play('banhoAnim');
			hBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2500);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4500);
		setTimeout(function() {
			gotchi.animations.play('idleAnim');
		}, 5300);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 7000);

		setTimeout(function() {
			status = 0;
		},7001);			
	}
}
function comer() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim');

		setTimeout(function() {
			gotchi.animations.play('eatAnim');
			hBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2500);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4500);
		setTimeout(function() {
			gotchi.animations.play('idleAnim');
		}, 5300);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 7100);

		setTimeout(function() {
			status = 0;
		},7001);	
	}
}	
function relax() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim');

		setTimeout(function() {
			gotchi.animations.play('relaxAnim');
			pBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2500);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4500);
		setTimeout(function() {
			gotchi.animations.play('idleAnim');
		}, 5300);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 7000);

		setTimeout(function() {
			status = 0;
		},7001);
	}
}
function jogar() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim');

		setTimeout(function() {
			gotchi.animations.play('playAnim');
			pBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2500);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4500);
		setTimeout(function() {
			gotchi.animations.play('idleAnim');
		}, 5300);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 7000);

		setTimeout(function() {
			status = 0;
		},7001);
	}
}
function noCell() {
	if(status == 0)
	{
		status = 1;
		transObj.animations.play('transAnim');

		setTimeout(function() {
			gotchi.animations.play('cellAnim');
			pBar.scale.x = 0.33;
		}, 2100);
		setTimeout(function() {
			gotchi.animations.stop('cellAnim', false);
		}, 3400);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 2600);
		setTimeout(function() {
			transObj.animations.play('transAnim');
		}, 4000);
		setTimeout(function() {
			gotchi.animations.play('idleAnim');
		}, 4800);
		setTimeout(function() {
			transObj.animations.stop('transAnim', true);
		}, 6600);

		setTimeout(function() {
			status = 0;
		},7001);	
	}
}
function action(type) {

	var objeto = {
		facebook:idfacebook,
		type:type
	}
	url = "https://uninorte.dev.fermen.to/unigotchi/backend/action.php";

	if(type=="comida"){

		$.post(url, objeto).done(function(){


		});
	}else if(type=="feliz")
	{
		$.post(url, objeto).done(function(){


		});

	}

}
function fbLogin() { //FUNÇÃO QUE VAI SER CHAMADA NO BOTÃO DE CONECTAR COM FACEBOOK
	console.log(this.game);
	var statusLoad = 0;
	this.fbBtn.destroy();

	carregandoBtn = game.add.sprite(189,475, 'loadingSS');
	carregandoBtn.anchor.setTo(0.5, 0.5);
	carregandoBtn.scale.setTo(0.38, 0.38);

	setInterval(function()
	{
		if(game.load.hasLoaded && statusLoad == 0)
		{
			statusLoad = 1;
			game.state.start('StartState');
		}
	}, 500);
	carregandoBtn.animations.add('carregando', ["LOADING_01.png","LOADING_02.png"], 2, true);
	carregandoBtn.animations.play('carregando');

	this.fbBtn.animations.play('carregando');

	FB.login(function() {



	FB.api(
					"/me",
					function (response) {
						if (response && !response.error) {

						 var cadastro = 'https://uninorte.dev.fermen.to/unigotchi/backend/cadastro.php';

						 idfacebook = response.id;
						 $.post(cadastro, {nome:response.name,facebook:response.id}).done(function(){

						 });


					 }
					}
				);
		});
}
function share() { // FUNCÃO QUE VAI SER CHAMADA NO BOTÃO DE SHARE
	FB.ui({
	  method: 'feed',
	  link: 'https://apps.facebook.com/unigotchi/',
		description:'Ganhar sua bolsa no vestibular da UniNorte vai ficar mais f&aacute;cil com a ajuda do Unigotchi.',
		picture:'https://uninorte.dev.fermen.to/unigotchi/compartilhar.jpg'
	}, function(response){});
}
function notificacao() {

}
function mute() {

}
function startTutorial1() {

	hello.destroy();
	iniciarBtn.destroy();
	vestibularBtn.destroy();

	status = 1;

	tutorial1.alpha = 1;	
	studyBtn.alpha = 1;
	waterBtn.alpha = 1;
	eatBtn.alpha = 1;
	playBtn.alpha = 1;
	noCellBtn.alpha = 1;
	relaxBtn.alpha = 1;
	gotchi.alpha = 1;
	potentialBar.alpha = 1;
	healthBar.alpha = 1;
	pBar.alpha = 1;
	hBar.alpha = 1;
	pularTutorial.alpha = 1;
}
function goTutorial2() {
	tutorial1.destroy();
	tutorial2.alpha = 1;
}
function goTutorial3() {
	tutorial2.destroy();
	tutorial3.alpha = 1;
}
function goTutorial4() {
	tutorial3.destroy();
	tutorial4.alpha = 1;
}
function goTutorial5() {
	tutorial4.destroy();
	tutorial5.alpha = 1;
}
function goTutorial6() {
	tutorial5.destroy();
	tutorial6.alpha = 1;
	status = 0;
}
function skipTutorial() {
	if(tutorial1.exists) {
		tutorial1.destroy();
	}
	if(tutorial2.exists) {
		tutorial2.destroy();
	}
	if(tutorial3.exists) {
		tutorial3.destroy();
	}
	if(tutorial4.exists) {
		tutorial4.destroy();
	}
	if(tutorial5.exists) {
		tutorial5.destroy();
	}
	if(tutorial6.exists) {
		tutorial6.destroy();
	}
	status = 0;
	firstTime = 0;
	localStorage.setItem('firstTime',String(firstTime));
}
function matriculeSe() {
	var a = document.createElement("a");
	a.href = "https://www.uninorte.com.br/vestibular/?utm_source=fb_ads&utm_medium=fb_tamagoshi%20&utm_campaign=vest_bolsa0506";
	a.target = "blank";
	var div = document.getElementById("gm4html5_div_id");
	document.body.insertBefore(a,div);
	a.click();
}
function startGame() {
	tutorial6.destroy();

	setInterval(function(){ 
		if(hBar.scale.x > 0.001)
		{
			hBar.scale.x -= 0.000005;	
		}
		if(pBar.scale.x > 0.001)
		{
			pBar.scale.x -= 0.000001;	
		}		
	}, 166);
}
window.onbeforeunload = function(){

	localStorage.setItem('MyHealth',String(hBar.scale.x));
	localStorage.setItem('MyPotential',String(pBar.scale.x));

}


var game = new Phaser.Game(378, 670, Phaser.CANVAS);

game.state.add('StartState', StartState);
game.state.add('PreloadState', PreloadState);
game.state.add('GameState', GameState);
game.state.start('GameState');