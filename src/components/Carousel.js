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
        pots: PropTypes.array.isRequired,
        firstItem: PropTypes.number.isRequired,
        navigateTo: PropTypes.func.isRequired,
        updatePotId: PropTypes.func.isRequired
    };

    _renderItem ({item, _}) {
        return (
            <View style={styles.slide}>
                <PotSlide data={item} navigateTo={this.props.navigateTo} updatePotId={this.props.updatePotId} />
            </View>
        );
    }

    state = {
        pots: this.props.pots,
        activeSlide: this.props.firstItem
    };

    get pagination () {
        const { pots, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={pots.length}
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
                    data={this.state.pots}
                    renderItem={this._renderItem.bind(this)}
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