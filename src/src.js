
// 100 x 16 = 1600 width, 64 x 16 = 1024 height
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var map;
var dialogue;
var cursors;

var player;
var aquelarre, archer, banker, bat, beer, butcher, cat, centaur, circus, cow, deer, devil, drinking, dwarf, fox, frog, fungus, fungus2, ghost, ghost2, horse, mechanic, mermaid, minotaur, ogre1, ogre2, robot, robot2, sheep, snake, tree, warrior;

function preload() {

    // load map tiles
    game.load.image('roguelike_sheet', 'assets/tilemaps/roguelike_sheet.png');
    game.load.image('roguelike_indoor', 'assets/tilemaps/roguelike_indoor.png');
    game.load.image('roguelike_dungeon', 'assets/tilemaps/roguelike_dungeon.png');
    game.load.image('roguelike_city', 'assets/tilemaps/roguelike_city.png');

    // load map data
    game.load.tilemap('tilemap', 'assets/tilemaps/un_map.json', null, Phaser.Tilemap.TILED_JSON);

    // load player sprite
    game.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);

    // load additional characters
    game.load.spritesheet('aquelarre', 'assets/sprites/aquelarre.png');
    game.load.spritesheet('archer', 'assets/sprites/archer.png');
    game.load.spritesheet('banker', 'assets/sprites/banker.png');
    game.load.spritesheet('bat', 'assets/sprites/bat.png');
    game.load.spritesheet('beer', 'assets/sprites/beer.png');
    game.load.spritesheet('butcher', 'assets/sprites/butcher.png');
    game.load.spritesheet('cat', 'assets/sprites/cat.png');
    game.load.spritesheet('centaur', 'assets/sprites/centaur.png');
    game.load.spritesheet('circus', 'assets/sprites/circus.png');
    game.load.spritesheet('cow', 'assets/sprites/cow.png');
    game.load.spritesheet('deer', 'assets/sprites/deer.png');
    game.load.spritesheet('devil', 'assets/sprites/devil.png');
    game.load.spritesheet('drinking', 'assets/sprites/drinking.png');
    game.load.spritesheet('dwarf', 'assets/sprites/dwarf.png');
    game.load.spritesheet('fox', 'assets/sprites/fox.png');
    game.load.spritesheet('frog', 'assets/sprites/frog.png');
    game.load.spritesheet('fungus', 'assets/sprites/fungus.png');
    game.load.spritesheet('fungus2', 'assets/sprites/fungus2.png');
    game.load.spritesheet('ghost', 'assets/sprites/ghost.png');
    game.load.spritesheet('ghost2', 'assets/sprites/ghost2.png');
    game.load.spritesheet('horse', 'assets/sprites/horse.png');
    game.load.spritesheet('mechanic', 'assets/sprites/mechanic.png');
    game.load.spritesheet('mermaid', 'assets/sprites/mermaid.png');
    game.load.spritesheet('minotaur', 'assets/sprites/minotaur.png');
    game.load.spritesheet('ogre1', 'assets/sprites/ogre1.png');
    game.load.spritesheet('ogre2', 'assets/sprites/ogre2.png');
    game.load.spritesheet('robot', 'assets/sprites/robot.png');
    game.load.spritesheet('robot2', 'assets/sprites/robot2.png');
    game.load.spritesheet('sheep', 'assets/sprites/sheep.png');
    game.load.spritesheet('snake', 'assets/sprites/snake.png');
    game.load.spritesheet('tree', 'assets/sprites/tree.png');
    game.load.spritesheet('warrior', 'assets/sprites/warrior.png');
}

function create() {

  map = game.add.tilemap('tilemap');

  //  Now add in the tileset
  // addTilesetImage(tileset, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid)
  map.addTilesetImage('roguelike_sheet');
  map.addTilesetImage('roguelike_indoor');
  map.addTilesetImage('roguelike_dungeon');
  map.addTilesetImage('roguelike_city');

  //  Create our layers

  ground_layer = map.createLayer('Ground');
  ground2_layer = map.createLayer('Ground 2');
  building_layer = map.createLayer('Buildings');
  roof_layer = map.createLayer('Roofs');
  extra_layer = map.createLayer('Extra');

  //  Resize the world
  ground_layer.resizeWorld();
  ground2_layer.resizeWorld();
  building_layer.resizeWorld();
  roof_layer.resizeWorld();

  //  This isn't totally accurate, but it'll do for now
  map.setCollisionBetween(1, 3500, true, building_layer);
  map.setCollisionBetween(1, 3500, true, roof_layer);

  // set aditional characters
  aquelarre = game.add.sprite(320, 750, 'aquelarre');
  archer = game.add.sprite(759, 95, 'archer'); //fix
  banker = game.add.sprite(1390, 700, 'banker');
  bat = game.add.sprite(125, 860, 'bat');
  beer = game.add.sprite(336, 103, 'beer');
  beer = game.add.sprite(270, 560, 'butcher');
  cat = game.add.sprite(615, 485, 'cat');
  centaur = game.add.sprite(130, 580, 'centaur');
  circus = game.add.sprite(570, 778, 'circus');
  cow = game.add.sprite(40, 510, 'cow');
  game.add.sprite(65, 492, 'cow');
  deer = game.add.sprite(1043, 470, 'deer');
  devil = game.add.sprite(405, 945, 'devil');
  drinking = game.add.sprite(1078, 612, 'drinking');
  dwarf = game.add.sprite(1000, 650, 'dwarf');
  fox = game.add.sprite(1020, 295, 'fox');
  frog = game.add.sprite(80, 245, 'frog');
  fungus = game.add.sprite(650, 600, 'fungus');
  fungus2 = game.add.sprite(720, 640, 'fungus2');
  ghost = game.add.sprite(100, 968, 'ghost');
  ghost2 = game.add.sprite(55, 825, 'ghost2');
  horse = game.add.sprite(70, 450, 'horse');
  mechanic = game.add.sprite(764, 344, 'mechanic');
  mermaid = game.add.sprite(1280, 305, 'mermaid');
  mechanic = game.add.sprite(1365, 500, 'minotaur');
  ogre1 = game.add.sprite(700, 50, 'ogre1');
  ogre2 = game.add.sprite(800, 70, 'ogre2');
  ogre2 = game.add.sprite(1150, 370, 'robot');
  ogre2 = game.add.sprite(1230, 395, 'robot2');
  ogre2 = game.add.sprite(257, 560, 'sheep');
  snake = game.add.sprite(14, 375, 'snake');
  tree = game.add.sprite(1498, 113, 'tree');
  warrior = game.add.sprite(920, 680, 'warrior');

  game.physics.enable(centaur, Phaser.Physics.ARCADE);


  // set player
  player = game.add.sprite(700, 500, 'player', 1);
  player.animations.add('left', [8,9], 10, true);
  player.animations.add('right', [1,2], 10, true);
  player.animations.add('up', [11,12,13], 10, true);
  player.animations.add('down', [4,5,6], 10, true);

  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.setSize(10, 14, 2, 1);
  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();
  dialogue = document.getElementById("dialogue");

}

function update() {

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -300;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 300;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

    game.physics.arcade.collide(player, building_layer);
    game.physics.arcade.collide(player, roof_layer);

    game.physics.arcade.overlap(player, centaur, function() { showDialogue("assets/sprites/centaur.png", "Centauro:", "Soy el guardian de zootecnia, que quieres? o Que loaos,dls,dasl,dñsal,dñlsa,"); }, null, this);

    console.log(player.x, player.y);

}

function render() {

    // game.debug.body(player);

}

function showDialogue(img_path, name, message, timeout){

  dialogue.style.visibility = 'visible';
  dialogue.childNodes[0].src = img_path;
  dialogue.childNodes[1].innerText = name;
  dialogue.childNodes[2].innerText = message;

  if( typeof obj == 'undefined' ){
    timeout = 1500;
  }

  setTimeout(function(){ dialogue.style.visibility = 'hidden'; }, timeout);
}
