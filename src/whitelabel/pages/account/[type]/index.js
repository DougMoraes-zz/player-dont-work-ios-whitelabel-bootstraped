// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import AccountScreen from '@24i/nxg-sdk-smartott/src/screens/AccountScreen';
// </DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps, getStaticPaths: defaultGetStaticPaths } =
    AccountScreen.page.account['[type]'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });
export const getStaticPaths = (context) => defaultGetStaticPaths({ ...context, clients });

export { default } from '../../../screens/AccountScreen';
