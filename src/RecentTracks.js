import React, { useEffect, useState } from "react";
import './RecentTracks.css';

function RecentTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/history/recent-tracks`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recent tracks");
        return res.json();
      })
      .then((data) => {
        setTracks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading recent tracks...</p>;
  if (error) return <p>Error: {error}</p>;
  if (tracks.length === 0) return <p>No recent tracks found.</p>;

  return (
    <div className="songs">
      <h2>Recently Played Tracks</h2>
      <ul>
        {tracks.map((track, i) => (
          <li key={i} className="track-item">
            <img
              src={track.album_art}
              alt={track.album}
              className="track-image"
            />
            <div className="track-info">
              <strong>{track.name}</strong> by {track.artists.join(", ")}<br />
              <em>{track.album}</em><br />
              <small>Played at: {new Date(track.played_at).toLocaleString()}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTracks;
