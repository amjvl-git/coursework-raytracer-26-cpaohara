import { Vec3 } from "./Vector3.js";

// Calculate the intersection point and normal when a ray hits a sphere. Returns a RayCastResult.
function hit(ray, t, sphereIndex) {}

// Return a RayCastResult when a ray misses everything in the scene
function miss()
{
    return new RayCastResult(new Vec3(0,0,0), new Vec3(0,0,0), -1, -1)
}

// Check whether a ray hits anything in the scene and return a RayCast Result
function traceRay(ray)
{
    return miss()
}

// Calculate and return the background colour based on the ray
function backgroundColour(ray)
{
        return new Vec3(0.3,0.5,0.9) // Blue
}

// Returns the colour the ray should have as a Vec3 with RGB values in [0,1]
function rayColour(ray) 
{
    let castResult = traceRay(ray)
    if(castResult.t < 0) return backgroundColour(ray)
    return new Vec3(1,0,0) // Red
}

// Sets a pixel at (x, y) in the canvas with an RGB Vec3
function setPixel(x, y, colour)
{
    var c = document.getElementById("canvas")
    var ctx = c.getContext("2d")
    ctx.fillStyle = "rgba("+colour.x+","+colour.y+","+colour.z+","+1+")"
    ctx.fillRect(x, c.height - y, 1, 1)
}

const spheres = new Array(
    new Sphere(new Vec3(0,0,-1), 0.3, new Vec3(1,0,0)),       // Red sphere
    new Sphere(new Vec3(0,0.2,-0.8), 0.15, new Vec3(0,0,1)),  // Blue sphere
    new Sphere(new Vec3(0,-100.5,-1), 100, new Vec3(0,1,0))   // Big green sphere
    );

// Main code
let imageWidth = document.getElementById("canvas").width
let imageHeight = document.getElementById("canvas").height
let aspectRatio = document.getElementById("canvas").height / document.getElementById("canvas").width

let colour = new Vec3(0,0,0)

for (let i = 0; i < imageWidth; i++)
{
    for (let j = 0; j <= imageHeight; j++)
    {
        let u = i / (imageWidth-1);
        let v = j / (imageHeight-1);
        colour.x = v * 255;
        colour.y = v * 255;
        setPixel(i,j,colour)
    }
}