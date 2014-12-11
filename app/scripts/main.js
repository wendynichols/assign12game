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
      this._computerChoosesCombatant();
      this.playerCombatant = combatant;
      console.log(combatant);
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
      console.log(this.playerCombatant);
      return this.playerCombatant.health <= 0 || // playerCombatant
      this.computerCombatant.health <= 0; //.computerCombatant
    };
  };

  var Pirate = function (options){
    var options = options || {};
    this.name = options.name;
    this.life = options.life ||'normal';
    this.health = options.health;
    this.attack = function(cutlassed){
      var result = cutlassed.health -= _.random(5, 10);
      $('.health' + '.' + cutlassed.name).html(result);
      return result;
    };
    this.life = function(cutlassed) {
      return cutlassed.health -= _.random(10, 15);
    };
    $('.health.' + options.name).html(options.health);
  };

  var Buccaneer = function (options){
    var options = options || {};
    this.life = options.life;
    this.name = options.name;
    this.health = options.health;
    this.attack = function(cannoned){
      var result = cannoned.health -= _.random(5, 10);
      $('.health' + '.' + cannoned.name).html(result);
      return result;
    };
    this.life = function(cannoned) {
      return cannoned.health -= _.random(15,20);
    };
    $('.health.' + options.name).html(options.health);
  };

  var Ruth = new Pirate({
    name: "Ruth",
    health: 100
  });

  var Wade = new Pirate({
    name:"Wade",
    health: 100
  });

  var Miranda = new Pirate({
    name:"Miranda",
    health: 100
  });

  var James = new Buccaneer({
    name: "James",
    health: 100
  });

  var Henry = new Buccaneer({
    name: "Henry",
    health: 100
  });

  var Thomas = new Buccaneer({
    name: "Thomas",
    health: 100
  })

  var controller = new GameController(
    [Ruth, Wade, Miranda],
    [James, Henry, Thomas]);

    var turnOnMessageNumber = function(x){
      $(".greetings > p").css("display","none");
      $(".greetings > p:nth-child(" + x +")").css("display","block");

    };

    $(".Pirates").on("click", function() {
      controller.playerChoosesLeft();
      turnOnMessageNumber(3);
    });

    $(".Buccaneers").on("click", function() {
      controller.playerChoosesRight();
      turnOnMessageNumber(3);
    });

    $(".pirate, .buccaneer").on("click", function(){
      // var fighter name was clicked
      var fighterName = $(this).text();
      var f = fighterName.toLowerCase();
      controller.playerChoosesCombatant(f);
      turnOnMessageNumber(4);
    });

    $(".pirateButt, .buccaneerButt").on("click", function(){
      controller.attack();
      if(controller.gameIsFinished()){
        turnOnMessageNumber(5);
      };

});
