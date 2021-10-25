import MyPurchasesScreen from '@24i/nxg-sdk-smartott/src/screens/MyPurchasesScreen';

import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps } =
    MyPurchasesScreen.page['my-content']['my-purchases'];

export const getServerSideProps = (context) => defaultGetServerSideProps({ ...context, clients });

const MyPurchasesScreenMain = MyPurchasesScreen.Main;

export default MyPurchasesScreenMain;
