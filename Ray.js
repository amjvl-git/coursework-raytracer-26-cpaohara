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

        return new Vec3((this.direction))
    }
}

export{Ray};