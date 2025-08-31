import React, { useEffect, useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Dashboard() {
  const [current, setCurrent] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currentRes, topRes, recentRes] = await Promise.all([
          fetch(`${BACKEND_URL}/player/current`, { credentials: "include" }),
          fetch(`${BACKEND_URL}/history/top-tracks`, { credentials: "include" }),
          fetch(`${BACKEND_URL}/history/recent-tracks`, { credentials: "include" }),
        ]);

        if (!currentRes.ok) throw new Error("Failed to fetch current track");
        if (!topRes.ok) throw new Error("Failed to fetch top tracks");
        if (!recentRes.ok) throw new Error("Failed to fetch recent tracks");

        const currentData = await currentRes.json();
        const topData = await topRes.json();
        const recentData = await recentRes.json();

        setCurrent(currentData.item ? currentData : null);
        setTopTracks(topData.items || []);
        setRecentTracks(recentData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
      <h1>Auto DJ Dashboard</h1>

      {current ? (
        <div style={{ marginBottom: "30px" }}>
          <h2>Now Playing</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img
              src={current.item.album.images[0]?.url}
              alt={current.item.album.name}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
            <div>
              <strong>{current.item.name}</strong><br />
              {current.item.artists.map(a => a.name).join(", ")}<br />
              <em>{current.item.album.name}</em>
            </div>
          </div>
        </div>
      ) : (
        <p>No song currently playing.</p>
      )}

      <div style={{ marginBottom: "30px" }}>
        <h2>Top Tracks</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {topTracks.map(track => (
            <li key={track.id} style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
              <img
                src={track.album.images[0]?.url}
                alt={track.album.name}
                style={{ width: 64, height: 64, borderRadius: 6 }}
              />
              <div>
                <strong>{track.name}</strong><br />
                {track.artists.map(a => a.name).join(", ")}<br />
                <em>{track.album.name}</em>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Recently Played</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recentTracks.map((track, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
              <img
                src={track.album_art}
                alt={track.album}
                style={{ width: 64, height: 64, borderRadius: 6 }}
              />
              <div>
                <strong>{track.name}</strong> by {track.artists.join(", ")}<br />
                <em>{track.album}</em><br />
                <small>Played at: {new Date(track.played_at).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
