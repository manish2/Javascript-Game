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
    
    // for setting and displaying of choices 
    this.choice;
    this.showChoice1;
    this.showChoice2;
    this.showChoice3;
    this.choice1;
    this.choice2;
    this.choice3;
    this.setChoiceReturn;
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
    this.scoreConstant;
    this.showScore;
    this.userAns; 
    this.userFalseAns; 
    this.timerConstant; 
    this.coins;
    this.showcoins;
    this.addcoin;
    
    this.difficultyTracker;
    this.consecutiveAns;
    this.minTopNumber;
    this.maxTopNumber;
    this.minBottomNumber;
    this.maxBottomNumber;
    this.highScore;
    this.scoreMultiplier;
    
    //sounds
    this.wrongding;
    this.coinding; 
    
    this.recordScore;
    
    this.isTimerRecorded;
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
        this.timer = 10; 
        this.userAns = false; 
        this.userFalseAns = false; 
        this.timerConstant = 4;
        this.consecutiveAns = 0;
        this.coins = 0;
        this.addcoin = 1;
        this.score = 0;
        this.scoreConstant = 10;
        this.minTopNumber = 0;
        this.maxTopNumber = 9;
        this.minBottomNumber = 0;
        this.maxBottomNumber = 9;
        this.difficultyTracker = 0;
        this.scoreMultiplier = 1;
        this.setChoiceReturn = 1;
        this.isTimerRecorded = false;
        
        this.highScoreIsCheck = false;
         
        if(localStorage.getItem('achieve') == null){
            localStorage.setItem('achieve', 0);
        }
        
        if(localStorage.getItem('highscore') != null) {
            this.highScore =   localStorage.getItem('highscore');
        }else if(localStorage.getItem('highscore') == null) {
            this.highScore =   0;
        }
           
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
        this.skipButton = this.add.button(450, 250, 'skip', this.skipcondition, this);
        this.skipButton.anchor.setTo(0.5, 0.5);
        this.skipButton.frame = 1;
        this.skipButton.height = 100;
        this.skipButton.width = 100;
         
    },
    
    /**
    * This tracks the achievement after game over
    *
    */
    achieveTracker: function(){
        console.log("inside Achieve Tracker");
        var curAchieve;
        console.log("this.recordScore ", this.recordScore);
        
        if(this.recordScore >= 1000 /*&& parseInt(localStorage.getItem("achieve")) >= 2*/){
            curAchieve = 3;
            localStorage.setItem("achieve",  curAchieve);
            console.log("inside 1000 score ", this.score);
            
        }else if(this.recordScore >= 500 /*&& parseInt(localStorage.getItem("achieve")) >= 1*/){
            curAchieve = 2;
            localStorage.setItem("achieve", curAchieve);
            console.log("has scored 500");
        } else if(this.recordScore >= 250 /*&& parseInt(localStorage.getItem("achieve")) == 0*/){
            
            console.log("has scored 250");
            curAchieve = 1;
            localStorage.setItem("achieve", curAchieve);
        }
        
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
	 * Checks the ans, set the difficulty level and changing to next equation.
     *
	 * @param ans the answer get by player
     * @param bNumber 
	 */ 
    checkAnswer: function(ans, bNumber){ 
        
        var scale = 1.1;
    
        switch(bNumber) {
                
            case 1 : if(ans == this.choice){
                        this.userAns = true;
                        this.difficultyTracker++;
                        this.notice();
                        this.add.tween(this.choice1.scale, this.choice1.frame = 1).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);            
                    } else { 
                        this.userAns = false; 
                        this.userFalseAns = true; 
                        this.notice();
                        this.add.tween(this.choice1.scale, this.choice1.frame = 2).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);  
                    } 
                     break;
                
            case 2 : if(ans == this.choice){
                        this.userAns = true;
                        this.difficultyTracker++;
                        this.notice();
                        this.add.tween(this.choice2.scale, this.choice2.frame = 1).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);              
                    } else { 
                        this.userAns = false; 
                        this.userFalseAns = true; 
                        this.notice();
                         this.add.tween(this.choice2.scale, this.choice2.frame = 2).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);   
                    } 
                     break;
                
            case 3 : if(ans == this.choice){
                        this.userAns = true;
                        this.difficultyTracker++;
                        this.notice();
                        this.add.tween(this.choice3.scale, this.choice3.frame = 1).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);             
                    }  else { 
                        this.userAns = false; 
                        this.userFalseAns = true; 
                        this.notice();
                        this.add.tween(this.choice3.scale, this.choice3.frame = 2).to( { x: scale, y: scale }, 125, Phaser.Easing.Linear.None, true, 0, 0, true)
                        .onComplete.addOnce(this.nextEquation, this);  
                    } 
                     break;                
        }
        
    },
    
    
    /**
	 * Sets the difficulty of the game
     * When score is at certain level it
     * increase the diffulty
	 */ 
    difficultySetter : function() {
        
        if(this.difficultyTracker >= 50){
                    
            this.minTopNumber = 10;
            this.maxTopNumber = 99;
            this.minBottomNumber = 10;
            this.maxBottomNumber = 99;
            this.scoreMultiplier = 1.5;
        }
        else if(this.difficultyTracker >= 20) {  
               
            this.minTopNumber = 10;
            this.maxTopNumber = 99;
            this.minBottomNumber = 0;
            this.maxBottomNumber = 9;
            this.scoreMultiplier = 1.25;
        }
        else if(this.difficultyTracker >= 5){
             
            this.minTopNumber = 0;
            this.maxTopNumber = 9; 
            this.minBottomNumber = 0;
            this.maxBottomumber = 9;
            this.scoreMultiplier = 1;
        } 
         
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
        this.showOperator = this.add.bitmapText(this.world.centerX - 80, this.world.centerY-130, 'gamefont', '' + this.currentOperator, 105);
        this.showOperator.anchor.setTo(0.5, 0.5);	
        this.showUnderLine = this.add.bitmapText(this.world.centerX - 57, this.world.centerY-100, 'gamefont', '_', 105);
        this.add.bitmapText(this.world.centerX - 7, this.world.centerY-100, 'gamefont', '_', 105);
        this.showResult = this.add.bitmapText(this.world.centerX + 5, this.world.centerY + 75, 'gamefont', '' + this.result, 105);
        this.showResult.anchor.setTo(0.5, 0.5);	       
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
        this.choice2.destroy();
        this.choice3.destroy();
        this.showChoice1.destroy();
        this.showChoice2.destroy();
        this.showChoice3.destroy();
        this.randTemp = [1, 2, 3]; 
        this.setChoiceReturn = this.game.rnd.integerInRange(1, 3);
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
        this.randomNumberBottom = this.game.rnd.integerInRange(this.minBottomNumber, this.maxBottomNumber);       
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
            
            switch(this.setChoiceReturn) {
                    
                case 1 : return cur + 1;
              
                case 2 : return cur - 1;
                        
                default: return cur - 1;
                                      
            }                           
        } else if(this.randTemp[rand] == 2){
            this.randTemp.splice(this.randTemp.indexOf(2), 1);
            
            switch(this.setChoiceReturn) {
                    
                case 1 : return cur + 2;
                         
                case 2 : return cur  - 2;
                        
                default: return cur + 1;
                                      
            }              
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
        this.choice1 =  this.add.button(100, 820, 'buttonChoice', this.check(this.ansLeftButton, 1), this);
        this.choice1.anchor.setTo(0.5, 0.5);
        this.choice1.frame = 0;
        this.showChoice1 = this.add.bitmapText(0 ,0,'gamefont', '' + this.ansLeftButton , 72);
        this.choice1.addChild(this.showChoice1);
        this.showChoice1.anchor.setTo(0.5, 0.5);
        this.showChoice1.x = -5 ;
        this.showChoice1.y = -10;
              
        //button for choice 2 || mid button      
        this.choice2 =  this.add.button(278, 820, 'buttonChoice', this.check(this.ansMidButton, 2), this);
        this.choice2.anchor.setTo(0.5, 0.5);
        this.choice2.frame = 0;
        this.showChoice2 = this.add.bitmapText(0 ,0,'gamefont', '' + this.ansMidButton , 72);
        this.choice2.addChild(this.showChoice2);
        this.showChoice2.anchor.setTo(0.5, 0.5);
        this.showChoice2.x = -5 ;
        this.showChoice2.y = -10;
        
        //button for choice 3 || right button 
        this.choice3 =  this.add.button(455, 820, 'buttonChoice', this.check(this.ansRightButton, 3), this);
        this.choice3.anchor.setTo(0.5, 0.5);
        this.choice3.frame = 0;
        this.showChoice3 = this.add.bitmapText(0 ,0,'gamefont', '' + this.ansRightButton , 72);
        this.choice3.addChild(this.showChoice3);
        this.showChoice3.anchor.setTo(0.5, 0.5);
        this.showChoice3.x = -5 ;
        this.showChoice3.y = -10;
             
    },
    
    /**
     * Randomize the location of the 
     * x in the equation
     */
    showXlocation: function() {
        
        this.randomX = Math.floor(Math.random() * 4);
        
        switch(this.randomX) {
            case 1 : this.choice = this.randomNumberTop; 
                     this.randomNumberTop = 'X';
                     break;
            case 2 : this.choice = this.randomNumberBottom; 
                     this.randomNumberBottom = 'X';
                     break;
            default: this.choice = this.result;
                     this.result = 'X';
                     break;
        }
        
    },
    
    /**
     * Monitors the skip button.
     * Checks the conditions to skip 
     * the game.
     */
    skipcondition: function(){
        this.add.tween(this.skipButton.scale).to( { x: .8, y: .8 }, 50, Phaser.Easing.Linear.None, true, 0, 0, true);
        if(this.coins >= 5){
            this.coins -= 5;
            this.difficultyTracker = (this.difficultyTracker >= 25) ? 15 : ((this.difficultyTracker >= 10) ? 5 : 1);
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
        
        if(((this.result % 1) != 0) || this.result <= 0 || this.result > 999){
            
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
             
             this.choice1.inputEnabled = false;
             this.choice2.inputEnabled = false;
             this.choice3.inputEnabled = false;
             
             this.recordScore = this.score;
             localStorage.setItem("yourscore", this.score);
         
            
                if(this.highScore !== null){
                   if (this.score > this.highScore) {
                      localStorage.setItem("highscore", this.score );
                      }
                }else{
                      localStorage.setItem("highscore", this.score );            
                }
             
             this.achieveTracker();
		     this.state.start('GameOver');

        }
        

        
        if(this.userAns == true) { 
            var style = { font: "52px Comic Sans MS", fill: "rgb(12, 204, 71)", align: "center", weight: "bold" };
            var timerText = this.add.text(this.world.centerX - 40, 60, "+2", style);
            timerText.alpha = 0;
            
            this.timer += this.timerConstant - 2; 
            this.consecutiveAns++;
            this.score += Math.floor((this.scoreConstant * this.scoreMultiplier));
            this.coinding.play();
            this.showScore.setText('' + this.score);
            this.userAns = false; 
            var t = this.add.tween(timerText).to({y: timerText.y-30, alpha: 1 }, 900, Phaser.Easing.Linear.None, true, 0, 0, false); 
            t.onComplete.add(function() {timerText.destroy();});  
        } else if(this.userFalseAns == true) { 
            var style = { font: "52px Comic Sans MS", fill: "rgb(227, 8, 8)", align: "center", weight: "bold" };
            var timerText = this.add.text(this.world.centerX - 40, 60, "-4", style);
            
            timerText.alpha = 0;
            this.timer -= (this.timerConstant); 
            this.userFalseAns = false;
            this.wrongding.play();
            var t = this.add.tween(timerText).to({y: timerText.y-30, alpha: 1 }, 900, Phaser.Easing.Linear.None, true, 0, 0, false); 
            t.onComplete.add(function() {timerText.destroy();});  
        } 
        
        // added consecutive answer to 3 then add a coin after 
        if(this.consecutiveAns == 3) {
            
            var style = { font: "32px Comic Sans MS", fill: "rgb(8, 141, 23)", align: "center", weight: "900" };
            var text = this.add.text(this.world.centerX - 150, 70, "+1", style);
            text.alpha = 0;
            
            this.consecutiveAns = 0
            this.coins += this.addcoin;
            this.showcoins.setText('' + this.coins);
            this.add.tween(text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
        }
        
        if(this.coins < 5) {
         
            this.skipButton.frame = 1;
        }else if(this.coins >= 5) {
            this.skipButton.frame = 0;  
        }
    

            this.difficultySetter();
       
    }, 
    
    /**
     * if user reaches a new high score, they will show a notification and add three rewards: 
     * time + 10, coins + 10, extra skip.
     */
    newHighScore: function(){
            
        var newScore = this.add.bitmapText(10, 200, 'gamefont',  'new high score!', 30);
        newScore.alpha = 0;  
        
        var newNotice = this.add.bitmapText(375, 300, 'gamefont',  'skip+1', 35);
        newNotice.alpha = 0;
        
        var newNotice2 = this.add.bitmapText(375, 350, 'gamefont',  'coins+10', 35);
        newNotice2.alpha = 0;
        
        var newNotice3 = this.add.bitmapText(375, 400, 'gamefont',  'time+10', 35);
        newNotice3.alpha = 0;
        
        
        this.add.tween(newScore).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
        
        this.add.tween(newNotice).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
        
        
        this.add.tween(newNotice2).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
            
        
        this.add.tween(newNotice3).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
            
    }
};