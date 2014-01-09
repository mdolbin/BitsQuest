/*
 * The round switches won't stay on unless something is placed on top of them.
 */
 
 /*
 lancemanfv:
	Personal challenge - the shortest way, don't go the obvious route through the top of the map. Don't use radar.
	I believe that the most reasonable solution is to present the path in the form of a sequence of steps.
 */


var route = new Object();

this.on('start', function(){

  route.thrusters = this.thrusters;
  route.nextPoint = 0;
  route.stop = function(){
    route.thrusters.top(false);
    route.thrusters.left(false);
    route.thrusters.right(false);
    route.thrusters.bottom(false);
  }
  route.next = function(c){
    if(route.nextPoint < route.waypoints.length && c == route.waypoints[route.nextPoint].onHit){
      route.stop(); 
      for(var i=0; i<route.waypoints[route.nextPoint].moves.length; i++){
        route.waypoints[route.nextPoint].moves[i]();
      }
      route.nextPoint++;
    }
  }
  route.left = function(){route.thrusters.right(true);}
  route.right = function(){route.thrusters.left(true);}
  route.bottom = function(){route.thrusters.top(true);}
  route.top = function(){route.thrusters.bottom(true);}
  route.waypoints = [

	{onHit:false, moves:[route.right]},
    {onHit:true, moves:[route.top]},
    {onHit:false, moves:[route.right]},
    {onHit:true, moves:[route.right, route.bottom]},
    {onHit:false, moves:[route.left]},
    {onHit:true, moves:[route.left, route.bottom]},
    {onHit:false, moves:[route.right]},
    {onHit:true, moves:[route.right,route.bottom]},
    {onHit:false, moves:[route.left]},
    {onHit:true, moves:[route.left, route.bottom]},
    {onHit:true, moves:[route.right]},
    {onHit:false, moves:[route.right]},
    {onHit:false, moves:[route.right, route.bottom]},
    {onHit:true, moves:[route.right]},
    {onHit:true, moves:[route.top]},
    {onHit:true, moves:[route.top]},
    {onHit:true, moves:[route.right]}  
    
  ]
  route.next(false);
});

this.on('sensor:left sensor:right sensor:top sensor:bottom', function(c){
  route.next(c);
});