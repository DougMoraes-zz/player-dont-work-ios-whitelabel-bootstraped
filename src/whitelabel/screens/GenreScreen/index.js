import React from 'react';
import GenreScreen from '@24i/nxg-sdk-smartott/src/screens/GenreScreen';

const OverridenGenreScreen = (props) => <GenreScreen.Main {...props} onEndReachedThreshold={0.7} />;

export default OverridenGenreScreen;
