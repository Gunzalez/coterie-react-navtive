import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import utils from './../utils';

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
        data: PropTypes.object.isRequired
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
        const totPotValue = parseInt(participants) * parseInt(amount);

        if(status === 0){
            return (
                <View style={[ styles.slide, styles.empty]}>
                    <Text style={[styles.intro, styles.title]}>{title}</Text>
                    <Text style={styles.intro}>Plus Button</Text>
                </View>
            )
        }

        return (
            <View style={[ styles.slide, styles.full]}>
                <Text style={[styles.text, styles.title]}>{title}</Text>
                <Text style={styles.text}>Saving £{amount}</Text>
                <Text style={styles.text}>{participants} Participants</Text>
                <Text style={styles.text}>Round {round}</Text>
                <Text style={styles.text}>Status: { getStatus(status) }</Text>
                <Text style={styles.text}>Current Pot Value £{curPotValue}</Text>
                <Text style={styles.text}>Pot Value £{totPotValue}</Text>
                <Text style={styles.text}>Next to collect: {next}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        padding: 20,
        borderRadius: 6

    },
    empty: {
        borderWidth: 1,
        borderColor: utils.colours.purple
    },
    full: {
        backgroundColor: utils.colours.purple
    },
    title: {
        fontSize: 26,
        paddingBottom: 10
    },
    text: {
        color: utils.colours.white

    },
    intro: {
        color: utils.colours.purple

    }
});

export default PotSlide