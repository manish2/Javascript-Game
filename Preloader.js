
/**
 * This script is used to preload all the assets,  
 * after preloading, the game page will load faster when refreshed. 
 * @method Preloader
 * @param game
 */
FindX.Preloader = function(game) {
    this.preloadBar = null; //preloader bar to show the status of asset loading 
    this.titleText = null;
    this.ready = false;
};

FindX.Preloader.prototype = {
	
	/**
	 * This function creates the preloader bar and loads all the assets. 
	 * @method preload
	 */
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY + 250, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0);
		this.load.setPreloadSprite(this.preloadBar);
        this.load.image('titlescreen', 'images/bgPirateMap.jpg');
        this.load.image('titlelogo', 'images/logo.png');
        this.load.bitmapFont('boardfont', 'font/board.png', 'font/board.fnt');
        this.load.bitmapFont('gamefont', 'font/font.png', 'font/font.fnt');
        this.load.spritesheet('PlayButton', 'images/play_spritesheet.png', 159, 82);
        this.load.spritesheet('Settings', 'images/Settings.png', 273, 82);
        this.load.spritesheet('HighScore', 'images/leaderboardButton.png', 406, 68);
        this.load.spritesheet('Achievement', 'images/achievement.png', 437, 62);
        this.load.image('settingsBG', 'images/settingsBG.jpg');
        this.load.spritesheet('skip','images/skipSprite.png', 142, 142);
        this.load.spritesheet('buttonChoice','images/colorButtons.png', 167, 167);
        this.load.spritesheet('Crew', 'images/crew.png', 179, 67);
        this.load.image('crewBG', 'images/crewBG.png');
        this.load.image('close', 'images/close.png');
        this.load.image('loot','images/coinPouch.png');
        this.load.image('gameoverskull','images/GameOver.png');
        this.load.image('gameoverplay','images/GameOverPLAY.png');
        this.load.image('gameoverquit','images/GameOverQUIT.png');
        this.load.image('wheelBanner','images/wheel.png');
        this.load.image('submitButton','images/submitButton.png');
        this.load.image('correct','images/green.png');
        this.load.image('wrong','images/wrong.png');
        this.load.image('lock','images/lock.png');
        this.load.image('bronze','images/bronze.png');
        this.load.image('silver','images/silver.png');
        this.load.image('gold','images/gold.png');
        this.load.image('bronze_silver','images/bronze_silver.png');
        this.load.image('bronze_silver_gold','images/b_s_g.png');
        this.load.image('new','images/new.png');
        this.load.image('Manish','images/Manish.gif');
        this.load.image('Rupinder','images/Rupinder.png');
        this.load.image('Luda','images/Luda.png');
        this.load.image('Jacky','images/Jacky.png');
        this.load.image('Jox','images/Jox.png');
        this.load.audio('select_audio', 'audio/select.mp3');
        this.load.audio('wrong_audio', 'audio/argh.mp3');
        this.load.audio('coin_audio', 'audio/coinbag.mp3');
        this.load.audio('credits_audio', 'audio/credits.mp3');
        this.load.audio('start_audio', 'audio/bgLoop.mp3');
	},
	

	/**
	 * Creates the page and enables resizability.
	 * @method create
	 */
	create: function () {
		this.preloadBar.cropEnabled = false; 
        
	},

	/**
	 * function that updates the page after loading and 
     * changes the sate of the page to start. 
	 * @method update
	 */
	update: function () {
        if(this.cache.isSoundDecoded('start_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
	}
};