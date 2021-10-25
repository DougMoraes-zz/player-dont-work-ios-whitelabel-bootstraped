// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import SettingsScreen from '@24i/nxg-sdk-smartott/src/screens/SettingsScreen';
// </DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>

import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps, getStaticPaths: defaultGetStaticPaths } =
    SettingsScreen.page.settings['[type]'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });
export const getStaticPaths = (context) => defaultGetStaticPaths({ ...context, clients });

export { default } from '../../../screens/SettingsScreen';
