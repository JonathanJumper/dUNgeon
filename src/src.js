
var game = new Phaser.Game(1600, 1024, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('roguelike_sheet', 'assets/tilemaps/roguelike_sheet.png');
    game.load.image('roguelike_indoor', 'assets/tilemaps/roguelike_indoor.png');
    game.load.image('roguelike_dungeon', 'assets/tilemaps/roguelike_dungeon.png');
    game.load.image('roguelike_city', 'assets/tilemaps/roguelike_city.png');
    game.load.image('roguelike_character', 'assets/tilemaps/roguelike_character.png');

    game.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
    game.load.tilemap('tilemap', 'assets/tilemaps/un_map.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.json('speech', 'assets/speechs/test.json');

}

var map;
var layer;
var cursors;
var player;
var crazy;

function create() {

    map = game.add.tilemap('tilemap');

    //  Now add in the tileset
    // addTilesetImage(tileset, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid)
    map.addTilesetImage('roguelike_sheet');
    map.addTilesetImage('roguelike_indoor');
    map.addTilesetImage('roguelike_dungeon');
    map.addTilesetImage('roguelike_city');
    map.addTilesetImage('roguelike_character');

    //  Create our layer
    layer = map.createLayer('Ground');
    layer = map.createLayer('Ground 2');
    layer = map.createLayer('Buildings');
    layer = map.createLayer('Roofs');
    layer = map.createLayer('Extra');

    //  Resize the world
    layer.resizeWorld();

    //  This isn't totally accurate, but it'll do for now
    map.setCollisionBetween(54, 83);

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    //  Player
    player = game.add.sprite(48, 48, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;

}

function update() {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

}

function render() {

    // game.debug.body(player);

}
