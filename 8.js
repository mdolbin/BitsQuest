/*
 * This other bot is helping-- somewhat.
 */
 
/*
	lancemanfv:
		Not the best solution
*/
//TODO Personal challenge: Get rid of waiting between the blocks.


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

    {moves:[route.top], distance:85, angle:route.radar.top},
    {moves:[route.right, route.top], distance:400, angle:route.radar.topRight},
    {moves:[route.right], distance:10, angle:route.radar.right},
    {moves:[route.top], distance:220, angle:route.radar.top},
    {moves:[route.bottom], distance:280, angle:route.radar.bottom},
    {moves:[route.right], distance:0, angle:route.radar.right},
    
  ]
  route.next(null, null);
});



this.on('radar:hit',function(angle, distance){
  route.next(angle, distance);
});
this.on('radar:miss', function(angle, distance){
  route.next(null, null)
});