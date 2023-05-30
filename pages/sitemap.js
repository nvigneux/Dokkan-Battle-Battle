import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// Json
import patchsData from './patchs/patchs.json';

// Components
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
import Page from '../components/templates/Page/Page';

// Utils
import { getCommonProps } from '../utils/requests';

function Sitemap({ patchs }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('sitemap.pageTitle')}</title>
        <meta name="description" content={t('sitemap.pageDescription')} />
      </Head>
      <WithHeaderFooter>
        <Page>
          <h1 className="h1">
            {t('sitemap.title')}
          </h1>

          <Link href="/">
            <h3 className="h3">{t('homepage.title')}</h3>
          </Link>
          <Link href="/random-rush">
            <h3 className="h3">{t('homepage.randomRush.title')}</h3>
          </Link>
          <Link href="/challenge-battle">
            <h3 className="h3">{t('homepage.challengeBattle.title')}</h3>
          </Link>
          <Link href="/patchs">
            <h3 className="h3">{t('patchs.title')}</h3>
          </Link>
          {patchs.map(({ slug, title }) => (
            <Link key={slug} href={`patchs/${slug}`}>
              <h3 className="h3">{`Patch note ${title}`}</h3>
            </Link>
          ))}

        </Page>
      </WithHeaderFooter>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const { locale } = ctx;
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      ...commonProps,
      patchs: patchsData[locale],
    },
  };
};

export default Sitemap;
