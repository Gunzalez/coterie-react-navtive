import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import utils from './../utils';

class Participants extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    closeParticipants = () => {
        this.props.navigation.navigate('Landing')
    };

    render() {

        const { navigation } = this.props;
        const potId = navigation.state.params.podId;

        return (
            <View style={[ styles.container ]}>
                <Text style={[ styles.title ]}>Participants</Text>
                <Text>Showing participants for id: {potId}</Text>
                <Button title="Done" onPress={this.closeParticipants} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        paddingBottom: 10
    }
});

export default Participants