import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

// Styles
import styles from './DokkanTimer.module.css';

// Components
import ButtonDokkan from '../ButtonDokkan/ButtonDokkan';
import DokkanToast from '../DokkanToast/DokkanToast';

/**
 * Timer component that allows countdown of minutes and seconds.
 */
function DokkanTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  /**
 * Notifies the user with a toast message.
 *
 * @param {string} id - The ID of the toast message.
 * @param {string} text - The main text content of the toast.
 * @param {string} subText - The subtext content of the toast.
 * @param {string} [type='info'] - The type of the toast message. Defaults to 'info'.
 * @returns {void}
 */
  const notify = (id, text, subText, type = 'info') => {
    if (!toast.isActive(id)) {
      toast(
        <DokkanToast
          text={text}
          subText={subText}
          type={type}
        />,
        {
          toastId: id,
          duration: 3000,
          position: 'top-right',
          onClose: () => toast.clearWaitingQueue(),
        },
      );
    }
  };

  /**
   * Clean up the timer on component unmount.
   */
  useEffect(() => () => {
    cancelAnimationFrame(timerRef.current);
  }, []);

  /**
   * Update the timer based on elapsed time and remaining time.
   */
  const updateTimer = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    const remainingTime = (minutes * 60 + seconds) * 1000 - elapsedTime;

    if (remainingTime <= 0) {
      setIsActive(false);
      setMinutes(0);
      setSeconds(0);
      elapsedTimeRef.current = 0;
      notify(
        'timer-finished',
        'Time is over',
        'The timer has finished counting down.',
      );
      return;
    }

    const updatedMinutes = Math.floor(remainingTime / 60000);
    const updatedSeconds = Math.floor((remainingTime % 60000) / 1000);

    setMinutes(updatedMinutes);
    setSeconds(updatedSeconds);
    elapsedTimeRef.current = elapsedTime;

    timerRef.current = requestAnimationFrame(updateTimer);
  };

  /**
   * Start the timer.
   */
  const startTimer = () => {
    setIsActive(true);
    startTimeRef.current = Date.now() - elapsedTimeRef.current;
    requestAnimationFrame(updateTimer);
  };

  /**
   * Stop the timer.
   */
  const stopTimer = () => {
    setIsActive(false);
    elapsedTimeRef.current = 0;
    cancelAnimationFrame(timerRef.current);
  };

  /**
   * Handle the Start button click event.
   */
  const handleStart = () => {
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    if (
      (!Number.isNaN(parsedMinutes) || !Number.isNaN(parsedSeconds))
      && (parsedMinutes > 0 || parsedSeconds > 0)
      && (parsedMinutes <= 60 || parsedSeconds <= 60)
    ) {
      startTimer();
    } else {
      notify('timer', 'Enter a number', 'No time detected');
    }
  };

  /**
   * Handle the Reset button click event.
   */
  const handleReset = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
    elapsedTimeRef.current = 0;
    cancelAnimationFrame(timerRef.current);
  };

  return (
    <div className={styles['dbb-timer']}>
      <div className={styles['dbb-timer__time']}>
        <div className={styles['dbb-timer__container']}>
          <div className={styles['dbb-timer__content']}>
            <div className={styles['dbb-timer__area']}>
              <input
                className={`${styles['dbb-timer__input']} ${isActive ? styles['dbb-timer__input--disabled'] : ''}`}
                name="timer-minute"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                type="number"
                min="0"
                maxLength="2"
                max="59"
                disabled={isActive}
              />
            </div>
            <span className={styles['dbb-timer__label']}>Minute(s)</span>
          </div>
          <div className={styles['dbb-timer__separate']}>:</div>
          <div className={styles['dbb-timer__content']}>
            <div className={styles['dbb-timer__area']}>
              <input
                className={`${styles['dbb-timer__input']} ${isActive ? styles['dbb-timer__input--disabled'] : ''}`}
                name="timer-second"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
                type="number"
                min="0"
                maxLength="2"
                max="59"
                disabled={isActive}
              />
            </div>
            <span className={styles['dbb-timer__label']}>Second(s)</span>
          </div>
        </div>
        <div className={styles['dbb-timer__action']}>
          <ButtonDokkan
            type="button"
            className={styles['dbb-timer__button']}
            onClick={handleStart}
            disabled={isActive}
            size="small"
          >
            Launch
          </ButtonDokkan>
          <ButtonDokkan
            type="button"
            className={styles['dbb-timer__button']}
            onClick={isActive ? stopTimer : handleReset}
            size="small"
          >
            {isActive ? 'Stop' : 'Reset'}
          </ButtonDokkan>
        </div>
      </div>
    </div>
  );
}

export default DokkanTimer;
