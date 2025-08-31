import React, { useEffect, useState } from 'react';
import './App.css';
import UserProfile from './UserProfile';
import TopTracks from './TopTracks';
import RecentTracks from './RecentTracks';
import PlaylistMaker from './PlaylistMaker';
import LoadingScreen from './LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="App">
      <UserProfile />
      <TopTracks />
      <RecentTracks />
      <PlaylistMaker />
    </div>
  );
}

export default App;
