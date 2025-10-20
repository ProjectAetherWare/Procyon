/***Map.js
* instanciate a Map object that can display the map and shows the traveled Trail
* also set the map coordinate of each landmark,
* as well as branches at each landmarks and the distance to next landmarks.
*and implements a function for getting the next landmark based on current miles
*/
var Map={
  /*
  * branchOption1 0 = Green River Crossing, 1= Fort Bridger
  * branchOption2 0 = Fort Walla Walla, 1=The Dalles
  */
  display: function(miles,branchOption1,branchOption2){

    var svgContent="";
    /*for(var landmark in Map.landmarks){//uncomment this to see the location of each landmark as a red dot
      var x=Map.landmarks[landmark].coordinate.x;
      var y=Map.landmarks[landmark].coordinate.y;
      svgContent+='<circle cx="'+x+'" cy="'+y+'" r="5" fill="red" />';
    }*/
    var milesTraveled=0;
    var landmarktraveled="Independence";
    while(miles>milesTraveled){
      var routes=landmarks[landmarktraveled].routes;
      if(!routes)
        break;
      var routeNames=Object.keys(routes);
      var nextlandmark;
      if(routeNames.length>1){
        if(landmarktraveled=="SouthPass")
          nextlandmark= branchOption1?"FortBridger":"GreenRiverCrossing";
        else if(landmarktraveled=="BlueMountains")
          nextlandmark= branchOption2?"TheDalles":"FortWallaWalla";
      }
      else{
        nextlandmark=routeNames[0];
      }

      var x1=landmarks[landmarktraveled].coordinate.x;
      var y1=landmarks[landmarktraveled].coordinate.y;
      var x2;
      var y2;
      var milesToNext=routes[nextlandmark];
      if(miles>milesTraveled+milesToNext){
        x2=landmarks[nextlandmark].coordinate.x;
        y2=landmarks[nextlandmark].coordinate.y;
      }
      else{
        var percentage=(miles-milesTraveled)/milesToNext;
        var coordNextX = landmarks[nextlandmark].coordinate.x;
        var coordNextY=landmarks[nextlandmark].coordinate.y;
        var x2=x1+(coordNextX-x1)*percentage;
        var y2=y1+(coordNextY-y1)*percentage;
      }
      svgContent+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="stroke:rgb(255,0,0);stroke-width:2" />';
      landmarktraveled=nextlandmark;
      milesTraveled+=milesToNext;
    }

    document.getElementById("game").innerHTML=
      '<svg id="map" width="643" height="402">'+svgContent+'</svg>';
  },
};

  landmarks.Independence.coordinate={x:580, y:295};
  landmarks.Independence.routes={"KansasRiverCrossing":102};

  landmarks.KansasRiverCrossing.coordinate={x:553, y:288};
  landmarks.KansasRiverCrossing.routes={"BigBlueRiverCrossing":185-102};

  landmarks.BigBlueRiverCrossing.coordinate={x:535, y:275};
  landmarks.BigBlueRiverCrossing.routes={"FortKearney": 304-185};

  landmarks.FortKearney.coordinate={x:503, y:266};
  landmarks.FortKearney.routes={"ChimneyRock":554-304};

  landmarks.ChimneyRock.coordinate={x:460, y:260};
  landmarks.ChimneyRock.routes={"FortLaramie": 640-554};

  landmarks.FortLaramie.coordinate={x:415, y:245};
  landmarks.FortLaramie.routes={"IndependenceRock": 830-640};

  landmarks.IndependenceRock.coordinate={x:373, y:223};
  landmarks.IndependenceRock.routes={"SouthPass":932-830};

  landmarks.SouthPass.coordinate={x:339, y:234};
  landmarks.SouthPass.routes={"GreenRiverCrossing":989-932, "FortBridger":1057-932};

  landmarks.FortBridger.coordinate={x:306, y:272};
  landmarks.FortBridger.routes={"SodaSprings":1219-1057};

  landmarks.GreenRiverCrossing.coordinate={x:310, y:244};
  landmarks.GreenRiverCrossing.routes={"SodaSprings":1133-989};

  landmarks.SodaSprings.coordinate={x:293, y:232};
  landmarks.SodaSprings.routes={"FortHall":1190-1133};

  landmarks.FortHall.coordinate={x:257, y:215};
  landmarks.FortHall.routes={"SnakeRiverCrossing":1372-1190};

  landmarks.SnakeRiverCrossing.coordinate={x:213, y:200};
  landmarks.SnakeRiverCrossing.routes={"FortBoise":1486-1372};

  landmarks.FortBoise.coordinate={x:197, y:171};
  landmarks.FortBoise.routes={"BlueMountains":1646-1486};

  landmarks.BlueMountains.coordinate={x:169, y:145}
  landmarks.BlueMountains.routes={"FortWallaWalla": 55,"TheDalles": 1771-1646};

  landmarks.FortWallaWalla.coordinate={x:162, y:115};
  landmarks.FortWallaWalla.routes={"TheDalles":120};

  landmarks.TheDalles.coordinate={x:141, y:127};
  landmarks.TheDalles.routes={"WillametteValley":100};

  landmarks.WillametteValley.coordinate={x:110, y:115};

//getNextLandMark
//given traveled miles, branching options, and whether you are just leaving the landmark,
//return the next landmark on your trail
//
  landmarks.getNextLandMark=function(miles,branchOption1,branchOption2,leavingLandmark){
    var milesTraveled=0;
    var landmarktraveled="Independence";
    while(miles>milesTraveled||(leavingLandmark&&miles==milesTraveled)){
      var routes=landmarks[landmarktraveled].routes;
      if(!routes)
        break;
      var routeNames=Object.keys(routes);
      var nextlandmark;
      if(routeNames.length>1){
        if(landmarktraveled=="SouthPass")
          nextlandmark= branchOption1?"FortBridger":"GreenRiverCrossing";
        else if(landmarktraveled=="BlueMountains")
          nextlandmark= branchOption2?"TheDalles":"FortWallaWalla";
      }
      else{
        nextlandmark=routeNames[0];
      }
      var milesToNext=routes[nextlandmark];
      landmarktraveled=nextlandmark;
      milesTraveled+=milesToNext;
    }
    return {landmark: landmarktraveled, milesToNext: milesTraveled-miles};
  }
