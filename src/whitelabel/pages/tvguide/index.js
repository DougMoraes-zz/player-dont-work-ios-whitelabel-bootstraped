// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import EpgScreen from '@24i/nxg-sdk-smartott/src/screens/EpgScreen';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = EpgScreen.page.tvguide;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/EpgScreen';
