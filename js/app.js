// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
  
   /*to calculate random value for x by using  Math.floor(Math.random()*(min-max)+min)*/
    this.x =Math.floor(Math.random()*(200-1010)+200);
    this.y = y;

    /*to calculate random value for speed  by using  Math.floor(Math.random()*(min-max)+min)*/
    this.speed =Math.floor(Math.random()*(300-500)+300); 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x = ( this.x + this.speed * dt ) % 600;
     /* call function collision which calculate collision of player*/
     this.Collision(player);
     if (this.x > 1000) {
         this.x = 200;
          player.gameEnd();

    }

};




Enemy.prototype.Collision = function(player) {
    /* check if player.x_axis less than this.x plus 80 and player.x plus 70 greater than this.x and ........ then
     end game*/
    if (player.x < this.x + 80 && player.x + 70 > this.x && player.y < this.y + 55 && 80 + player.y > this.y) {
        player.gameEnd();
        alert('You are shocked!');

    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
/* function to position  player*/
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    /* put x_axis of the player and y_axis*/
    this.x = 200;
    this.y = 350;
    /* intial value of score*/
    this.score = 0;
};

Player.prototype.gameEnd = function() {
    /* reset score when score>0 decrese by one else score =0 reset to 0*/
    if(this.score > 0){
     this.score--;
    } else{
     this.score=0;
     }
    /* put player to inital position*/
    this.x=200;
     /* position of image For coordinates y_axis*/
    this.y=350;
};


/* function to update player when arrive to water*/
Player.prototype.update = function(dt) {
    if ( this.y < 0 ) {
        /* increment score by one*/
        this.score= this.score+1;
        /*reset  position of image For coordinates x_axis=200*/
        this.x=200;
         /*reset  position of image For coordinates y_axis=350*/
        this.y=350;
        alert('You have scored a level!');
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = '#000fff';
    /* using property font in canvas*/
    ctx.font='normal 30px Arial';
    /* Fill text  with color#000fff and font normal 30px Arial in x_axis =180 and y_axis=35*/
    ctx.fillText('Score: ' + this.score , 180, 35);

};


 //a handleInput() method.
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;
Player.prototype.handleInput = function(key) {
    /* in direction left this.x less than zero remain in the same place*/
       if (key === 'left') {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x -= TILE_WIDTH;
        }
    }
    if (key === 'right') {
        if (this.x > 400) {
            this.x = 300;
        } else {
            this.x += TILE_WIDTH;
        }
    }
     /* in direction down this.x ===350 remain in the same place*/
    if (key === 'down') {
        if (this.y === 350) {
            this.y = 350;
        } else {
            this.y += TILE_HEIGHT;
        }
    }
    if (key === 'up') {
        this.y -= TILE_HEIGHT;
    }
};
/* end keys*/



// Now instantiate your objects.
/* enemies*/
var enemyOne   = new Enemy(50);
var enemyTwo   = new Enemy(120);
var enemyThree = new Enemy(200);
var enemyFour  = new Enemy(50);
var enemyFive  = new Enemy(120);
var enemySix   = new Enemy(200);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix];
// Place the player object in a variable called player
var player = new Player;
/* end*/
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
