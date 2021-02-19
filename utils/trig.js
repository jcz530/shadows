export const xAndYFromAngleDistance = (angle, distance) => {
  let radians = (angle * Math.PI) / 180;
  let x = Math.cos(radians) * distance;
  let y = Math.sin(radians) * distance;

  // this.x = Math.round(x);
  // this.y = Math.round(y);
  // this.calculateReverse();
  return {
    x: Math.round(x),
    y: Math.round(y)
  }
}
