import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

import Slide from './Slide';

import utils from './../utils';

import data from './../data/instructions';

const instructions = data.instructions;

const { width } = Dimensions.get('window');

console.log('Introduction');

class Introduction extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        pots: PropTypes.array.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            index: 0,
            disabled: true
        };
    }

    componentDidMount(){
        if(this.props.pots.length > 0){
            this.setState({
                disabled: false
            })
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.pots.length > 0){
            this.setState({
                disabled: false
            })
        }
    }

    scrollX = new Animated.Value(0);

    handlePress = () => {
        this.props.navigateTo('list');
    };

    handleEndScroll = evt => {
        if(this.state.disabled){
            if(evt.nativeEvent.contentSize.width === (evt.nativeEvent['targetContentOffset'].x + width)){
                this.setState({
                    disabled: false
                });
            }
        }
    };

    render() {
        let position = Animated.divide(this.scrollX, width);

        return (
            <View style={styles.container}>

                <View style={styles.scrollView}>

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
                            <Text style={styles.text}>SKIP</Text>
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
        backgroundColor: utils.style.colours.background
    },
    scrollView: {
        flex: 1,
        marginBottom: 20
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dots: {
        flexDirection: 'row',
    },
    dot: {
        marginHorizontal: 5,
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: utils.style.colours.purple
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
        marginVertical: 50,
        backgroundColor: utils.style.colours.purple,
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