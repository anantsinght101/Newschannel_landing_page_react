import { useState } from "react";
import heroThumbnail from "../assets/hero-video-thumbnail.svg";
import playIcon from "../assets/icon-play-button.svg";

/**
 * Hero: bold heading above a full-width video player,
 * mirroring the "heading + embedded live player" layout of the source page.
 * Starts as a thumbnail + play button and swaps to an iframe on click,
 * so the template doesn't auto-load an external embed.
 */
export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="hero__eyebrow">Live</span>
      <h1 className="hero__title" id="hero-title">
        LIVE UPDATES
      </h1>

      {isPlaying ? (
        <div className="hero__player">
          <iframe
            title="Live stream player"
            src="about:blank"
            width="100%"
            height="450"
            style={{ border: 0, display: "block", aspectRatio: "16 / 9", height: "auto" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="hero__player"
          onClick={() => setIsPlaying(true)}
          aria-label="Play live stream"
        >
          <img
            src={heroThumbnail}
            alt="Live stream preview thumbnail"
            className="hero__player-thumb"
          />
          <img src={playIcon} alt="" className="hero__play-icon" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
