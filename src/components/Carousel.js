import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View, Dimensions, StyleSheet } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import PotSlide from './PotSlide';

import utils from "../utils";

const sliderWidth = Dimensions.get('window').width;

const deviceHeight = Dimensions.get('window').height;

const horizontalMargin = 10;

const slideWidth = sliderWidth - 100;

const itemWidth = slideWidth + horizontalMargin * 2;

const itemHeight = deviceHeight - 240;

class MyCarousel extends Component {

    static propTypes = {
        pots: PropTypes.array.isRequired,
        firstItem: PropTypes.number.isRequired,
        navigateTo: PropTypes.func.isRequired,
        setPotDetail: PropTypes.func.isRequired
    };

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <PotSlide data={item}
                    navigateTo={this.props.navigateTo}
                    setPotDetail={this.props.setPotDetail}
                    activeSlide={this.state.activeSlide}
                    index={index} />
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
        paddingHorizontal: 15,
        // backgroundColor: '#000000',
        justifyContent: 'flex-end'
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
        backgroundColor: utils.style.colours.purple
    }
});

export default MyCarousel