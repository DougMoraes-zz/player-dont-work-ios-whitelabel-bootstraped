// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import DynaRowScreen from '@24i/nxg-sdk-smartott/src/screens/DynaRowScreen';
// </DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import OverridenDynaRowScreen from '../../screens/DynaRowScreen';
import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps, getStaticPaths: defaultGetStaticPaths } =
    DynaRowScreen.page['[slug]'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });
export const getStaticPaths = (context) => defaultGetStaticPaths({ ...context, clients });

export default OverridenDynaRowScreen;
