import React from 'react';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import PlaybackScreen from '@24i/nxg-sdk-smartott/src/screens/PlaybackScreen';

const OverridenPlaybackScreen = (props) => (
    <PlaybackScreen.Main nativeControls={false} {...props} />
);

export default OverridenPlaybackScreen;
