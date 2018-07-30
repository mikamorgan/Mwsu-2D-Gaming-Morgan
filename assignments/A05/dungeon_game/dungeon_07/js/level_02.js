var level_02 = {

	preload: function () {
		console.log("level_02.js");
		// Load tile map
		game.load.tilemap('level_02', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal_corpse', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');
		game.load.image('blackened_column', 'assets/tileset/item/statue/blackened_column.png');
		game.load.image('floor_stain', 'assets/tileset/item/blood/floor_stain.png');
		game.load.image('nsew_stains', 'assets/tileset/item/blood/nsew_stains.png');
		game.load.image('broken_green_column', 'assets/tileset/item/statue/broken_green_column.png');
		game.load.image('skeleton', 'assets/tileset/item/corpse/skeleton.png');
		game.load.image('giant_human', 'assets/tileset/logic/creature/giant_human.png');
		game.load.image('mutant', 'assets/tileset/logic/creature/mutant.png');
		game.load.image('dark_stairs', 'assets/tileset/building/stairs/dark_stairs.png');
		game.load.image('floor_tiles', 'assets/tileset/ground/indoor/floor_tiles.png');
		game.load.image('mushroom3', 'assets/tileset/plant/mushroom3.png');
		game.load.image('portal', 'assets/tileset/logic/portal.png');
		game.load.image('purple_crystal', 'assets/tileset/ground/rock/purple_crystal.png');
		game.load.image('rocks', 'assets/tileset/ground/rock/rocks.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('skull_pale', 'assets/tileset/item/corpse/skull_pale.png');
		game.load.image('stairs', 'assets/tileset/building/stairs/stairs.png');
		game.load.image('star_shaped_plants', 'assets/tileset/plant/star_shaped_plants.png');
	},
	create: function () {


		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_02');
		this.map.addTilesetImage('ground/brown', 'ground');
		this.map.addTilesetImage('collision', 'collision');
		this.map.addTilesetImage('corpse/huge_animal', 'huge_animal_corpse');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');
		this.map.addTilesetImage('floor_tiles', 'floor_tiles');
		this.map.addTilesetImage('blackened_column', 'blackened_column');
		this.map.addTilesetImage('blood/floor_stain', 'floor_stain');
		this.map.addTilesetImage('blood/nsew_stains', 'nsew_stains');
		this.map.addTilesetImage('broken_green_column', 'broken_green_column');
		this.map.addTilesetImage('corpse/skeleton', 'skeleton');
		this.map.addTilesetImage('creature/giant_human', 'giant_human');
		this.map.addTilesetImage('creature/mutant', 'mutant');
		this.map.addTilesetImage('dark_stairs', 'dark_stairs');
		this.map.addTilesetImage('mushroom3', 'mushroom3');
		this.map.addTilesetImage('portal', 'portal');
		this.map.addTilesetImage('purple_crystal', 'purple_crystal');
		this.map.addTilesetImage('rocks', 'rocks');
		this.map.addTilesetImage('rock/rocks_2', 'rocks_2');
		this.map.addTilesetImage('skull_pale', 'skull_pale');
		this.map.addTilesetImage('stairs', 'stairs');
		this.map.addTilesetImage('star_shaped_plants', 'star_shaped_plants');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			roof_add_layer: this.map.createLayer('4_roof_add'),
			objects: this.map.createLayer('objects'),
			collision_layer: this.map.createLayer('collision')
		};


		this.layers.collision_layer.alpha = 0;

		game.physics.arcade.enable(this.layers.collision_layer);
		game.physics.arcade.enable(this.layers.object_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		//this.map.setTileIndexCallback(45, this.hitWall, this);

		this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		this.portal = game.add.sprite(0, 0, 'red_portal');
		this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
		this.portal.animations.play('rotate');
		this.portal.alpha = 0;

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');
		this.player.health = game.global.health;

		// Adding enemy (using same sprite as knight)
		this.enemy = game.add.sprite(300, 700, 'knight_atlas');
		this.enemy.health = 100;

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
		this.enemy.animations.play('idle_left');

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.portal.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//this.addPauseButton(game);

		this.flag = true;
		this.walkAnim = true;

		this.frame_counter = 0;
	},

	update: function () {

		this.move();

		this.frame_counter++;

		if (this.isOverlapped(this.player, this.portal)) {
			console.log("bingo");
			this.transportPlayer(this.portal.x, this.portal.y, 1568, 1760);
		}

		this.moveTowardPlayer(this.enemy, 50, this.flag, this.walkAnim);
		this.checkPlayerTransport(this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);
		game.physics.arcade.collide(this.enemy, this.layers.collision_layer);
		game.physics.arcade.collide(this.player, this.enemy);

		if(this.player.health == 0){
			this.walkAnim = false;
			this.player.animations.play('dead');
			this.timedEvent = this.time.delayedCall(1000, onEvent, [], this);
		}

		if(this.enemy.health == 0){
			this.enemy.kill();
			this.enemy.destroy();
			//this.sound.kill.play();
			this.flag = false;
		}

		this.checkPlayerTransport(this.player);
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

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	checkTileSteppedOn: function (layer, player) {
		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			if (tile.index == 14) {
				this.showPortal();
			}

		}
	},

	showPortal: function () {
		this.portal.alpha = 1;
		this.portal.x = 544;
		this.portal.y = 544;
	},

	isOverlapped: function (spriteA, spriteB) {

		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);

	},

	transportPlayer: function (x1, y1, x2, y2) {
		movePlayer = game.add.tween(this.player).to({
			x: x1,
			y: y1
		}, 500, Phaser.Easing.Linear.None, true);
		fade = game.add.tween(this.player).to({
			alpha: 0
		}, 750, "Linear", true);
		scale = game.add.tween(this.player.scale).to({
			x: .2,
			y: .2
		}, 1000, Phaser.Easing.Linear.None, true);
		
		game.time.events.add(Phaser.Timer.SECOND * 1, function(){
			movePlayer.stop();
			scale.stop();
			fade.stop();
		 }, this);
		 game.time.events.add(Phaser.Timer.SECOND * 1.1, this.movePlayer , this,x2,y2);

	},

	tweenScalePlayer: function () {

		game.global.current_level = 'level_03';
		game.state.start(game.global.current_level);
	},

	tweenFadePlayer: function () {
		fade = game.add.tween(this.player).to({
			alpha: 0
		}, 750, "Linear", true);
	},

	tweenMovePlayer: function (x, y) {

		var px = x;
		var py = y;
		movePlayer = game.add.tween(this.player).to({
			x: px,
			y: py
		}, 500, Phaser.Easing.Linear.None, true);
	},
	checkPlayerTransport: function (player) {
		if (player.x > 1411) {
			game.global.current_level = 'level_03';
			game.state.start(game.global.current_level);
		} else if (player.x > game.width) {
			// go somewhere
		} else if (player.y < game.height) {
			// go somewhere
		} else if (player.y > game.height) {
			// go somewhere
		}
	},

	movePlayer: function(x,y){
		this.player.reset(x,y);
		this.player.alpha = 1;
		this.player.scale.setTo(1);
	},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("And here is our new level!", game.width / 2, game.height - 10);
	},

	move: function()
	{
		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Display health bar
		this.myHealthBar.setPosition(this.player.x, this.player.y - 35)
	
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
	
			// dead
			if(k.isDown(Phaser.Keyboard.ENTER))
			{
			this.player.animations.play('dead');
			this.alive = false;
	
			// go to game over screen after the death animation plays
			this.player.animations.currentAnim.onComplete.add(this.endGame, this);
			}
		},
	
		endJump: function (){
			this.player.body.velocity.y = 550;
			console.log("endJump");
		},
}