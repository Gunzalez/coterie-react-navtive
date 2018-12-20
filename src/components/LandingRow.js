import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import IconII from "react-native-vector-icons/Entypo";

import IconIII from "react-native-vector-icons/MaterialCommunityIcons";

import utils from './../utils';

const LandingRow = (props) => {

    const { data, participantClicked } = props;

    const { familyName, givenName, transactionType = 'collection' } = data.item;

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.icon]}>

                {( transactionType === 'collection') ?

                    <IconII
                        name={'shopping-basket'}
                        size={32}
                        color={utils.style.colours.gray}
                    />

                    :

                    <IconIII
                        name={'cash-usd'}
                        size={32}
                        color={utils.style.colours.gray}
                    />

                }

            </View>
            <View style={[styles.copy]}>
                <Text style={styles.name}>{givenName} {familyName}</Text>
                <Text style={styles.text}>Collection due</Text>
            </View>
            <View style={[styles.button]}>
                <Icon
                    name={'right'}
                    size={24}
                    color={utils.style.colours.purple}
                    onPress={()=>{participantClicked(data)}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        paddingVertical: 10
    },
    icon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    copy: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    name: {
        fontSize: 16,
        color: utils.style.colours.grayDark,
        paddingBottom: 1
    },
    text: {
        color: utils.style.colours.grayText,
        lineHeight: 14,
        fontSize: 14
    }
});

export default LandingRow