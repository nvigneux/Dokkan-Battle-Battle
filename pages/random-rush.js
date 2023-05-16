// Components
import Page from '../components/templates/Page/Page';
import RandomRush from '../components/templates/RandomRush/RandomRush';
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
// Utils
import { getCommonProps } from '../utils/requests';

function Accueil() {
  return (
    <WithHeaderFooter>
      <Page>
        <RandomRush />
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

export default Accueil;
