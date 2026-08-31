const PHRASE = (
  <span>
    Explore <i>✦</i> Experience <i>✦</i> Discover <i>✦</i> Real Exposure <i>✦</i> Real Skills{" "}
    <i>✦</i> Real Impact <i>✦</i>{" "}
  </span>
);

export function Marquee() {
  return (
    <div className="marquee-band" data-nav-theme="dark" data-cursor-dark>
      <div className="marquee-track">
        <span>{PHRASE}</span>
        <span aria-hidden="true">{PHRASE}</span>
      </div>
    </div>
  );
}
