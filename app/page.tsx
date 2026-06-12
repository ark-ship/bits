"use client";

import "./globals.css";

export default function Home() {
  const X_URL = "https://x.com/TinyBitsNFT";
  const TWEET_URL = "https://x.com/TinyBitsNFT/status/2064328090441121835?s=20";

  function openX() {
    window.open(X_URL, "_blank", "noopener,noreferrer");
  }

  function openTweet() {
    window.open(TWEET_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="page">
      <div className="scanlines" />

      <div className="pixelStars">
        {Array.from({ length: 42 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <section className="arcadeMachine">
        <div className="machineTop">
          <div className="light red" />

          <div className="marquee">
            <span>TINY BITS</span>
          </div>

          <div className="light blue" />
        </div>

        <div className="screenWrap">
          <div className="screen">
            <div className="screenGlow" />

            <div className="titleBlock">
              <h1>Whitelist Closed</h1>

              <p className="subtitle">
                Tiny Bits whitelist submission is now closed. Thanks to everyone
                who joined tiny bits invasion.
              </p>
            </div>

            <div className="taskPanel">
              <div className="taskCard done">
                <div>
                  <p className="taskLabel">STATUS</p>
                  <h3>Whitelist Closed</h3>
                </div>

                <button type="button" className="pixelBtn">
                  CLOSED
                </button>
              </div>

              <div className="taskCard">
                <div>
                  <p className="taskLabel">SUPPLY</p>
                  <h3>2,222 Tiny Bits</h3>
                </div>

                <button type="button" className="pixelBtn">
                  2222
                </button>
              </div>
            </div>

            <section className="submitPanel">
              <div className="successBox">
                <p>Tiny Bits is moving to the next stage.</p>
                <span>Mint details will be announced on X.</span>
              </div>

              <div className="taskPanel" style={{ marginTop: "28px" }}>
                <div className="taskCard">
                  <div>
                    <p className="taskLabel">SOCIAL</p>
                    <h3>Follow Tiny Bits</h3>
                  </div>

                  <button type="button" onClick={openX} className="pixelBtn">
                    OPEN X
                  </button>
                </div>

                <div className="taskCard">
                  <div>
                    <p className="taskLabel">UPDATE</p>
                    <h3>View latest post</h3>
                  </div>

                  <button type="button" onClick={openTweet} className="pixelBtn">
                    VIEW POST
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="controlDeck">
          <div className="joystick">
            <div className="stick" />
          </div>

          <div className="arcadeButtons">
            <span />
            <span />
            <span />
          </div>
        </div>

        <footer className="footer">
          <a href="https://x.com/TinyBitsNFT" target="_blank" rel="noreferrer">
            X
          </a>

          <span>© 2026 Tiny Bits. All rights reserved.</span>
        </footer>
      </section>
    </main>
  );
}