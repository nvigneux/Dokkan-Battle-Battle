import Head from 'next/head';

// Json
import patchsData from './patchs.json';

// Components
import WithHeaderFooter from '../../components/templates/WithHeaderFooter/WithHeaderFooter';
import Page from '../../components/templates/Page/Page';
import PatchResume from '../../components/atoms/PatchResume/PatchResume';
// Utils
import { getCommonProps } from '../../utils/requests';

function Patchs({ patchs }) {
  return (
    <>
      <Head>
        <title>Patchs - Dokkan Battle Battle</title>
        <meta
          name="description"
          content="Follow news from Dokkan Battle Battle"
        />
      </Head>
      <WithHeaderFooter>
        <Page>
          <h1 className="h1">Patch</h1>
          <h2 className="h2">Most Recent Patch News</h2>
          {patchs.map((patch) => (
            <PatchResume key={patch.id} patch={patch} />
          ))}
        </Page>
      </WithHeaderFooter>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      patchs: patchsData,
      ...commonProps,
    },
  };
};

export default Patchs;
