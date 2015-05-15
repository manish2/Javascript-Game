FindX.GameOver = function(game) {
    this.gameoverBG;
    this.submitPrompt;
    this.gameoverPrompt;
    this.gameoverPrompt2;
    this.isSubmitted;
    
}

FindX.GameOver.prototype = {
	
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
	restartGame: function (pointer) {
        //localStorage.removeItem('name');
		this.state.start('Game');
	},
    quitGame: function (pointer) {
		this.state.start('StartMenu');
	},
    
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