import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const Participant = () => {

    return (
        <View style={[ styles.container ]}>
            <Text style={styles.text}>AB</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: utils.colours.purple,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: utils.colours.white
    }
});

export default Participant