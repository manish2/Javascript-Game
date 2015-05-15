/* Loading page which boots up the game */
var FindX = {};

/**
 * Loading page which boots up the game
 * @method Boot
 * @param {} game
 * @return 
 */
FindX.Boot = function(game) {};

FindX.Boot.prototype = {
    /**
     * Load the loader Image progress bar
     * @method preload
     * @return 
     */
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
    },
    
    /**
     * Creates the initial interface of the game
     * @method create
     * @return 
     */
    create: function() {
       
                     
            for(var i = 0; i < 10; i++ ) {
                localStorage.removeItem('topName' + i);
                localStorage.removeItem('topScore' + i);
            }       
        
        
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var maxWidth = 540;
        var maxHeight = 960;
        var ratio = 0;
        
        this.scale.maxHeight = window.innerHeight;
       
        if(window.innerHeight > maxHeight){
            
            this.scale.maxWidth = 540;
        }else {
            
            this.scale.maxWidth = 450;
        }
            
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);  
        
		this.input.addPointer();
		this.stage.backgroundColor = '#0588b2';
        
        this.state.start('Preloader');
        
        console.log( window.innerHeight);
        console.log( window.innerWidth)
        
    }
}