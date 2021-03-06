import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions, Text } from 'react-native';
import utils from "../utils";

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
                <Text style={styles.title}>{title}</Text>
                <View style={styles.bottom}>
                    <View style={styles.image}>
                        <Text style={styles.holder}>{media}</Text>
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
    holder: {
        paddingHorizontal: 20,
        textAlign: 'center',
        color: utils.style.colours.white,
        fontSize: 16
    },
    image: {
        width: '60%',
        height: '75%',
        backgroundColor: 'red',
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
        color: utils.style.colours.grayDark,
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 25
    },
});

export default Slide