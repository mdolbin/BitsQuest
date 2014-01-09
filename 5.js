/*
 * No explanation.
 */


this.on('start',function(){
  this.thrusters.top(true);
  this.thrusters.left(true);
});

this.on('sensor:bottom',function(c){
  this.thrusters.top(!c);
  this.thrusters.right(c);
});


this.on('sensor:right',function(c){
  this.thrusters.left(!c);
  this.thrusters.top(c);
});

this.on('sensor:top',function(c){
  this.thrusters.bottom(!c);
  this.thrusters.left(c);
});

this.on('sensor:left',function(c){
  this.thrusters.bottom(c);
  this.thrusters.right(!c);
});