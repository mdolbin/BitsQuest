/*
 * Not only does your robot come equipped with sensors and thrusters. It also
 * has a radar that can be used to determine distances.
 *
 * The radar has two methods:
 *
 *
 *  - angle()       - the current direction the radar is pointing (0-359)
 *  - angle(number) - set the radar direction (0-359)
 *
 *  - ping()        - fires the radar
 *
 * One of two events will return after firing the radar:
 *  - 'radar:hit'   - an object was found
 *  - 'radar:miss'  - no object was found
 *
 * When a hit event is received, the handler will receive the angle the
 * ping was sent out on and the distance to the object, e.g.,
 *    this.on('radar:hit', function(angle, distance) {
 *       // do stuff
 *    });
 *
 *  Bonus info: 
 *
 *      Those red jumpy things will kill your robot. Don't touch them.
 */

//TODO Review this code later.


var route = new Object();

this.on('start', function(){
  console.log("");
  route.radar = this.radar;
  route.radar.right = 0;
  route.radar.bottomRight = 45;
  route.radar.bottom = 90;
  route.radar.bottomLeft = 135;
  route.radar.left = 180;
  route.radar.topLeft = 225;
  route.radar.top = 270;
  route.radar.topRight = 315;
  

  route.thrusters = this.thrusters;
  route.nextPoint = 0;
  route.stop = function(){
    route.thrusters.top(false);
    route.thrusters.left(false);
    route.thrusters.right(false);
    route.thrusters.bottom(false);
  }
  route.next = function(angle, distance){
    if(route.nextPoint<route.waypoints.length &&
       (route.waypoints[route.nextPoint].angle == angle &&
        route.waypoints[route.nextPoint].distance <= distance) ||
       (angle == null && distance == null)
      ){
      route.radar.angle(route.waypoints[route.nextPoint].angle);
      
    }else{
      route.stop();
      route.nextPoint++;
    }
    
    if(route.nextPoint<route.waypoints.length){
      route.radar.angle(route.waypoints[route.nextPoint].angle);
      for(var i=0; i<route.waypoints[route.nextPoint].moves.length; i++){
        route.waypoints[route.nextPoint].moves[i]();
      }
    }
    route.radar.ping();
  }
  route.left = function(){route.thrusters.right(true);}
  route.right = function(){route.thrusters.left(true);}
  route.bottom = function(){route.thrusters.top(true);}
  route.top = function(){route.thrusters.bottom(true);}
  route.waypoints = [

    {moves:[route.right,route.bottom], distance:20, angle:route.radar.bottomRight},
    {moves:[route.right], distance:300, angle:route.radar.right},
    {moves:[route.bottom, route.right], distance:375, angle:route.radar.bottomRight},
    {moves:[route.bottom], distance:185, angle:route.radar.bottom},
    {moves:[route.right, route.bottom], distance:135, angle:route.radar.bottomRight},
    {moves:[route.right], distance:0, angle:route.radar.right}  
    
  ]
  route.next(null, null);
});


this.on('radar:hit',function(angle, distance){
  route.next(angle, distance);
});
this.on('radar:miss', function(angle, distance){
  route.next(null, null)
});