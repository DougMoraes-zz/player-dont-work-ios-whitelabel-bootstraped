/* eslint-disable react/display-name */
// Disabling the display name because:
// React thinks that we are defining components
// But we are actually using render functions
import React from 'react';
import { SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS } from '@24i/nxg-sdk-smartott/src/navigation/navigationConfig/screenConfigBuilders';
import { OpenModalLink } from '@24i/nxg-sdk-smartott/src/navigation/components/TopBarMenu/components/OpenModalLink/index.web';
import {
    ScreenConfigBuilderResult,
    SottScreenConfigBuilders,
} from '@24i/nxg-sdk-smartott/src/navigation/navigationConfig/types';
import AccountScreen from '../screens/AccountScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EpgScreen from '../screens/EpgScreen';
import GenreScreen from '../screens/GenreScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

export const CUSTOM_SCREEN_BUILDERS: SottScreenConfigBuilders = {
    ...SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS,
    buildAccountScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildAccountScreen(
            menuItem,
            context
        );

        const RetypedAccountScreen = AccountScreen as React.FC<any>;

        // TODO: Fix typing
        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: RetypedAccountScreen,
            },
        };
    },
    buildSignInScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildSignInScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: SigninScreen,
            },
            renderWebLink: ({ menuItem: linkMenuItem }) => (
                <OpenModalLink
                    menuItem={linkMenuItem}
                    // TODO: Fix SigninScreen typing
                    ModalComponent={SigninScreen as React.ComponentType<any>}
                />
            ),
        };
    },
    buildSignUpScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildSignUpScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: SignupScreen,
            },
        };
    },
    buildDetailsScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildDetailsScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: DetailsScreen,
            },
        };
    },
    buildGenreScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildGenreScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: GenreScreen,
            },
        };
    },
    buildSettingsScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildSettingsScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: SettingsScreen,
            },
        };
    },
    buildEpgScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildEpgScreen(menuItem, context);

        return {
            ...originalBuild,
            nativeRenderOptions: {
                // @ts-expect-error TODO: Type screen
                Component: EpgScreen,
            },
        };
    },
    buildSearchScreen: (menuItem, context): ScreenConfigBuilderResult => {
        const originalBuild = SOTT_DEFAULT_SCREEN_CONFIG_BUILDERS.buildSearchScreen(
            menuItem,
            context
        );

        return {
            ...originalBuild,
            nativeRenderOptions: {
                Component: SearchScreen,
            },
        };
    },
};
