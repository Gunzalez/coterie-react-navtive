import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import utils from './../utils';

class Participants extends Component {

    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    closeParticipants = () => {
        this.props.navigate('Landing')
    };

    render() {

        return (
            <View style={[ styles.container ]}>
                <Text style={[ styles.title ]}>Participants</Text>
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