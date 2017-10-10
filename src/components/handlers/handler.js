export default class Handler {

  addHooks() {
  }

  removeHooks() {
  }

  enable() {
    if (this._enabled) { return; }

    this._enabled = true;
    this.addHooks();
  }

  disable() {
    if (!this._enabled) { return; }

    this._enabled = false;
    this.removeHooks();
  }

  enabled() {
    return !!this._enabled;
  }
}