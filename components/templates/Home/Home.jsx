/* eslint-disable react/no-danger */
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// Styles
import styles from './Home.module.css';
import TitleDokkan from '../../atoms/TitleDokkan/TitleDokkan';
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles['dbb-container']}>
      <div className={styles['dbb-home']}>
        <div className={styles['dbb-home__title']}>
          <h1>{t('homepage.title')}</h1>
          <h2>{t('homepage.subtitle')}</h2>
        </div>
        <div className={styles['dbb-home__description']}>
          <p>{t('homepage.description')}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: t('homepage.htmlDescription'),
            }}
          />
        </div>
        <div className={styles['dbb-home__mode']}>
          <TitleDokkan>{t('homepage.randomRush.title')}</TitleDokkan>
          <div className={styles['dbb-home__yt']}>
            <div className={styles['dbb-home__yt--title']}>
              <h3>{t('homepage.randomRush.youtubersTitle')}</h3>
            </div>
            <div className={styles['dbb-home__yt--link']}>
              <Link
                href="https://www.youtube.com/channel/UCYdop03CtRIi_0GUXSm2c9w"
                target="_blank"
                rel="noreferrer"
              >
                {t('homepage.randomRush.youtuber1')}
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC-Bag_B3YkqvX2nEj28jgOA"
                target="_blank"
                rel="noreferrer"
              >
                {t('homepage.randomRush.youtuber2')}
              </Link>
            </div>
          </div>
          <div className={styles['dbb-home__rules']}>
            <div className={styles['dbb-home__rules--title']}>
              <h3>{t('homepage.randomRush.rulesTitle')}</h3>
            </div>
            <ul className={styles['dbb-home__rules--rule']}>
              <li>{t('homepage.randomRush.rule1')}</li>
              <li>{t('homepage.randomRush.rule2')}</li>
              <li>{t('homepage.randomRush.rule3')}</li>
              <li>{t('homepage.randomRush.rule4')}</li>
              <li>{t('homepage.randomRush.rule5')}</li>
              <li>{t('homepage.randomRush.rule6')}</li>
              <li>{t('homepage.randomRush.rule7')}</li>
              <li>{t('homepage.randomRush.rule8')}</li>
              <li>{t('homepage.randomRush.rule9')}</li>
              <li>{t('homepage.randomRush.rule10')}</li>
            </ul>
          </div>
          <div className={styles['dbb-home__btn']}>
            <Link href="/random-rush" className={styles['dbb-button']} data-size="big" data-color="orange">
              <ButtonDokkan>{t('homepage.randomRush.playButton')}</ButtonDokkan>
            </Link>
          </div>
        </div>
        <div className={styles['dbb-home__mode']}>
          <TitleDokkan>{t('homepage.challengeBattle.title')}</TitleDokkan>
          <div className={styles['dbb-home__yt']}>
            <div className={styles['dbb-home__yt--title']}>
              <h3>{t('homepage.challengeBattle.youtubersTitle')}</h3>
            </div>
            <div className={styles['dbb-home__yt--link']}>
              <Link
                href="https://www.youtube.com/channel/UCCyAzMaIWGw1vsCsL4IHbHQ"
                target="_blank"
                rel="noreferrer"
              >
                {t('homepage.challengeBattle.youtuber1')}
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCXd0OqDuxy9IZSglBWHL6sA"
                target="_blank"
                rel="noreferrer"
              >
                {t('homepage.challengeBattle.youtuber2')}
              </Link>
            </div>
          </div>
          <div className={styles['dbb-home__rules']}>
            <div className={styles['dbb-home__rules--title']}>
              <h3>{t('homepage.challengeBattle.rulesTitle')}</h3>
            </div>
            <ul className={styles['dbb-home__rules--rule']}>
              <li>{t('homepage.challengeBattle.rule1')}</li>
              <li>{t('homepage.challengeBattle.rule2')}</li>
              <li>{t('homepage.challengeBattle.rule3')}</li>
              <li>{t('homepage.challengeBattle.rule4')}</li>
              <li>{t('homepage.challengeBattle.rule5')}</li>
              <li>{t('homepage.challengeBattle.rule6')}</li>
              <li>{t('homepage.challengeBattle.rule7')}</li>
              <li>{t('homepage.challengeBattle.rule8')}</li>
            </ul>
          </div>
          <div className={styles['dbb-home__btn']}>
            <Link href="/challenge-battle" className={styles['dbb-button']} data-size="big" data-color="orange">
              <ButtonDokkan>{t('homepage.challengeBattle.playButton')}</ButtonDokkan>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
