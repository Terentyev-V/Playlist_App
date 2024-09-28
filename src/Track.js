import React from 'react';
import styles from './Track.module.css'

function Track({ track, onAction, actionLabel }) {
  return (
    <li>
      <div>
        <strong>{track.name}</strong> by {track.artist} ({track.album})
        <button className={styles.button2} onClick={() => onAction(track)}>{actionLabel}</button>
      </div>
    </li>
  );
}

export default Track;
