FindX.PauseMenu = function(game) { 
    this.pausePrompt; 
    this.pauseIcon; 
    
} 
FindX.StartMenu.prototype = { 
    
    create: function() { 
      pauseIcon = this.game.add.image(0, 0, 'PAUSE');  
      pauseIcon.inputEnabled = true; 
      pausePrompt = this.add.button(this.world.centerX-80, this.world.centerY+110, 'PAUSE', this.pauseGame, this, null, null, null, null);
    },
    
    pauseGame: function() { 
      this.pauseButton.events.onInputUp.add(function () {
          this.game.paused = true;
      },this);
      this.game.input.onDown.add(function () {
          if(this.game.paused)this.game.paused = false;
      },this);
    } 
};