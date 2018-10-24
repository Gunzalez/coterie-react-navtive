import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ScrollView } from 'react-native';

import Slide from './Slide';

class Carousel extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired
    };

    render() {

        return (
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {this.props.list.map((item, i) => (
                    <Slide item={item} key={i} />
                ))}
            </ScrollView>
        );
    }
}

export default Carousel