import React, { useEffect, useState } from "react";
const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data from backend:", data); 
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div class="info">
      <h2>Welcome to SpinSync {user.display_name}!</h2>
      <h2>To start off, here's some information about your Spotify account!</h2>
      <p></p>
    </div>
  );
};

export default UserProfile;