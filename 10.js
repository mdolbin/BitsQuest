/*
 * Do it.
 *
 */
 
/*
	lancemanfv:
		Extra space in doorways is left to protect robot from blocking its own movement in case of radar's delays.
*/


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
    console.log(angle+" "+distance);
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

    {moves:[route.bottom, route.right], distance:140, angle:route.radar.bottomRight},
    {moves:[route.right], distance:110, angle:route.radar.right},
    {moves:[route.right, route.bottom], distance:10, angle:route.radar.right},
    {moves:[route.bottom], distance:105, angle:route.radar.bottom},
    {moves:[route.left, route.bottom], distance:95, angle:route.radar.bottomLeft},
    {moves:[route.left], distance:70, angle:route.radar.left},
    {moves:[route.left, route.top], distance:40, angle:route.radar.top},
    {moves:[route.left], distance:105, angle:route.radar.left},
    {moves:[route.left, route.bottom], distance:50, angle:route.radar.left},
    {moves:[route.bottom], distance:70, angle:route.radar.bottom},
    {moves:[route.bottom, route.right], distance:90, angle:route.radar.right},
    {moves:[route.bottom], distance:80, angle:route.radar.bottom},
    {moves:[route.bottom, route.right], distance:50, angle:route.radar.bottom},
    {moves:[route.right, route.top], distance:220, angle:route.radar.right},
    {moves:[route.top, route.right], distance:40, angle:route.radar.top},
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