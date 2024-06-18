import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoID, width, height }) => {
  const optObj = {
    height: height,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const _onError = (event) => {
    console.log("Error", event);
  };

  return (
    <YouTube
      videoId={videoID} // defaults -> ''
      opts={optObj} // defaults -> {}
      onReady={_onReady} // defaults -> noop
      onError={_onError} // defaults -> noop
    />
  );
};

export default VideoPlayer;