import Head from 'next/head';
import { useTranslation } from 'next-i18next';

// Json
import patchsData from './patchs.json';

// Components
import WithHeaderFooter from '../../components/templates/WithHeaderFooter/WithHeaderFooter';
import Page from '../../components/templates/Page/Page';
import PatchResume from '../../components/atoms/PatchResume/PatchResume';

// Utils
import { getCommonProps } from '../../utils/requests';

function Patchs({ patchs }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('patchs.pageTitle')}</title>
        <meta name="description" content={t('patchs.pageDescription')} />
      </Head>
      <WithHeaderFooter>
        <Page>
          <h1 className="h1">{t('patchs.title')}</h1>
          <h2 className="h2">{t('patchs.recentNews')}</h2>
          {patchs.map((patch) => (
            <PatchResume key={patch.id} patch={patch} />
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
      patchs: patchsData[locale],
      ...commonProps,
    },
  };
};

export default Patchs;
