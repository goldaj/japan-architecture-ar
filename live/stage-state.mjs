/** A reveal must never wait for a network roundtrip or model inference. */
export class StageState {
  constructor({staleAfterMs=1500}={}) {
    this.effectEnabled=false;
    this.lastGeneratedAt=-Infinity;
    this.staleAfterMs=staleAfterMs;
  }
  reveal() { this.effectEnabled=false; }
  enable() { this.effectEnabled=true; }
  onGeneratedFrame(at) {
    if (Number.isFinite(at)) this.lastGeneratedAt=at;
  }
  clearGenerated() { this.lastGeneratedAt=-Infinity; }
  source(now) {
    const fresh=Number.isFinite(now) && now>=this.lastGeneratedAt &&
      now-this.lastGeneratedAt <= this.staleAfterMs;
    return this.effectEnabled && fresh ? "generated" : "original";
  }
  degraded(now) { return this.effectEnabled && this.source(now)!=="generated"; }
}
