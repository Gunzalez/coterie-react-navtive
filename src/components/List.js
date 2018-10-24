import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

class List extends Component {

    render() {

        return (
            <View style={styles.list}>
                <Text style={styles.title}>List</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {

    },
    title: {
        fontSize: 20,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 30
    },
});

export default List