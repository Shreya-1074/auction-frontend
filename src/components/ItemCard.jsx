import { useEffect, useState } from "react";
import Countdown from "./Countdown";

function ItemCard({ item, onBid, serverTime, currentUserId }) {
  const isWinning = item.highestBidder === currentUserId;
  const isOutbid = item.highestBidder && !isWinning;

  const [flash, setFlash] = useState(false);

  // Flash animation when price changes
  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 300);
    return () => clearTimeout(t);
  }, [item.currentBid]);

  return (
    <div
      style={{
        borderRadius: 12,
        padding: 16,
        width: 260,
        background: flash ? "#d1fae5" : isWinning ? "#ecfeff" : "white",
        border: isWinning
          ? "2px solid #10b981"
          : isOutbid
          ? "2px solid #ef4444"
          : "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease"
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{item.title}</h3>

      <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        ${item.currentBid}
      </div>

      <Countdown endsAt={item.endsAt} serverTimeAtLoad={serverTime} />

      {isWinning && (
        <div style={{ color: "#059669", fontWeight: "bold", marginTop: 8 }}>
          🏆 You are winning
        </div>
      )}

      {isOutbid && (
        <div style={{ color: "#dc2626", fontWeight: "bold", marginTop: 8 }}>
          ❌ You are outbid
        </div>
      )}

      <button
        onClick={onBid}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: "#2563eb",
          color: "white"
        }}
      >
        Bid +$10
      </button>
    </div>
  );
}

export default ItemCard;
