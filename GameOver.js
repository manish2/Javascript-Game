/**
* GameOver.js is a page for when the game ends.  It will show the score accumulated during the game, a button to submit your score,
* a button to restart the game, a button to go back to the home page, and an image of a pirate skull to match our pirate theme.
*
* @author       Rupinder Sandhu, Luda Shu, Manish Mallavarapu, Jacky Chou, Jox Toyod (Team 10 / 5 bits) 
* @version      0.7
*/
FindX.GameOver = function(game) {
    this.gameoverBG;
    this.submitPrompt;
    this.gameoverPrompt;
    this.gameoverPrompt2;
    this.isSubmitted;
    
}

FindX.GameOver.prototype = {
	
    /**
    * This function loads the buttons and bitmap text for the page. 
    */
	create: function () {
        
        this.isSubmitted = false;
		gameoverBG = this.add.image(0, 0, 'gameoverskull');
		gameoverBG.inputEnabled = true;
        
        submitPrompt = this.add.button(this.world.centerX, this.world.centerY + 280, 'submitButton', this.submit, this);
        submitPrompt.anchor.setTo(0.5, 0.5);
        
		gameoverPrompt = this.add.button(this.world.centerX-92, this.world.centerY+350, 'gameoverplay', this.restartGame, this);
        gameoverPrompt.anchor.setTo(0.5, 0.5);
        
        gameoverPrompt2 = this.add.button(this.world.centerX+92, this.world.centerY+350, 'gameoverquit', this.quitGame, this);
        gameoverPrompt2.anchor.setTo(0.5, 0.5);
        
        yourScoreTitle = this.add.bitmapText(0 , 0,'gamefont', 'Your Score: ', 40);
        yourScoreTitle.x = 100;  
        yourScoreTitle.y = 23;
        yourScoreNumber = this.add.bitmapText(0 , 0,'gamefont', localStorage.getItem('yourscore'), 60);
        yourScoreNumber.anchor.setTo(0.5, 0.5);
        yourScoreNumber.x = 400;  
        yourScoreNumber.y = 50;
        

	},
    
    /**
    *  This function is a pointer to the Game.js page.  When clicked, it will go to that page.
    */
	restartGame: function (pointer) {
        this.add.tween(gameoverPrompt.scale).to( { x: 1.1, y: 1.1 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true)
            .onComplete.addOnce(
            function(){
                this.state.start('Game');
            }, this);
	},
    
    /**
    *  This function is a pointer to the StartMenu.js page.  When clicked, it will go to that page.
    */
    quitGame: function (pointer) {
        
        this.add.tween(gameoverPrompt2.scale).to( { x: 1.1, y: 1.1 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true)
            .onComplete.addOnce(
            function(){
                this.state.start('StartMenu');
            }, this);
		
	},
    
    
    /**
    *  This function is a pointer to a database that stores your end score. 
    */
    submit: function(pointer) {
        
        this.add.tween(submitPrompt.scale).to( { x: 1.1, y: 1.1 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true)
        .onComplete.addOnce(
            function() {
        
                if(this.isSubmitted == false) { 

                    var result = confirm("Click OK to submit your score.");
                        if(result == true){
                            
                            console.log("inside submitted");
                            
                             this.isSubmitted = true;
                             var scoreTosubmit = parseInt(localStorage.getItem('yourscore'));

                            $.ajax({ url: "https://api.mongolab.com/api/1/databases/findx/collections/HighScore?apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1",
                                      data: JSON.stringify( { "name" : localStorage.getItem('name'), "score": scoreTosubmit} ),
                                      type: 'POST',
                                      contentType: "application/json" 
                             });

                        } 
                } else {
                    
                    alert("Your score has been submitted");
                    
                }
            }, this);
    }
};