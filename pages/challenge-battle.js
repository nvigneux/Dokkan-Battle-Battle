// Components
import Page from '../components/templates/Page/Page';
import ChallengeBattle from '../components/templates/ChallengeBattle/ChallengeBattle';
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
// Utils
import { getCommonProps } from '../utils/requests';

function Home() {
  return (
    <WithHeaderFooter>
      <Page>
        <ChallengeBattle />
      </Page>
    </WithHeaderFooter>
  );
}

export const getStaticProps = async (ctx) => {
  const commonProps = await getCommonProps(ctx);
  return {
    props: {
      ...commonProps,
    },
  };
};

export default Home;
