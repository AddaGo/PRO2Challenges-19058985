// Since the background canvas is a static element, we can keep a global reference to it in order to avoid wasting time constantly searching to it in the DOM tree
const background = document.getElementById("background"),
    bkgContext = background.getContext("2d"),
    bkgWidth = background.width,
    bkgHeight = background.height;

// This is the html tag, we use this in order to retreive the current scroll position (in pixels?)
const mainContainer = document.getElementById("GrandMainParent"),
    maxScroll = mainContainer.scrollHeight - mainContainer.clientHeight;

const colorInterpolation = [
    { r: 52, g: 198, b: 235 }, //blue
    { r: 30, g: 32, b: 33 }, //black
    { r: 237, g: 160, b: 45 }, //orange
];

let bkgR = colorInterpolation[0].r,
    bkgG = colorInterpolation[0].g,
    bkgB = colorInterpolation[0].b;

// Init the color of the canvas (by default it got colored only after scrolling)
bkgContext.fillStyle = "rgb(" + bkgR + "," + bkgG + "," + bkgB + ")";
bkgContext.fillRect(0, 0, bkgWidth, bkgHeight);
// Init the scroll position as well (chrome like to keep the old scrolling position after refreshing) (when resetting it's smooth scrolling)
window.scrollTo(0, 0);

// Function that is supposed to return the interpollated color based on whatever scrolling position you are at
function interpolateColor(pos, maxPos) {
// the only possible values for the scroll position pos are in the [0, maxPos] range =>
// 0 < pos <= maxPos/2     <=> blend between blue and black
// maxPos/2 < pos < maxPos <=> blend between black and orange 
    let r, g, b;

    if(pos <= maxPos/2) { // blend between blue and black
        r = integerMap(pos, 0, maxPos/2, colorInterpolation[0].r, colorInterpolation[1].r);
        g = integerMap(pos, 0, maxPos/2, colorInterpolation[0].g, colorInterpolation[1].g);
        b = integerMap(pos, 0, maxPos/2, colorInterpolation[0].b, colorInterpolation[1].b);
    }
    else { //blend between black and orange
        r = integerMap(pos, maxPos/2, maxPos, colorInterpolation[1].r, colorInterpolation[2].r);
        g = integerMap(pos, maxPos/2, maxPos, colorInterpolation[1].g, colorInterpolation[2].g);
        b = integerMap(pos, maxPos/2, maxPos, colorInterpolation[1].b, colorInterpolation[2].b);
    }
    
    return [r, g, b];
}

let food = document.getElementById("food"),
    water = document.getElementById("water"),
    gravity = document.getElementById("gravity"),
    distance = document.getElementById("distance"),
    atmosphere = document.getElementById("atmosphere"),
    fuel = document.getElementById("fuel"),
    throttle = document.getElementById("throttle"),
    acceleration = document.getElementById("acceleration"),
    speed = document.getElementById("speed");

food.textContent = "Food: 3000.00 kg";
water.textContent = "Water: 1140.00 L";
gravity.textContent = "Gravity: 9,807 N";
distance.textContent = "Distance: 54.60 million km";
atmosphere.textContent = "Atmosphere: 14.69 psi";
fuel.textContent = "Fuel: 100.00%";
throttle.textContent = "Throttle: 0.25 MW";
acceleration.textContent = "Acceleration: 100 m/s";
speed.textContent = "Speed: 0 m/s";
// INIT THE OTHERS AS WELL

//variable.toFixed(number of digits)
//partea intreaga <=> Math.floor(numar)
window.onscroll = function () {
    // this is called when the user scrolls

    [bkgR, bkgG, bkgB] = interpolateColor(mainContainer.scrollTop, maxScroll);

    //context.fillStyle = 'rgb(255, 255, 255)' but we want dynamic R G and B =>
    bkgContext.fillStyle = "rgb(" + bkgR + "," + bkgG + "," + bkgB + ")";
    bkgContext.fillRect(0, 0, bkgWidth, bkgHeight);

    //linear interpolations:
    food.textContent = "Food: " + integerMap(mainContainer.scrollTop, 0, maxScroll, 3000.00, 934.47).toFixed(2) + " kg";
    distance.textContent = "Distance: " + integerMap(mainContainer.scrollTop, 0, maxScroll, 54.6, 0).toFixed(2) + " million km";
    water.textContent = "Water: " + integerMap(mainContainer.scrollTop, 0, maxScroll, 1140, 520).toFixed(2) + " L";
    fuel.textContent = "Fuel: " + integerMap(mainContainer.scrollTop, 0, maxScroll, 100, 60).toFixed(2) + "%";

    //advanced interpolations:
    //14.69
    //3.4
    //0.088
    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        atmosphere.textContent = "Atmosphere: 14.69 psi";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        atmosphere.textContent = "Atmosphere: 3.4 psi";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            atmosphere.textContent = "Atmosphere: 0.88 psi";
    }

    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        gravity.textContent = "Gravity: 9,807 N";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        gravity.textContent = "Gravity: 0 N";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            gravity.textContent = "Gravity: 3,711 N";
    }
    
    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        acceleration.textContent = "Acceleration: 100 m/s";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        acceleration.textContent = "Acceleration: 30.87 m/s";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            acceleration.textContent = "Acceleration: -100 m/s";
    }

    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        speed.textContent = "Speed: 0 m/s";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        speed.textContent = "Speed: 8.2 km/s";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            speed.textContent = "Speed: 0 km/s";
    }

    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        throttle.textContent = "Throttle: 0.25 MW";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        throttle.textContent = "Throttle: 5 MW";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            throttle.textContent = "Throttle: 3 MW";
    }

    if(mainContainer.scrollTop < maxScroll / 100 * 4)
        title.textContent = "Take-off";
    else if(mainContainer.scrollTop > maxScroll / 100 * 4){
        title.textContent = "Midflight " + integerMap(mainContainer.scrollTop, 0, maxScroll, 0, 100).toFixed(2) + "%";
        if(mainContainer.scrollTop > maxScroll / 100 * 96)
            title.textContent = "Destination reached";
    }

};


// This function linearly maps a value which was initially in the range [initMin, initMax]
// to a new value which is now ranged between [destMin, destMax]
function integerMap(value, initMin, initMax, destMin, destMax)
{
    return (value - initMin) / (initMax - initMin) * (destMax - destMin) + destMin;
}

food.onclick = function(){
    console.log("food");
}

title.onclick = function(){
    console.log("title");
}