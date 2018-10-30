import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

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

        const { title } = navigation.state.params.potDetail;

        return (
            <View style={[ styles.container ]}>
                <Text style={[ styles.title ]}>{title}</Text>
                <View style={styles.bottom}>
                    <Icon
                        name="downcircleo"
                        size={utils.icons.size}
                        color={utils.colours.purple}
                        onPress={this.closeParticipants} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 5
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 25,
        color: utils.colours.purple,
        paddingBottom: 10
    }
});

export default Participants