const backendURL = process.env.REACT_APP_BACKEND_URL;

// Fetch recent tracks
export const fetchRecentTracks = async () => {
  const res = await fetch(`${backendURL}/history/recent-tracks`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch recent tracks");
  return res.json();
};

// Fetch top tracks
export const fetchTopTracks = async () => {
  const res = await fetch(`${backendURL}/history/top-tracks`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch top tracks");
  return res.json();
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const res = await fetch(`${backendURL}/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
};

// Create playlist
export const createPlaylist = async () => {
  const res = await fetch(`${backendURL}/playlist`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create playlist");
  return res.json();
};
