import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import utils from './../utils';

class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired
    };

    state = {
        potDetail: this.props.potDetail
    };

    handlePress = () => {
        this.props.navigateTo('list');
    };

    showParticipants = () => {
        this.props.navigate('Participants')
    };

    render() {

        const { potId, title } = this.state.potDetail;

        return (
            <View style={[ styles.slide ]}>
                <Text style={[ styles.title ]}>Detail screen</Text>
                <Text>pot Id :{ potId }</Text>
                <Text>Title: { title }</Text>
                <TouchableOpacity onPress={this.handlePress}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Button title="Add Participants" onPress={this.showParticipants} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        padding: 20,
        borderRadius: 5
    },
    full: {
        backgroundColor: utils.colours.purple
    },
    title: {
        fontSize: 20,
        paddingBottom: 10
    },
    text: {
        color: utils.colours.white

    }
});

export default Detail