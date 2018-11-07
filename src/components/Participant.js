import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const Participant = (props) => {

    const { data } = props;

    const { avatar, placeHolder } = data.item;

    return (
        <View style={[ styles.container, placeHolder ? styles.placeHolder : null ]}>

            { placeHolder ?

                <Icon
                    name={'user'}
                    size={24}
                    color={utils.style.colours.grayText}/>
                :

                <Text style={[styles.text]}>{avatar}</Text>
            }

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
    placeHolder: {
        backgroundColor: utils.style.colours.white,
        borderWidth: 1,
        borderColor: utils.style.colours.grayText,
        borderStyle: 'dashed'
    },
    text: {
        fontSize: 20,
        color: utils.style.colours.white
    }
});

export default Participant