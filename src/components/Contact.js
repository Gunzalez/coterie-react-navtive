import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";

import utils from './../utils';

const Contact = (props) => {

    const { name, mobileId } = props.data.item;

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.cell]}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={[styles.cell]}>
                <Icon
                    name="radio-button-checked"
                    size={28}
                    color={utils.colours.purple} />
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

export default Contact