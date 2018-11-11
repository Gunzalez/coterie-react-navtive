import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const Participant = (props) => {

    const { data } = props;

    const { familyName, givenName = 'Participant', placeHolder, highlight } = data.item;

    const createAvatar = (a, b) =>{
        let avatar = a.charAt(0).toUpperCase();
        if(b.trim()){
            avatar = avatar + b.charAt(0).toUpperCase()
        }
        if(avatar.trim().length){
            return avatar;
        } else {
            return "PP"
        }
    };

    return (
        <View style={[ styles.container]}>

            <View style={[ styles.circle, placeHolder ? styles.placeHolder : null, highlight ? styles.highlight : null ]}>

            { placeHolder ?

                <Icon
                    name={'user'}
                    size={24}
                    color={utils.style.colours.grayText}/>
                :

                <Text style={[styles.text]}>{ createAvatar(familyName, givenName) }</Text>
            }

            </View>

            <Text style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>{familyName} {givenName}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        marginHorizontal: 4
    },
    circle: {
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
    highlight: {
        backgroundColor: 'red'
    },
    text: {
        fontSize: 20,
        color: utils.style.colours.white
    },
    name: {
        paddingTop: 5,
        width: '100%',
        textAlign: 'center',
        color: utils.style.colours.grayText
    }
});

export default Participant