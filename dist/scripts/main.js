  var BadGuy = function (name) {
    this.name = name;
    this.health = 100;
    this.attack = function (attackee){
      return attackee.health = attackee.health - _.random(2, 10); //Great place to use _.random to change up health points
    };
    this.special = function (attackee) {
      return attackee.health = attackee.health - _.random(7, 25);
    };
  };


  var GoodGuy = function (options) {
    var special_pt, attack_pt;
    options = options || {};
    this.name = options.name;
    this.type = options.type;
    this.health = 100;
    switch (this.type) {      //Use this switch statement for multiple 'players'
      case 1:
        attack_pt = 10;     //Make random points
        special_pt = 20;
      break;
      case 2:
        attack_pt = 15;
        special_pt = 25;
      break;
      case 3:
        attack_pt = 5;
        special_pt = 30;
      break;
    };
    this.attack = function (attackee) {
      return attackee.health = atackee.health - attack_pt;
    };
    this.special = function (attackee) {
      return attackee.health = atackee.health - special_pt;
    };
  };


      // STARTING THE GAME
    var player, monster;

  $('.welcome button').on('click', function (event) {
      event.preventDefault();  //always add preventDefault when you know you're going to make the button do something specific

    // Create an instance of my Good Guy
      var player = new GoodGuy({
        name: $(this).text(),
        type: parseInt($(this).attr('name'))

      });

        // Create an instance of my Bad Guy
      var monster = new BadGuy('Bowser');

      // GET READY TO FIGHT KO KO KO
        $('.welcome').fadeOut(500, function () {
              //Set Player/Monster Names & Health
           $('.ggName').prepend(player.name).find('.ggHealth').text(player.health);
           $('.bgName').prepend(monster.name).find('.bgHealth').text(monster.health);
           $('.fight').fadeIn();
        });
  });

    // FIGHT SEQUENCE
      // 1. Health drops below zero
      // 2. winner is not random


  $('#fight').on('click', function (event) {
    event.preventDefault();

  var attack_type = 
        // Goodguy will attack the Badguy
        // Badguys health will decrease
    player.attack(monster);
    if (monster.health > 0) {
      $('.bgHealth').text(monster.health);
      if (attack_type === 1) {
      monster.attack(player);
    } else {
      monster.special(player);
    } else


    });



     else {

      });
  /////////////////////////////////
      $('.bgHealth').text('0');
      $('#fight').fadeOut();
    }



    if (player.health <= 0 ) {
        //player's dead
      } else if (monster.health <= 0 ) {
        //monster's dead
      }

  });
  ///////////////////////////
  monster.attack(player);
  if (player.health > 0) {
    $('.ggHealth').text(player.health);
    if (attack_type === 1) {
      player.attack(monster);
    } else {
      player.special(monster);
    }
  });
