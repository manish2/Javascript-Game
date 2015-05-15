/**
 * @author       Rupinder Sandhu, Luda Shu, Manish Mallavarapu, Jacky Chou, Jox Toyod (Team 10 / 5 bits) 
 * @version      0.7
 *
 *
 * The game state.
 *
 * This describes all the game functionality and interface in the game screen
 * It constructs the game prototype and all the function associated.
 * 
 * This state appears when the user tap the play button on the Start menu
 * and in the game over when the user click play again button in the Game over state
 *
 */

/**
 * The game instance desclaration
 * Declare all the instances that is use through the game.
 *
 * @class FindX.Game integrates this game state to the current game object
 * @param {game} game A reference to the currently running game.
 */
FindX.Game = function(game) {
    this.randomNumberTop;
    this.randomNumberBottom;
    this.operator;
    this.result;
    this.randomOperation;
    this.showNumberTop;
    this.showNumberBottom;
    this.showOperator;
    this.showUnderLine;
    this.showResult;
    this.topNumberText;
    this.showCurrentOperator;
    this.randomX;
    this.choice;
    this.showChoice1;
    this.showChoice2;
    this.showChoice3;
    this.choice1;
    this.choice2;
    this.choice3;
    this.ansMidButton;
    this.ansLeftButton;
    this.ansRightButton;
    this.choiceButtons;
    this.randTemp;
    this.skipButton;
    this.timer;
    this.showTimer;
    this.timeEvents;
    this.score;
    this.showScore;
    this.userAns; 
    this.userFalseAns; 
    this.timerConstant; 
    this.coins;
    this.showcoins;
    this.addcoin;
    this.wrongding;
    this.coinding; 
    this.difficultyTracker;
    this.consecutiveAns;
    this.minTopNumber;
    this.maxTopNumber;
};


/**
 * The game prototype
 * Describes and encapsulate all function the are
 * associated with the game
 */
FindX.Game.prototype = {

	/**
	 * Initializes the game instances and creates the 
     * images and graphic associated in the game.
	 * @method create
	 */
    create: function() {
        //initialize all instance needed
        this.game.stage.disableVisibilityChange = true;
        this.operator = ['+', '-' ,'*', '/'];
        this.randTemp = [1, 2, 3];
        this.timer = 5; 
        this.userAns = false; 
        this.userFalseAns = false; 
        this.timerConstant = 3;
        this.consecutiveAns = 0;
        this.coins = 0;
        this.addcoin = 1;
        this.score = 0;
        this.minTopNumber = 0;
        this.maxTopNumber = 9;
        this.difficultyTracker = 1;
       
        // add the images on the top screen 
        this.add.image(0, 0, 'titlescreen');
        this.add.image(this.world.centerX, 100, 'wheelBanner').anchor.setTo(0.5,0.5);
        this.add.image(50, 70, 'loot', null); 
        
        // displays the math equation
        this.mathScene();  

        //shows the timer and timer events
        this.showTimer  = this.add.bitmapText(this.world.centerX-1, 98, 'gamefont',  '' + this.timer, 42);
        this.showTimer.anchor.setTo(0.5, 0.5);
        this.timeEvents = this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this); 
        
        // coins
        this.showcoins = this.add.bitmapText(110, 90, 'gamefont',  '' + this.coins, 40);
        this.showcoins.anchor.setTo(0.5, 0.5);
        
        //score
        this.showScore = this.add.bitmapText(400, 70, 'gamefont',  '' + this.score, 40);       
        this.wrongding = this.add.audio('wrong_audio');
        this.coinding = this.add.audio('coin_audio');        
        
        //skip button
        this.skipButton = this.add.button(420, 200, 'skip', this.skipcondition, this);
        this.skipButton.frame = 1;
        this.skipButton.height = 100;
        this.skipButton.width = 100;
        
    },
    
    
	/**
	 * Function helper for the checkAnswer
     * click one of the choice buttons
	 * @@param ans the answer get by player
	 * @return 
	 */
    check: function(ans, bNumber) {
        
        return function () {
            
          this.checkAnswer(ans, bNumber);
        };
              
    },
    
    /**
	 * Checks the ans and change background color(background color is not yet working.
     *
	 * @param ans the answer get by player
     * @param bNumber 
	 */ 
    checkAnswer: function(ans, bNumber){
        
        if(ans == this.choice){
            this.userAns = true;
            this.difficultyTracker++;
            this.notice();
            this.nextEquation();            
        } 
        else { 
            this.userAns = false; 
            this.userFalseAns = true; 
            this.notice();
        } 
    },
    
    
    /**
	 * Sets the difficulty of the game
     * When score is at certain level it
     * increase the diffulty
	 */ 
    difficultySetter : function() {
        
        if(this.difficultyTracker >= 10) {        
            this.minTopNumber = 10;
            this.maxTopNumber = 99;
        }
        else if(this.difficultyTracker >= 5){
            this.minTopNumber = 0;
            this.maxTopNumber = 9;      
        } 
         
    },
    
    /**
	 * draw the yellow buttons with rounded curve
     *  @returns returns rounded square with the specified color
     */
    drawButtons: function(x, y, width, height, radius, fill) {
        
         this.choiceButtons = this.add.bitmapData(200,250);
    
         this.choiceButtons.ctx.beginPath();
         this.choiceButtons.ctx.moveTo(x + radius, y);
         this.choiceButtons.ctx.lineTo(x + width - radius, y);
         this.choiceButtons.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
         this.choiceButtons.ctx.lineTo(x + width, y + height - radius);
         this.choiceButtons.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
         this.choiceButtons.ctx.lineTo(x + radius, y + height);
         this.choiceButtons.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
         this.choiceButtons.ctx.lineTo(x, y + radius);
         this.choiceButtons.ctx.quadraticCurveTo(x, y, x + radius, y);
         this.choiceButtons.ctx.closePath();
         this.choiceButtons.ctx.fillStyle = fill;
         this.choiceButtons.ctx.fill();
                      
        return this.choiceButtons;
        
    },
      
    /**
	 * Create the math equation
     * calls the random generator and displays the 
     * equation that the user interacts
     *
     */
    mathScene: function() {

        this.randomGenerator();
        this.currentOperator = this.solveEquation();
        
        this.showXlocation();
        this.showButtons();
        
        this.showNumberTop = this.add.bitmapText(this.world.centerX, this.world.centerY-200, 'gamefont',  '' + this.randomNumberTop, 105);
        this.showNumberTop.anchor.setTo(0.5, 0.5);	
        this.showNumberBottom =  this.add.bitmapText(this.world.centerX, this.world.centerY-70, 'gamefont', '' + this.randomNumberBottom, 105);
        this.showNumberBottom.anchor.setTo(0.5, 0.5)
        this.showOperator = this.add.bitmapText(this.world.centerX - 70, this.world.centerY-110, 'gamefont', '' + this.currentOperator, 105);
        this.showOperator.anchor.setTo(0.5, 0.5);	
        this.showUnderLine = this.add.bitmapText(this.world.centerX - 60, this.world.centerY-100, 'gamefont', '__', 105);
        this.showResult = this.add.bitmapText(this.world.centerX + 5, this.world.centerY + 75, 'gamefont', '' + this.result, 105);
        this.showResult.anchor.setTo(0.5, 0.5);	
        
        this.choice1.events.onInputDown.addOnce(this.check(this.ansLeftButton, 1), this);
        this.choice2.events.onInputDown.addOnce(this.check(this.ansMidButton, 2), this);
        this.choice3.events.onInputDown.addOnce(this.check(this.ansRightButton, 3), this);
        
   },
    
    /**
	 * Creates the next equation of the game
     * after the user had chosen the answer
     * or the user skip the game
     *
     */
    nextEquation: function() {
           
        this.showNumberTop.destroy(); 
        this.showNumberBottom.destroy(); 
        this.showOperator.destroy(); 
        this.showUnderLine.destroy();
        this.showResult.destroy();
        this.choice1.destroy();
        this.showChoice1.destroy();
        this.showChoice2.destroy();
        this.showChoice3.destroy();
        this.randTemp = [1, 2, 3];
        
        this.mathScene();      
    },
    
    /**
	 * Displays check mark when user enters
     * the right answer and a skull display
     * when user get the wrong the answer
     *
     */
    notice: function(){
        
        if(this.userAns==true){
		this.correct = this.add.sprite(10,475,'correct');
        this.correct.width = 100;
        this.correct.height = 100;
		this.correct.alpha = 0;
		this.add.tween(this.correct).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 0, true);
        }
        
        if(this.userAns==false){
       	this.incorrect = this.add.sprite(10,250,'wrong');
        this.incorrect.width = 100;
        this.incorrect.height = 120;
		this.incorrect.alpha = 0;
		this.add.tween(this.incorrect).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 0, true);
        }

	},
     
    /**
	 * Generates the random numbers
     * to be displayed
     *
     */
    randomGenerator: function() {
    
        this.randomOperation = this.game.rnd.integerInRange(0, 3);
        this.randomNumberTop = this.game.rnd.integerInRange(this.minTopNumber , this.maxTopNumber);
        this.randomNumberBottom = this.game.rnd.integerInRange(0, 9);       
    },
    
    /**
	 * Randomize the choice location among the choice buttons
     * 
     */
    setChoiceButtons: function() {
             
        var cur = this.choice;
        var rand = Math.floor(Math.random() * this.randTemp.length);
             
        if(this.randTemp[rand] == 1){
            this.randTemp.splice(this.randTemp.indexOf(1), 1);
            return (cur >=  99) ? 97 : cur + 1;   
        } else if(this.randTemp[rand] == 2){
            this.randTemp.splice(this.randTemp.indexOf(2), 1);
            return (cur <=  0) ? 2 : cur - 1;
        } else if (this.randTemp[rand] == 3){ 
            this.randTemp.splice(this.randTemp.indexOf(3), 1);
            return cur;
        }
         
    },
    
    /**
	 * Displays the choice buttons 
     * that is location at the bottom of the game screen
     */
    showButtons: function(){
               
        //catching the choices;
        this.ansMidButton = this.setChoiceButtons();
        this.ansLeftButton = this.setChoiceButtons();
        this.ansRightButton = this.setChoiceButtons();
        
        //button for choice 1 || left button
        this.choice1 = this.add.sprite(10, 750, this.drawButtons(0, 0, 160, 160, 20, "#0066CC" ));
        this.choice1.inputEnabled = true;
        this.showChoice1 = this.add.bitmapText(0 ,0,'gamefont', '' + this.ansLeftButton , 110);
        this.choice1.addChild(this.showChoice1);
        this.showChoice1.anchor.setTo(0.5, 0.5);
        this.showChoice1.x = 78;
        this.showChoice1.y = 74;
              
        //button for choice 2 || mid button
        this.choice2 = this.add.sprite(190, 750, this.drawButtons(0, 0, 160, 160, 20, "#0066CC" ));
        this.choice2.inputEnabled = true;
        this.showChoice2 = this.add.bitmapText(50 ,this.choice1.centerY - 10,'gamefont', '' + this.ansMidButton, 110);
        this.choice2.addChild(this.showChoice2);
        this.showChoice2.anchor.setTo(0.5, 0.5);
        this.showChoice2.x = 78;
        this.showChoice2.y = 74;
        
        //button for choice 3 || right button
        this.choice3 = this.add.sprite(370, 750, this.drawButtons(0, 0, 160, 160, 20, "#0066CC" ));
        this.choice3.inputEnabled = true;
        this.showChoice3 = this.add.bitmapText(50 ,this.choice1.centerY - 10,'gamefont', '' + this.ansRightButton, 110);
        this.choice3.addChild(this.showChoice3);
        this.showChoice3.anchor.setTo(0.5, 0.5);
        this.showChoice3.x = 78;
        this.showChoice3.y = 74;
             
    },
    
    /**
     * Randomize the location of the 
     * x in the equation
     */
    showXlocation: function() {
        
        this.randomX = Math.floor(Math.random() * 4);
        
        switch(this.randomX) {
            case 1 : this.choice = this.randomNumberTop; 
                     this.randomNumberTop = '?';
                     break;
            case 2 : this.choice = this.randomNumberBottom; 
                     this.randomNumberBottom = '?';
                     break;
            default: this.choice = this.result;
                     this.result = '?';
                     break;
        }
        
    },
    
    /**
     * Monitors the skip button.
     * Checks the conditions to skip 
     * the game.
     */
    skipcondition: function(){
        if(this.coins >= 5){
            this.coins -= 5;
            this.difficultyTracker = (this.difficultyTracker >= 10) ? 5 : 1;
            this.showcoins.setText('' + this.coins);
            this.coinding.play();
            this.difficultySetter();
            this.nextEquation();
        
        }
    },
    
    /**
     * Solve the equation and set operator to be displayed
     *
     */
    solveEquation: function() {
    
        switch(this.operator[this.randomOperation]) {
            
                case '+' : this.result = this.randomNumberTop + this.randomNumberBottom;
                            this.showCurrentOperator = '+'
                            break;
                case '-' : this.result = this.randomNumberTop - this.randomNumberBottom;
                            this.showCurrentOperator = '-';
                            break;
                case '*' : this.result = this.randomNumberTop * this.randomNumberBottom;
                            this.showCurrentOperator = '\327';
                            break;
                case '/' : this.result = this.randomNumberTop / this.randomNumberBottom;
                            this.showCurrentOperator = '\367';
                            break;
        }
        
        if(((this.result % 1) != 0) || this.result <= 0 || this.result > 100){
            
            this.randomGenerator();
            this.solveEquation();
        }
        
         return this.showCurrentOperator;     
    },
        
    /**
     * function to call to update the timer
     *
     */
    updateCounter: function() {
        this.timer--;

        this.showTimer.setText('' + this.timer);
    
    },
    
    /**
     * Updates the score
     * and constantly checks and tracks
     * the user inputs and the game 
     * functions and timers
     */
    update: function() {
         if(this.timer <= 0){
             localStorage.setItem("yourscore", this.score);
             var highscore = localStorage.getItem("highscore");
             
                if(highscore !== null){
                   if (this.score > highscore) {
                      localStorage.setItem("highscore", this.score );
                      }
                }else{
                      localStorage.setItem("highscore", this.score );            
                }
             
		     this.state.start('GameOver');

            }
        
        if(this.userAns == true) { 
           this.timer += this.timerConstant; 
            this.consecutiveAns++;
            this.score += 10;
            this.coinding.play();
            this.showScore.setText('' + this.score);
            this.userAns = false;      
        } else if(this.userFalseAns == true) { 
            this.timer -= (this.timerConstant + 2); 
            this.userFalseAns = false;
            this.wrongding.play();
            this.nextEquation(); 
        } 
        
        // added consecutive ans to 3 then add a coin after 
        if(this.consecutiveAns == 3) {
            this.consecutiveAns = 0
            this.coins += this.addcoin;
            this.showcoins.setText('' + this.coins);
        }
        
        if(this.coins < 5) {
         
            this.skipButton.frame = 1;
        }else if(this.coins >= 5) {
            this.skipButton.frame = 0;  
        }
        
        this.difficultySetter();
       
    } 
};