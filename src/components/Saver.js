import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

import FontIcon from "react-native-vector-icons/FontAwesome";

import utils from './../utils';

const Saver = (props) => {

    const { data, active } = props;

    const { familyName, givenName } = data;

    return (
        <View style={[ styles.container ]}>
            <View style={[styles.cell]}>
                <Text style={[styles.text, active ? styles.active : '']}>{givenName} {familyName}</Text>
            </View>
            <View style={[styles.cell]}>

                {( active ) ?

                    <FontIcon
                        name={ 'sort' }
                        size={28}
                        color={ utils.style.colours.purple  }
                    />

                    :

                    <Icon
                        name={ 'ios-reorder' }
                        size={28}
                        color={ utils.style.colours.grayLight }
                    />
                }

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
        borderColor: utils.style.colours.grayLight
    },
    active: {
        color: utils.style.colours.purple
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

export default Saver