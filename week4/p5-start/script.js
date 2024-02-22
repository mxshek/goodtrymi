
let myArray = ["it", "was", "a", "dark", "and", "stormy", "night"]
let myRect = new Shape(200, 100, 50, 50, 3, 1)
myRect.color = [200, 20, 200]
let myOtherRect = new Shape(400, 500, 50, 50, -1, -1)


let system = new shapeSystem()


function setup() {
  createCanvas(600, 600)

  system.createShape()
  system.createShape()
  system.createShape()


  console.log(system.shapes)

  myOtherRect.color = color(220, 120, 20)


}

function draw() {
  background(200)
  system.createShape()

  myRect.update()
  myOtherRect.update()

  myRect.display()
  myOtherRect.display()

  system.update()
  system.discardShapes()
  system.display()
}
