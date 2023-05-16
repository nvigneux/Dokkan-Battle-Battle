// Components
import Home from '../components/templates/Home/Home';
import Page from '../components/templates/Page/Page';
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
// Utils
import { getCommonProps } from '../utils/requests';

function Accueil() {
  return (
    <WithHeaderFooter>
      <Page>
        <Home />
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
