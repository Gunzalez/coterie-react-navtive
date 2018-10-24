import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const height = width * 1.4;

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
        paddingTop: 30,
        backgroundColor: '#000'
    },
    image: {
        height: 200,
        justifyContent: 'space-around',
        alignContent: 'center',
        color: '#fff',
        textAlign: 'center'
    },
    title: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 30
    },
});

export default Carousel