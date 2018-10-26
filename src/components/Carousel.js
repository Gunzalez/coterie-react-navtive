import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View, Text, Dimensions, StyleSheet } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import PotSlide from './PotSlide';

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

    render () {
        return (
            <Carousel
                layout={'default'}
                data={this.props.pots}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={slideWidth}
            />
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
    }
});

export default MyCarousel