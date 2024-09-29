import React from 'react';
import styles from './Track.module.css'

function Track({ track, onAction, actionLabel }) {
  return (
    <div className={styles.line}>
    <li className={styles.li}>
      <div className={styles.inline}>
        <p className={styles.p}>
          {track.name}<br></br>
          {track.artist}
        </p>
        <button className={styles.button2} onClick={() => onAction(track)}>{actionLabel}</button>
      </div>
    </li>
    </div>
  );
}

export default Track;
