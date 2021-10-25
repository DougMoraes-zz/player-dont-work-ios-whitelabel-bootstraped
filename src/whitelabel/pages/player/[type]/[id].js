// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>
import PlaybackScreen from '@24i/nxg-sdk-smartott/src/screens/PlaybackScreen';
// <DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY>

import OverridenPlaybackScreen from '../../../screens/PlaybackScreen';
import { clients } from '../../../config';

const { getServerSideProps: defaultGetServerSideProps, getStaticPaths: defaultGetStaticPaths } =
    PlaybackScreen.page.player['[type]']['[id]'];

export const getStaticProps = (context) => defaultGetServerSideProps({ ...context, clients });
export const getStaticPaths = (context) => defaultGetStaticPaths({ ...context, clients });

export default OverridenPlaybackScreen;
