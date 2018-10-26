import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

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
            title = 'Saving Pot',
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
                <View style={styles.slide}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.title}>Plus Button</Text>
                </View>
            )
        }

        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>Saving £{amount}</Text>
                <Text style={styles.title}>{participants} Participants</Text>
                <Text style={styles.title}>Round {round}</Text>
                <Text style={styles.title}>Status: { getStatus(status) }</Text>
                <Text style={styles.title}>Current Pot Value £{curPotValue}</Text>
                <Text style={styles.title}>Pot Value £{totPotValue}</Text>
                <Text style={styles.title}>Next to collect: {next}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {

    },
    title: {

    },
});

export default PotSlide