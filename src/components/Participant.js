import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const Participant = (props) => {

    const { data } = props;

    const { avatar } = data.item;

    return (
        <View style={[ styles.container ]}>
            <Text style={styles.text}>{avatar}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: utils.style.colours.purple,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: utils.style.colours.white
    }
});

export default Participant