import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Carousel from './Carousel';

const { width } = Dimensions.get('window');

const height = width * 1.4;

const instructions = [
    {
        "title": "Give your Saving Pot a name. Select a saving amount",
        "media": "http://www.image-1"
    },
    {
        "title": "Select participants from your contact list.",
        "media": "http://www.image-2"
    },
    {
        "title": "Your plan starts when the first participant pays.",
        "media": "http://www.image-3"
    }
];

class Introduction extends Component {

    static propTypes = {
        skipLink: PropTypes.func.isRequired
    };

    state = {
        index: 0
    };

    handlePress = () => {
        this.props.skipLink('list');
    };

    render() {
        return (
            <View style={styles.container}>
                <Carousel style={styles.carousel} list={instructions} />
                <View style={styles.skip}>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Text style={styles.button}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    carousel: {
        width,
        height: 400
    },
    skip: {
        height: 40,
        justifyContent: 'space-around',
        alignContent: 'center',
        backgroundColor: 'red'

    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        color: '#5fc9f8'

    }
});

export default Introduction