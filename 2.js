/* 
* How are you going to get down there? 
* 
* Not only do you have four thrusters, you also have four sensors: 
* top, bottom, left and right
* 
* These sensors fire events when they come into contact with an impassible
* object or when they lose contact. Use, e.g., 
* 
*    this.on('sensor:top', function(contact) {});
*
* to detect when the top sensor has been triggered or cleared. The value
* of contact will be true when contact has been made and false when it has
* been lost.
*/


this.on('start',function(){
  this.thrusters.left(true);
});

this.on('sensor:right',function(contact){
  this.thrusters.bottom(contact);
});
