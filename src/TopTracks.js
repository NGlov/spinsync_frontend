import React, { useEffect, useState } from "react";
import './TopTracks.css';
const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history/top-tracks", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top tracks");
        return res.json();
      })
      .then((data) => {
        setTracks(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading top tracks...</p>;
  if (error) return <p>Error: {error}</p>;
  if (tracks.length === 0) return <p>No top tracks found.</p>;

  return (
    <div class='songs'>
      <h2>Your Top Tracks</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tracks.map((track) => (
          <li key={track.id} style={{ display: "flex", alignItems: "center", marginBottom: "15px", gap: "15px" }}>
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
  );
};

export default TopTracks;
