// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import SearchScreen from '@24i/nxg-sdk-smartott/src/screens/SearchScreen';
// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = SearchScreen.page.search;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/SearchScreen';
