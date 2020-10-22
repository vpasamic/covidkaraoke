class SpotifyEmbed {
  constructor({ parentEl, src = "" }) {
    if (!(parentEl instanceof HTMLElement)) {
      throw new Error("parentEl must be an instance of HTMLElement.");
    }
    this.parentEl = parentEl;
    this._src = src;
    this.iframe = document.createElement("iframe");
  }
  init() {
    const iframeAttrs = [
      ["src", this._src],
      ["width", 300],
      ["height", 80],
      ["frameborder", 0],
      ["allowtransparency", true],
      ["allow", "encrypted-media"]
    ];
    iframeAttrs.forEach(([attr, value]) =>
      this.iframe.setAttribute(attr, value)
    );
    this.parentEl.appendChild(this.iframe);
  }
  // set the src of the iframe. must be a link to spotify album/playlist/track
  src(src) {
    this._src = src;
    this.init();
  }
}
