import Head from 'next/head';

// JSON
import patchsData from './patchs.json';

// Components
import WithHeaderFooter from '../../components/templates/WithHeaderFooter/WithHeaderFooter';
import Page from '../../components/templates/Page/Page';
import Patch from '../../components/atoms/Patch/Patch';

// Utils
import { getCommonProps } from '../../utils/requests';

function PatchSlug({ patch }) {
  return (
    <>
      <Head>
        <title>
          {patch?.resume}
          {' '}
          - Dokkan Battle Battle
        </title>
      </Head>
      <WithHeaderFooter>
        <Page>
          <Patch patch={patch} />
        </Page>
      </WithHeaderFooter>
    </>
  );
}

export const getStaticPaths = async () => {
  const paths = patchsData.map((patch) => ({
    params: { slug: `${patch.slug}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const patch = patchsData.find((item) => `${item.slug}` === `${slug}`);
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      patch,
      ...commonProps,
    },
  };
};

export default PatchSlug;
