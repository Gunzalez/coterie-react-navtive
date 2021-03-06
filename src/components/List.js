import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import MyCarousel from './Carousel';

import utils from "../utils";

class List extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        setPotDetail: PropTypes.func.isRequired,
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

        let potStr = "pot";
        if(inProgress > 1){
            potStr = "pots"
        }

        return (
            <View style={styles.container}>

                <View style={styles.top}>

                    <View style={styles.header}>
                        <Text style={styles.title}>{pots.length - 1} Saving Pots</Text>
                        { inProgress ? <Text style={styles.text}>{inProgress} {potStr} in progress</Text> : null }
                        { potsSaved ? <Text style={styles.text}>{potsSaved} created but not started</Text> : null }
                        { completed ? <Text style={styles.text}>{completed} completed</Text> : null }
                    </View>

                    <View style={styles.icon}>
                        <TouchableOpacity
                            onPress={this.goToIntroduction}>
                            <Icon
                                name="questioncircle"
                                size={40}
                                color={utils.style.colours.purple} />
                        </TouchableOpacity>
                    </View>

                </View>


                <MyCarousel
                    pots={this.state.pots}
                    firstItem={ this.getFirstItem() }
                    setPotDetail={ this.props.setPotDetail }
                    navigateTo={ this.props.navigateTo } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: utils.style.colours.background
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