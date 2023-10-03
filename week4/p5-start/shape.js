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