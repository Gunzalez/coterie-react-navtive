import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import MyCarousel from './Carousel';
import utils from "../utils";

class List extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        updatePotDetail: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        pots: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        const allPots = this.props.pots;
        if( allPots.length === 0 || allPots[(allPots.length - 1)].status !== "new" ){
            allPots.push({
                status: "new",
                id: -1
            });
        }

        this.state = {
            pots: allPots
        };
    }

    getFirstItem = () => {
        if(this.props.potDetail.id){
            for (let i = 0; i < this.state.pots.length; i++) {
                if (this.state.pots[i].id === this.props.potDetail.id) {
                    return i
                }
            }
        }
        return 0
    };

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Saving Pots</Text>
                    <Text style={styles.text}>3 pots, 3 running</Text>
                    <Text style={styles.text}>Last viewed: 18.10.2018</Text>
                </View>

                <MyCarousel
                    pots={this.state.pots}
                    firstItem={ this.getFirstItem() }
                    navigateTo={ this.props.navigateTo }
                    updatePotDetail={ this.props.updatePotDetail } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 120
    },
    text: {
        textAlign: 'center',
        fontSize: 16
    },
    title: {
        fontSize: 20,
        color: '#444',
        textAlign: 'center',
        paddingBottom: 10
    }
});

export default List