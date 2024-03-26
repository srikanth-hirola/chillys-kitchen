/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';

const CateringStoryVideo = () => {
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const thumbnailUrl = "/images/home/provide-1.webp";

  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="catering-story-video">
      {!showVideo && (
        <div className="thumbnail" onClick={openVideo}>
          <img src={thumbnailUrl} alt="Thumbnail" />
          <PlayCircleOutlined className="play-icon" />
        </div>
      )}
      {showVideo && (
        <div className="video-player">
          <iframe
            title="video"
            width="100%"
            height="100%"
            src={videoUrl}
            // frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen

          />
          <button className="close-btn" onClick={closeVideo}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CateringStoryVideo;

