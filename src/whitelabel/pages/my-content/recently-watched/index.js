import RecentlyWatchedScreen from '@24i/nxg-sdk-smartott/src/screens/RecentlyWatchedScreen';

import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps } =
    RecentlyWatchedScreen.page['my-content']['recently-watched'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });

const RecentlyWatchedScreenMain = RecentlyWatchedScreen.Main;

export default RecentlyWatchedScreenMain;
