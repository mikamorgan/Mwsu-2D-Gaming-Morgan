var level_04 = {

	preload: function () {
		console.log("level_04");
		// Load tile map
		game.load.tilemap('level_04', 'assets/maps/islands.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:

        game.load.image("ground","assets/tileset/ground/ground.png");
        game.load.image("earth_dark","assets/tileset/ground/ridge/earth_dark.png");
        game.load.image("grass_edges","assets/tileset/ground/grass_edges.png");
        game.load.image("grass_corners","assets/tileset/ground/grass_corners.png");
        game.load.image("grasses","assets/tileset/plant/grasses.png");
        game.load.image("earth_edges","assets/tileset/ground/earth_edges.png");
        game.load.image("huge_animal","assets/tileset/item/corpse/huge_animal.png");
        game.load.image("small_stump","assets/tileset/plant/stump/small_stump.png");
        game.load.image("eye","assets/tileset/ground/eye.png");
        game.load.image("collision","assets/tileset/logic/collision.png");
        game.load.image("portal","assets/tileset/logic/portal.png");
        game.load.image("palm_tree","assets/tileset/plant/tree/palm_tree.png");
        game.load.image("tree_blue","assets/tileset/plant/tree/tree_blue.png");
        game.load.image("tree_golden_large","assets/tileset/plant/tree/tree_golden_large.png");
        game.load.image("tree_golden_small","assets/tileset/plant/tree/tree_golden_small.png");
        game.load.image("green_stone_2","assets/tileset/item/statue/green_stone_2.png");
        game.load.image("blue_circle","assets/tileset/building/decoration/blue_circle.png");
        game.load.image("giant_human","assets/tileset/logic/creature/giant_human.png");
        game.load.image("naga","assets/tileset/logic/creature/naga.png");
        game.load.image("daisy_white","assets/tileset/plant/flower/daisy_white.png");
        game.load.image("daisy_yellow","assets/tileset/plant/flower/daisy_yellow.png");
        game.load.image("stump_pale_brown","assets/tileset/plant/stump/stump_pale_brown.png");
        game.load.image("stump_brown","assets/tileset/plant/stump/stump_brown.png");
        game.load.image("floor_sparkle","assets/tileset/building/decoration/floor_sparkle.png");
        game.load.image("green_stone_3","assets/tileset/item/statue/green_stone_3.png");
        game.load.image("vine","assets/tileset/plant/vine.png");
        game.load.image("clouds","assets/tileset/sky/cloud/clouds.png");
        game.load.image("fairy","assets/tileset/logic/creature/fairy.png");
        game.load.image("demon","assets/tileset/logic/creature/demon.png");
        game.load.image("elemental","assets/tileset/logic/creature/elemental.png");
        game.load.image("suspension_bridge","assets/tileset/object/suspension_bridge.png");
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_04');
        this.map.addTilesetImage('ground_2', 'ground_2');
        this.map.addTilesetImage('ground', 'ground');
        this.map.addTilesetImage('earth_dark', 'earth_dark');
        this.map.addTilesetImage('grass_edges', 'grass_edges');
        this.map.addTilesetImage('grass_corners', 'grass_corners');
        this.map.addTilesetImage('grasses', 'grasses');
        this.map.addTilesetImage('earth_edges', 'earth_edges');
        this.map.addTilesetImage('huge_animal', 'huge_animal');
        this.map.addTilesetImage('small_stump', 'small_stump');
        this.map.addTilesetImage('eye', 'eye');
        this.map.addTilesetImage('collision', 'collision');
        this.map.addTilesetImage('portal', 'portal');
        this.map.addTilesetImage('palm_tree', 'palm_tree');
        this.map.addTilesetImage('tree_blue', 'tree_blue');
        this.map.addTilesetImage('tree_golden_large', 'tree_golden_large');
        this.map.addTilesetImage('tree_golden_small', 'tree_golden_small');
        this.map.addTilesetImage('green_stone_2', 'green_stone_2');
        this.map.addTilesetImage('blue_circle', 'blue_circle');
        this.map.addTilesetImage('giant_human', 'giant_human');
        this.map.addTilesetImage('naga', 'naga');
        this.map.addTilesetImage('daisy_white', 'daisy_white');
        this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
        this.map.addTilesetImage('stump_pale_brown', 'stump_pale_brown');
        this.map.addTilesetImage('stump_brown', 'stump_brown');
        this.map.addTilesetImage('floor_sparkle', 'floor_sparkle');
        this.map.addTilesetImage('green_stone_3', 'green_stone_3');
        this.map.addTilesetImage('vine', 'vine');
        this.map.addTilesetImage('clouds', 'clouds');
        this.map.addTilesetImage('fairy', 'fairy');
        this.map.addTilesetImage('demon', 'demon');
        this.map.addTilesetImage('elemental', 'elemental');
        this.map.addTilesetImage('suspension_bridge', 'suspension_bridge');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_add: this.map.createLayer('4_roof_add'),
			collision_layer: this.map.createLayer('collision')
        };


		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(243, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');
		this.player.health = game.global.health;

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

		this.enemy = game.add.sprite(1450, 1980, 'knight_atlas');
		this.enemy.health = 100;


		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, true);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, true);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		// Add walking and idle animations for the enemy.
		this.enemy.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy.animations.play('idle_right');

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 2080;
		this.player.y = 2080;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		//this.player.scale.setTo(0.5);

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds = true;

		k = game.input.keyboard;

		this.flag = true;
		this.walkAnim = true;

		this.frame_counter = 0;

		game.addPauseButton(game);
	},

	update: function () {

		this.move();

		this.getTileProperties(this.layers.collision_layer,this.player);

		this.frame_counter++;

		//this.checkAttack(this.player, this.enemy)
		this.moveTowardPlayer(this.enemy, 50, this.flag, this.walkAnim);
		this.checkPlayerTransport(this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy, this.layers.collision_layer);
		game.physics.arcade.collide(this.player, this.enemy);

		if(this.player.health == 0){
			this.walkAnim = false;
			this.player.animations.play('dead');
			this.timedEvent = this.time.delayedCall(500, onEvent, [], this);
		}

		if(this.enemy.health == 0){
			this.enemy.kill();
			this.enemy.destroy();
			//this.sound.kill.play();
			this.flag = false;
		}

	},

	//End game after death animation
	onEvent: function(){
		game.state.start("gameOver");
	},

		// Very basic move monster towards player function.
	moveTowardPlayer: function (enemy, speed, flag, walkAnim) {
		if(flag){
		if (this.player.x < enemy.x && Math.abs(this.player.x - enemy.x) < 200 && walkAnim){
			enemy.body.velocity.x = -speed;
			enemy.animations.play('walk_left');
			console.log("walk left");
			}
		else if(Math.abs(this.player.x - enemy.x) < 300 && walkAnim) {
			enemy.body.velocity.x = speed;
			enemy.animations.play('walk_right');
			console.log("walk right");
			}
		//else{
		//	enemy.body.velocity.x = 0;
		//	enemy.body.velocity.y = 0;
		//}
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

		if(Math.abs(xClose + yClose) < 100){

		if(this.player.x < enemy.x){
			this.walkAnim = false;
			enemy.body.velocity.x = -50;
			enemy.animations.play('attack_left');
			console.log("attack left");
			if(Math.abs(xClose + yClose) < 20){
				if(this.frame_counter % 50 == 0){
					this.player.health -= 5;
					game.global.health -= 5;
					console.log("strike left");
				}
			}
			this.myHealthBar.setPercent(this.player.health / 100);
		}
		else{
			console.log(Math.abs(xClose + yClose));
			this.walkAnim = false;
			enemy.body.velocity.x = 50;
			enemy.animations.play('attack_right');
			console.log("attack_right");
			if(Math.abs(xClose + yClose) < 120){
				if(this.frame_counter % 50 == 0){
					this.player.health -= 5;
					game.global.health -= 5;
					console.log("strike right" + this.player.health);
				}
			}
			this.myHealthBar.setPercent(this.player.health / 100);
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
		if (player.x < 800) {
			game.global.current_level = 'level_05';
			game.state.start(game.global.current_level);
		} else if (player.x > game.width) {
			// go somewhere
		} else if (player.y < game.height) {
			// go somewhere
		} else if (player.y > game.height) {
// Display health bar
		this.myHealthBar.setPosition(this.player.x, this.player.y - 35);			// go somewhere
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
		&& !k.isDown(Phaser.Keyboard.ENTER) && !k.isDown(83))
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
				if(Math.abs(this.player.x - this.enemy.x) < 80)
					this.enemy.health --;
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
			//this.player.body.y -= 0.50;
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
			//this.player.body.y -= 0.50;
		}

		// dead
		if(k.isDown(Phaser.Keyboard.ENTER))
		{
		this.player.animations.play('dead');
		}
	},
}