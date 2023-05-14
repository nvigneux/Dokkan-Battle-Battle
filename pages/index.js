// Utils
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
import { getCommonProps } from '../utils/requests';

function Home() {
  return (
    <WithHeaderFooter>
      <div className="container center">
        <h1 className="h1">Dokkan Battle Battle</h1>
        <h2 className="h2">Site en maintenance</h2>
        <h3 className="h3">Le site est en cours de migration de serveur</h3>
      </div>
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
