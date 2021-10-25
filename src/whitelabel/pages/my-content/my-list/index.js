import MyListScreen from '@24i/nxg-sdk-smartott/src/screens/MyListScreen';

import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps } =
    MyListScreen.page['my-content']['my-list'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

const MyListScreenMain = MyListScreen.Main;

export default MyListScreenMain;
