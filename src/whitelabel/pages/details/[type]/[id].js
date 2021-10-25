// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import DetailsScreen from '@24i/nxg-sdk-smartott/src/screens/DetailsScreen';
// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>

import OverridenDetailsScreen from '../../../screens/DetailsScreen';
import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps, getStaticPaths: defaultGetStaticPaths } =
    DetailsScreen.page.details['[type]']['[id]'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });
export const getStaticPaths = (context) => defaultGetStaticPaths({ ...context, clients });

export default OverridenDetailsScreen;
