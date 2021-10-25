// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import SignupScreen from '@24i/nxg-sdk-smartott/src/screens/SignupScreen';
// </DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = SignupScreen.page.register;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/SignupScreen';
