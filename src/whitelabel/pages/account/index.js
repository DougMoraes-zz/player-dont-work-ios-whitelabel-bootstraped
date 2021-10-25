// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import AccountScreen from '@24i/nxg-sdk-smartott/src/screens/AccountScreen';
// </DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = AccountScreen.page.account;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/AccountScreen';
