/*
 * The square below is a pressure switch. Move your robot over it to trigger
 * the change to the on state and open the door.
 */

this.on('start', function(){
  this.thrusters.top(true);
  this.thrusters.left(true);
});

this.on('sensor:bottom',function(c){
  this.thrusters.top(false);
  this.thrusters.bottom(true);
  this.thrusters.left(true);
});

this.on('sensor:right', function(c){
  this.thrusters.bottom(c);
  this.thrusters.left(!c);
});