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
    this.achievementButton;
    this.onSound;
    this.soundToggle;
    this.newIcon;
    this.iconAppeared;
    this.crewButton;
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
        this.iconAppeared = false;
        
        highScoreButton = this.add.button(this.world.centerX, this.world.centerY+150, 'HighScore', this.highScoreTween, this, 1 , 0);
		startPrompt = this.add.button(this.world.centerX, this.world.centerY+80, 'PlayButton', this.startGame, this, 1 , 0);
        settingsButton = this.add.button(this.world.centerX, this.world.centerY+300, 'Settings', this.settingsTween, this, 0 , 1);
        achievementButton = this.add.button(this.world.centerX, this.world.centerY+220, 'Achievement', this.achieveTween, this, 1 , 0);
        crewButton = this.add.button(this.world.centerX, this.world.centerY+370, 'Crew', this.crewTweenFirst, this, 0 , 1);
        
        startPrompt.anchor.setTo(0.5, 0.5);
        highScoreButton.anchor.setTo(0.5, 0.5);
        settingsButton.anchor.setTo(0.5, 0.5);
        achievementButton.anchor.setTo(0.5, 0.5);
         crewButton.anchor.setTo(0.5, 0.5);
        
        $.ajax({
           url:  'https://api.mongolab.com/api/1/databases/findx/collections/HighScore?s={\"score\":-1}&l=10&apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                     
                for(var i = 0; i < data.length; i++ ) {
                    localStorage.setItem('topName' + i , data[i].name);
                    localStorage.setItem('topScore' + i , data[i].score);
                    localStorage.setItem('trophy' + i, data[i].achieve);
                }       
            }
                   
        });
        
        if(localStorage.getItem('isViewed') == null){
            localStorage.setItem('isViewed', 0);  
        }
        
        if(parseInt(localStorage.getItem('achieve')) ==  1 && parseInt(localStorage.getItem('isViewed')) == 0){
             this.iconAppeared = true;
             this.newIcon =  this.add.image(this.world.centerX - 210,  this.world.centerY+ 220, 'new'); 
             this.newIcon.anchor.setTo(0.5, 0.5);
             this.newIcon.alpha = 0;
             
             this.add.tween(this.newIcon).to( { alpha: 1 }, 700, Phaser.Easing.Linear.None, true, 0, 1000, true);
           
        } else if (parseInt(localStorage.getItem('achieve')) ==  2 && parseInt(localStorage.getItem('isViewed')) == 1){
            this.iconAppeared = true;
             this.newIcon =  this.add.image(this.world.centerX - 210,  this.world.centerY+ 220, 'new'); 
             this.newIcon.anchor.setTo(0.5, 0.5);
             this.newIcon.alpha = 0;

             this.add.tween(this.newIcon).to( { alpha: 1 },700, Phaser.Easing.Linear.None, true, 0, 1000, true);
           
            
        } else if (parseInt(localStorage.getItem('achieve')) ==  3 && parseInt(localStorage.getItem('isViewed')) == 2){
            this.iconAppeared = true;
            this.newIcon =  this.add.image(this.world.centerX - 210,  this.world.centerY+ 220, 'new'); 
             this.newIcon.anchor.setTo(0.5, 0.5);
             this.newIcon.alpha = 0;

             this.add.tween(this.newIcon).to( { alpha: 1 }, 700, Phaser.Easing.Linear.None, true, 0, 1000, true);
           
        }
	},
    
    /**
    * Creates the achievement display
    *
    */
    achieve: function() {
        
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        achievementButton.inputEnabled = false;
        crewButton.inputEnabled = false;
        
        if(this.iconAppeared){
            this.iconAppeared = false;
            this.newIcon.destroy();
        }
        
        var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
        sprite.anchor.setTo(0.5, 0.5);
        
        var achieveText = this.add.bitmapText(0 , 0,'gamefont', 'Achievements', 45);
        sprite.addChild(achieveText);
        achieveText.anchor.setTo(0.5, 0.5);
        achieveText.x = 0;  
        achieveText.y = -250;
        
        //achieve 1 ---------------
        if(parseInt(localStorage.getItem('achieve')) ==  1){
            
            localStorage.setItem('isViewed', 1);
            
            
            
            var bronzeImg = this.add.image(this.world.centerX, this.world.centerY+10, 'bronze');
            sprite.addChild(bronzeImg);
            bronzeImg.x = -170;
            bronzeImg.y = -155;
            bronzeImg.width = 100;
            bronzeImg.height = 100;
            
            var unlocktext1 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED PRO TROPHY', 20);
            sprite.addChild(unlocktext1);
            unlocktext1.x = -60;
            unlocktext1.y = -120;
            
             //lock for silver achievement
            var lockimg2 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            var locktext2 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'Reach a score above\n 500 to unlock', 20);
            
            sprite.addChild(locktext2);
            locktext2.x = -70;
            locktext2.y = -10;
            sprite.addChild(lockimg2);
            lockimg2.x = -120;
            lockimg2.y = 10;
            
            //lock for gold achievement
            var lockimg3 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            var locktext3 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '??  ??   ??', 30);
            
            sprite.addChild(locktext3);
            locktext3.x = -70;
            locktext3.y = 100;
            sprite.addChild(lockimg3);
            lockimg3.x = -120;
            lockimg3.y = 120;
    
        }else if(parseInt(localStorage.getItem('achieve')) ==  2){
            
            localStorage.setItem('isViewed', 2);
            
            
            //display bronze
            var bronzeImg = this.add.image(this.world.centerX, this.world.centerY+10, 'bronze');
            sprite.addChild(bronzeImg);
            bronzeImg.x = -170;
            bronzeImg.y = -155;
            bronzeImg.width = 100;
            bronzeImg.height = 100;
            
            var unlocktext1 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED PRO TROPHY', 20);
            sprite.addChild(unlocktext1);
            unlocktext1.x = -60;
            unlocktext1.y = -120;
            
            // display silver
            var silverImg = this.add.image(this.world.centerX, this.world.centerY+10, 'silver');
            sprite.addChild(silverImg);
            silverImg.x = -170;
            silverImg.y = -45;
            silverImg.width = 100;
            silverImg.height = 100;
            
            var unlocktext2 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED ELITE TROPHY', 20);
            sprite.addChild(unlocktext2);
            unlocktext2.x = -60;
            unlocktext2.y = -30;
            
            //lock for gold achievement
            var lockimg3 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            sprite.addChild(lockimg3);
            lockimg3.x = -120;
            lockimg3.y = 120;
            
            var locktext3 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'Reach a score above\n 1000 to unlock', 20);
            
            sprite.addChild(locktext3);
            locktext3.x = -70;
            locktext3.y = 90;
    
        } else if(parseInt(localStorage.getItem('achieve')) ==  3){
            
            localStorage.setItem('isViewed', 3);
            
            //display bronze
            var bronzeImg = this.add.image(this.world.centerX, this.world.centerY+10, 'bronze');
            sprite.addChild(bronzeImg);
            bronzeImg.x = -170;
            bronzeImg.y = -155;
            bronzeImg.width = 100;
            bronzeImg.height = 100;
            
            var unlocktext1 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED PRO TROPHY', 20);
            sprite.addChild(unlocktext1);
            unlocktext1.x = -60;
            unlocktext1.y = -120;
            
            // display silver
            var silverImg = this.add.image(this.world.centerX, this.world.centerY+10, 'silver');
            sprite.addChild(silverImg);
            silverImg.x = -170;
            silverImg.y = -45;
            silverImg.width = 100;
            silverImg.height = 100;
            
            var unlocktext2 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED ELITE TROPHY', 20);
            sprite.addChild(unlocktext2);
            unlocktext2.x = -60;
            unlocktext2.y = -30;
        
            //display gold
            var goldImg = this.add.image(this.world.centerX, this.world.centerY+10, 'gold');
            sprite.addChild(goldImg);
            goldImg.x = -170;
            goldImg.y = 65;
            goldImg.width = 100;
            goldImg.height = 100;
            
            var unlocktext3 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'UNLOCKED MASTER TROPHY', 20);
            sprite.addChild(unlocktext3);
            unlocktext3.x = -60;
            unlocktext3.y = 80;
                  
        } else {
            
            //lock for bronze achievement
            var lockimg1 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            var locktext1 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', 'Reach a score above\n250 to unlock', 20);
            
            sprite.addChild(locktext1);
            locktext1.x = -70;
            locktext1.y = -100;
            sprite.addChild(lockimg1);
            lockimg1.x = -120;
            lockimg1.y = -100;
            
            //lock for silver achievement
            var lockimg2 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            var locktext2 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '??  ??   ??', 30);
            
            sprite.addChild(locktext2);
            locktext2.x = -70;
            locktext2.y = -10;
            sprite.addChild(lockimg2);
            lockimg2.x = -120;
            lockimg2.y = 10;
            
            //lock for gold achievement
            var lockimg3 = this.createLock(this.world.centerX, this.world.centerY+10, 'lock');
            var locktext3 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '??  ??   ??', 30);
            
            sprite.addChild(locktext3);
            locktext3.x = -70;
            locktext3.y = 100;
            sprite.addChild(lockimg3);
            lockimg3.x = -120;
            lockimg3.y = 120;
                       
        }
        
        //lines
        var line1 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '_______________________', 30);
        sprite.addChild(line1);
        line1.x = -160;
        line1.y = -90;
               
        var line2 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '_______________________', 30);
        sprite.addChild(line2);
        line2.x = -160;
        line2.y = 20;
              
        var line3 = this.add.bitmapText(this.world.centerX, this.world.centerY+10, 'gamefont', '_______________________', 30);
        sprite.addChild(line3);
        line3.x = -160;
        line3.y = 132;
        
        
        backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
        backToMenu.inputEnabled = true;
        
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 300;
        
         backToMenu.events.onInputDown.add(
                   
            function() {
                this.add.tween(backToMenu.scale).to( { x: 1.3, y: 1.3 }, 100, 
                    Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
                        function() {
                            startPrompt.inputEnabled = true;
                            highScoreButton.inputEnabled = true;
                            settingsButton.inputEnabled = true;
                            achievementButton.inputEnabled = true;
                            crewButton.inputEnabled = true;
                            sprite.destroy();
                            backToMenu.destroy();
                        }, this)
                }
                ,this);
        
    },
    
    /**
    * Creates the lock icon
    * @param xLoc the location of the icon
    * @return returns the lock icon with specified location
    */
    createLock: function(xloc, yloc, key) {
        
        var lockimg = this.add.image(xloc, yloc, key);
        lockimg.width = 75;
        lockimg.height = 75;    
        lockimg.anchor.setTo(0.5, 0.5);
       
          
        return lockimg;
        
    },
    
    /**
    * Function call when achievement is click
    * adds a tween to the achievement button
    */
    crewTweenFirst: function() {     
        
        this.add.tween(crewButton.scale).to( { x: .8, y: .8 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
            this.crewTween, this);
        
    },
    
     /**
    * Creates the credit screen.
    *
    */
    crewTween: function() {
        this.startSound.stop();
        this.startSound = this.add.audio('credits_audio');    
        this.startSound.play('', 0, 0.8, true);
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        achievementButton.inputEnabled = false;
        crewButton.inputEnabled = false;
        
        
        var sprite = this.add.image(this.world.centerX, this.world.centerY+200, 'crewBG');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.width = 500;
        sprite.height = 500;
        
        var crew1Text = this.add.bitmapText(0 , 0,'gamefont', 'Manish', 120);
        sprite.addChild(crew1Text);
        crew1Text.anchor.setTo(0.5, 0.5);
        crew1Text.x = -50;  
        crew1Text.y = -420;
        
        crew1Avatar = this.add.image(0 , 0,'Manish');
        sprite.addChild(crew1Avatar);
        crew1Avatar.anchor.setTo(0.5, 0.5);
        
        crew1Avatar.width = 400;
        crew1Avatar.height = 300;
        crew1Avatar.x = -500;
        crew1Avatar.y = -420;
        
        var crew2Text = this.add.bitmapText(0 , 0,'gamefont', 'Luda', 120);
        sprite.addChild(crew2Text);
        crew2Text.anchor.setTo(0.5, 0.5);
        crew2Text.x = -120;  
        crew2Text.y = -220;
        
        crew2Avatar = this.add.image(0 , 0,'Luda');
        sprite.addChild(crew2Avatar);
        crew2Avatar.anchor.setTo(0.5, 0.5);
        
        crew2Avatar.width = 200;
        crew2Avatar.height = 200;
        crew2Avatar.x = 600;
        crew2Avatar.y = -220;
        
        var crew3Text = this.add.bitmapText(0 , 0,'gamefont', 'Rupinder', 120);
        sprite.addChild(crew3Text);
        crew3Text.anchor.setTo(0.5, 0.5);
        crew3Text.x = 0;  
        crew3Text.y = -30;
        
        crew3Avatar = this.add.image(0 , 0,'Rupinder');
        sprite.addChild(crew3Avatar);
        crew3Avatar.anchor.setTo(0.5, 0.5);
        
        crew3Avatar.width = 170;
        crew3Avatar.height = 200;
        crew3Avatar.x = -590;
        crew3Avatar.y = 15;
        
        var crew4Text = this.add.bitmapText(0 , 0,'gamefont', 'Jacky', 120);
        sprite.addChild(crew4Text);
        crew4Text.anchor.setTo(0.5, 0.5);
        crew4Text.x = -100;  
        crew4Text.y = 200;
        
        crew4Avatar = this.add.image(0 , 0,'Jacky');
        sprite.addChild(crew4Avatar);
        crew4Avatar.anchor.setTo(0.5, 0.5);
        
        crew4Avatar.width = 175;
        crew4Avatar.height = 175;
        crew4Avatar.x = 600;
        crew4Avatar.y = 210;
        
        var crew5Text = this.add.bitmapText(0 , 0,'gamefont', 'Jox', 120);
        sprite.addChild(crew5Text);
        crew5Text.anchor.setTo(0.5, 0.5);
        crew5Text.x = -180;  
        crew5Text.y = 400;
        
        crew5Avatar = this.add.image(0 , 0,'Jox');
        sprite.addChild(crew5Avatar);
        crew5Avatar.anchor.setTo(0.5, 0.5);
        
        crew5Avatar.width = 200;
        crew5Avatar.height = 200;
        crew5Avatar.x = -600;
        crew5Avatar.y = 400;
        
        backToMenu = this.add.image(0 , 0,'close');
        backToMenu.inputEnabled = true;
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        
        backToMenu.width = 200;
        backToMenu.height = 200;
        backToMenu.x = 555;
        backToMenu.y = -580;
        
         backToMenu.events.onInputDown.add(
                   
            function() {
                this.add.tween(backToMenu.scale).to( { x: 1.3, y: 1.3 }, 100, 
                    Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
                        function() {
                            this.startSound.stop();
                            this.startSound = this.add.audio('start_audio');    
                            this.startSound.play('', 0, 0.8, true);
                            startPrompt.inputEnabled = true;
                            highScoreButton.inputEnabled = true;
                            settingsButton.inputEnabled = true;
                            achievementButton.inputEnabled = true;
                            crewButton.inputEnabled = true;
                            sprite.destroy();
                            backToMenu.destroy();
                        }, this)
                }
                ,this);
        
    },
    
    
    /**
    * Function call when achievement is click
    * adds a tween to the achievement button
    */
    achieveTween: function() {     
        
        this.add.tween(achievementButton.scale).to( { x: .8, y: .8 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
            this.achieve, this);
        
    },
	/**
	 * Function call when Play Button is click
	 * @method startGame Button with a pointer
	 * @param {} pointer Pointer to the game.js screen
	 */
	startGame: function (pointer) {
        this.ding.play();
        this.startSound.stop();
        this.add.tween(startPrompt.scale).to( { x: .8, y: .8 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
            function() {
                this.state.start('Game');
            }, this);    
	},
    
    
    /*
     * Tween the leaderBoard button
     * then call the settings Menu thereafter
     */
    highScoreTween: function() {
        this.add.tween(highScoreButton.scale).to( { x: .8, y: .8 }, 50, 
                Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(this.highScore, this); 
    },
    
    /**
     * Function call when LeaderBoard Button is click, includes an online 
     * leaderboard that pull and posts from mongodb database
     * @method highScore Button with a pointer
     * @param {} pointer Points to a window created for leaderboard
     */
    highScore: function(pointer) {
        
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        achievementButton.inputEnabled = false;
        crewButton.inputEnabled = false;
        
        var score = [];
        var name = [];
        var rank = [];
        var achieve =[];
        var titleIndex;
        var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
        sprite.anchor.setTo(0.5, 0.5);
        
        
        backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
        backToMenu.inputEnabled = true;
         
        highScore = this.add.bitmapText(0 , 0,'gamefont', 'Leaderboard', 40);
        sprite.addChild(highScore);
        highScore.anchor.setTo(0.5, 0.5);
        highScore.x = 0;  
        highScore.y = -270;
        
        var yPos = -140;
        var xPos = 0;
                    
        $.ajax({
           url:  'https://api.mongolab.com/api/1/databases/findx/collections/HighScore?s={\"score\":-1}&l=10&apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                     
                for(var i = 0; i < data.length; i++ ) {
                    localStorage.setItem('topName' + i , data[i].name);
                    localStorage.setItem('topScore' + i , data[i].score);
                    localStorage.setItem('trophy' + i, data[i].achieve);
                }       
            }
                   
        });
        
        titleIndex = this.add.bitmapText(0 , 0,'gamefont', 'RANK        ' + '   NAME       ' + '       SCORE      '  + '   TROPHY', 20);
        sprite.addChild(titleIndex);
        titleIndex.anchor.setTo(0.5, 0.5);
        titleIndex.x = 0;  
        titleIndex.y = -180;   
        
        var fontHighScore = 32; // font for the high score records
        
        for(var i = 0; i < 10; i++, yPos += 40 ) {
            
            if (localStorage.getItem('topName' + i) != null) {
                //rank
                rank[i] = this.add.bitmapText(0 , 0,'gamefont', "" + (i+1) , fontHighScore);
                sprite.addChild(rank[i]);
                rank[i].anchor.setTo(0.5, 0.5);
                rank[i].x = -220;  
                rank[i].y = yPos;

                //name
                name[i] = this.add.bitmapText(0 , 0,'boardfont',  "" + localStorage.getItem('topName' + i), fontHighScore);
                sprite.addChild(name[i]);
                name[i].anchor.setTo(0.5, 0.5);
                name[i].x = -85;  
                name[i].y = yPos;

                //score
                score[i] = this.add.bitmapText(0 , 0,'gamefont',  "" + localStorage.getItem('topScore' + i), fontHighScore);
                sprite.addChild(score[i]);
                score[i].anchor.setTo(0.5, 0.5);
                score[i].x = 70;  
                score[i].y = yPos;
                
                //achieve
                
                if(parseInt(localStorage.getItem('trophy' + i)) == 1){
                    
                    var t_bronze = this.add.image(0,0, 'bronze');
                    sprite.addChild(t_bronze);
                    t_bronze.anchor.setTo(0.5, 0.5);
                    t_bronze.x = 200;  
                    t_bronze.y = yPos;
                    t_bronze.height = 40;
                    t_bronze.width = 40;
                
                } else if (parseInt(localStorage.getItem('trophy' + i)) == 2){
                    
                    var t_bronze_silver= this.add.image(0,0, 'bronze_silver');
                    t_bronze_silver.anchor.setTo(0.5, 0.5);  
                    sprite.addChild(t_bronze_silver);
                    t_bronze_silver.x = 200;
                    t_bronze_silver.y = yPos;
                    t_bronze_silver.height = 40;
                    t_bronze_silver.width = 82;
                    
        
                           
                } else if (parseInt(localStorage.getItem('trophy' + i)) == 3){
                    
                    console.log("inside achieve 3");
                    var withgold = this.add.image(0,0, 'bronze_silver_gold');
                    withgold.anchor.setTo(0.5, 0.5); 
                    
                    sprite.addChild(withgold);
                    withgold.x = 200;
                    withgold.y = yPos;
                    withgold.height = 40;
                    withgold.width = 120;
                    
                } else {
                    
                    var dash = this.add.bitmapText(0 , 0,'gamefont',  "--", fontHighScore);
                    sprite.addChild(dash);
                    dash.anchor.setTo(0.5, 0.5);
                    dash.x = 200;  
                    dash.y = yPos;
                }
                
            }else {
                
                //rank
                rank[i] = this.add.bitmapText(0 , 0,'gamefont', "" + (i+1) , fontHighScore);
                sprite.addChild(rank[i]);
                rank[i].anchor.setTo(0.5, 0.5);
                rank[i].x = -220;  
                rank[i].y = yPos;

                //name
                name[i] = this.add.bitmapText(0 , 0,'gamefont',  "--", fontHighScore);
                sprite.addChild(name[i]);
                name[i].anchor.setTo(0.5, 0.5);
                name[i].x = -85;  
                name[i].y = yPos;

                //score
                score[i] = this.add.bitmapText(0 , 0,'gamefont',  "--", fontHighScore);
                sprite.addChild(score[i]);
                score[i].anchor.setTo(0.5, 0.5);
                score[i].x = 70;  
                score[i].y = yPos;     
                
                //achieve
                achieve[i] = this.add.bitmapText(0 , 0,'gamefont',  "--", fontHighScore);
                sprite.addChild(achieve[i]);
                achieve[i].anchor.setTo(0.5, 0.5);
                achieve[i].x = 200;  
                achieve[i].y = yPos;   
            }
        }
        
            
             
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 300;
        
        backToMenu.events.onInputDown.add(
            function() {
                this.add.tween(backToMenu.scale).to( { x: 1.3, y: 1.3 }, 100, 
                    Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
                    function() {
                        startPrompt.inputEnabled = true;
                        highScoreButton.inputEnabled = true;
                        settingsButton.inputEnabled = true;
                        achievementButton.inputEnabled = true;
                        crewButton.inputEnabled = true;
                        sprite.destroy(); 
                        backToMenu.destroy();
                    }, this)
                
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
        achievementButton.inputEnabled = false;
        crewButton.inputEnabled = false;
        
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
                this.add.tween(backToMenu.scale).to( { x: 1.3, y: 1.3 }, 100, 
                    Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(
                        function() {
                            startPrompt.inputEnabled = true;
                            highScoreButton.inputEnabled = true;
                            settingsButton.inputEnabled = true;
                            achievementButton.inputEnabled = true;
                            crewButton.inputEnabled = true;
                            soundText.destroy();
                            this.soundToggle.destroy();
                            sprite.destroy();
                            backToMenu.destroy();
                        }, this)
                }
                ,this);
    },
    
    /*
     * Tween the settings button
     * then call the settings Menu thereafter
     */
    settingsTween: function() {
        this.add.tween(settingsButton.scale).to( { x: .8, y: .8 }, 50, 
                Phaser.Easing.Linear.None, true, 0, 0, true).onComplete.addOnce(this.settingsMenu, this); 
    }
     
};