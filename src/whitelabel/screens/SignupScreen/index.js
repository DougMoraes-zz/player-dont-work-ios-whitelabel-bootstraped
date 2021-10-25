/* eslint-disable no-shadow */
/* eslint-disable max-statements */
import React, { useState } from 'react';
// DONT CHANGE IMPORT PATHS BELOW OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import SignupScreen from '@24i/nxg-sdk-smartott/src/screens/SignupScreen';
import { useRouter } from '@24i/nxg-core-router/src/NextRouter';
import { useUserData } from '@24i/nxg-sdk-smartott/src/context/UserData';
import { useAppNavigation } from '@24i/nxg-sdk-smartott/src/context/AppNavigation';
// DONT CHANGE IMPORT PATHS ABOVE OR NEXT WILL STOP BUILDING ROUTES CORRECTLY
import { useModal } from '@24i/nxg-sdk-gluons/src/context/Modal';
import { log } from '@24i/nxg-core-utils/src/logger';
import { Alert } from 'react-native';
import { isPlatformWeb } from 'renative';
import {
    SOTT_DEFAULT_ROOT_SCREENS,
    SOTT_DEFAULT_SCREENS,
} from '@24i/nxg-sdk-smartott/src/navigation/constants';
import {
    emailValidatorReg,
    nameValidatorReg,
    passwordValidatorReg,
} from '@24i/nxg-sdk-smartott/src/utils/regexConsts';

const OverridenSignupScreen = ({ navigation, ...props }) => {
    const router = useRouter();
    const userDataClient = useUserData();
    const [isLoading, setIsLoading] = useState(false);
    const { setModalChildren } = useModal();
    const { navigationConfig } = useAppNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailIncorrect, setIsEmailIncorrect] = useState(false);
    const [isFirstNameIncorrect, setIsFirstNameIncorrect] = useState(false);
    const [isLastNameIncorrect, setIsLastNameIncorrect] = useState(false);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [isSamePasswords, setIsSamePasswords] = useState(null);

    const onBack = () => (isPlatformWeb ? router.back() : navigation.goBack());

    const handleOnFirstNameTextChange = (input) => setFirstName(input);
    const handleOnLastNameTextChange = (input) => setLastName(input);
    const handleOnEmailTextChange = (input) => setEmail(input);
    const handleOnPasswordTextChange = (input) => setPassword(input);
    const handleOnConfirmPasswordTextChange = (input) => setConfirmPassword(input);

    // LEAVING THIS DEFAULT AS USD FOR NOW
    const currency = 'USD';

    const register = (firstName, lastName, username, password, currency) => {
        userDataClient
            .register({ firstName, lastName, username, password, currency })
            .then(() => {
                Alert.alert('Success', 'Account successfully created, please sign in!', [
                    {
                        text: 'ok',
                        onPress: () => {
                            if (isPlatformWeb) {
                                const { allNavigationItems } = navigationConfig;
                                const signinItem = allNavigationItems.find(
                                    (item) => item.name === SOTT_DEFAULT_SCREENS.SIGN_IN
                                );
                                const { Component } = signinItem;
                                return setModalChildren(<Component />);
                            }

                            return navigation.navigate(SOTT_DEFAULT_SCREENS.SIGN_IN);
                        },
                    },
                ]);
                setIsLoading(false);
            })
            .catch((err) => {
                log(err);
                if (err?.message) {
                    alert(err?.message);
                } else alert('Something went wrong... Try Again');
                setIsLoading(false);
            });
    };

    const resetIncorrections = () => {
        setIsFirstNameIncorrect(false);
        setIsLastNameIncorrect(false);
        setIsEmailIncorrect(false);
        setIsPasswordIncorrect(false);
        setIsSamePasswords(null);
    };

    const validateFields = ({ email, firstName, lastName, password, confirmPassword }) => {
        resetIncorrections();
        let correct = true;
        if (emailValidatorReg.test(email) === false) {
            correct = false;
            setIsEmailIncorrect(true);
        }
        if (nameValidatorReg.test(firstName) === false) {
            correct = false;
            setIsFirstNameIncorrect(true);
        }
        if (nameValidatorReg.test(lastName) === false) {
            correct = false;
            setIsLastNameIncorrect(true);
        }
        if (passwordValidatorReg.test(password) === false) {
            correct = false;
            setIsPasswordIncorrect(true);
        }

        if (password === confirmPassword) {
            setIsSamePasswords(true);
        } else {
            correct = false;
            setIsSamePasswords(false);
        }
        return correct;
    };

    const onSignupPress = ({ firstName, lastName, email, password, confirmPassword }) => {
        const isCorrect = validateFields({ email, firstName, lastName, password, confirmPassword });
        if (isCorrect) {
            setIsLoading(true);
            register(firstName, lastName, email, password, currency);
        }
    };

    const handleOnBrowsePress = () => {
        if (isPlatformWeb) return router.push('/');

        const { screens: stacks } = navigationConfig;
        const { screens: menuStackScreens } = stacks[0];

        navigation.navigate(SOTT_DEFAULT_ROOT_SCREENS.MENU_STACK_SCREEN, {
            screen: menuStackScreens[0].name,
        });
    };

    return (
        <SignupScreen.View
            onBack={onBack}
            navigation={navigation}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onFirstNameChange={handleOnFirstNameTextChange}
            onLastNameChange={handleOnLastNameTextChange}
            onEmailChange={handleOnEmailTextChange}
            onPasswordChange={handleOnPasswordTextChange}
            onConfirmPasswordChange={handleOnConfirmPasswordTextChange}
            onBrowsePress={handleOnBrowsePress}
            onSignUpPress={onSignupPress}
            isFirstNameIncorrect={isFirstNameIncorrect}
            isLastNameIncorrect={isLastNameIncorrect}
            isEmailIncorrect={isEmailIncorrect}
            isPasswordIncorrect={isPasswordIncorrect}
            isSamePasswords={isSamePasswords}
            isLoading={isLoading}
            {...props}
        />
    );
};

export default OverridenSignupScreen;
