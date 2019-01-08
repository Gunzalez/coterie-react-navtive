import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

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
            this.props.setPotDetail(this.props.data);
            this.props.navigateTo('detail');
        }
    };

    getTotalPotValue = pot => {
        const { participants, savingsAmount } = pot;
        if(participants.length){
            return (participants.length * savingsAmount) - savingsAmount
        }
        return 0;
    };

    render() {

        const { name = 'Create a new pot', savingsAmount, participants, status, round } = this.props.data;

        let thisRound = round !== null ? round : 1;

        if(status === "completed"){
            thisRound = participants.length
        }

        return(
            <View style={styles.container}>

                <TouchableWithoutFeedback style={styles.topButton} onPress={this.handlePress}>
                    <View style={[styles.top, status === "completed" ? styles.completed : null, status === "created" ? styles.new : null, status === "in-progress" ? styles.running : null ]}>
                            <Icon name="arrowsalt"
                                  size={utils.style.icons.top}
                                  color={utils.style.colours.white} />
                        <Text style={[styles.text, styles.title]}>{name}</Text>
                    </View>
                </TouchableWithoutFeedback>

                { status === "new" ?

                    <View style={styles.bottom}>
                        <Text style={styles.intro}>No of participants</Text>
                        <Text style={styles.intro}>Saving amount</Text>
                        <Text style={styles.intro}>Current round</Text>
                        <Text style={styles.intro}>Pot status</Text>
                        <Text style={styles.intro}>Total Pot Value</Text>
                    </View>

                :

                    <View style={styles.bottom}>
                        <Text style={styles.text}>{participants.length} Participants</Text>
                        <Text style={styles.text}>Saving £{ utils.js.thousandth(savingsAmount) }</Text>
                        <Text style={styles.text}>Round: {thisRound}/{participants.length}</Text>
                        <Text style={styles.text}>Status: {status}</Text>
                        <Text style={styles.text}>Pot Value £{ utils.js.thousandth(this.getTotalPotValue(this.props.data))}</Text>
                    </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        height: itemHeight,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        backgroundColor: utils.style.colours.white,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3,
        marginVertical: 5
    },
    topButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    top: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: utils.style.colours.grayText,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    new: {
        backgroundColor: utils.style.colours.yellow
    },
    running: {
        backgroundColor: utils.style.colours.purpleLight
    },
    completed: {
        backgroundColor: utils.style.colours.grayDark
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.white,
        alignSelf: 'flex-start'
    },
    bottom: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15
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