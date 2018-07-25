var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");
		
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

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

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		// this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		// this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		// this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		// this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		// this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		// this.altKey = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
		// this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		//this.keyA = game.input.keyboard.addkey(Phaser.KeyCode.A);
		k = game.input.keyboard;
		game.addPauseButton(game);
	},

	update: function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Walk E, NE, SE
		if (k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.SHIFT)) {
			if(k.isDown(Phaser.Keyboard.UP)){
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN)){
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

		// Walk W, NW, SW
		if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.SHIFT)) {
			if(k.isDown(Phaser.Keyboard.UP)){
					this.player.body.velocity.x = 200;
					this.player.body.velocity.y = -200;
				}
			else if(k.isDown(Phaser.Keyboard.DOWN)){
					this.player.body.velocity.x = 200;
					this.player.body.velocity.y = 200;
				}
			else{
					this.player.body.velocity.x = 200;
					this.player.body.velocity.y = 0;
				}
				this.player.animations.play('walk_right');
				this.prevDir = 'right'
		}

		// Walk right
		// if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.SHIFT)) {
		// 	this.player.body.velocity.x = 200;
		// 	this.player.animations.play('walk_right');
		// 	this.prevDir = 'right'
		// }
		// Run left
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.LEFT)) {
			this.player.animations.play('run_left');
			this.player.body.velocity.x = -400;
		}
		// Run right
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.animations.play('run_right');
			this.player.body.velocity.x = 400;
		}
		if (k.isDown(Phaser.Keyboard.UP)) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
		}
		if (k.isDown(Phaser.Keyboard.DOWN)) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}
		if (!k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP) && !k.isDown(Phaser.Keyboard.DOWN)) {
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}
		//jump animation, does not work
		if (k.isDown(Phaser.Keyboard.SPACEBAR)) {
			//if(this.prevDir == 'left'){
			//	this.player.animations.play('jump_left');
			//}
			//else{
			//	this.player.animations.play('jump_right');
			//}
			//console.log(this.player.scale.x )
			this.player.animations.play('jump_right');
		}      
		if (k.isDown(65)){
			if (this.prevDir == 'left'){
				this.player.animations.play('attack_left')
			}
			else{
				this.player.animations.play('attack_right')
			}
		}

	   if(k.isDown(Phaser.Keyboard.ENTER)){
		   //this.player.body.velocity.x = -200;
		   this.player.animations.play('dead');
	   }

	// if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP)) {
	// 	this.player.body.velocity.x = 200;
	// 	this.player.body.velocity.y = 0;
	// 	this.player.animations.play('walk_right');
	// 	this.prevDir = 'right'
	// }
	// if (k.isDown(Phaser.Keyboard.RIGHT) && k.isDown(Phaser.Keyboard.UP)) {
	// 	this.player.body.velocity.x = 200;
	// 	this.player.body.velocity.y = -200;
	// 	this.player.animations.play('walk_right');
	// 	this.prevDir = 'right'
	// }
	// if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.DOWN)) {
	// 	this.player.body.velocity.x = 200;
	// 	this.player.body.velocity.y = 0;
	// 	this.player.animations.play('walk_right');
	// 	this.prevDir = 'right'
	// }
	// if (k.isDown(Phaser.Keyboard.RIGHT) && k.isDown(Phaser.Keyboard.DOWN)) {
	// 	this.player.body.velocity.x = 200;
	// 	this.player.body.velocity.y = 200;
	// 	this.player.animations.play('walk_right');
	// 	this.prevDir = 'right'
	// }
	// if (k.isDown(Phaser.Keyboard.UP) && !k.isDown(Phaser.Keyboard.RIGHT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = -200;
	// 	this.player.body.velocity.x = 0;
	// }
	// if (k.isDown(Phaser.Keyboard.UP) && k.isDown(Phaser.Keyboard.RIGHT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = -200;
	// 	this.player.body.velocity.x = -200;
	// }
	// if (k.isDown(Phaser.Keyboard.UP) && !k.isDown(Phaser.Keyboard.LEFT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = -200;
	// 	this.player.body.velocity.x = 0;
	// }
	// if (k.isDown(Phaser.Keyboard.UP) && k.isDown(Phaser.Keyboard.LEFT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = -200;
	// 	this.player.body.velocity.x = 200;
	// }
	// if (k.isDown(Phaser.Keyboard.DOWN) && !k.isDown(Phaser.Keyboard.RIGHT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = 200;
	// 	this.player.body.velocity.x = 0;
	// }
	// if (k.isDown(Phaser.Keyboard.DOWN) && k.isDown(Phaser.Keyboard.RIGHT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = 200;
	// 	this.player.body.velocity.x = 200;
	// }
	// if (k.isDown(Phaser.Keyboard.DOWN) && !k.isDown(Phaser.Keyboard.LEFT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = 200;
	// 	this.player.body.velocity.x = 0;
	// }
	// if (k.isDown(Phaser.Keyboard.DOWN) && k.isDown(Phaser.Keyboard.LEFT)) {
	// 	if(this.prevDir == 'left'){
	// 		this.player.animations.play('walk_left');
	// 	}else{
	// 		this.player.animations.play('walk_right');
	// 	}
	// 	this.player.body.velocity.y = 200;
	// 	this.player.body.velocity.x = -200;
	// }

	if (!k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP) && !k.isDown(Phaser.Keyboard.DOWN)) {
		if(this.prevDir == 'left'){
			this.player.animations.play('idle_left');
		}else{
			this.player.animations.play('idle_right');
		}
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
	}
	if (k.isDown(Phaser.Keyboard.SPACEBAR)) {
		if(this.prevDir == 'left'){
			this.player.animations.play('jump_left');
		}
		else{
			this.player.animations.play('jump_right');
		}
		console.log(this.player.scale.x )
	}      
	if (k.isDown(65)){
		if (this.prevDir == 'left'){
			this.player.animations.play('attack_left')
		}
		else{
			this.player.animations.play('attack_right')
		}
	}
	},

	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	}
}
