// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import SettingsScreen from '@24i/nxg-sdk-smartott/src/screens/SettingsScreen';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = SettingsScreen.page.settings;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/SettingsScreen';
