import Point from '../structs/point';

export class MouseEvent {

  constructor(event) {
    this.point = new Point(event.clientX, event.clientY);
    this.originalEvent = event;
  }

}


let touchEvent = {
  point: new Point()
}
export function TouchEvent(event) {
  let first = event.touches[0]
  touchEvent.point.x = first.clientX;
  touchEvent.point.y = first.clientY;
  touchEvent.originalEvent = event;
  return touchEvent
}