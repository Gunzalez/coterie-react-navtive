import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

const deviceHeight = Dimensions.get('window').height;

const itemHeight = deviceHeight - 290;

class PotSlide extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        navigateTo: PropTypes.func.isRequired,
        activeSlide: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired
    };

    handlePress = () => {
        if (this.props.index === this.props.activeSlide) {
            this.props.updatePotDetail(this.props.data);
            this.props.navigateTo('detail');
        }
    };

    render() {

        const { name = 'Create a Pot', savingsAmount, participants, status, round, nextParticipantToCollect } = this.props.data;

        if(status === "new"){
            return(
                <View style={styles.container}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={this.handlePress}>
                        <Icon name="arrowsalt"
                              size={utils.style.icons.size}
                              color={utils.style.colours.purple} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={[styles.text, styles.title]}>{name}</Text>
                        <Text style={styles.intro}>Saving amount</Text>
                        <Text style={styles.intro}>No of participants</Text>
                        <Text style={styles.intro}>Current saving round</Text>
                        <Text style={styles.intro}>Pot status</Text>
                        <Text style={styles.intro}>Total Pot Value</Text>
                        <Text style={styles.intro}>Next to collect</Text>
                    </View>
                </View>
            )
        }

        const totPotValue = (participants.length * savingsAmount) - savingsAmount;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={this.handlePress}>
                    <Icon name="arrowsalt"
                          size={utils.style.icons.size}
                          color={utils.style.colours.purple} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <Text style={[styles.text, styles.title]}>{name}</Text>
                    <Text style={styles.text}>Saving £{savingsAmount}</Text>
                    <Text style={styles.text}>{participants.length} Participants</Text>
                    <Text style={styles.text}>Round {round}</Text>
                    <Text style={styles.text}>Status: {status}</Text>
                    <Text style={styles.text}>Pot Value £{totPotValue}</Text>
                    <Text style={styles.text}>Next to collect: {nextParticipantToCollect}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        height: itemHeight,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: utils.style.colours.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,


        elevation: 3,
        marginVertical: 5
    },
    top: {
        flex: 1,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple,
        paddingBottom: 10
    },
    bottom: {
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 14
    },
    intro: {
        fontSize: 14,
        color: '#cccccc'
    }
});

export default PotSlide