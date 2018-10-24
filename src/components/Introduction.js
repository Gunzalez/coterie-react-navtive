import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const height = width * 1.4;

import Slide from './Slide';

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
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}>
                    {instructions.map((item, i) => (
                        <Slide item={item} key={i} />
                    ))}
                </ScrollView>
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

    },
    skip: {
        backgroundColor: 'red'

    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        color: '#147efb'

    }
});

export default Introduction