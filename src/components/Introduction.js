import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

import Slide from './Slide';

import utils from './../utils';

// import { instructions } from './../data/instructions';

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
    },
    {
        "title": "Re-arrange the schedule to suit your needs",
        "media": "http://www.image-4"
    },
    {
        "title": "Clone or restart a plan once it has matured",
        "media": "http://www.image-5"
    }
];

const { width } = Dimensions.get('window');

class Introduction extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        disabled: false
    };

    scrollX = new Animated.Value(0);

    handlePress = () => {
        this.props.navigateTo('list');
    };

    handleEndScroll = evt => {
        if(this.state.disabled){
            this.setState({
                disabled: evt.nativeEvent.contentSize.width !== (evt.nativeEvent['targetContentOffset'].x + width)
            })
        }
    };

    render() {
        let position = Animated.divide(this.scrollX, width);

        return (
            <View style={styles.container}>

                <View style={styles.carousel}>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                            [{ nativeEvent: { contentOffset: { x: this.scrollX } } } ] // ... is an object that maps any nativeEvent prop to a variable
                        )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
                        scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
                        onScrollEndDrag={ this.handleEndScroll }>
                        {instructions.map((item, i) => (
                            <Slide item={item} key={i} />
                        ))}
                    </ScrollView>

                </View>

                <View style={styles.content}>
                    <View style={styles.top}>
                        <View style={styles.dots}>
                            {instructions.map((_, i) => {
                                let opacity = position.interpolate({
                                    inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                                    outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                                    // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                                    // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                                    extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                                });
                                return (
                                    <Animated.View style={[ { opacity }, styles.dot ]} key={i} />
                                )
                            })}
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <TouchableOpacity style={[ {opacity : this.state.disabled ? 0.3 : 1}, styles.button ]}
                                  disabled={this.state.disabled}
                                  onPress={this.handlePress}>
                            <Text style={styles.text}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>

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
        flex: 3
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dots: {
        flexDirection: 'row'
    },
    dot: {
        marginHorizontal: 5,
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: utils.colours.purple
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        marginBottom: 60,
        backgroundColor: utils.colours.purple,
        width: '60%',
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 8
    },
    text: {
        color: '#ffffff',
        fontSize: 16
    }
});

export default Introduction