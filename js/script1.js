'using strict'
let energy = 50;
let energyMax = 50;
let playerHealth = 100;
let playerMaxHealth = 100;
let playerDamage = 1;
let coins = 0;
let rechargeRate = 5000;
let cost = 5;

$(document).ready(function(){
  $('#health').text(playerHealth);
  $('#max-health').text(playerMaxHealth);
  $('#energy').text(energy);
  $('#energyMax').text(energyMax);
  $('#coins').text(coins);
  let energyUp = new EnergyUpgrade();
  var energyCapUp = new EnergyCapUpgrade();
  let comb = new Enemy();
  Enemy.health();
})

// Click event for attacking the enemy
$('#box2').on('click',function () {
  Enemy.takeDamage(playerDamage);
  coinAdd();
})

// Click event handlers for abilities
$('#basic').on('click',function () {
  energy -= 10;
  $('#energy').text(energy);
  Enemy.takeDamage(3);
})
$('#upgrade').on('click',function () {
  energy -= 25;
  $('#energy').text(energy);
  Enemy.takeDamage(5);
})
$('#exceptional').on('click',function () {
  energy -= 50;
  $('#energy').text(energy);
  Enemy.takeDamage(7);
})
$('#god').on('click',function () {
  energy -= 100;
  $('#energy').text(energy);
  Enemy.takeDamage(10);
})

// Click event handlers for player upgrades
$('#energyUpgrade').on('click',function () {
  EnergyUpgrade.update();
})
$('#capacityUpgrade').on('click',function () {
  energyCapUp.update();

})
$('#damageUpgrade').on('click',function () {
  coins -= 5;
  playerDamage += 1;
  $('#coins').text(coins);
})
$('#healthUpgrade').on('click',function () {
  coins -= 5;
  playerMaxHealth += 5;
  $('#max-health').text(playerMaxHealth);
  $('#coins').text(coins);
})


// general game functions
var recharge = setInterval(checkRecharge, rechargeRate);

function resetEnergyCalc () {
  clearInterval(recharge);
}

function checkRecharge () {
  if (energy < energyMax) {
    energy++;
    $('#energy').text(energy);
    console.log(rechargeRate);
  }
}
function coinAdd () {
  coins += 1;
  $('#coins').text(coins);
}
// Enemy object creation
Enemy = function () {
  let health = 250;
  let maxHealth = 250;
  let damage = 3;

  Enemy.health = function () {
    $('#enemyHealth').text(health);
  }

  Enemy.takeDamage = function (damage) {
    health -= damage;
    $('#enemyHealth').text(health);
  }

  Enemy.damage = function () {
    playerHealth -= damage;
    $('#health').text(playerHealth);
  }
};

// Energy Efficiency upgrade object
EnergyUpgrade = function () {
  let cost = 5;

  EnergyUpgrade.update = function () {
    coins -= cost;
    rechargeRate = rechargeRate * 0.75;
    resetEnergyCalc();
    var recharge = setInterval(checkRecharge, rechargeRate);
    $('#coins').text(coins);
    EnergyUpgrade.cost();
  }

  EnergyUpgrade.cost = function () {
    cost = Math.ceil(cost * 1.05);
    $('#energyUpgradeCost').text(cost);
    console.log(cost);
  }
}
// Energy Capacity upgrade object
class EnergyCapUpgrade {
  constructor () {
    let cost = 5;
  }

  get update () {
    console.log('here');
    coins -= cost;
    energyMax += 5;
    $('#energyMax').text(energyMax);
    $('#coins').text(coins);
    return this.cost();
  }

  cost () {
    cost = Math.ceil(cost * 1.05);
    $('#capUpgradeCost').text(cost);
    console.log(cost);
    return cost;
  }
}
