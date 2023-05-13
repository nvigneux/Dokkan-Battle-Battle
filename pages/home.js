// Components
import Home from "../components/templates/Home/Home";
import WithHeaderFooter from "../components/templates/WithHeaderFooter/WithHeaderFooter";
// Utils
import { getCommonProps } from "../utils/requests";

function Accueil () {
  return (
    <WithHeaderFooter>
      <Home />
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
