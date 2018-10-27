import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import MyCarousel from './Carousel';

class List extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        updatePotDetail: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        pots: PropTypes.array.isRequired
    };

    state = {
        pots: this.props.pots
    };

    getFirstItem = () => {
        let index = this.state.pots.length - 1;
        for (let i = 0; i < this.state.pots.length; i++) {
            if (this.state.pots[i].potId === this.props.potDetail.potId) {
                index = i
            }
        }
        return index
    };

    render() {

        return (
            <View style={styles.list}>

                <View style={styles.header}>
                    <Text style={styles.title}>Saving Pots</Text>
                </View>

                <MyCarousel
                    pots={this.state.pots}
                    firstItem={ this.getFirstItem() }
                    navigateTo={ this.props.navigateTo }
                    updatePotDetail={this.props.updatePotDetail} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1

    },
    header: {
        paddingVertical: 10
    },
    title: {
        fontSize: 20,
        color: '#444',
        textAlign: 'center',

    },
    content: {
        flex: 1,
        justifyContent: 'space-around'
    },
    bigButton: {
        width: '80%',
        height: '80%',
        backgroundColor: 'red',
        alignSelf: 'center'
    }
});

export default List