import { Vec3 } from "./Vector3.js";

class Ray
{
    constructor (origin, direction)
    {
        this.origin = origin
        this.direction = direction
    }

    // Calculate and return the point in space (a Vec3) for this ray for the given value of t
    pointAt(t){
        //p = o + dt

        return this.origin.add(this.direction.scale(t));
    }
}

export{Ray};