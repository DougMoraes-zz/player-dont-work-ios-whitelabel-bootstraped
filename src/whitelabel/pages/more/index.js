// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import MoreScreen from '@24i/nxg-sdk-smartott/src/screens/MoreScreen';
// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = MoreScreen.page.more;

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

export { default } from '../../screens/MoreScreen';
