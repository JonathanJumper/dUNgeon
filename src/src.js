
// 100 x 16 = 1600 width, 64 x 16 = 1024 height
var game = new Phaser.Game(900, 650, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var map;
var dialogue;
var cursors;
var SPEED = 125;

var player;
var aquelarre, archer, banker, bat, beer, butcher, cat, centaur, circus, cow, deer, devil, drinking, dwarf, fox, frog, fungus, fungus2, ghost, ghost2, horse, mechanic, mermaid, minotaur, ogre1, ogre2, robot, robot2, sheep, snake, tree, warrior;
var trigger_tree = false, trigger_ghost = false, trigger_ghost2 = false, trigger_butcher = false, trigger_mechanic = false, trigger_final = false;

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
  archer = game.add.sprite(700, 60, 'archer'); //fix
  banker = game.add.sprite(1390, 700, 'banker');
  bat = game.add.sprite(820, 431, 'bat');
  beer = game.add.sprite(336, 103, 'beer');
  butcher = game.add.sprite(270, 560, 'butcher');
  cat = game.add.sprite(16, 375, 'cat');
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
  minotaur = game.add.sprite(1365, 500, 'minotaur');
  ogre1 = game.add.sprite(650, 110, 'ogre1');
  ogre2 = game.add.sprite(750, 80, 'ogre2');
  robot = game.add.sprite(698, 314, 'robot');
  robot2 = game.add.sprite(1230, 395, 'robot2');
  sheep = game.add.sprite(257, 560, 'sheep');
  snake = game.add.sprite(61514, 485375, 'snake');
  tree = game.add.sprite(1498, 113, 'tree');
  warrior = game.add.sprite(920, 687, 'warrior');

  game.physics.enable(aquelarre, Phaser.Physics.ARCADE);
  game.physics.enable(archer, Phaser.Physics.ARCADE);
  game.physics.enable(banker, Phaser.Physics.ARCADE);
  game.physics.enable(bat, Phaser.Physics.ARCADE);
  game.physics.enable(beer, Phaser.Physics.ARCADE);
  game.physics.enable(butcher, Phaser.Physics.ARCADE);
  game.physics.enable(cat, Phaser.Physics.ARCADE);
  game.physics.enable(centaur, Phaser.Physics.ARCADE);
  game.physics.enable(circus, Phaser.Physics.ARCADE);
  game.physics.enable(cow, Phaser.Physics.ARCADE);
  game.physics.enable(deer, Phaser.Physics.ARCADE);
  game.physics.enable(devil, Phaser.Physics.ARCADE);
  game.physics.enable(drinking, Phaser.Physics.ARCADE);
  game.physics.enable(dwarf, Phaser.Physics.ARCADE);
  game.physics.enable(fox, Phaser.Physics.ARCADE);
  game.physics.enable(frog, Phaser.Physics.ARCADE);
  game.physics.enable(fungus, Phaser.Physics.ARCADE);
  game.physics.enable(fungus2, Phaser.Physics.ARCADE);
  game.physics.enable(ghost, Phaser.Physics.ARCADE);
  game.physics.enable(ghost2, Phaser.Physics.ARCADE);
  game.physics.enable(horse, Phaser.Physics.ARCADE);
  game.physics.enable(mechanic, Phaser.Physics.ARCADE);
  game.physics.enable(mermaid, Phaser.Physics.ARCADE);
  game.physics.enable(minotaur, Phaser.Physics.ARCADE);
  game.physics.enable(ogre1, Phaser.Physics.ARCADE);
  game.physics.enable(ogre2, Phaser.Physics.ARCADE);
  game.physics.enable(robot, Phaser.Physics.ARCADE);
  game.physics.enable(robot2, Phaser.Physics.ARCADE);
  game.physics.enable(sheep, Phaser.Physics.ARCADE);
  game.physics.enable(snake, Phaser.Physics.ARCADE);
  game.physics.enable(tree, Phaser.Physics.ARCADE);
  game.physics.enable(warrior, Phaser.Physics.ARCADE);


  // set player
  player = game.add.sprite(960, 795, 'player', 1);
  player.animations.add('left', [8,9], 10, true);
  player.animations.add('right', [1,2], 10, true);
  player.animations.add('up', [11,12,13], 10, true);
  player.animations.add('down', [4,5,6], 10, true);

  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.setSize(10, 14, 2, 1);
  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();
  dialogue = document.getElementById("dialogue");

  showDialogue("assets/sprites/robot.png", "", "Hola, acabas de salir de estudiar 4 horas... uff.. para un parcial en derecho, que tienes ya, apresurate, menos mal estas cerca...", undefined, 7000);

}

function update() {

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -SPEED;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = SPEED;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -SPEED;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = SPEED;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

    // so you cannot walk all over the place
    game.physics.arcade.collide(player, building_layer);
    game.physics.arcade.collide(player, roof_layer);

    // There should be a cleaner way to do this, maybe a JSON file with the dialogues
    if(!trigger_final){
      game.physics.arcade.overlap(player, warrior, function() { showDialogue("assets/sprites/warrior.png", "Celadurus Magnificus:", "Maletas abiertas y carnet por favor ¿No tiene carnet? No puede ingresar, fijo lo dejo anoche en el freud"); }, null, this);
    }
    else{
      game.physics.arcade.overlap(player, warrior, function() { showDialogue("assets/sprites/warrior.png", "Celadurus Magnificus:", "Aahhh hasta que lo encontro ¿no?, bien, siga pero ya va muy tarde para el parcial muajaja", 7); }, null, this);
    }
    game.physics.arcade.overlap(player, aquelarre, function() { showDialogue("assets/sprites/aquelarre.png", "???:", "AQUELARRREEEEE!!!!"); }, null, this);
    game.physics.arcade.overlap(player, centaur, function() { showDialogue("assets/sprites/centaur.png", "Centauro:", "Soy el guardian de zootecnia, que quieres?"); }, null, this);
    game.physics.arcade.overlap(player, circus, function() { showDialogue("assets/sprites/circus.png", "Malabarus hippus:", "¿Tu carnet? No seeee maan, yo no recuerdo nada de anoche, Tal vez legol, esta en el detras del CyT cazando ogros. Paz!"); }, null, this);
    game.physics.arcade.overlap(player, archer, function() { showDialogue("assets/sprites/archer.png", "Legol Ass:", "Ahh malditos ogros se me escapan. Tu carnet mmmm no se, ¿Ya le preguntaste al arbol de la sabiduria? ¿¡ Que cual arbol !? Sigue por esta carretera al oriente, lo encontraras. \n* alista una flecha *"); }, null, this);
    if(!trigger_tree){
      game.physics.arcade.overlap(player, tree, function() { showDialogue("assets/sprites/tree.png", "Arbol Viejus Sabius:", "Mmmm ¿¡ Quien osa despertarme !?\nTú, insignificante. Y por un carnet!?\nClaro que se donde esta, pero necesito que hagas algo por mi primero\nComo puedes ver los arboles no nos podemos mover, pero alguien me debe dinero en economia, recupera mi dinero"); }, null, this);
    }
    else{
      game.physics.arcade.overlap(player, tree, function() { showDialogue("assets/sprites/tree.png", "Arbol Viejus Sabius:", "Que bien, el dinero esta completo.\nMalditos economistas son muy mala pagas.\n¿Tu carnet? Ah decir verdad no lo se man, soy sabio, no brujo.\n¿Donde hay un brujo? Bueno eso si lo se, por que soy sabio jajaja no brujo jaja, cerca de la capilla hay uno, esta al suroccidente de la universidad"); }, null, this);
    }
    game.physics.arcade.overlap(player, banker, function() { showDialogue("assets/sprites/banker.png", "Banquerus Codiciosus:", "¿¡ Dinero, que dinero? Ahh maldición. No tengo ahorita.\n¿El arbol dijo que me haria todo eso? Ahh esta bien, toma aqui esta.\n¿Feliz? Pierdete", 1); }, null, this);
    game.physics.arcade.overlap(player, ghost2, function() { showDialogue("assets/sprites/ghost2.png", "Para Normalus:", "* Buuh! *\n¿Que? Yo soy un fantasma, el brujo esta mas abajo.\nMalditos crios ya no respetan los muertos"); }, null, this);
    if(!trigger_ghost){
      game.physics.arcade.overlap(player, ghost, function() { showDialogue("assets/sprites/ghost.png", "Brujus Satanicus:", "Jajaja ¿Y esperas que use mi magia para ayudarte asi no mas? Si me traes un poco un gato negro te ayudare, esuche que hay uno le gusta comerse los cultivos de zootecnia"); }, null, this);
    }
    else if (!trigger_ghost2){
      game.physics.arcade.overlap(player, ghost, function() { showDialogue("assets/sprites/ghost.png", "Brujus Satanicus:", "Que bien un gato negro, gracias. * lo encierra * Lo siento, olvide decirte que para la pocima de Encontrarus Carnetus voy a necesitar algo de carne, muajaja ¿lo entiendes?, carne... para el carnet... Ahh como sea... de pronto con el carnicero de zootecnia encuentras, necesito de res"); }, null, this);
    }
    else{
      game.physics.arcade.overlap(player, ghost, function() { showDialogue("assets/sprites/ghost.png", "Brujus Satanicus:", "*Hocus pocus* Encontrarus Carnetus donde estas tu? *Frita la carne* Ammm... Si.. la carne era para comer, tanta magia me deja el estomago vacio, bueno ya tu carnet lo tiene Luis el ingeniero mecanico, esta en el CyT"); }, null, this);
    }
    game.physics.arcade.overlap(player, cat, function() { showDialogue("assets/sprites/cat.png", "Gatus Sacrificatus:", "* Miauuu * ", 2); }, null, this);
    if(!trigger_butcher)
      game.physics.arcade.overlap(player, butcher, function() { showDialogue("assets/sprites/butcher.png", "Carnicerus Marengus:", "Venta de carne de cordero Marengo, Cortes de primera. ¿Carne de res? Claro que tengo, traeme una vaca del corral"); }, null, this);
    else{
      game.physics.arcade.overlap(player, butcher, function() { showDialogue("assets/sprites/butcher.png", "Carnicerus Marengus:", "*Afila* * :( * ... Aqui esta su carne", 4); }, null, this);
    }
    game.physics.arcade.overlap(player, cow, function() { showDialogue("assets/sprites/cow.png", "Vacas Gorditus:", " * Muuuh ? * ¿Asi suenan las vacas en serio?", 3); }, null, this);
    if(!trigger_mechanic){
      game.physics.arcade.overlap(player, mechanic, function() { showDialogue("assets/sprites/mechanic.png", "Ingenierus fastidiosus:", "¿Tu carnet? ¿Como supiste que lo tenia yo? Te lo dare, pero primero ayudame, ¿sabes? soy ingeniero mecanico, y mi carrera es muy dificil, no me queda tiempo de nada, tanto calculo y fisica... ayudame a matar un murcielago que esta en quimica, puse la escalera ya, pero no lo he matado, es que no me queda tiempo man, fisica, electronica, calculo... jaja *rie tembloroso*"); }, null, this);
    }
    else{
      game.physics.arcade.overlap(player, mechanic, function() { showDialogue("assets/sprites/mechanic.png", "Ingenierus fastidiosus:", "¿Lo mataste? Que bien, gracias, es que no me quedaba tiempo como te dije mi carrera es muy dificil, como sea, toma tu carnet, la proxima vez no tomes tantas cervezas juntas jajaja *rie aun mas tembloroso*", 6); }, null, this);
    }
    game.physics.arcade.overlap(player, bat, function() { showDialogue("assets/sprites/bat.png", "Murcielagus Asustadisus:", "* Sniik Snheek * ", 5); }, null, this);

    game.physics.arcade.overlap(player, ogre1, function() { showDialogue("assets/sprites/ogre1.png", "Profesorus Ogres Rajonus:", "*Coloca un 0.0*\n Beewwww *Coloca un parcial imposible*"); }, null, this);
    game.physics.arcade.overlap(player, ogre2, function() { showDialogue("assets/sprites/ogre2.png", "Administrativus Ogres Burocraticus:", "Espere su turno*Chatea en internet*\n Ahhh me elimino Andrea del faccebok, sabe que chino, toca que vaya a otro lado"); }, null, this);
    game.physics.arcade.overlap(player, beer, function() { showDialogue("assets/sprites/beer.png", "Osus grandus:", "* Rooar? * "); }, null, this);
    game.physics.arcade.overlap(player, fungus, function() { showDialogue("assets/sprites/fungus.png", "Fungus Fungus:", "Fungus Fungus"); }, null, this);
    game.physics.arcade.overlap(player, fungus2, function() { showDialogue("assets/sprites/fungus2.png", "Fungus Psicodelicus:", "Si me comes, no volveras a ser el mismo"); }, null, this);
    game.physics.arcade.overlap(player, mermaid, function() { showDialogue("assets/sprites/mermaid.png", "Bonitus Odontologus:", "Hola :) ¿Estas bien? Ayy ¿por que te sonrojas?"); }, null, this);
    game.physics.arcade.overlap(player, dwarf, function() { showDialogue("assets/sprites/dwarf.png", "Jugandus Playitus:", "¿Hey tienes un frisbee?"); }, null, this);
    game.physics.arcade.overlap(player, drinking, function() { showDialogue("assets/sprites/drinking.png", "Armando farra:", "Ahhh ¿Que? ¿No me puedo tomar una cerveza? Maldita privatización, ¿te acuerdas de los viernes de antes?"); }, null, this);
    game.physics.arcade.overlap(player, fox, function() { showDialogue("assets/sprites/fox.png", "Perrus:", "Sabes, estuve con marcela el fin de semana, a decir verdad me gusta mas daniela."); }, null, this);
    game.physics.arcade.overlap(player, robot2, function() { showDialogue("assets/sprites/robot2.png", "Ingenierus Electronicus:", " Hola, bueno yo se supone que soy un ing electronico *con algo mas de tiempo este personaje hubiera tenido plot* "); }, null, this);
    game.physics.arcade.overlap(player, robot, function() { showDialogue("assets/sprites/robot.png", "Autorus grandiosus:", "10101001 Hola soy Jonathan, cree este juego, que desocupado, ¿no? soy ingeniero de sistemas UNAL, no olvides darle like y suscribirte :v github.com/JonathanJumper fb.com/jo2ch"); }, null, this);

    //console.log(player.x, player.y);

}

function render() {

    // game.debug.body(player);

}

function showDialogue(img_path, name, message, trigger, timeout){

  dialogue.style.visibility = 'visible';
  dialogue.childNodes[0].src = img_path;
  dialogue.childNodes[1].innerText = name;
  dialogue.childNodes[2].innerText = message;

  if(typeof trigger !== 'undefined'){
    switch(trigger) {
    case 1:
      trigger_tree = true;
      break;
    case 2:
      trigger_ghost = true;
      game.world.remove(cat);
      break;
    case 3:
      trigger_butcher = true;
      game.world.remove(cow);
      break;
    case 4:
      trigger_ghost2 = true;
      break;
    case 5:
      trigger_mechanic = true;
      game.world.remove(bat);
      break;
    case 6:
      trigger_final = true;
      break;
    case 7:
      game.gamePaused();
      break;
    }
  }

  if(typeof timeout === 'undefined'){
    timeout = 1500;
  }

  if(!trigger_final){
    setTimeout(
      function(){
        dialogue.style.visibility = 'hidden';
        // TODO scroll to top
      }, timeout);
  }

}
