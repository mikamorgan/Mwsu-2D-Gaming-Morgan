var level_03 = {

	preload: function () {
		console.log("level_03");
		// Load tile map
		game.load.tilemap('level_03', 'assets/maps/forest_e.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground','assets/tileset/ground/ground.png');
		game.load.image('pool','assets/tileset/ground/water/pool.png');
		game.load.image('earth_dark','assets/tileset/ground/ridge/earth_dark.png');
		game.load.image('grass_edges','assets/tileset/ground/grass_edges.png');
		game.load.image('earth_edges','assets/tileset/ground/earth_edges.png');
		game.load.image('grass_corners','assets/tileset/ground/grass_corners.png');
		game.load.image('daisy_blue','assets/tileset/plant/flower/daisy_blue.png');
		game.load.image('daisy_yellow','assets/tileset/plant/flower/daisy_yellow.png');
		game.load.image('bushes','assets/tileset/plant/bush/bushes.png');
		game.load.image('daisy_red','assets/tileset/plant/flower/daisy_red.png');
		game.load.image('daisy_white','assets/tileset/plant/flower/daisy_white.png');
		game.load.image('collision','assets/tileset/logic/collision.png');
		game.load.image('tree_green','assets/tileset/plant/tree/tree_green.png');
		game.load.image('castle','assets/tileset/building/castle.png');
		game.load.image('tent','assets/tileset/object/tent.png');
		game.load.image('sheepfood','assets/tileset/logic/item/sheepfood.png');
		game.load.image('fairy','assets/tileset/logic/creature/fairy.png');
		game.load.image('resources','assets/tileset/logic/item/resources.png');
		game.load.image('portal','assets/tileset/logic/portal.png');
		game.load.image('green_paving','assets/tileset/ground/green_paving.png');
		game.load.image('protection','assets/tileset/logic/protection.png');
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_03');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('pool', 'pool');
		this.map.addTilesetImage('earth_dark', 'earth_dark');
		this.map.addTilesetImage('grass_edges', 'grass_edges');
		this.map.addTilesetImage('earth_edges', 'earth_edges');
		this.map.addTilesetImage('grass_corners', 'grass_corners');
		this.map.addTilesetImage('daisy_blue', 'daisy_blue');
		this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
		this.map.addTilesetImage('bushes', 'bushes');
		this.map.addTilesetImage('daisy_red', 'daisy_red');
		this.map.addTilesetImage('daisy_white', 'daisy_white');
		this.map.addTilesetImage('collision', 'collision');
		this.map.addTilesetImage('tree_green', 'tree_green');
		this.map.addTilesetImage('castle', 'castle');
		this.map.addTilesetImage('tent', 'tent');
		this.map.addTilesetImage('sheepfood', 'sheepfood');
		this.map.addTilesetImage('fairy', 'fairy');
		this.map.addTilesetImage('resources', 'resources');
		this.map.addTilesetImage('portal', 'portal');
		this.map.addTilesetImage('green_paving', 'green_paving');
		this.map.addTilesetImage('protection', 'protection');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_layer_add: this.map.createLayer('4_roof_add'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(322, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		//Healthbars
		this.barConfig = {
			width: 50,
			height: 4,
			x: (this.player.x),
			y: (this.player.y + 35),
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
		this.myHealthBar.setPercent(game.global.health / 100);

		this.enemy = game.add.sprite(300, 700, 'knight_atlas');
		this.enemy.health = 100;

		// Adding second enemy
		this.enemy2 = game.add.sprite(3747, 1032, 'knight_atlas');
		this.enemy2.health = 100;
	
		// Ensure multiple coins on the path
		this.coins = game.add.group();
		this.coins.enableBody = true;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;
		this.coins.create(6000, 4600, 'coin');
		this.coins.create(6202, 2400, 'coin');
		this.coins.create(3894, 2644, 'coin');
		this.coins.create(7872, 5358, 'coin');
		this.coins.create(4780, 4436, 'coin');

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

		// Randomly generate 300 more
		for(var i = 0; i < 300; i++){
			this.coins.create((Math.random() * 7000), (Math.random() * 8000), 'coin');
		}

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 15, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 15, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 15, true);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 15, true);
		this.player.animations.play('idle_left');

		// Add walking and idle animations for the enemy.
		this.enemy.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy.animations.play('idle_right');

		// Add walking and idle animations for the second enemy.
		this.enemy2.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy2.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy2.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy2.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy2.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy2.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy2.animations.play('idle_left');

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);
		this.enemy.body.collideWorldBounds = true;

		// turn physics on for second enemy
		game.physics.arcade.enable(this.enemy2);
		this.enemy2.body.collideWorldBounds = true;

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// // set starting location for player in some middle spot in the map
		// this.player.x = 1728;
		// this.player.y = 1024;

		// flag to stop movement if character dies
		this.alive = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		game.addPauseButton(game);
		k = game.input.keyboard;

		this.flag = true;
		this.flag2 = true;
		this.walkAnim = true;
		this.walkAnim2 = true;

		this.frame_counter = 0;
	},

	update: function () {

		this.move();

		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50);
		this.moveTowardPlayer2(this.enemy2, 70);
		this.checkPlayerTransport(this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy, this.layers.collision_layer);
		game.physics.arcade.collide(this.player, this.enemy);
		game.physics.arcade.collide(this.player, this.enemy2);

		game.physics.arcade.overlap(this.player, this.coins, this.collectCoins, null, this);

		// Delete coins randomly generated on collision layer
		game.physics.arcade.overlap(this.coins, this.layers.collision_layer, function (coin, layer) {
			coin.kill();
		}, function (coin, layer) {
			return layer.collides;
		}, this);

		if(game.global.health == 0){
			this.player.animations.play('dead');
			this.alive = false;

		// go to game over screen after the death animation plays
		this.player.animations.currentAnim.onComplete.add(this.endGame, this);
		}

		if(this.enemy.health == 0){
			this.enemy.kill();
			this.enemy.destroy();
			this.flag = false;
		}

		if(this.enemy2.health == 0){
			this.enemy2.kill();
			this.enemy2.destroy();
			this.flag2 = false;
		}
	},

	// End game if player dies
	endGame: function () {
		game.state.start('gameOver');
	},

		// Very basic move monster towards player function.
	moveTowardPlayer: function (enemy, speed) {
		if(this.flag){
		if (this.player.x < enemy.x && Math.abs(this.player.x - enemy.x) < 200 && this.walkAnim){
			enemy.body.velocity.x = -speed;
			enemy.animations.play('walk_left');
			console.log("walk left");
			}
		else if(Math.abs(this.player.x - enemy.x) < 300 && this.walkAnim) {
			enemy.body.velocity.x = speed;
			enemy.animations.play('walk_right');
			console.log("walk right");
			}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack(enemy);
		}
	},

	checkAttack: function (enemy)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 100){

		if(this.player.x < enemy.x){
			this.walkAnim = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 20){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike left");
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		else{
			console.log(Math.abs(xClose + yClose));
			this.walkAnim = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			console.log("attack_right");
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike right" + game.global.health);
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -50;
		} else {
			enemy.body.velocity.y = 50;
		}
	}
	},
	
	// Very basic move monster towards player function.
	moveTowardPlayer2: function (enemy, speed) {
		if(this.flag2){
		if(Math.abs(this.player.x - enemy.x) < 300 && this.walkAnim2){
			if (this.player.x < enemy.x){
				enemy.body.velocity.x = -speed;
				enemy.animations.play('walk_left');
				}
			else{
				enemy.body.velocity.x = speed;
				enemy.animations.play('walk_right');
				}
		}
		if( Math.abs(this.player.y - enemy.y) < 200){
			if (this.player.y < enemy.y) {
				enemy.body.velocity.y = -speed;
			} else {
				enemy.body.velocity.y = speed;
			}
		}
		
		this.checkAttack2(enemy);
		}
	},

	checkAttack2: function (enemy)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 150){

		if(this.player.x < enemy.x){
			this.walkAnim2 = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			if(Math.abs(xClose + yClose) < 80){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		else{
			this.walkAnim2 = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
				}
			}
			this.myHealthBar.setPercent(game.global.health / 100);
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -50;
		} else {
			enemy.body.velocity.y = 50;
		}
	}
	},

	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x > 4100 && player.y < 1150 && player.y > 950) {
			game.state.start('level_04');
		} else if (player.x < 50 && player.y < 700 && player.y > 500) {
			game.state.start('level_02');
		} else if (player.y > 4100){
			game.state.start('level_02');
		} else if (player.x > 4100 && player.y < 2230 && player.y > 2030) {
			game.state.start('level_04');
		}
	},

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Go all the way left to exit this level...", game.width / 2, game.height - 10);
	},
	
	move: function()
	{
		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Display health bar
		this.myHealthBar.setPosition(this.player.x, this.player.y - 35);
	
		// Walk left
		if (k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.SHIFT))
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 200;
			}
			else{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}

		// Walk right
		if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.SHIFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN)){
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 200;
			}
			else
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}

		// Run left
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.LEFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_left');
			this.prevDir = 'left'
		}

		// Run right
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.RIGHT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_right');
			this.prevDir = 'right'
		}

		// Walk up
		if (k.isDown(Phaser.Keyboard.UP))
		{
			if(k.isDown(Phaser.Keyboard.LEFT))
			{
				this.player.body.velocity.x = -200;
				this.player.animations.play('walk_left');

			}
			else if(k.isDown(Phaser.Keyboard.RIGHT))
			{
				this.player.body.velocity.x = 200;
				this.player.animations.play('walk_right');
			}
			else{
				this.player.body.velocity.x = 0;
				if(this.prevDir == 'left'){
					this.player.animations.play('walk_left');
				}else{
					this.player.animations.play('walk_right');
				}
			}
			this.player.body.velocity.y = -200;
		}

		// Walk down
		if (k.isDown(Phaser.Keyboard.DOWN))
		{
			if(k.isDown(Phaser.Keyboard.LEFT))
			{
				this.player.body.velocity.x = -200;
				this.player.animations.play('walk_left');

			}
			else if(k.isDown(Phaser.Keyboard.RIGHT))
			{
				this.player.body.velocity.x = 200;
				this.player.animations.play('walk_right');
			}
			else{
				this.player.body.velocity.x = 0;
				if(this.prevDir == 'left'){
					this.player.animations.play('walk_left');
				}else{
					this.player.animations.play('walk_right');
				}
			}
			this.player.body.velocity.y = 200;
		}

		// idle
		if (!k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP) 
		&& !k.isDown(Phaser.Keyboard.DOWN) && !k.isDown(Phaser.Keyboard.SPACEBAR) && !k.isDown(65) 
		&& !k.isDown(Phaser.Keyboard.ENTER) && !k.isDown(83) && this.alive)
		{
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}
		
		// attack
		if (k.isDown(65))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('attack_left')
			}
			else{
				this.player.animations.play('attack_right')
			}

			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy.x) < 80){
				this.enemy.health --;}
			
			//decrease second enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy2.x) < 80){
			this.enemy2.health --;}
		}

		// jump attack
		if (k.isDown(83))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('jumpattack_left')
			}
			else{
				this.player.animations.play('jumpattack_right')
			}
			this.player.body.velocity.y = -20;
			this.player.animations.currentAnim.onLoop.add(this.endJump, this);

			//decrease enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy.x) < 80){
				this.enemy.health --;}

			//decrease second enemy health if within attack range
			if(Math.abs(this.player.x - this.enemy2.x) < 80){
			this.enemy2.health --;}
		}

		// jump
		if (k.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			if(this.prevDir == 'left')
			{
				this.player.animations.play('jump_left');
			}
			else
			{
				this.player.animations.play('jump_right');
			}
			this.player.body.velocity.y = -20;
			this.player.animations.currentAnim.onLoop.add(this.endJump, this);
		}
	},
	
		endJump: function (){
			this.player.body.velocity.y = 550;
			console.log("endJump");
		},

		collectCoins: function (player, coin)
		{
			game.global.coins +=1;
			console.log(game.global.coins);
			coin.kill();
		},
}