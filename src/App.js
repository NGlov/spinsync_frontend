import './App.css';
import React, {useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import TopTracks from './TopTracks';
import RecentTracks from './RecentTracks';
import LoadingScreen from './LoadingScreen';
import PlaylistMaker from './PlaylistMaker';


function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {setLoading(false);}, 2000);
    return () => clearTimeout(timer);
  }, []);

  if(loading){
    return <LoadingScreen />;
  }
  
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
