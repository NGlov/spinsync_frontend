import React, { useState } from "react";
import { createPlaylist } from "./api";

const PlaylistMaker = () => {
  const [loading, setLoading] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleCreatePlaylist = async () => {
    setLoading(true);
    setError(null);
    setPlaylistUrl(null);

    try {
      const data = await createPlaylist();
      setPlaylistUrl(data.playlist_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={handleCreatePlaylist}
        disabled={loading}
        className="px-6 py-3 bg-green-500 text-white rounded-2xl shadow-md hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Creating Playlist..." : "Create Playlist"}
      </button>

      {playlistUrl && (
        <p className="mt-4">
          🎶 Playlist created!{" "}
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Open on Spotify
          </a>
        </p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PlaylistMaker;
