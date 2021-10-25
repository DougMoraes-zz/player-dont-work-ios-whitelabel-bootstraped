/* eslint-disable max-statements */
/* eslint-disable react/display-name  */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import SettingsScreen from '@24i/nxg-sdk-smartott/src/screens/SettingsScreen';
import AccountDetails from '@24i/nxg-sdk-smartott/src/components/Account/AccountDetails';
import AccountParentalControls from '@24i/nxg-sdk-smartott/src/components/Account/AccountParentalControls';
import AccountSubscription from '@24i/nxg-sdk-smartott/src/components/Account/AccountSubscription';
import AccountAddSubscription from '@24i/nxg-sdk-smartott/src/components/Account/AccountAddSubscription';
import SettingsButton from '@24i/nxg-sdk-smartott/src/components/Buttons/SettingsButton';
import SignOut from '@24i/nxg-sdk-smartott/src/components/SignOut';
import { useUserData } from '@24i/nxg-sdk-smartott/src/context/UserData';
import { usePurchaseData } from '@24i/nxg-sdk-smartott/src/context/PurchaseData';
import { useStore } from '@24i/nxg-sdk-smartott/src/context/ApplicationStore';
import { useAppNavigation } from '@24i/nxg-sdk-smartott/src/context/AppNavigation';
// DONT CHANGE IMPORT PATHS ABOVE OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import { useRouter } from '@24i/nxg-core-router/src/NextRouter';
import { useModal } from '@24i/nxg-sdk-gluons/src/context/Modal';
import Modal from '@24i/nxg-sdk-gluons/src/components/containers/Modal';
import Loader from '@24i/nxg-sdk-gluons/src/components/ui/Loader';
import { usePrevious } from '@24i/nxg-sdk-gluons';
import { useDimensions } from '@24i/nxg-sdk-quantum';
import { log } from '@24i/nxg-core-utils/src/logger';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@24i/nxg-sdk-higgs';
import { isFactorMobile, isFactorTv, isPlatformWeb } from 'renative';
import { SOTT_DEFAULT_WEB_SCREENS } from '@24i/nxg-sdk-smartott/src/navigation/constants';
import CommonActions from '@24i/nxg-core-router/src/util/CommonActions';
import SignInScreen from '../SigninScreen';

const AccountScreen = ({ styles: getStyles, navigation, ...props }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPlan, setCurrentPlan] = useState(-1);
    const userDataClient = useUserData();
    const { userData, setUserData, setSelectedUserProfile } = useStore();
    const { setModalChildren, closeModal, setModalProps } = useModal();
    const prevUserData = usePrevious(userData);
    const purchaseDataClient = usePurchaseData();
    const { t } = useTranslation(['sott']);
    const router = useRouter();
    const { isLandscape } = useDimensions();
    const { navigationConfig } = useAppNavigation();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const openModalComponent = () => setIsModalVisible(true);

    const closeModalComponent = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (isPlatformWeb && !userData) {
            setModalProps({
                onModalClose: () => {
                    closeModal();
                    setModalProps({});
                },
            });
            setModalChildren(<SignInScreen onSigninSuccess={() => closeModal()} />);
        }
    }, []);

    const getEntitledSubscriptions = async (plans) => {
        try {
            const data = await purchaseDataClient.fetchEntitledSubscriptions();
            if (data?.subscriptions) {
                setCurrentPlan(plans.findIndex((el) => el.id === data.subscriptions[0]?.id));
            }
            setIsLoading(false);
        } catch (err) {
            // eslint-disable-next-line no-alert
            alert(err.message);
        }
    };

    const getAvailableSubscriptions = async () => {
        try {
            const data = await purchaseDataClient.fetchAvailableSubscriptions();
            setSubscriptions(data.subscriptions);
            await getEntitledSubscriptions(data.subscriptions);
        } catch (err) {
            // eslint-disable-next-line no-alert
            alert(err.message);
        }
    };

    useEffect(() => {
        if (!prevUserData && userData) {
            getAvailableSubscriptions();
        }
    }, [userData]);

    const signOutOnPressHandler = async () => {
        try {
            if (isPlatformWeb) {
                await userDataClient.logout();
                setUserData(null);
                setSelectedUserProfile(null);
                closeModal();
            } else {
                await userDataClient.logout();
                setIsModalVisible(false);
                /**
                 * Due to the actual implementation for navigation (single native stack on TVs, but 2 stacks for
                 * each page on Mobiles) poToTop does not suffice.
                 */
                if (isFactorTv) {
                    navigation.popToTop();
                } else {
                    const { screens: stacks } = navigationConfig;
                    const { screens: menuStackScreens } = stacks[0];
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: menuStackScreens[0].name }],
                        })
                    );
                }
                setUserData(null);
                setSelectedUserProfile(null);
            }
        } catch (error) {
            log(error);
            alert(error?.message || 'Something went wrong...');
        }
    };

    // ---------------------------------------Account Details stuff---------------------------------------

    const handleNameChange = (input, closeAccountDetailsModal) => {
        userDataClient
            .updateUser({ firstName: input, lastName: userData?.lastName })
            .then((response) => {
                if (response?.length !== 0) {
                    const message = response?.firstName || response?.message;
                    alert(message);
                } else {
                    alert(`Profile was successfully updated!`);
                    closeAccountDetailsModal();
                    router.back();
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleLastNameChange = (input, closeAccountDetailsModal) => {
        userDataClient
            .updateUser({ firstName: userData?.firstName, lastName: input })
            .then((response) => {
                if (response?.length !== 0) {
                    const message = response?.lastName || response?.message;
                    alert(message);
                } else {
                    alert(`Profile was successfully updated!`);
                    closeAccountDetailsModal();
                    router.back();
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleEmailChange = (input, closeAccountDetailsModal) => {
        userDataClient
            .updateUserEmail(input)
            .then((response) => {
                if (response?.length !== 0) {
                    const message = response?.email || response?.message;
                    alert(message);
                } else {
                    alert(`Profile was successfully updated!`);
                    closeAccountDetailsModal();
                    router.back();
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const accountDetails = [
        {
            title: t('signup.firstName').toLowerCase(),
            data: userData?.firstName,
            confirmationHandler: handleNameChange,
        },
        {
            title: t('signup.lastName').toLowerCase(),
            data: userData?.lastName,
            confirmationHandler: handleLastNameChange,
        },
        {
            title: t('myAccount.email').toLowerCase(),
            data: userData?.email,
            confirmationHandler: handleEmailChange,
        },
    ];

    // ----------------------------------------------------------------------------------------------

    if (isLoading && !isPlatformWeb && !isFactorTv) {
        return <Loader color={theme.color.textPrimary} size="large" hasTVPreferredFocus />;
    }

    const getOptions = (setOpenedDetail) => ({
        0: {
            title: t('subscription.addSubscription'),
            disabled: true,
            linkProps: SOTT_DEFAULT_WEB_SCREENS.Account.getLink({ subScreen: 'addsubscription' }),
            // eslint-disable-next-line react/prop-types
            renderDetail: ({ selectedOption: { title }, ...detailProps }) => (
                <AccountAddSubscription
                    {...detailProps}
                    title={title}
                    setOpenedDetail={setOpenedDetail}
                    currentPlan={currentPlan}
                    plans={subscriptions}
                    isLoading={isLoading}
                />
            ),
        },
        1: {
            title: t('settings.myAccount'),
            iconFont: theme.icons.account.user.iconFont,
            iconName: theme.icons.account.user.iconName,
            linkProps: SOTT_DEFAULT_WEB_SCREENS.Account.getLink({ subScreen: 'account' }),
            renderDetail: () => (
                <AccountDetails
                    accountDetails={accountDetails}
                    buttonText={t('myAccount.change')}
                />
            ),
        },
        2: {
            title: t('contentSettings.parentalControls'),
            iconFont: theme.icons.account.parentalControl.iconFont,
            iconName: theme.icons.account.parentalControl.iconName,
            linkProps: SOTT_DEFAULT_WEB_SCREENS.Account.getLink({ subScreen: 'parentalcontrols' }),
            renderDetail: () => <AccountParentalControls />,
        },
        3: {
            title: t('myAccount.subscription'),
            subtitle:
                currentPlan >= 0 ? subscriptions[currentPlan].name : t('subscription.noActive'),
            ...(isPlatformWeb && {
                iconFont: theme.icons.account.subscriptions.iconFont,
                iconName: theme.icons.account.subscriptions.iconName,
            }),
            linkProps: SOTT_DEFAULT_WEB_SCREENS.Account.getLink({ subScreen: 'subscription' }),
            // eslint-disable-next-line react/prop-types
            renderDetail: ({ selectedOption: { title }, ...detailProps }) => (
                <AccountSubscription
                    {...detailProps}
                    navigation={navigation}
                    isLoading={isLoading}
                    plans={subscriptions}
                    currentPlan={currentPlan}
                    title={title}
                    setOpenedDetail={setOpenedDetail}
                />
            ),
        },
        4: {
            iconFont: theme.icons.menu.navbarFont,
            iconName: theme.icons.menu.iconsMap.signout?.name || theme.icons.menu.iconsMap.signout,
            onPress: isPlatformWeb
                ? () =>
                      setModalChildren(
                          <SignOut
                              username={userData?.email}
                              onConfirm={signOutOnPressHandler}
                              onClose={closeModal}
                          />
                      )
                : openModalComponent,
            title: t('settings.signOut'),
        },
    });

    // eslint-disable-next-line react/prop-types
    const optionButton = ({ onPress, title, isActive, index, options: defaultOptions }) => (
        <SettingsButton
            onPress={
                defaultOptions[index]?.renderDetail || defaultOptions[index]?.onPress
                    ? defaultOptions[index]?.onPress || onPress
                    : null
            }
            title={title}
            subtitle={isFactorMobile ? defaultOptions[index]?.subtitle : null}
            icon={
                isLandscape || defaultOptions[index]?.hideIcon
                    ? {}
                    : theme.icons.settings.chevronRight
            }
            iconSize={17}
            isOptionSelected={isActive && isLandscape}
            disabled={defaultOptions[index]?.disabled}
            additionalContainerStyles={[
                isLandscape && styles.settingsButtonContainerLandscape,
                // Temporary style fix, settings/account screens will be re-implemented
                // according to the new designs anyway
                { marginVertical: 4 },
            ]}
            hasTVPreferredFocus={index === 0}
        />
    );

    const filterOptions = (defaultOptions) =>
        defaultOptions.filter((defaultOption) =>
            isPlatformWeb
                ? defaultOption.id >= 0
                : defaultOption.id > 2 && (isFactorTv ? defaultOption.id !== 3 : true)
        );

    return isPlatformWeb ? (
        (userData && (
            <SettingsScreen.Main
                additionalOptions={getOptions}
                filterOptions={filterOptions}
                customButton={optionButton}
                {...props}
            />
        )) ||
            null
    ) : (
        <>
            <SettingsScreen.Main
                additionalOptions={getOptions}
                filterOptions={filterOptions}
                customButton={isFactorTv ? undefined : optionButton}
                navigation={navigation}
                {...props}
            />
            <Modal visible={isModalVisible} onModalClose={closeModalComponent}>
                <SignOut
                    username={userData?.email}
                    onConfirm={signOutOnPressHandler}
                    onClose={closeModalComponent}
                />
            </Modal>
        </>
    );
};

AccountScreen.propTypes = {
    styles: PropTypes.func,
    navigation: PropTypes.shape({}),
};

AccountScreen.defaultProps = {
    styles: SettingsScreen.getDefaultStyles,
    navigation: PropTypes.oneOfType([PropTypes.object]),
};

export default AccountScreen;
