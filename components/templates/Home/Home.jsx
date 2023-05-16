/* eslint-disable react/no-danger */
import Link from 'next/link';

// Styles
import styles from './Home.module.css';
import TitleDokkan from '../../atoms/TitleDokkan/TitleDokkan';
import ButtonDokkan from '../../atoms/ButtonDokkan/ButtonDokkan';

export default function Home() {
  return (
    <div className={styles['dbb-container']}>
      <div className={styles['dbb-home']}>
        <div className={styles['dbb-home__title']}>
          <h1>Dokkan Battle Battle</h1>
          <h2>Fight your friends in Multiplayer modes</h2>
        </div>
        <div className={styles['dbb-home__description']}>
          <p>For the moment Dokkan Battle Battle allows you to play in two multiplayers modes.</p>
          <p
            dangerouslySetInnerHTML={{
              __html: `
          The principle and the rules were thought and created by the youtubers described below.
          <br />
          I thank them for
          having ideas of multiplayer modes, so that everyone can share their passion of
          <strong>Dragon Ball Z DokkanBattle</strong>
          .
          `,
            }}
          />
        </div>
        <div className={styles['dbb-home__mode']}>
          <TitleDokkan>Random Rush</TitleDokkan>
          <div className={styles['dbb-home__yt']}>
            <div className={styles['dbb-home__yt--title']}>
              <h3>Youtubers</h3>
            </div>
            <div className={styles['dbb-home__yt--link']}>
              <Link
                href="https://www.youtube.com/channel/UCYdop03CtRIi_0GUXSm2c9w"
                target="_blank"
                rel="noreferrer"
              >
                Fitz Adri
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC-Bag_B3YkqvX2nEj28jgOA"
                target="_blank"
                rel="noreferrer"
              >
                Sussucre
              </Link>
            </div>
          </div>
          <div className={styles['dbb-home__rules']}>
            <div className={styles['dbb-home__rules--title']}>
              <h3>The Rules</h3>
            </div>
            <ul className={styles['dbb-home__rules--rule']}>
              <li>In Random Rush each player will created a team of 6 characters randomly.</li>
              <li>For that, each player need to fill the number of lines of his box.</li>
              <li>Players will draws each their turns a random number for the lines and the column.</li>
              <li>This will define a character in the box of the concerned player.</li>
              <li>
                In case of duplicates draw, you need to delete the character in-game of
                your team and re draw a random line and
                column.
              </li>
              <li>
                Depends of the number of lines each player have you can draft a certains
                number of characters of your team :
              </li>
              <li>
                {'0 <> 10 lines = 1 Draft; 10 <> 20 lines = 2 Drafts; 20 <> More; 3 Drafts '}
              </li>
              <li>When all players have their 6 characters you will draw if you want a disadvantage.</li>
              <li>Each players can reorganise their team and change the leader of the team.</li>
              <li>You are ready to play.</li>
            </ul>
          </div>
          <div className={styles['dbb-home__btn']}>
            <Link href="/random-rush" className={styles['dbb-button}']} data-size="big" data-color="orange">
              <ButtonDokkan>
                {'Let\'s play !'}
              </ButtonDokkan>
            </Link>
          </div>
        </div>
        <div className={styles['dbb-home__mode']}>
          <TitleDokkan>Challenge Battle</TitleDokkan>
          <div className={styles['dbb-home__yt']}>
            <div className={styles['dbb-home__yt--title']}>
              <h3>Youtubers</h3>
            </div>
            <div className={styles['dbb-home__yt--link']}>
              <Link
                href="https://www.youtube.com/channel/UCCyAzMaIWGw1vsCsL4IHbHQ"
                target="_blank"
                rel="noreferrer"
              >
                Yekais
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCXd0OqDuxy9IZSglBWHL6sA"
                target="_blank"
                rel="noreferrer"
              >
                Fafa
              </Link>
            </div>
          </div>
          <div className={styles['dbb-home__rules']}>
            <div className={styles['dbb-home__rules--title']}>
              <h3>The Rules</h3>
            </div>
            <ul className={styles['dbb-home__rules--rule']}>
              <li>On Challenge Battle each player will created a team of 6 characters based on their types.</li>
              <li>Define the number of players.</li>
              <li>Players will draws each their turns a random types of characters.</li>
              <li>When all players have their 6 types of characters you will define the max team cost.</li>
              <li>Optional* You can define and draw a joker, the players have the choice to use it or not</li>
              <li>Each player have the mission of create a team with all the types he draw.</li>
              <li>You can add difficulty to this by define a limit of times.</li>
              <li>You are ready to play.</li>
            </ul>
          </div>
          <div className={styles['dbb-home__btn']}>
            <Link href="/challenge-battle" className={styles['dbb-button']} data-size="big" data-color="orange">
              <ButtonDokkan>
                {'Let\'s play !'}
              </ButtonDokkan>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
