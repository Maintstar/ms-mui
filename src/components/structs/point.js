export default class Point {

  constructor(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  isValid() {
    return this.x!=null && this.y!=null;
  }

  vectorLength()
  {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normalize() {
    let length = this.vectorLength();
    if (length > 0) {
      this.x = this.x / length;
      this.y = this.y / length;
    }
    return this;
  }

  scalar(p) {
    return this.x * p.x + this.y * p.y;
  }

  angle(v) {
    return Math.acos(this.normalize().scalar(v.normalize()))
  }

  angleDeg(v) {
    return this.angle(v) * (180 / Math.PI);
  }

  inverse() {
    return new Point(-this.x, -this.y);
  }

  inverseMut() {
    this.x = !this.x;
    this.y = !this.y;
  }

  add(v) {
    return new Point(this.x + v.x, this.y + v.y);
  }

  addMut(v) {
    this.x += v.x;
    this.y += v.y;
  }

  subtract(v) {
    return new Point(this.x - v.x, this.y - v.y);
  }

  subtractMut(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  validateRange(minX, minY, maxX, maxY) {
    validateRangePoint(this, minX, minY, maxX, maxY)
  }

  grid(g) {
    let r = 0;//-(g | 0);
    this.x -= -r + this.x%g;
    this.y -= -r + this.y%g;
  }

  toString() {
    return 'x' + this.x + " y" + this.y;
  }
}

export function validateRangePoint(p, minX, minY, maxX, maxY) {
  if (p.x < minX) p.x = minX;
  if (p.y < minY) p.y = minY;
  if (p.x > maxX) p.x = maxX;
  if (p.y > maxY) p.y = maxY;
}
