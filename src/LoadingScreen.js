import React from "react";
import coverImage from "./SpinSync-logo/cover.png";
import './LoadingScreen.css';
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={coverImage} alt="Loading..." className="loading-image" />
      <div className="loading-text">Loading</div>
    </div>
  );
};

export default LoadingScreen;