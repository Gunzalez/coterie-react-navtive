import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const LandingRow = (props) => {

    const { data, participantClicked } = props;

    const { familyName, givenName } = data.item;

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.cell]}>
                <Text style={styles.text}>{familyName} {givenName}</Text>
            </View>
            <View style={[styles.cell]}>
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
        borderColor: '#eaeaea'
    },
    cell: {
        height: 42,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: '#444'
    }
});

export default LandingRow