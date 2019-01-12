import React from 'react';

import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import IconII from "react-native-vector-icons/Ionicons";

import IconIII from "react-native-vector-icons/MaterialCommunityIcons";

import utils from './../utils';

const LandingRow = (props) => {

    const { data, participantClicked } = props;

    const { familyName, givenName, spName, isNextParticipantToCollect, isReadyToCollect, hasParticipantPaid, canPayAndCollect, status } = data.item;

    let type = isNextParticipantToCollect ? 'collection' : 'payment';

    let strapLine = '';
    let disabled = true;
    if(type === 'collection'){
        strapLine = "Collects when all have paid";
        if(isReadyToCollect){
            strapLine = "This participant can collect";
            disabled = false;
        }
    } else {
        strapLine = "Yet to pay";
        disabled = false;
        if(hasParticipantPaid){
            strapLine = "Payment taken"
        }
    }

    if(!canPayAndCollect){
        disabled = true;
    }

    if(status === "completed"){
        strapLine = 'This participant has collected';
        type = 'collection'
    }

    return (
        <View style={[ styles.container ]}>

            <TouchableWithoutFeedback
                disabled={disabled}
                onPress={()=>{participantClicked(data)}}>

                <View style={styles.row}>

                    <View style={[styles.icon]}>

                        { type === 'collection' ?

                            <IconII
                                name={'md-hammer'}
                                size={32}
                                color={ status === "completed" ? utils.style.colours.purple : utils.style.colours.gray }
                            />

                            :

                            <IconIII
                                name={'coin'}
                                size={32}
                                color={ hasParticipantPaid ? utils.style.colours.purple : utils.style.colours.gray }
                            />

                        }

                    </View>

                    <View style={[styles.copy]}>
                        <Text style={[styles.name]}>{spName}</Text>
                        <Text style={[styles.text]}>{strapLine}</Text>
                    </View>

                    <View style={[styles.button]}>
                        <Icon
                            name={'right'}
                            size={24}
                            color={ disabled ? utils.style.colours.gray : utils.style.colours.purple } />
                    </View>

                </View>

            </TouchableWithoutFeedback>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
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