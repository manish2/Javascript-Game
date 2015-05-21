/*
 ***************************************************************
  It propmpts user to enter name and store it in the local 
  storage to insert into the databbase later upon submission 
  
  It displays the preloader bar and background image and 
  calls main method method of another javascript 'Preloader.js'.  
 ***************************************************************
 * @author       Rupinder Sandhu, Manish Mallavarapu, 
                 Jox Toyod, Luda Shu, Jacky Chuo.
 * @copyright    
 * @license      
 */


var FindX = {};

/**
 //----------------------------------------------------------
 // This method is the main method prompts user to enter name
 // and displays loading page which boots up the game and 
 // starts 'Preloader' state.
 //----------------------------------------------------------   
 * @method Boot is the main fuction which runs/starts/calls
           the other methods/states.  
 * @param game is the Phaser Object which contains
             various methods that make the the game function. 
 */
FindX.Boot = function(game) {};

/**
 //----------------------------------------------------------
 // This method is the main method prompts user to enter name
 // and displays loading page which boots up the game and 
 // starts 'Preloader' state.
 //----------------------------------------------------------   
 * @method Boot is the main fuction which runs/starts/calls
           the other methods/states.  
 * @param game is the Phaser Object which contains
             various methods that make the the game function. 
 */
FindX.Boot.prototype = {
    
    /**
     * Load the pre-loader Image which is a progress bar. 
     *
     * @method Boot#preload
     */
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
    },
    
    /**
     * Creates the initial interface of the game and prompts
     * user to enter their name and stores in the storage to
     * insert-into/update the database later. 
     *
     * @method Boot#create 
     */
    create: function() {
       
        if(localStorage.getItem('tempID') == null){
          var userID = this.game.rnd.integerInRange(100000, 999999);
            localStorage.setItem('tempID', userID);
            console.log(userID);
        }
                     
            for(var i = 0; i < 10; i++ ) {
                localStorage.removeItem('topName' + i);
                localStorage.removeItem('topScore' + i);
            }       
        
        // Paser.game.input sets up the maximum number of inputs 
        //  accepted at a time.
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Maximum Width for the game is 540, fixed width constraint.
        // Maximum Height for the game is 960, fixed height constraint.
        var maxWidth = 540;
        var maxHeight = 960;
        var ratio = 0;
        
        // Its gets the maximum height of the device on which the game
        //  is being displayed, and set value of 'maxHeight' property.
        this.scale.maxHeight = window.innerHeight;
        
        // It checks if maximum height of the device's display is more  
        //  than maximum allowed. 
        if(window.innerHeight > maxHeight){
            
            this.scale.maxWidth = 540;
        }else {
            
            this.scale.maxWidth = 450;
        }
        
        // Minimum Width for the game is 320, fixed width constraint.
        // Minimum Height for the game is 480, fixed height constraint.
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
        
        // Phaser.game.scale alligns the game screen vertically and 
        //  horizontally forces game only playable in portrait 
        //  orientation.
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);  
        
        // Sets up game to accept declared number of simultaneous 
        //  inputs.
		this.input.addPointer();
        
        // Sets up the background color of the game screen.
		this.stage.backgroundColor = '#0588b2';
        
        // Starts Preloader state/ calls the main method of 'Preloader.js'
        this.state.start('Preloader');
        
    }
}