// Utils
import WithHeaderFooter from '../components/templates/WithHeaderFooter/WithHeaderFooter';
import { getCommonProps } from '../utils/requests';

function Home() {
  return (
    <WithHeaderFooter>
      <div className="container center">
        <h1 className="h1">Dokkan Battle Battle</h1>
        <h2 className="h2">Work in progress</h2>
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
