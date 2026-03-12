import { Vec3 } from "./Vector3.js";
import { Ray } from "./Ray.js";
import { RayCastResult } from "./RayCastResult.js";
import { Sphere } from "./Sphere.js";

// Calculate the intersection point and normal when a ray hits a sphere. Returns a RayCastResult.
function hit(ray, t, sphereIndex){
    let intersectionPoint = ray.pointAt(t);
    let intersectionNormal = intersectionPoint.minus(spheres[sphereIndex].centre).normalised();

    return new RayCastResult(intersectionPoint, intersectionNormal, t, sphereIndex);
}

// Return a RayCastResult when a ray misses everything in the scene
function miss()
{
    return new RayCastResult(new Vec3(0,0,0), new Vec3(0,0,0), -1, -1)
}

// Check whether a ray hits anything in the scene and return a RayCast Result
function traceRay(ray)
{
    let t = 1000000;
    let closestSphereIndex = -1;

    for (let i = 0; i < spheres.length; i++){
        let current_t = spheres[i].rayIntersects(ray);
        if(current_t > 0 && current_t < t){
            t = current_t;
            closestSphereIndex = i;
        }
    }

    if(closestSphereIndex < 0) return miss();

    return hit(ray, t, closestSphereIndex);

}

// Calculate and return the background colour based on the ray
function backgroundColour(ray)
{
    let white = new Vec3(1, 1, 1);
    let blue = new Vec3(0.3, 0.5, 0.9);
    let t = 0.5*(ray.direction.y + 1.0);
    return white.scale(1-t).add(blue.scale(t));
}

// Returns the colour the ray should have as a Vec3 with RGB values in [0,1]
function rayColour(ray) 
{
    let castResult = traceRay(ray);
    if(castResult.t < 0) return backgroundColour(ray);
    
    let albedo = spheres[castResult.sphereIndex].colour;
    let diffuse = Math.max(castResult.normal.dot(negLightDirection), 0);
    //let colour = albedo.scale(diffuse)

    let shadow = new Ray(castResult.position, negLightDirection);
    let shadowCast = traceRay(shadow);

    let reflectionVector = lightDirection.minus(castResult.normal.scale(2 * castResult.normal.dot(lightDirection)));
    let viewDirec = camPosition.minus(castResult.position);
    let specular = Math.pow(Math.max(reflectionVector.dot(viewDirec), 0), 5) * 0.8;

    //let colour = albedo.multiply(new Vec3(0.05, diffuse, specularScalar));
    let colour = albedo.scale(0.05 + diffuse + specular);

    if(shadowCast.t > 0){
        colour = colour.scale(0.4);
    }

    return colour
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
    new Sphere(new Vec3(0,-100.5,-1), 100, new Vec3(0,1,0)),   // Big green sphere
    new Sphere(new Vec3(0.3, 0, -0.6), 0.1, new Vec3(0.8, 0.8, 0.8))
    );

// Main code
let imageWidth = document.getElementById("canvas").width
let imageHeight = document.getElementById("canvas").height
let aspectRatio = document.getElementById("canvas").height / document.getElementById("canvas").width

let viewportWidth = 2;
let viewportHeight = viewportWidth * aspectRatio;
let focalLength = 1.0;

let camPosition = new Vec3(0, 0, 0);
let horizontal = new Vec3(viewportWidth, 0, 0);
let vertical = new Vec3(0, viewportHeight, 0);
let lowerLeftCorner = camPosition.minus(horizontal.scale(0.5)).minus(vertical.scale(0.5)).minus(new Vec3(0, 0, focalLength));

let lightDirection = new Vec3(-1.1, -1.3, -1.5).normalised();
let negLightDirection = new Vec3(-lightDirection.x, -lightDirection.y, -lightDirection.z);

let colour = new Vec3(0,0,0)

for (let i = 0; i < imageWidth; i++)
{
    for (let j = 0; j <= imageHeight; j++)
    {
        let u = i / (imageWidth-1);
        let v = j / (imageHeight-1);

        let ray = new Ray(camPosition, lowerLeftCorner.add(horizontal.scale(u)).add(vertical.scale(v)).minus(camPosition));
        colour = rayColour(ray).scale(255);
        setPixel(i,j,colour)
    }
}