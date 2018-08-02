var level_01 = {

	preload: function () {
		console.log("level_01");
		// Load tile map
		game.load.tilemap('level_01', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('huge_animal2', 'assets/tileset/logic/creature/huge_animal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');

		//game.load.audio('kill', 'assets/sounds/Ouch.ogg')
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_01');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('logic/collision', 'collision');
		this.map.addTilesetImage('steel lamp', 'iron_lamp');
		this.map.addTilesetImage('flames', 'flames');
		this.map.addTilesetImage('amazoness', 'amazon');
		this.map.addTilesetImage('corpse', 'skull_dark');
		this.map.addTilesetImage('corpse 2', 'huge_animal');
		this.map.addTilesetImage('rocks', 'rocks_2');
		this.map.addTilesetImage('crystal', 'pink_crystal');
		this.map.addTilesetImage('crystal 2', 'green_crystal');
		this.map.addTilesetImage('huge animals', 'huge_animal2');
		this.map.addTilesetImage('animals', 'animal');
		this.map.addTilesetImage('undead', 'undead');
		this.map.addTilesetImage('elements', 'elemental');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		this.map.setTileIndexCallback(45, this.hitWall, this);

		this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

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

		// Portals to transport player
		this.portal = game.add.sprite(3136, 2936, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal.animations.play('rotate');
		game.physics.arcade.enable(this.portal);

		this.portal2 = game.add.sprite(2872, 394, 'red_portal');
		this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 40, true);
		this.portal2.animations.play('rotate');
		game.physics.arcade.enable(this.portal2);

		this.enemy = game.add.sprite(450, 1580, 'knight_atlas');
		this.enemy.health = 100;

		this.enemy2 = game.add.sprite(950, 2670, 'knight_atlas');
		this.enemy2.health = 100;

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
		
		// Death sound
		//this.sound.kill = game.add.audio('kill');

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

		// Ensure multiple coins along the path
		this.coins = game.add.group();
		this.coins.enableBody = true;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;
		this.coins.create(7000, 1200, 'coin');
		this.coins.create(7066, 2740, 'coin');
		this.coins.create(3528, 4564, 'coin');
		this.coins.create(1704, 3128, 'coin');

		var total_coins = game.global.coins;
		this.coins.scale.setTo(.5, .5);

		// Randomly generate 300 more
		for(var i = 0; i < 300; i++){
			this.coins.create((Math.random() * 7000), (Math.random() * 8000), 'coin');
		}

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 1728;
		this.player.y = 1024;

		// flag to stop movement if character dies
		this.alive = true;
		
		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);
		this.enemy.body.collideWorldBounds = true;

		// turn physics on for second enemy
		game.physics.arcade.enable(this.enemy2);
		this.enemy2.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);


		game.addPauseButton(game);
		k = game.input.keyboard;

		this.flag = true;
		this.walkAnim = true;

		this.frame_counter = 0;
	},

	update: function () {

		this.move();

		this.frame_counter++;

		this.moveTowardPlayer(this.enemy, 50, this.flag, this.walkAnim);
		this.moveTowardPlayer(this.enemy2, 60, this.flag, this.walkAnim);
		this.checkPlayerTransport(this.player);

		// Transport player if it overlaps a portal
		game.physics.arcade.overlap(this.player, this.portal, function (player, portal) {
			this.player.x = 1728;
			this.player.y = 1024;}, null, this);
		game.physics.arcade.overlap(this.player, this.portal2, function (player, portal) {game.state.start('level_02');}, null, this);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy2, this.layers.collision_layer);
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
			//this.sound.kill.play();
			this.flag = false;
			this.walkAnim = true;
		}

		if(this.enemy2.health == 0){
			this.enemy2.kill();
			this.enemy2.destroy();
			//this.sound.kill.play();
			this.flag = false;
		}
	},

	// End game if player dies
	endGame: function () {
		game.state.start('gameOver');
	},


	 // Very basic move monster towards player function.
	moveTowardPlayer: function (enemy, speed, flag, walkAnim) {
		if(flag){
		if (this.player.x < enemy.x && Math.abs(this.player.x - enemy.x) < 200 && walkAnim){
			enemy.body.velocity.x = -speed;
			enemy.animations.play('walk_left');
			//console.log("walk left");
			}
		else if(Math.abs(this.player.x - enemy.x) < 300 && walkAnim) {
			enemy.body.velocity.x = speed;
			enemy.animations.play('walk_right');
			//console.log("walk right");
			}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
		this.checkAttack(enemy, walkAnim);
		}
	},

	checkAttack: function (enemy, walkAnim)
	{
		// Get how close players are together 
		var xClose = Math.abs(this.player.x - enemy.x);
		var yClose = Math.abs(this.player.y - enemy.y);

		if(Math.abs(xClose + yClose) < 150){

		if(this.player.x < enemy.x){
			this.walkAnim = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 80){
				if(this.frame_counter % 50 == 0){
					game.global.health -= 5;
					console.log("strike left" + game.global.health);
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

	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x < 100) {
			game.state.start('level_02');
		} else if (player.x > 4060 && player.y > 1300 && player.y < 1500) {
			game.state.start('level_02');
		} 
	},

	render: function () 
	{
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