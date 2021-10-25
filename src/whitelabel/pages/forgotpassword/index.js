// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import ForgotPasswordScreen from '@24i/nxg-sdk-smartott/src/screens/ForgotPasswordScreen';
// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = ForgotPasswordScreen.page.forgotpassword;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/ForgotPasswordScreen';
