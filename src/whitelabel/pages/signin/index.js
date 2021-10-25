// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import SigninScreen from '@24i/nxg-sdk-smartott/src/screens/SigninScreen';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = SigninScreen.page.signin;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/SigninScreen';
