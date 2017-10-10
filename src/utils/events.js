export function stopPropagation (e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else if (e.originalEvent) {  // In case of Leaflet event.
    e.originalEvent._stopped = true;
  } else {
    e.cancelBubble = true;
  }
}
