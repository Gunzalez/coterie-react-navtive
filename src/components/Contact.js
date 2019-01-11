import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";

import utils from './../utils';

const Contact = (props) => {

    const { data, contactClicked } = props;

    const { spFirstName, spLastName, checked } = data.item;

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.cell]}>
                <Text style={styles.text}>{spFirstName} {spLastName}</Text>
            </View>
            <View style={[styles.cell]}>
                <Icon
                    name={ checked ? 'radio-button-checked' : 'radio-button-unchecked' }
                    size={28}
                    color={utils.style.colours.purple}
                    onPress={()=>{contactClicked(data.index)}}
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

export default Contact