var mainRoom = {
    
preload: function() {
    console.log('In Main Room');
    game.load.image('sky', 'assets/sky.png');
},

create: function() {
    game.add.sprite(0,0, 'sky');
    console.log('In Main Room');

    k = game.input.keyboard;
},

update: function() {

    if(k.isDown(Phaser.Keyboard.UP))
        game.state.start('room1')
}
};