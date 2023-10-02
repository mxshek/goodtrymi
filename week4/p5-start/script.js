class Shape {
  constructor(_x, _y, _w, _h, _speedX, _speedY){
    this.x = _x
    this.y = _y
    this.w = _w
    this.h = _h
    this.speedX = _speedX
    this.speedY = _speedY
    this.color = 255
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
  }

  display() {
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
  }
}

let myArray = ["it", "was", "a", "dark", "and", "stormy", "night"]

let myRect = new Shape(200, 100, 50, 50, 3, 1)
myRect.color = [200, 20, 200]

let myOtherRect = new Shape(400, 500, 50, 50, -1, -1)

function setup() {
  createCanvas(600, 600)

  myOtherRect.color = color(220, 120, 20)
}

function draw() {
  background(200)

  myRect.update()
  myOtherRect.update()

  myRect.display()
  myOtherRect.display()
}
