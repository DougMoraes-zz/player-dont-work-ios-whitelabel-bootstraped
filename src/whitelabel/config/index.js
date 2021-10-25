import {
    createBackstageUserDataClient,
    createBackstageEntitlementsClient,
    createBackstageThemeDataClient,
    createBackstageAppStructureDataClient,
    ContentDataClient,
    createBackstagePurchaseDataClient,
    createBackstageAnalyticsDataClient,
    getParamsFromRuntimeConfig,
    createBackstagePlayerDataClient,
    createBackstageAppSettingDataClient,
} from '@24i/nxg-integration-backstage';
import {
    defaultRuntimeConfig,
    ImageServiceClient,
    LayoutClient,
    createSottNavigationClient,
} from '@24i/nxg-sdk-smartott-defaults';
import initApp, { getMergedRuntimeConfig } from '@24i/nxg-sdk-smartott/src/Application/initApp';
import { EpgDataClient } from '@24i/nxg-sdk-smartott-stubs'; // Use for stub EPG data

// eslint-disable-next-line import/no-unresolved
import { AppVersion } from '@24i/nxg-core-utils/src/globalSingletons';
import { QueryClient } from 'react-query';
import runtimeJson from '../../../platformAssets/renative.runtime.json';
import { CUSTOM_SCREEN_BUILDERS } from './customScreens';
import { i18nOptions } from '../locale';
// eslint-disable-next-line import/extensions
import STATIC_LOGO from '../../../platformAssets/runtime/images/logo.png';

const creds = {}; // Use for stub EPG data

AppVersion.set(`${runtimeJson.appVersion}-${runtimeJson.timestamp}`);

initApp({ i18nOptions });

const runtimeConfig = getMergedRuntimeConfig(runtimeJson, defaultRuntimeConfig);
const staticSplashConfig = {
    background: null,
    logo: STATIC_LOGO,
};

const params = getParamsFromRuntimeConfig(runtimeConfig);

const appNavigationClient = createSottNavigationClient(CUSTOM_SCREEN_BUILDERS);
const userDataClient = createBackstageUserDataClient(params);
const themeDataClient = createBackstageThemeDataClient({
    ...params,
    defaultServiceThemeIndex: runtimeConfig.app.defaultServiceThemeIndex,
});
const appStructureDataClient = createBackstageAppStructureDataClient(params, {
    homePageSlug: 'home',
});
const contentDataClient = new ContentDataClient(params);
const purchaseDataClient = createBackstagePurchaseDataClient(params);
const appSettingsDataClient = createBackstageAppSettingDataClient(params);
const playerDataClient = createBackstagePlayerDataClient();
const analyticsDataClient = createBackstageAnalyticsDataClient(params);
const entitlementsClient = createBackstageEntitlementsClient({ contentDataClient });
const epgDataClient = new EpgDataClient({ credentials: creds });
const imageServiceClient = new ImageServiceClient({});
const layoutClient = new LayoutClient();
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const clients = {
    userDataClient,
    themeDataClient,
    appStructureDataClient,
    contentDataClient,
    purchaseDataClient,
    appSettingsDataClient,
    epgDataClient,
    entitlementsClient,
    imageServiceClient,
    layoutClient,
    playerDataClient,
    analyticsDataClient,
    appNavigationClient,
    queryClient,
};

export default {
    runtimeConfig,
    staticSplashConfig,
};
