import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import MyCarousel from './Carousel';

class List extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        updatePotId: PropTypes.func.isRequired,
        potId: PropTypes.string.isRequired
    };

    state = {
        pots: [
            {
                status: 2,
                title: 'Daddy\'s Slippers',
                participants: 4,
                round: 2,
                amount: 80,
                current: 2,
                next: 'Steven',
                potId: '9901-OA-44'
            },
            {
                status: 0
            }
        ]
    };

    handlePress = () => {

    };

    getFirstItem = () => {
        let index = this.state.pots.length - 1;
        for (let i = 0; i < this.state.pots.length; i++) {
            if (this.state.pots[i].potId === this.props.potId) {
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
                    updatePotId={this.props.updatePotId} />
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