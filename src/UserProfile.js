import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "./api";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="info">
      <h2>Welcome, {user.display_name}!</h2>
      <p>Here’s some info about your Spotify account.</p>
    </div>
  );
};

export default UserProfile;
