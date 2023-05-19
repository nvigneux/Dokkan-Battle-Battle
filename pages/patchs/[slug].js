import Head from 'next/head';

// JSON
import patchsData from './patchs.json';

// Components
import WithHeaderFooter from '../../components/templates/WithHeaderFooter/WithHeaderFooter';
import Page from '../../components/templates/Page/Page';
import Patch from '../../components/atoms/Patch/Patch';

// Utils
import { getCommonProps } from '../../utils/requests';
import { pageLinksAlternate } from '../../utils/seo';

function PatchSlug({ patch, locale }) {
  return (
    <>
      <Head>
        <title>
          {`${patch?.resume} - Dokkan Battle Battle`}
        </title>
        {pageLinksAlternate({
          slug: `patchs/${patch?.slug}`,
          locale,
        })}
      </Head>
      <WithHeaderFooter>
        <Page>
          {patch ? (
            <Patch patch={patch} />
          ) : null}
        </Page>
      </WithHeaderFooter>
    </>
  );
}

export const getStaticPaths = async (ctx) => {
  const { locales } = ctx;
  const paths = [];
  locales.forEach((locale) => {
    patchsData[locale].forEach((patch) => {
      paths.push({
        params: { slug: patch.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { params: { slug }, locale } = ctx;

  const patch = patchsData[locale].find((item) => `${item.slug}` === `${slug}`);
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      patch,
      locale,
      ...commonProps,
    },
  };
};

export default PatchSlug;
