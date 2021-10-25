import React from 'react';
import { View, Text } from '@24i/nxg-sdk-quarks';
import EpgScreen from '@24i/nxg-sdk-smartott/src/screens/EpgScreen';
import { withTranslation } from 'react-i18next';

class OverridenEpgScreen extends React.Component {
    fetchOffset = 0;

    render() {
        const { t } = this.props;
        return (
            <EpgScreen.Main
                portraitCurrentTimeLabelText={t('date.now').toUpperCase()}
                datePickerRange={[-2, 3]}
                datePickerText={(dayText) =>
                    dayText instanceof Array
                        ? `${t(`date.${dayText[0]}`)}, ${t(`date.${dayText[1]}`).substr(0, 3)} ${
                              dayText[2]
                          }`
                        : t(`date.${dayText}`)
                }
                portraitChannelTabFooter={() => (
                    <View
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                opacity: 0.3,
                                fontWeight: 'bold',
                                lineHeight: 20,
                                fontSize: 15,
                            }}
                        >
                            {t('date.endOfDay')}
                        </Text>
                    </View>
                )}
                {...this.props}
            />
        );
    }
}

export default withTranslation(['sott'])(OverridenEpgScreen);
