import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import MyCarousel from './Carousel';

import Icon from "react-native-vector-icons/Ionicons";

class List extends Component {

    state = {
        pots: [
            {
                status: 2,
                title: 'Daddy\'s Slippers',
                participants: 4,
                round: 2,
                amount: 80,
                current: 2,
                next: 'Steven',
                id: '9901-OA-44'
            },
            {
                status: 0
            }
        ]
    };

    handlePress = () => {

    };

    render() {

        return (
            <View style={styles.list}>

                <View style={styles.header}>
                    <Text style={styles.title}>Saving Pots</Text>
                </View>

                <MyCarousel pots={this.state.pots} />

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