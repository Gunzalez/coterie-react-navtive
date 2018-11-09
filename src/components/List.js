import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/Feather";

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
                id: -1,
                savingsAmount: 50
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

    goToIntroduction = () => {
        this.props.navigateTo('intro')
    };

    render() {

        const { pots } = this.state;
        let potsSaved = 0;
        let inProgress = 0;
        let completed = 0;
        pots.forEach(pot => {
            if(pot.status === "created"){
                potsSaved++
            }
            if(pot.status === "in-progress"){
                inProgress++
            }
            if(pot.status === "completed"){
                completed++
            }
        });

        return (
            <View style={styles.container}>

                <View style={styles.top}>

                    <View style={styles.header}>
                        <Text style={styles.title}>{pots.length - 1} Saving Pots</Text>
                        <Text style={styles.text}>{inProgress} running, {potsSaved} saved and {completed} finished.</Text>
                        <Text style={styles.text}>Last viewed: 18.10.2018</Text>
                    </View>

                    <View style={styles.icon}>
                        <TouchableOpacity
                            onPress={this.goToIntroduction}>
                            <Icon
                                name="help-circle"
                                size={40}
                                color={utils.style.colours.purple} />
                        </TouchableOpacity>
                    </View>

                </View>


                <MyCarousel
                    pots={this.state.pots}
                    firstItem={ this.getFirstItem() }
                    updatePotDetail={ this.props.updatePotDetail }
                    navigateTo={ this.props.navigateTo } />
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
    },
    top: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple
    }
});

export default List