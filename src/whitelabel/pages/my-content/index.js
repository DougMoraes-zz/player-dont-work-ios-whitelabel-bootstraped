// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import MyContentScreen from '@24i/nxg-sdk-smartott/src/screens/MyContentScreen';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY

import { clients } from '../../config';

const { getServerSideProps: defaultGetServerSideProps } = MyContentScreen.page['my-content'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

const MyContentScreenMain = MyContentScreen.Main;

export default MyContentScreenMain;
