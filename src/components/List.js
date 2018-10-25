import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

class List extends Component {


    handlePress = () => {

    };

    render() {

        return (
            <View style={styles.list}>

                <View style={styles.header}>
                    <Text style={styles.title}>Saving Pots</Text>
                </View>

                <View style={styles.content}>
                    <TouchableOpacity style={styles.bigButton} onPress={this.handlePress}>
                        <Text>Create a new pot</Text>
                        <Icon
                            name="ios-add"
                            color="#ba55d3"
                            size={90}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1

    },
    header: {
        paddingVertical: 10
    },
    title: {
        fontSize: 20,
        color: '#444',
        textAlign: 'center',

    },
    content: {
        flex: 1,
        justifyContent: 'space-around'
    },
    bigButton: {
        width: '80%',
        height: '80%',
        backgroundColor: 'red',
        alignSelf: 'center'
    }
});

export default List