//declare the name
// console.log("hello from the shapeSystem file")

class shapeSystem {
//constructor
    constructor() {
    // - list of our shapes
    this.shapes = []
    }

//make new shapes
//method?
    createShape() {
        //make a new shape object
        let temp = new Shape(
            random(0, width), 
            random(0, height), 
            25, 
            25, 
            random(-1, 1), 
            random(-1, 1)
        )
        //add it to our shapes array
            this.shapes.push(temp)
    }

//get rid of old shapes
    discardShapes() {
        //IF a shape is too old
        //THEN we get rid of it
        //remove it from the shapes arr

    }

//update the shapes
    update() {
        //for each shape in our arr
        //update its position based on its speed
        for(let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].update()
        }
    }

//draw the shapes
    display() {
        //for each shape in our arr
        //draw it
        for(let i = 0; i < this.shapes.length; i ++){
            this.shapes.[i].display
        }
    }
}

