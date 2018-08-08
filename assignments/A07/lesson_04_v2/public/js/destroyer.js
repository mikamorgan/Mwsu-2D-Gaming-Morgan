var destroyer = {
	create: function () {
		console.log("play.js");

		//Client.sendNewPlayerRequest();

		this.player1 = new Ufo(game);
		this.player1.health = 100;

		this.player2 = new Ufo(game);
		this.player2.health = 100;

		w = game.width // Game width and height for convenience
		h = game.height
		frame_counter = 0 // variable to help with the creation of obstacles

		//used for points right now
		this.item_destroyed = false;

		//  The scrolling starfield background
		this.starfield = game.add.tileSprite(0, 0, w, h, 'starfield');

		this.earth = game.add.sprite(0, 0, 'earth');

		this.earth.animations.add('spin', 0, 48);
		this.earth.animations.play('spin', 10, true);

		//Healthbar
		this.barConfig = {
            width: 70,
            height: 8,
            x: 45,
            y: 100,
            bg: {
                color: '#FF0000'
            },
            bar: {
                color: '#00FF00'
            },
            animationDuration: 200,
            flipped: false
		};

		this.barConfig2 = {
            width: 70,
            height: 8,
            x: (w - 100),
            y: 100,
            bg: {
                color: '#FF0000'
            },
            bar: {
                color: '#00FF00'
            },
            animationDuration: 200,
            flipped: false
		};
		
		this.myHealthBar = new HealthBar(this.game, this.barConfig);
		this.myHealthBar2 = new HealthBar(this.game, this.barConfig2);

		// Fire buttons
		this.button = game.add.button((w - 75), (h - 75), 'button', this.actionOnClick, this);
		this.button.scale.setTo(.2);

		this.button2 = game.add.button((25), (h - 75), 'button', this.actionOnClick, this);
		this.button2.scale.setTo(.2);

		// Score sound
		this.sound.score = game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = game.add.audio('kill')

		// Music
		this.music = game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Obstacles (little icons of food)
		this.obstacles = game.add.group()

		//  An explosion pool that gets attached to each icon
		this.explosions = game.add.group();
		this.explosions.createMultiple(10, 'bang');
		this.explosions.forEach(this.setupObstacles, this);

		// Player
		//calls the create method of the ufo object
		this.player1.create(randomInt(0,game.width), randomInt(0,game.height/2), 0.75, 0.75); 
		this.player2.create(randomInt(0,game.width), randomInt(0,game.height/2), 0.75, 0.75);

		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		///// Tracking keyboard inputs /////////////

		// Fire the ufo big laser when the 'X' key is pressed
		//laserFire = this.input.keyboard.addKey(Phaser.Keyboard.X);
		//laserFire.onDown.add(this.player.startLaser, this.player);

		// Assigns arrow keys for movement
		this.player1.assignMovementKeys(38, 40, 37, 39);
		this.player2.assignMovementKeys(87, 83, 65, 68);

		// Assigns W,S,A,D keys for movement
		this.player1.assignMovementKeys(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);
		this.player2.assignMovementKeys(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D);

		// Assign fire keys
		this.player1.assignFireKeys(Phaser.KeyCode.SPACEBAR);
		this.player2.assignFireKeys(Phaser.KeyCode.SHIFT);

		this.pauseAndUnpause(game)

	},

	update: function () {

			// Place score on game screen
			this.bmpText.text = game.globals.score

			// Move background to look like space is moving
			this.starfield.tilePosition.y -= 2;

			// Check for overlap between game ship and obstacles
			game.physics.arcade.overlap(this.player1.ship, this.obstacles, this.killPlayer, null, this);
			game.physics.arcade.overlap(this.player2.ship, this.obstacles, this.killPlayer2, null, this);

			// Check for overlap between bullets and obstacles
			game.physics.arcade.overlap(this.player1.bullets, this.obstacles, this.destroyItem, null, this);
			game.physics.arcade.overlap(this.player2.bullets, this.obstacles, this.destroyItem, null, this);

			if (this.item_destroyed) {
				// Check to see if we score any points
				// needs changed since we added bullets
				game.globals.score += this.scorePoint();
				this.item_destroyed = false;
			}

			spawn_rate = 100 - game.globals.score; // how fast to add new obstacles to screen (smaller value = more obstacles)
			obstacle_speed = game.globals.score * 1.5 + 200; // how fast should each obstacle move

			// Spawn rate continuously shrinks so stop it at 5
			if (spawn_rate < 5) {
				spawn_rate = 5;
			}

			// Spawn obstacles
			if (frame_counter % spawn_rate == 0) {
				//console.log(spawn_rate);
				//console.log(obstacle_speed);
				this.spawnObstacle(game.rnd.integerInRange(32, game.width - 32), game.height, speed = obstacle_speed, 0.5, 0.5)
			}

			this.player1.move();
			this.player2.move();

			frame_counter++;

			// Update health bar ratio
			this.myHealthBar.setPercent(this.player1.health / 100);
			this.myHealthBar2.setPercent(this.player2.health / 100);

			// Kill ship if health equals zero
			if(this.player1.health <= 0){
				this.killShip(this.player1.ship);
			}

			if(this.player2.health <= 0){
				this.killShip(this.player2.ship);
			}
		//}
	},

	killShip: function (player){
		player.kill();

		//creates explosion animation
		var explosion = this.game.add.sprite (player.body.x, player.body.y, "bang")
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add("bang", null, 60, false, true);
		explosion.animations.play("bang");

		//end game after explosion plays
		explosion.animations.currentAnim.onComplete.add(this.endGame, this);
	},

	endGame: function(){
		game.state.start('gameOver');
	},
	/**
	 * Spawn New Player
	 */
	spawnNewPlayer: function (player) {
		game.players.push(new Ufo(game));
		game.players[game.players.length-1].create(player.x,player.y,0.75,0.75);
	},

	actionOnClick: function () {
		console.log("fire");
		this.player.assignFireKeys();
	},

	/**
	 * spawn a new obstacle
	 * 
	 * @param x : x coord
	 * @param y : y coord
	 * @param speed : speed to move across game board
	 */
	spawnObstacle: function (x, y, speed, x_scale, y_scale) {
		// randomly choose an icon from an array of icon names
		var choice = game.rnd.integerInRange(0, game.globals.obstacle_icons.length - 1);
		var name = game.globals.obstacle_icons[choice];

		//create the obstacle with its randomly chosen name
		var obstacle = this.obstacles.create(x, y, 'icon-' + name)
		game.debug.body(obstacle);

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(x_scale, y_scale)
		obstacle.body.setSize(obstacle.width + 20, obstacle.height - 20);
		obstacle.body.velocity.y = -speed

		obstacle.checkWorldBounds = true;

		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
	},

	/**
	 * removes an obstacle from its group
	 */
	killObstacle: function (obstacle) {
		this.obstacles.remove(obstacle);
	},

	/**
	 * Adds an explosion animation to each obstacle when created
	 */
	setupObstacles: function (obstacle) {
		obstacle.anchor.x = 0.5;
		obstacle.anchor.y = 0.5;
		obstacle.animations.add('bang');
	},

	/**
	 * Determines score. Needs changed
	 */
	scorePoint: function () {
		// silly but wanted a function in case points started
		// to change based on logic.
		return 1;
	},

	/**
	 * Kills player. Things commented out for debugging.
	 */
	killPlayer: function () {
		this.sound.kill.play('', 0, 0.5, false)
		this.player1.health--;
	},

	killPlayer2: function () {
		this.sound.kill.play('', 0, 0.5, false)
		this.player2.health--;
	},
	/**
	 * Source: https://phaser.io/examples/v2/games/invaders
	 * 
	 * Collision handler for a bullet and obstacle
	 */
	destroyItem: function (bullet, obstacle) {
		bullet.kill();
		obstacle.kill();
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(obstacle.body.x, obstacle.body.y);
		explosion.play('bang', 30, false, true);
		this.item_destroyed = true;
	},

	/**
	 * Tap on touchscreen or click with mouse
	 * not used for this game
	 */
	onDown: function (pointer) {
		//console.log(pointer);
	},

	/**
	 * This method lets a user pause the game by pushing the pause button in
	 * the top right of the screen. 
	 */
	pauseAndUnpause: function (game) {
		var pause_button = game.add.sprite(game.width - 40, 40, 'pause')
		pause_button.anchor.setTo(.5, .5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true
				}
				pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause')
				pause_watermark.anchor.setTo(.5, .5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false
					pause_watermark.destroy()
				}
			}, self)
	}
}