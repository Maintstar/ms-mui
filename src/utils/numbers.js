export function validateRange(v, minX, maxX) {
  if (v < minX) v = minX;
  if (v > maxX) v = maxX;
  return v
}