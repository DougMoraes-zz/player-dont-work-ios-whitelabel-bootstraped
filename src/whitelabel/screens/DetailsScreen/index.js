import React, { useContext } from 'react';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import DetailsScreen from '@24i/nxg-sdk-smartott/src/screens/DetailsScreen';
// DONT CHANGE IMPORT PATHS ABOVE OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import { ThemeContext } from '@24i/nxg-sdk-higgs/src/context/Theme';

const OverridenDetailsScreen = (props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <DetailsScreen.Main
            onReplayPress={() => alert('This feature is not available yet')}
            onRemindPress={() => alert('This feature is not available yet')}
            onSharePress={() => alert('This feature is not available yet')}
            topGradient={['transparent', theme.color.background1].reverse()}
            {...props}
        />
    );
};

export default OverridenDetailsScreen;
