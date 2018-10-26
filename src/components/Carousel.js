import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View, Text, Dimensions, StyleSheet } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import PotSlide from './PotSlide';
import utils from "../utils";

const horizontalMargin = 0;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

class MyCarousel extends Component {

    static propTypes = {
        pots: PropTypes.array.isRequired
    };

    _renderItem ({item, _}) {
        return (
            <View style={styles.slide}>
                <PotSlide data={item}/>
            </View>
        );
    }

    state = {
        entries: this.props.pots,
        activeSlide: 1
    };

    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.pagination}
                dotStyle={styles.dot}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.9}
            />
        );
    }

    render () {
        return (
            <View>
                <Carousel
                    layout={'default'}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={slideWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    firstItem={this.state.activeSlide}
                />
                { this.pagination }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
    },
    pagination: {

    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: utils.colours.purple
    }
});

export default MyCarousel