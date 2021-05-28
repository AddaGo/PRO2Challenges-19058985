
class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
  
    multiply(integer) {
      this.x *= integer;
      this.y *= integer;
    }
  };
  
  const fill = (ctx, hexColor) => {
    ctx.fillStyle = hexColor;
  };
  
  const rect = (ctx, x, y, width, height) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
  };
  
  const ellipse = (ctx, x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    // ctx.fill();
  }
  
  const point = (ctx, x, y) => {
    ellipse(ctx, x, y, 2);
  }
  
  /* This was just a conversion from more normal syntax to canvas API, the actual code starts below */

  let background = document.getElementById("background"),
  ctx = background.getContext("2d"),
  width = window.innerWidth,
  height = window.innerHeight;


    ctx.canvas.width = width;
    ctx.canvas.height = height;
    background.width = width;
    background.height = height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let r1 = 250;
  let r2 = 310;
  let secondsForOneFullSpin1 = 6; 
  let secondsForOneFullSpin2 = 6.7;

  let x1 = 0; // increase x each frame
  let x2 = 0;
  

  const desiredFrameRate = 40; 
  const millisPerFrame = 1000 / desiredFrameRate;

  let checkTheme = 0;

  let infiniteDraw = setInterval(
    function() { // this is your draw

      if(checkTheme == 0){  
        fill(ctx, '#eeeeee');
        rect(ctx, 0, 0, width, height);
      }
      else { 
        fill(ctx, '#2c3e50');
        rect(ctx, 0, 0, width, height); 
      }
      
      ellipse(ctx, width/2, height/2, r1); // see what the path the point is following
      ctx.stroke();


      ellipse(ctx, width/2, height/2, r2); // see what the path the point is following
      ctx.stroke();
      
      fill(ctx, '#ffffff'); // white
      // this point follows a circle of radius r
      let point = new Vector(Math.sin(x1) * r1, Math.cos(x1) * r1);
      point.add(new Vector(width/2, height/2));
      // this addition represents positional displacement. We want the point to rotate according to the center of the sketch, not to the (0, 0) point (top left corner)
      fill(ctx, '#6dd5ed');
      ellipse(ctx, point.x, point.y, 20); // draw the thing that is supposed to be rotating
      ctx.fill();

      fill(ctx, '#ffffff');
      let point1 = new Vector(Math.sin(x2) * r2, Math.cos(x2) * r2);
      point1.add(new Vector(width/2, height/2));

      fill(ctx, '#F37335');
      ellipse(ctx, point1.x, point1.y, 13); // draw the thing that is supposed to be rotating
      ctx.fill();
      
      x1 += ((Math.PI)*2) / ((secondsForOneFullSpin1) * desiredFrameRate); // increase x bit by bit such that the animation is smooth
      x2 += ((Math.PI)*2) / ((secondsForOneFullSpin2) * desiredFrameRate);
      ctx.save();
    },
    millisPerFrame
  );

  // the initial value of x does not matter since sin(x) and cos(x) are periodical

  // => the formula for the point is:
  // point.x = sin(x) * r/2
  // point.y = cos(x) * r/2

  //displays the current time in hours, minutes, seconds
  function displayClock(){
    var today = new Date();
    var time = addZero(today.getHours()) + " : " + addZero(today.getMinutes()) + " : " + addZero(today.getSeconds());
    document.getElementById('clock').innerHTML = time;
    document.getElementById('clock').style.color = '#6dd5ed'; //changes time color to match the selected planet

    //switches to night mode if the time is from 8pm to 7am
    if(today.getHours()>20 || today.getHours()<7) { checkTheme = 1; document.getElementById('dot').style.backgroundColor = '#2c3e50';  }
    else { checkTheme = 0; }
  }

  function addZero(number){
      if(number<10) {
        number = '0' + number;
      }
      return number;
  }

  //calculates time on Mars by using the 00:00:00 time of Earth as reference
  function timeMars(){
    var today = new Date();
    let he = today.getHours();
    let me = today.getMinutes();
    let se = today.getSeconds();
    let E = he*3600 + me*60 + se; //calculates how much time in seconds has passed from 00:00:00 to current time
    let M = E - 278; //average observed seconds difference between current time on Earth and Mars

    let hm = Math.floor(M/3600); //converting the number of seconds that passed on Mars from the 00:00:00 Earth reference to display time in hours, minutes, seconds format
    let mm = Math.floor(M/60) - hm*60;
    let sm = M - hm*3600 - mm*60;

    var timemars = addZero(hm) + " : " + addZero(mm) + " : " + addZero(sm);
    document.getElementById('clock').innerHTML = timemars;
    document.getElementById('clock').style.color = '#F37335'; //orange

    if(hm>20 || hm<7) { checkTheme = 1; document.getElementById('dot').style.backgroundColor = '#2c3e50'; }
    else { checkTheme = 0; }
}


let checkedEarth, checkedMars;

//each clicked interval disables the other interval
document.getElementById('marstrajectory').onclick = function () {clearInterval(checkedEarth);
    checkedMars = setInterval(() => {
    timeMars();
}, 1000);
};

document.getElementById('earthtrajectory').onclick = function () {clearInterval(checkedMars);
    checkedEarth = setInterval(() => {
    displayClock();
}, 1000);
};
