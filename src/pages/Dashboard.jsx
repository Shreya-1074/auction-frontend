import { useEffect, useState } from "react";
import { fetchItems } from "../api/items.api";
import ItemCard from "../components/ItemCard";
import { socket } from "../socket/socket";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [serverTime, setServerTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Persistent user id per tab
  let userId = sessionStorage.getItem("userId");
  if (!userId) {
    userId = "user-" + Math.floor(Math.random() * 1000000);
    sessionStorage.setItem("userId", userId);
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchItems();
        setItems(data.items);
        setServerTime(data.serverTime);
      } catch (err) {
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    load();

    // Listen for updates
    socket.on("UPDATE_BID", (update) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === update.itemId
            ? { ...item, currentBid: update.currentBid, highestBidder: update.highestBidder }
            : item
        )
      );
    });

    socket.on("BID_ERROR", (err) => {
      alert("Bid failed: " + err.message);
    });

    return () => {
      socket.off("UPDATE_BID");
      socket.off("BID_ERROR");
    };
  }, []);

  function handleBid(item) {
    socket.emit("BID_PLACED", {
      itemId: item.id,
      userId,
      amount: item.currentBid + 10
    });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
  <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
    <h1 style={{ marginBottom: 24 }}>🔥 Live Auctions</h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20
      }}
    >
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          serverTime={serverTime}
          currentUserId={userId}
          onBid={() => handleBid(item)}
        />
      ))}
    </div>
  </div>
);
}

export default Dashboard;
