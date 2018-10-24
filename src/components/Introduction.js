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

                <View style={styles.carousel}>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}>
                        {instructions.map((item, i) => (
                            <Slide item={item} key={i} />
                        ))}
                    </ScrollView>

                </View>



                <View style={styles.content}>

                    <View style={styles.dots}>
                        <Text>...</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handlePress}>
                        <Text style={styles.text}>SKIP</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carousel: {
        flex: 5
    },
    content: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        color: '#147efb',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        paddingBottom: 60
    }
});

export default Introduction