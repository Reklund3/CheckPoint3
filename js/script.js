'using strict'

let power = 0;
let energy = 1;
let rechargeRate = 500;
let pulse = 500;
let x = 150;
let y = 75;
let r;
let flag = 1;
var angle = 0;
var recharge = setInterval(checkRecharge, rechargeRate);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var ball = new EnergyBall();
// let x = 100;
// let y = 100;
// let r = 15;
//
//
//   ctx.fillStyle = "black";
//   ctx.fill();
//   ctx.beginPath();
//   ctx.arc(x,y,r,Math.PI*2,false);
//   ctx.stroke();
$(document).ready(function(){
  $('#power').text(power);
  $('#energy').text(energy);
  let basic = new Basic;
  let upgrade = new Upgrade;
  let exceptional = new Exceptional;
  let god = new God;

  draw();
})

// general game functions

// Counter using the setInterval method from JS to execute and increase to
// the power.
resetpowerCalc = function () {
  console.log('reset power cal called');
  clearInterval(recharge);
}
update = function () {
  clearInterval(recharge);
  recharge = setInterval(checkRecharge, rechargeRate);
}
function checkRecharge () {
  power++;
  $('#power').text(power);
}

// Power increase handlers
function Basic () {
  $('#basic').on('click',function () {
    let cost = parseInt($('#basicCost').text());
    if (power >= cost){
      power -= cost;
      energy += cost;
      $('#power').text(power);
      $('#energy').text(energy);
      rechargeRate = rechargeRate * 0.99;
      cost = parseInt(Math.ceil(cost * 1.25));
      $('#basicCost').text(cost);
      update();
    }
  })
}
function Upgrade () {
  $('#upgrade').on('click',function () {
    let cost = parseInt($('#upgradeCost').text());
    if (power >= cost){
      power -= cost;
      energy += cost;
      $('#power').text(power);
      $('#energy').text(energy);
      rechargeRate = rechargeRate * 0.95;
      cost = parseInt(Math.ceil(cost * 1.35));
      $('#upgradeCost').text(cost);
      update();
    }
  })
}
function Exceptional () {
  $('#exceptional').on('click',function () {
    let cost = parseInt($('#exceptionalCost').text());
    if (power >= cost){
      power -= cost;
      energy += cost;
      $('#power').text(power);
      $('#energy').text(energy);
      rechargeRate = rechargeRate * 0.90;
      cost = parseInt(Math.ceil(cost * 1.40));
      $('#exceptionalCost').text(cost);
      update();
    }
  })
}
function God () {
  $('#god').on('click',function () {
    let cost = parseInt($('#godCost').text());
    if (power >= cost){
      power -= cost;
      energy += cost;
      $('#power').text(power);
      $('#energy').text(energy);
      rechargeRate = rechargeRate * 0.80;
      cost = parseInt(Math.ceil(cost * 1.5));
      $('#godCost').text(cost);
      update();
    }
  })
}

function EnergyBall () {
  draw = function () {
    ctx.clearRect(0,0,400,200);
    r = (3 + (energy/10)) + (energy/100) * Math.abs(Math.cos(angle));
    ctx.fillStyle = "rgb(230,30,242)";
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.fill();
    ctx.closePath();
    angle += Math.PI / 64;
    requestAnimationFrame(draw)
  }
}
