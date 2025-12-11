import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

// Styles
import styles from './DokkanTimer.module.css';

// Components
import ButtonDokkan from '../ButtonDokkan/ButtonDokkan';
import DokkanToast from '../DokkanToast/DokkanToast';

function DokkanTimer() {
  const { t } = useTranslation();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);

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

  useEffect(() => () => {
    cancelAnimationFrame(timerRef.current);
  }, []);

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
        t('timer.finished.title'),
        t('timer.finished.message'),
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

  const startTimer = () => {
    setIsActive(true);
    startTimeRef.current = Date.now() - elapsedTimeRef.current;
    requestAnimationFrame(updateTimer);
  };

  const stopTimer = () => {
    setIsActive(false);
    elapsedTimeRef.current = 0;
    cancelAnimationFrame(timerRef.current);
  };

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
      notify('timer', t('timer.invalidNumber.title'), t('timer.invalidNumber.message'));
    }
  };

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
                data-testid="timer-minute-input"
              />
            </div>
            <span className={styles['dbb-timer__label']}>{t('timer.labels.minutes')}</span>
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
                data-testid="timer-second-input"
              />
            </div>
            <span className={styles['dbb-timer__label']}>{t('timer.labels.seconds')}</span>
          </div>
        </div>
        <div className={styles['dbb-timer__action']}>
          <ButtonDokkan
            type="button"
            className={styles['dbb-timer__button']}
            onClick={handleStart}
            disabled={isActive}
            size="small"
            data-testid="timer-start-button"
          >
            {t('timer.buttons.start')}
          </ButtonDokkan>
          <ButtonDokkan
            type="button"
            className={styles['dbb-timer__button']}
            onClick={isActive ? stopTimer : handleReset}
            size="small"
            data-testid="timer-stop-reset-button"
          >
            {isActive ? t('timer.buttons.stop') : t('timer.buttons.reset')}
          </ButtonDokkan>
        </div>
      </div>
    </div>
  );
}

export default DokkanTimer;
