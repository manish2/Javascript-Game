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
        submitPrompt = this.add.button(this.world.centerX - 45, this.world.centerY + 250, 'submitButton', this.submit, this);
		gameoverPrompt = this.add.button(this.world.centerX-180, this.world.centerY+350, 'gameoverplay', this.restartGame, this);
        gameoverPrompt2 = this.add.button(this.world.centerX+10, this.world.centerY+350, 'gameoverquit', this.quitGame, this);
        
        
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
		this.state.start('Game');
	},
    
    /**
    *  This function is a pointer to the StartMenu.js page.  When clicked, it will go to that page.
    */
    quitGame: function (pointer) {
		this.state.start('StartMenu');
	},
    
    /**
    *  This function is a pointer to a database that stores your end score. 
    */
    submit: function(pointer) {
        
        console.log(this.isSubmitted);
        
         if(this.isSubmitted == false) { 
             
             this.isSubmitted = true;
                var scoreTosubmit = parseInt(localStorage.getItem('yourscore'));
                console.log(localStorage.getItem('name') + ' ' + localStorage.getItem('yourscore'));  
                $.ajax({ url: "https://api.mongolab.com/api/1/databases/findx/collections/HighScore?apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1",
                      data: JSON.stringify( { "name" : localStorage.getItem('name'), "score": scoreTosubmit} ),
                      type: 'POST',
                      contentType: "application/json" 
                });
         }
    }
};