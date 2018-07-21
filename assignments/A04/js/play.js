var play = {
	create: function () {
		console.log("play.js");
		// Game width and height for convenience
		w = game.width
		h = game.height

		//array to hold obstacles
		var obs = ['obstacle', 'obstacle2']

		frame_counter = 0

		// Bg color
		game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = game.add.image(0, 0, 'bg')

		// Platform width
		//platform_width = game.cache.getImage('obstacle').width

		// Score sound
		this.sound.score = game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = game.add.audio('kill')

		// Explode sound
		this.sound.explode = game.add.audio('explode')

		// Music
		this.music = game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Obstacles
		this.obstacles = game.add.group()

		//Bullets group
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
 		this.bullets.createMultiple(5, 'bullet');
		//this.bullets.setAll('anchor.x', 0.5);
		//this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
 		this.bullets.setAll('checkWorldBounds', true);

		// Player
		this.player = game.add.sprite(game.width / 2, 175, 'player')
		game.physics.enable(this.player, Phaser.Physics.ARCADE)
		this.player.enableBody = true
		this.player.body.collideWorldBounds = true
		this.player.scale.setTo(.5, .5)
		this.player.anchor.setTo(.5, .5)
		this.player.body.setSize(this.player.width - 10, this.player.height)

		//  And some controls to play the game with
		this.cursors = game.input.keyboard.createCursorKeys();
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		// Support for mouse click and touchscreen input
		game.input.onDown.add(this.onDown, this)

		this.pauseAndUnpause(game)
	},

	update: function () {
		this.bmpText.text = game.global.score

		// Collision
		game.physics.arcade.overlap(this.player, this.obstacles, this.killPlayer, null, this)
		game.physics.arcade.overlap(this.bullets, this.obstacles, this.explodeObstacle, null, this)

		// Spawn enemies
		if (frame_counter % 90 == 0) {
			//var gap = 120
			if(Math.random() < 0.33)
			this.spawnObstacle(game.global.obstacle_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 5)), has_given_point = true)
			else if(Math.random() < 0.5)
			this.spawnObstacle2(game.global.obstacle2_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 5)), has_given_point = true)
			else
			this.spawnObstacle3(game.global.obstacle3_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 5)), has_given_point = true)
		}

		if (game.global.score > 10 && frame_counter % 80 == 0) {
			//var gap = 120
			if(Math.random() < 0.33)
			this.spawnObstacle(game.global.obstacle_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 7)), has_given_point = true)
			else if(Math.random() < 0.5)
			this.spawnObstacle2(game.global.obstacle2_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 7)), has_given_point = true)
			else
			this.spawnObstacle3(game.global.obstacle3_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 7)), has_given_point = true)
		}

		if (game.global.score > 30 && frame_counter % 70 == 0) {
			//var gap = 120
			if(Math.random() < 0.33)
			this.spawnObstacle(game.global.obstacle_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 10)), has_given_point = true)
			else if(Math.random() < 0.5)
			this.spawnObstacle2(game.global.obstacle2_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 10)), has_given_point = true)
			else
			this.spawnObstacle3(game.global.obstacle3_id++, Math.random() * game.width , game.height, speed = (200 + (game.global.score * 10)), has_given_point = true)
		}

		this.move();

		frame_counter++

		//Fire bullets
  		if (this.fireButton.isDown) {
        	this.fireBullet();
   		}

	},

	//spawn birds
	spawnObstacle: function (entity, x, y, speed, has_given_point) {
		var obstacle = this.obstacles.create(x, y, 'obstacle', entity)

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(1, 1)
		obstacle.body.velocity.y = -speed
		obstacle.has_given_point = has_given_point

		obstacle.checkWorldBounds = true;
		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
		console.log(this.obstacles);
	},

	//spawn spaceships
	spawnObstacle2: function (entity, x, y, speed, has_given_point) {
		var obstacle = this.obstacles.create(x, y, 'obstacle2', entity)

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(1, 1)
		obstacle.body.velocity.y = -speed
		obstacle.has_given_point = has_given_point

		obstacle.checkWorldBounds = true;
		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
		console.log(this.obstacles);
	},

	//spawn rockets
	spawnObstacle3: function (entity, x, y, speed, has_given_point) {
		var obstacle = this.obstacles.create(x, y, 'obstacle3', entity)

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(1, 1)
		obstacle.body.velocity.y = -speed
		obstacle.has_given_point = has_given_point

		obstacle.checkWorldBounds = true;
		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
		console.log(this.obstacles);
	},

	killObstacle: function (obstacle) {
		console.log(obstacle);
		this.obstacles.remove(obstacle);
		console.log(this.obstacles.children.length);
	},

	explodeObstacle: function (bullet, obstacle) {
		this.sound.explode.play('', 0, 0.5, false)
		bullet.kill();
		obstacle.kill();
		game.global.score += 1;
	},

	killPlayer: function (player) {
		this.sound.kill.play('', 0, 0.5, false)
		player.kill();
		game.state.start('gameOver');

	},

	fireBullet: function() {
		var BULLET_SPEED = -400;
		//  Grab the first bullet we can from the pool
		var bullet = this.bullets.getFirstExists(false);
		if (bullet)
		{
		//  Make bullet come out of tip of ship with correct angle
        var bulletOffset = 20 * Math.sin(game.math.degToRad(this.player.angle));
        bullet.reset(this.player.x + bulletOffset, this.player.y);
    	bullet.angle = this.player.angle;
        game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
		bullet.body.velocity.x += this.player.body.velocity.x;  
		}
	},

	// Tap on touchscreen or click with mouse
	onDown: function (pointer) {},

	// Move player
	move: function () {
		if (game.input.activePointer.isDown) {
			//console.log(game.input.x);
			let rate = this.moveSpeed(game.input.x, game.width);
			let angle = this.moveAngle(rate, 3);
			//console.log("rate: " + rate);
			this.player.x += rate;
			this.player.angle = angle;
		} else {
			this.player.angle = 0;
		}
	},
	moveAngle: function (rate, factor) {

		return rate * factor;
	},

	moveSpeed: function (x, width, skill = 2) {
		var ratio = 0;

		if (x < width / 2) {
			ratio = x / (width / 2);
			ratio *= 10;
			ratio = Math.ceil(ratio);
			ratio /= 2;
			rate = (5 - ratio) * -1;
		} else {
			ratio = x / width;
			ratio *= 10;
			ratio = Math.ceil(ratio);
			ratio /= 2;
			rate = ratio;
		}
		console.log(rate * skill);
		return rate * skill;
	},

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
	},

	render: function () {
		debug = false
		if (debug) {
			// Show hitbox
			game.debug.body(this.player)

			for (var i = 0; i < obstacles.length; i++) {
				game.debug.body(obstacles[i])
			}
		}
	}
}
