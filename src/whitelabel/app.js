import React from 'react';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import { UserDataProvider } from '@24i/nxg-sdk-smartott/src/context/UserData';
import { ImageServiceProvider } from '@24i/nxg-sdk-gluons/src/context/ImageService';
import { LayoutProvider } from '@24i/nxg-sdk-gluons/src/context/Layout';
import { EntitlementsProvider } from '@24i/nxg-sdk-smartott/src/context/Entitlements';
import { ThemeDataProvider } from '@24i/nxg-sdk-smartott/src/context/ThemeData';
import { EpgDataProvider } from '@24i/nxg-sdk-smartott/src/context/EpgData';
import { PlayerDataProvider } from '@24i/nxg-sdk-smartott/src/context/PlayerData';
import { AppStructureDataProvider } from '@24i/nxg-sdk-smartott/src/context/AppStructureData';
import { ApplicationStoreProvider } from '@24i/nxg-sdk-smartott/src/context/ApplicationStore';
import { AppSettingsDataProvider } from '@24i/nxg-sdk-smartott/src/context/AppSettingsData';
import { ContentDataProvider } from '@24i/nxg-sdk-smartott/src/context/ContentData';
import { PurchaseDataProvider } from '@24i/nxg-sdk-smartott/src/context/PurchaseData';
import { AnalyticsDataProvider } from '@24i/nxg-sdk-smartott/src/context/AnalyticsData';
import { AppNavigationProvider } from '@24i/nxg-sdk-smartott/src/context/AppNavigation';
import Application from '@24i/nxg-sdk-smartott/src/Application';
// DONT CHANGE IMPORT PATHS ABOVE OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import { QueryClientProvider } from 'react-query';
import config, { clients } from './config';
import defaultTheme from '../../platformAssets/runtime/defaultTheme.json';

const { runtimeConfig, staticSplashConfig } = config;

const {
    entitlementsClient,
    userDataClient,
    themeDataClient,
    epgDataClient,
    playerDataClient,
    appStructureDataClient,
    contentDataClient,
    purchaseDataClient,
    appSettingsDataClient,
    analyticsDataClient,
    layoutClient,
    imageServiceClient,
    appNavigationClient,
    queryClient,
} = clients;

const App = (props) => (
    <QueryClientProvider client={queryClient}>
        <EntitlementsProvider client={entitlementsClient}>
            <UserDataProvider client={userDataClient}>
                <ThemeDataProvider client={themeDataClient} defaultTheme={defaultTheme}>
                    <EpgDataProvider client={epgDataClient}>
                        <ContentDataProvider client={contentDataClient}>
                            <PurchaseDataProvider client={purchaseDataClient}>
                                <AppSettingsDataProvider client={appSettingsDataClient}>
                                    <AnalyticsDataProvider client={analyticsDataClient}>
                                        <PlayerDataProvider client={playerDataClient}>
                                            <LayoutProvider client={layoutClient}>
                                                <ImageServiceProvider client={imageServiceClient}>
                                                    <ApplicationStoreProvider
                                                        runtimeConfig={runtimeConfig}
                                                    >
                                                        {/* This provider is used to fetch */}
                                                        {/* the data for navigation */}
                                                        {/* (only for TV/Mobile because Web */}
                                                        {/* is fetching it in server side) */}
                                                        <AppStructureDataProvider
                                                            client={appStructureDataClient}
                                                        >
                                                            <AppNavigationProvider
                                                                client={appNavigationClient}
                                                            >
                                                                <Application.Main
                                                                    {...props}
                                                                    staticSplashConfig={
                                                                        staticSplashConfig
                                                                    }
                                                                />
                                                            </AppNavigationProvider>
                                                        </AppStructureDataProvider>
                                                    </ApplicationStoreProvider>
                                                </ImageServiceProvider>
                                            </LayoutProvider>
                                        </PlayerDataProvider>
                                    </AnalyticsDataProvider>
                                </AppSettingsDataProvider>
                            </PurchaseDataProvider>
                        </ContentDataProvider>
                    </EpgDataProvider>
                </ThemeDataProvider>
            </UserDataProvider>
        </EntitlementsProvider>
    </QueryClientProvider>
);

export default App;
