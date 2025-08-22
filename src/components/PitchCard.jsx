// components/PitchCard.jsx
import { useCallback, useEffect, useState, useRef } from "react";
import useThemeStore from "../store/themeStore";
import { User, Clock, ChevronDown, ChevronUp } from "lucide-react";

const PitchCard = ({ pitch }) => {
  const dark = useThemeStore((s) => s.dark);

  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(true); // Always show for pitches due to multiple sections
  const contentRef = useRef(null);

  // Simplified expansion check (pitches have multiple sections, so always expandable)
  useEffect(() => {
    setShowExpandButton(true);
  }, [pitch]);

  const handleContentExpand = (e) => {
    e.stopPropagation();
    setIsContentExpanded(!isContentExpanded);
  };

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    for (let interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  if (!pitch) return null;

  return (
    <div
      ref={contentRef}
      className={`pitch-card mb-2 lg:w-xl ${dark ? "dark" : ""}`}
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "16px",
        background: dark ? "#333" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div className="header" style={{ marginBottom: "12px" }}>
        <h2 style={{ margin: "0", fontSize: "1.5em" }}>{pitch.startupName}</h2>
        <p style={{ margin: "4px 0", fontStyle: "italic" }}>{pitch.oneLiner}</p>
      </div>

      <div
        className="founder"
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <User size={16} style={{ marginRight: "8px" }} />
        <span>
          {pitch.founderName} ({pitch.founderEmail})
        </span>
      </div>

      <div
        className="time"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
          fontSize: "0.9em",
          color: "#666",
        }}
      >
        <Clock size={16} style={{ marginRight: "8px" }} />
        <span>{timeAgo(pitch.createdAt)}</span>
      </div>

      {showExpandButton && (
        <button
          onClick={handleContentExpand}
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#007bff",
            marginBottom: "12px",
          }}
        >
          {isContentExpanded ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
          <span style={{ marginLeft: "4px" }}>
            {isContentExpanded ? "Hide Details" : "Show Full Pitch Details"}
          </span>
        </button>
      )}

      {isContentExpanded && (
        <div className="details" style={{ transition: "max-height 0.3s ease" }}>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Problem</h4>
            <p>{pitch.problem || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Solution</h4>
            <p>{pitch.solution || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Target Market</h4>
            <p>{pitch.targetMarket || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Business Model</h4>
            <p>{pitch.businessModel || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Traction</h4>
            <p>{pitch.traction || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Team</h4>
            <p>{pitch.team || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Go-to-Market Strategy</h4>
            <p>{pitch.goToMarketStrategy || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Competition</h4>
            <p>{pitch.competition || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Funding Ask</h4>
            <p>{pitch.fundingAsk || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Funding Use</h4>
            <p>{pitch.fundingUse || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Website</h4>
            <p>{pitch.website || "Not provided"}</p>
          </section>
          <section style={{ marginBottom: "16px" }}>
            <h4 style={{ margin: "0 0 4px" }}>Pitch Deck URL</h4>
            <p>{pitch.pitchDeckUrl || "Not provided"}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default PitchCard;
