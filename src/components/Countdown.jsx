import { useEffect, useState } from "react";

function Countdown({ endsAt, serverTimeAtLoad }) {
  const [now, setNow] = useState(serverTimeAtLoad);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const remainingMs = Math.max(0, endsAt - now);
  const seconds = Math.floor(remainingMs / 1000);

  return <div>⏱️ {seconds}s left</div>;
}

export default Countdown;
