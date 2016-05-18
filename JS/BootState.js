var BootState = {
	init: function() {

	},
	preload: function() {
	//	this.load.image('splash', "");
	//	this.load.image('unnLogo', "");
	},
	create: function() {
		this.game.stage.backgroundColor = '#94c936';

		this.state.start('PreloadState.js');
	}
};