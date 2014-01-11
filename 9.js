/*
 * Open all three doors to exit.
 *
 * The answer is 5.
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

    {moves:[route.top, route.right], distance:190, angle:route.radar.topRight},
    {moves:[route.right], distance:330, angle:route.radar.right},
    {moves:[route.right, route.top], distance:120, angle:route.radar.topRight},
    {moves:[route.right, route.bottom], distance:245, angle:route.radar.bottomRight},
    {moves:[route.bottom, route.left], distance:180, angle:route.radar.bottomLeft},
    {moves:[route.bottom], distance:0, angle:route.radar.bottom}
  ]
  route.next(null, null);
});



this.on('radar:hit',function(angle, distance){
  route.next(angle, distance);
});
this.on('radar:miss', function(angle, distance){
  route.next(null, null)
});