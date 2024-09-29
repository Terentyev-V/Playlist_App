import React from 'react';
import Track from './Track';
import styles from './Tracklist.module.css'

function Tracklist({ tracks = [], onAction, actionLabel }) {
  return (
    <ul className={styles.ul}>
      {tracks.map(track => (
        <Track key={track.id} track={track} onAction={onAction} actionLabel={actionLabel} />
      ))}
    </ul>
  );
}

export default Tracklist;
