"use client";

import { FormEvent, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import "./globals.css";

export default function Home() {
  const [followDone, setFollowDone] = useState(false);
  const [engageDone, setEngageDone] = useState(false);
  const [tagDone, setTagDone] = useState(false);

  const [username, setUsername] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");
  const [wallet, setWallet] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const FOLLOW_URL = "https://x.com/TinyBitsNFT/";
  const TWEET_URL = "https://x.com/TinyBitsNFT/status/2064328090441121835?s=20";

  const cleanUsername = username.trim().replace(/^@+/, "");
  const cleanTweetUrl = tweetUrl.trim();
  const cleanWallet = wallet.trim().toLowerCase();

  const isTweetUrlValid = useMemo(() => {
    return /^https?:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+/i.test(
      cleanTweetUrl
    );
  }, [cleanTweetUrl]);

  const isWalletValid = useMemo(() => {
    return /^0x[a-f0-9]{40}$/.test(cleanWallet);
  }, [cleanWallet]);

  const tasksCompleted = followDone && engageDone && tagDone;

  const canSubmit =
    tasksCompleted &&
    cleanUsername.length >= 2 &&
    isTweetUrlValid &&
    isWalletValid &&
    !submitted &&
    !isSubmitting;

  function handleFollow() {
    window.open(FOLLOW_URL, "_blank", "noopener,noreferrer");
    setFollowDone(true);
  }

  function handleEngage() {
    window.open(TWEET_URL, "_blank", "noopener,noreferrer");
    setEngageDone(true);
  }

  function handleTagFrens() {
    window.open(TWEET_URL, "_blank", "noopener,noreferrer");
    setTagDone(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!canSubmit) return;

    setSubmitError("");
    setIsSubmitting(true);

    const insertData = {
      username: `@${cleanUsername}`,
      tweet_url: cleanTweetUrl,
      wallet_address: cleanWallet,
    };

    const { error } = await supabase
      .from("tiny_bits_whitelist")
      .insert(insertData);

    setIsSubmitting(false);

    if (error) {
      console.error("Supabase submit error:", error);

      if (error.code === "23505") {
        setSubmitError("Already submitted.");
        return;
      }

      setSubmitError(error.message || "Submit failed. Please try again.");
      return;
    }

    setSubmitted(true);
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
              <h1>Whitelist</h1>

              <p className="subtitle">
                Complete the tasks, tag 3 frens in the comment, then submit
                your X username, tweet URL and wallet.
              </p>
            </div>

            <div className="taskPanel">
              <div className={`taskCard ${followDone ? "done" : ""}`}>
                <div>
                  <p className="taskLabel">TASK 01</p>
                  <h3>Follow Tiny Bits</h3>
                </div>

                <button
                  type="button"
                  onClick={handleFollow}
                  className="pixelBtn"
                >
                  {followDone ? "DONE" : "FOLLOW"}
                </button>
              </div>

              <div className={`taskCard ${engageDone ? "done" : ""}`}>
                <div>
                  <p className="taskLabel">TASK 02</p>
                  <h3>Like &amp; RT post</h3>
                </div>

                <button
                  type="button"
                  onClick={handleEngage}
                  className="pixelBtn"
                >
                  {engageDone ? "DONE" : "LIKE & RT"}
                </button>
              </div>

              <div className={`taskCard ${tagDone ? "done" : ""}`}>
                <div>
                  <p className="taskLabel">TASK 03</p>
                  <h3>Tag 3 frens</h3>
                </div>

                <button
                  type="button"
                  onClick={handleTagFrens}
                  className="pixelBtn"
                >
                  {tagDone ? "DONE" : "TAG FRENS"}
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`submitPanel ${!tasksCompleted ? "locked" : ""}`}
            >
              {!tasksCompleted && (
                <div className="lockOverlay">
                  <div className="lockIcon">▣</div>
                  <p>Complete all tasks to unlock submit.</p>
                </div>
              )}

              <label>
                <span>X Username</span>
                <input
                  type="text"
                  placeholder="@username"
                  value={username}
                  disabled={!tasksCompleted || submitted || isSubmitting}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label>
                <span>Tweet URL</span>
                <input
                  type="text"
                  placeholder="https://x.com/username/status/123..."
                  value={tweetUrl}
                  disabled={!tasksCompleted || submitted || isSubmitting}
                  onChange={(e) => setTweetUrl(e.target.value)}
                />
              </label>

              <label>
                <span>Wallet Address</span>
                <input
                  type="text"
                  placeholder="0x..."
                  value={wallet}
                  disabled={!tasksCompleted || submitted || isSubmitting}
                  onChange={(e) => setWallet(e.target.value)}
                />
              </label>

              {tasksCompleted && tweetUrl.length > 0 && !isTweetUrlValid && (
                <p className="errorText">Invalid tweet URL.</p>
              )}

              {tasksCompleted && wallet.length > 0 && !isWalletValid && (
                <p className="errorText">Invalid EVM wallet address.</p>
              )}

              {submitError && <p className="errorText">{submitError}</p>}

              <button type="submit" disabled={!canSubmit} className="submitBtn">
                {isSubmitting
                  ? "SUBMITTING..."
                  : submitted
                    ? "SUBMITTED"
                    : "SUBMIT"}
              </button>

              {submitted && (
                <div className="successBox">
                  <p>Submission received.</p>
                  <span>@{cleanUsername}</span>
                </div>
              )}
            </form>
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