export default function requestAnimationFrame(cb) {
  if (window.requestAnimationFrame) window.requestAnimationFrame(cb)
  else setTimeout(cb, 0);
}