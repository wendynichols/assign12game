'use strict';
/*
step 1:
chose your team from left or right side
step 2
pick your player
step 3
computer picks its player from opposite side
step 4
you attack
step 5
computer attacks
step 6
the first one to die loses
step 7
Game Over
*/

function GameController(leftCombatants, rightCombatants) {
  this._turn = null;
  this.leftCombatants = leftCombatants;
  this.rightCombatants = rightCombatants;
  this.playerChoosesLeft = function(){
    this.player = 'left';
    this.computer = 'right';
  };
  this.playerChoosesRight = function(){
    this.player = 'right';
    this.computer = 'left';
  };
  this.playerChoosesCombatant = function(/*string*/name){
    var combatant = _.findWhere(
      this.getPlayerCombatants(),{"name": name});
      this.playerCombatant = combatant;
      this._computerChoosesCombatant();
    };
    this._computerChoosesCombatant = function(){
      var x = this.getComputerCombatants();
      this.computerCombatant = _.sample(x);
    };
    this.getPlayerCombatants = function(){
      return this.getCombatantsForSide(this.player);
    };
    this.getComputerCombatants = function(){
      return this.getCombatantsForSide(this.computer);
    };
    this.getCombatantsForSide = function(side){
      //whatever side the player did not choose
      //is the computer side
      //so the computer combatant is one from its side
      var combatantChoices;
      if ('right' === side){
        combatantChoices = this.rightCombatants;
      }else{
        combatantChoices = this.leftCombatants;
      }
      return combatantChoices;
    };
    this.attack = function(){
      console.log(this.playerCombatant,"vs", this.computerCombatant);
      if(this.gameIsFinished()) {
        console.log("game is over");
        return;
      }
      this.playerCombatant.attack(this.computerCombatant);
      if(this.gameIsFinished()) {
        return;
      }
      this.computerCombatant.attack(this.playerCombatant);
    };
    this.gameIsFinished = function(){
      return this.playerCombatant.health <= 0 || // playerCombatant
      this.computerCombatant.health <= 0; //.computerCombatant
    };
  };

  var Pirate = function (options){
    var options = options || {};
    this.name = options.name;
    this.life = options.life ||'normal';
    this.age = options.age;
    this.color = options.color;
    this.health = options.health;
    this.attack = function(cutlassed){
      var result = cutlassed.health -= _.random(20, 25);
      $('.health' + '.' + cutlassed.name).html(result);
      return result;
    };
    this.life = function(cutlassed) {
      return cutlassed.health -= _.random(30, 35);
    };
    $('.health.' + options.name).html(options.health);
  };

  var Lion = function (options){
    var options = options || {};
    this.life = options.life;
    this.name = options.name;
    this.age = options.age;
    this.color = options.color;
    this.health = options.health;
    this.attack = function(chomped){
      var result = chomped.health -= _.random(20, 25);
      $('.health' + '.' + chomped.name).html(result);
      return result;
    };
    this.life = function(chomped) {
      return chomped.health -= _.random(20,35);
    };
    $('.health.' + options.name).html(options.health);
  };

  var Ruth = new Pirates({
    name: "Ruth",
    age: 14,
    color: "gray",
    health: 100
  });

  var malenda = new Pirates({
    name:"malenda",
    age: 17,
    color: "gray",
    health: 100
  });

  var pinky = new Pirates({
    name:"pinky",
    age: 39,
    color: "gray",
    health: 95
  });

  var scar = new Buccaneers({
    name: "scar",
    age: 14,
    color: "yellow",
    life: 'poor',
    health: 95
  });

  var timba = new Buccaneers({
    name: "timba",
    age: 24,
    color: "brown",
    health: 90
  });

  var jack = new Buccaneers({
    name: "jack",
    age: 18,
    color: "brown",
    health: 100
  })

  var controller = new GameController(
    [solanga, malenda, pinky],
    [scar, timba, jack]);

    var turnOnMessageNumber = function(x){
      $(".greetings > p").css("display","none");
      $(".greetings > p:nth-child(" + x +")").css("display","block");

    };

    $(".elephants").on("click", function() {
      controller.playerChoosesLeft();
      turnOnMessageNumber(3);
    });

    $(".lions").on("click", function() {
      controller.playerChoosesRight();
      turnOnMessageNumber(3);
    });

    $(".ellie, .lion").on("click", function(){
      // var animal name was clicked
      var animalName = $(this).text();
      var a = animalName.toLowerCase();
      controller.playerChoosesCombatant(a);
      turnOnMessageNumber(4);
    });

    $(".ellibut, .lionbut").on("click", function(){
      controller.attack();
      if(controller.gameIsFinished()){
        turnOnMessageNumber(5);
      };

    });
  // var BadGuy = function (name) {
  //   this.name = name;
  //   this.health = 100;
  //   this.attack = function (attackee){
  //     return attackee.health = attackee.health - _.random(2, 10); //Great place to use _.random to change up health points
  //   };
  //   this.special = function (attackee) {
  //     return attackee.health = attackee.health - _.random(7, 25);
  //   };
  // };
  //
  //
  // var GoodGuy = function (options) {
  //   var special_pt, attack_pt;
  //   options = options || {};
  //   this.name = options.name;
  //   this.type = options.type;
  //   this.health = 100;
  //   switch (this.type) {      //Use this switch statement for multiple 'players'
  //     case 1:
  //       attack_pt = 10;     //Make random points
  //       special_pt = 15;
  //     break;
  //     case 2:
  //       attack_pt = 7;
  //       special_pt = 14;
  //     break;
  //     case 3:
  //       attack_pt = 5;
  //       special_pt = 20;
  //     break;
  //   };
  //   this.attack = function (attackee) {
  //     return attackee.health = atackee.health - attack_pt;
  //   };
  //   this.special = function (attackee) {
  //     return attackee.health = atackee.health - special_pt;
  //   };
  // };
  //
  //
  //     // STARTING THE GAME
  //   var player, monster;
  //
  // $('.welcome button').on('click', function (event) {
  //     event.preventDefault();  //always add preventDefault when you know you're going to make the button do something specific
  //
  //   // Create an instance of my Good Guy
  //     var player = new GoodGuy({
  //       name: $(this).text(),
  //       type: parseInt($(this).attr('name'))
  //
  //     });
  //
  //       // Create an instance of my Bad Guy
  //     var monster = new BadGuy('Johnny');
  //
  //     // GET READY TO FIGHT KO KO KO
  //       $('.welcome').fadeOut(500, function () {
  //             //Set Player/Monster Names & Health
  //          $('.ggName').prepend(player.name).find('.ggHealth').text(player.health);
  //          $('.bgName').prepend(monster.name).find('.bgHealth').text(monster.health);
  //          $('.fight').fadeIn();
  //       });
  // });
  //
  //
  // $('#fight').on('click', function (event) {
  //   event.preventDefault();
  //
  // var attack_type =
  //       // Goodguy will attack the Badguy
  //       // Badguys health will decrease
  //   player.attack(monster);
  //   if (monster.health > 0) {
  //     $('.bgHealth').text(monster.health);
  //     if (attack_type === 1) {
  //     monster.attack(player);
  //   } else {
  //     monster.special(player);
  //   } else
  //
  //
  //   });
  //
  //
  //
  //    else {
  //
  //     });
  // /////////////////////////////////
  //     $('.bgHealth').text('0');
  //     $('#fight').fadeOut();
  //   }
  //
  //
  //
  //   if (player.health <= 0 ) {
  //       //player's dead
  //     } else if (monster.health <= 0 ) {
  //       //monster's dead
  //     }
  //
  // });
  // ///////////////////////////
  // monster.attack(player);
  // if (player.health > 0) {
  //   $('.ggHealth').text(player.health);
  //   if (attack_type === 1) {
  //     player.attack(monster);
  //   } else {
  //     player.special(monster);
  //   }
  // });
