import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export function CustomAudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="custom-audio-player">
      {title && <div className="audio-title">{title}</div>}
      <AudioPlayer
        src={src}
        showJumpControls={false}
        layout="stacked"
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}
