import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const height = width * 1.4;

class Slide extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {

        const { title, media } = this.props.item;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.image}>
                        <Text>{media}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        paddingTop: 20
    },
    image: {
        width: '65%',
        height: '85%',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 30
    },
});

export default Slide