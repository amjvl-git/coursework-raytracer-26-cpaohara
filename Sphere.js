class Sphere
{
    constructor (centre, radius, colour)
    {
        this.centre = centre
        this.radius = radius
        this.colour = colour
    }

    // Calculate the point on the sphere  where the ray intersects using 
    // a quadratic equation and return the t value of the ray for that point
    // If two solutions exist return the minus solution
    // If no solutions exist return -1
    rayIntersects(ray){
        //a = coef t sqrd
        //b = coef t
        //c = constant
        let coefficient_t_sqrd = ray.direction.dot(ray.direction);
        let coefficient_t = ray.direction.scale(2).dot(ray.origin.minus(this.centre));
        let constant = ray.origin.minus(this.centre).dot(ray.origin.minus(this.centre));

        let discriminant = coefficient_t ** 2 - (4 * coefficient_t_sqrd * constant);
        
        if(discriminant > 0){
            let solution = (-(coefficient_t)-Math.sqrt(coefficient_t ** 2 - 4 * coefficient_t_sqrd * constant)) / (2 * coefficient_t_sqrd);
            return solution;
        }
        else{
            return -1;
        }
        // else if(discriminant == 0){
        //     //positive solution
        // }
    }
}

export{Sphere};