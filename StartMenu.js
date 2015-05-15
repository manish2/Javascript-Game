/**
* @author       Rupinder Sandhu, Luda Shu, Manish Mallavarapu, Jacky Chou, Jox Toyod (Team 10 / 5 bits) 
* @version      0.7
*
* Start Menu for the game, includes clickable buttons for play,
* leaderboard and settings. The play button leads to the game
* Javascript page, the leaderboard button creates a window 
* which includes the name and scores for each person that
* has submitted a score. Lastly, the settings button creates a 
* window for turning the volume on or off.
*/

/**
 * Shows the Start Menu Interface with designation clickable buttons
 * @method StartMenu
 * @param {} game Variables for the Start Menu screen
 */
FindX.StartMenu = function(game) {
    this.logo;
    this.startPrompt;
    this.highScoreButton;
    this.ding;
    this.startSound;
    this.settingsButton;
    this.onSound;
    this.soundToggle;
    
  
}


FindX.StartMenu.prototype = {
	
	/**
	 * Creates the buttons, sounds and database needed for leaderboard
	 * @method create Functions for the Start Menu screen
	 */
	create: function () {
        this.onSound = true;
        this.stage.disableVisibilityChange = false;
        this.ding = this.add.audio('select_audio');
        this.startSound = this.add.audio('start_audio');
        this.startSound.play('', 0, 0.8, true);
		this.add.image(0, 0, 'titlescreen');
        this.logo = this.add.image(this.world.centerX - 230, this.world.centerY - 400, 'titlelogo');
        highScoreButton = this.add.button(this.world.centerX, this.world.centerY+150, 'HighScore', this.highScore, this, 1 , 0);
		startPrompt = this.add.button(this.world.centerX, this.world.centerY+80, 'PlayButton', this.startGame, this, 1 , 0);
        settingsButton = this.add.button(this.world.centerX, this.world.centerY+220, 'Settings', this.settingsMenu, this, 0 , 1);
        startPrompt.anchor.setTo(0.5, 0.5);
        highScoreButton.anchor.setTo(0.5, 0.5);
        settingsButton.anchor.setTo(0.5, 0.5);
        
        $.ajax({
           url:  'https://api.mongolab.com/api/1/databases/findx/collections/HighScore?s={\"score\":-1}&l=10&apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                     
                for(var i = 0; i < 10; i++ ) {
                    localStorage.setItem('topName' + i , data[i].name);
                    localStorage.setItem('topScore' + i , data[i].score);
                }       
            }
                   
        });
        
        
    
	},
	/**
	 * Function call when Play Button is click
	 * @method startGame Button with a pointer
	 * @param {} pointer Pointer to the game.js screen
	 */
	startGame: function (pointer) {
        this.ding.play();
        this.startSound.stop();
		this.state.start('Game');
        
	},
    
    /**
     * Function call when High Score Button is click, includes an online 
     * leaderboard that pull and posts from mongodb database
     * @method highScore Button with a pointer
     * @param {} pointer Points to a window created for leaderboard
     */
    highScore: function(pointer) {
        
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        
        var score = [];
        var name = [];
        var rank = [];
        var titleIndex;
        var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
        sprite.anchor.setTo(0.5, 0.5);
        
        backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
        backToMenu.inputEnabled = true;
         
        highScore = this.add.bitmapText(0 , 0,'gamefont', 'Leaderboard', 40);
        sprite.addChild(highScore);
        highScore.anchor.setTo(0.5, 0.5);
        highScore.x = 0;  
        highScore.y = -200;
        
        var yPos = -100;
        var xPos = 0;
                    
        $.ajax({
           url:  'https://api.mongolab.com/api/1/databases/findx/collections/HighScore?s={\"score\":-1}&l=10&apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                     
                for(var i = 0; i < 10; i++ ) {
                    localStorage.setItem('topName' + i , data[i].name);
                    localStorage.setItem('topScore' + i , data[i].score);
                }       
            }
                   
        });
        
        titleIndex = this.add.bitmapText(0 , 0,'gamefont', 'RANK   ' + 'NAME   ' + 'SCORE' , 30);
        sprite.addChild(titleIndex);
        titleIndex.anchor.setTo(0.5, 0.5);
        titleIndex.x = 0;  
        titleIndex.y = -150;   
        
        for(var i = 0; i < 10; i++, yPos += 25 ) {
            
            if (localStorage.getItem('topName' + i) != null) {
                //rank
                rank[i] = this.add.bitmapText(0 , 0,'gamefont', "" + (i+1) , 25);
                sprite.addChild(rank[i]);
                rank[i].anchor.setTo(0.5, 0.5);
                rank[i].x = -125;  
                rank[i].y = yPos;

                //name
                name[i] = this.add.bitmapText(0 , 0,'gamefont',  "" + localStorage.getItem('topName' + i), 25);
                sprite.addChild(name[i]);
                name[i].anchor.setTo(0.5, 0.5);
                name[i].x = -5;  
                name[i].y = yPos;

                //score
                score[i] = this.add.bitmapText(0 , 0,'gamefont',  "" + localStorage.getItem('topScore' + i), 25);
                sprite.addChild(score[i]);
                score[i].anchor.setTo(0.5, 0.5);
                score[i].x = 120;  
                score[i].y = yPos;
                
            }else {
                
                //rank
                rank[i] = this.add.bitmapText(0 , 0,'gamefont', "" + (i+1) , 25);
                sprite.addChild(rank[i]);
                rank[i].anchor.setTo(0.5, 0.5);
                rank[i].x = -125;  
                rank[i].y = yPos;

                //name
                name[i] = this.add.bitmapText(0 , 0,'gamefont',  "--", 25);
                sprite.addChild(name[i]);
                name[i].anchor.setTo(0.5, 0.5);
                name[i].x = -5;  
                name[i].y = yPos;

                //score
                score[i] = this.add.bitmapText(0 , 0,'gamefont',  "--", 25);
                sprite.addChild(score[i]);
                score[i].anchor.setTo(0.5, 0.5);
                score[i].x = 120;  
                score[i].y = yPos;     
            }
        }
        
            
             
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 200;
        
        backToMenu.events.onInputDown.add(
            function() {
                startPrompt.inputEnabled = true;
                highScoreButton.inputEnabled = true;
                settingsButton.inputEnabled = true;
                sprite.destroy(); 
                backToMenu.destroy();
                
            }
            ,this);
    },
    
    /**
     * Settings Menu with toggle On and off Sound
     * @method settingsMenu A sound setting menu
     * @param {} pointer Points to a window created for settings
     */
    settingsMenu : function(pointer){
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        // background Sprite
        var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
        sprite.anchor.setTo(0.5, 0.5);
        
        soundText = this.add.bitmapText(0 , 0,'gamefont', 'Sound:', 52);
        this.soundToggle = this.add.bitmapText(0 , 0,'gamefont', 'off'  , 52);
        backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
        backToMenu.inputEnabled = true;
        
        this.soundToggle.inputEnabled = true;
        
        sprite.addChild(soundText);
        soundText.anchor.setTo(0.5, 0.5);
        soundText.x = -80;
        soundText.y = 0;
        
        sprite.addChild(this.soundToggle);
        this.soundToggle.anchor.setTo(0.5, 0.5);
        this.soundToggle.x = 100;
        this.soundToggle.y = 0;
        
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 200;
        
        // toggle sound on/off anonymous function calls appropriate methods
        this.soundToggle.events.onInputDown.add(
            function() {
                if(this.onSound == true){
                    this.onSound = false;
                    this.soundToggle.setText('on'); 
                    this.game.sound.mute = true;
        
                }else{ 
                    this.onSound = true;
                    this.soundToggle.setText('off');
                    this.game.sound.mute = false; 
                }
            }
            ,this);
        
        // click to go back to menu
        backToMenu.events.onInputDown.add(
            function() {
                startPrompt.inputEnabled = true;
                highScoreButton.inputEnabled = true;
                settingsButton.inputEnabled = true;
                soundText.destroy();
                this.soundToggle.destroy();
                sprite.destroy();
                backToMenu.destroy();
            }
            ,this);
    },
    
        
        
     
};