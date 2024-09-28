import React from 'react';
import Track from './Track';

function Tracklist({ tracks, onAction, actionLabel }) {
  return (
    <ul>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAction={onAction} actionLabel={actionLabel} />
      ))}
    </ul>
  );
}

export default Tracklist;
