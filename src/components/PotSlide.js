import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

import utils from './../utils';

const deviceHeight = Dimensions.get('window').height;

const itemHeight = deviceHeight - 350;

const getStatus = (id) => {
      switch (id){
          case 1:
              return 'Saved';
          case 2:
              return 'Running';
          case 3:
              return 'Matured';
          default:
              return 'New'
      }
};

class PotSlide extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        navigateTo: PropTypes.func.isRequired,
        updatePotDetail: PropTypes.func.isRequired,
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

        const {
            title = 'Create a new pot',
            amount = '-',
            participants = '-',
            status = 0,
            round = '-',
            current = '-',
            next = 'Trump'  } = this.props.data;

        const curPotValue = parseInt(current) * parseInt(amount);
        const totPotValue = (parseInt(participants)-1) * parseInt(amount);

        if(status === 0){
            return (
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View style={[ styles.slide, styles.empty ]}>
                        <View style={styles.top}>
                            <Text style={[styles.intro, styles.title]}>{title}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <Icon name="ios-add-circle" style={styles.button} size={90} color={utils.colours.purple} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View style={[ styles.slide, styles.full ]}>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                    <Text style={styles.text}>Saving £{amount}</Text>
                    <Text style={styles.text}>{participants} Participants</Text>
                    <Text style={styles.text}>Round {round}</Text>
                    <Text style={styles.text}>Status: { getStatus(status) }</Text>
                    <Text style={styles.text}>Current Pot Value £{curPotValue}</Text>
                    <Text style={styles.text}>Pot Value £{totPotValue}</Text>
                    <Text style={styles.text}>Next to collect: {next}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        borderRadius: 8,
        height: itemHeight,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    top: {
        backgroundColor: utils.colours.purple,
        height: 80,
        borderRadius: 4
    },
    empty: {
        borderWidth: 1,
        borderColor: utils.colours.purple
    },
    full: {
        backgroundColor: utils.colours.purple
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        textAlign: 'center'
    },
    text: {
        color: utils.colours.white

    },
    intro: {
        color: utils.colours.white
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PotSlide