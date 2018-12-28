import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import IconII from "react-native-vector-icons/Entypo";

import IconIII from "react-native-vector-icons/MaterialCommunityIcons";

import utils from './../utils';

const LandingRow = (props) => {

    const { data, participantClicked } = props;

    const { familyName, givenName, isNextParticipantToCollect, isReadyToCollect, hasParticipantPaid, canPayAndCollect } = data.item;
    const type = isNextParticipantToCollect ? 'collection' : 'payment';

    let strapLine = '';
    let disabled = true;
    if(type === 'collection'){
        strapLine = "Can collect when all have paid";
        if(isReadyToCollect){
            strapLine = "Ready to collect";
            disabled = false;
        }
    } else {
        strapLine = "This person has not paid";
        disabled = false;
        if(hasParticipantPaid){
            strapLine = "Payment taken"
        }
    }

    if(!canPayAndCollect){
        disabled = true;
    }

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.icon]}>

                {( type === 'collection') ?

                    <IconII
                        name={'shopping-basket'}
                        size={32}
                        color={ utils.style.colours.gray }
                    />

                    :

                    <IconIII
                        name={'cash-usd'}
                        size={32}
                        color={ hasParticipantPaid ? utils.style.colours.purple : utils.style.colours.gray }
                    />

                }

            </View>
            <View style={[styles.copy]}>
                <Text style={[styles.name]}>{givenName} {familyName}</Text>
                <Text style={[styles.text]}>{strapLine}</Text>
            </View>
            <View style={[styles.button]}>
                <TouchableOpacity
                    disabled={disabled}
                    onPress={()=>{participantClicked(data)}}>
                    <Icon
                        name={'right'}
                        size={24}
                        color={ disabled ? utils.style.colours.gray : utils.style.colours.purple }
                    />
                </TouchableOpacity>
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
    },
    ready: {
        color: utils.style.colours.purple
    }
});

export default LandingRow