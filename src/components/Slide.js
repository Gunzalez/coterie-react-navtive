import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const height = width * 1.6;

class Carousel extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {

        const { title, media } = this.props.item;

        return (
            <View style={styles.slide}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text  style={styles.image}>Image ref: {media}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        width,
        height,
        paddingTop: 20
    },
    image: {
        height: 200,
        justifyContent: 'space-around',
        alignContent: 'center',
        color: 'red',
        textAlign: 'center'
    },
    title: {
        fontSize: 22,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 30
    },
});

export default Carousel