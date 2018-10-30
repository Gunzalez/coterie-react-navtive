import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text } from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome5";

import IconAnt from "react-native-vector-icons/AntDesign";

import utils from './../utils';

class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired
    };

    state = {
        potDetail: this.props.potDetail
    };

    handlePress = () => {
        this.props.navigateTo('list');
    };

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.potDetail
        })
    };

    render() {

        const { potId,
            title = 'Create a new pot',
            amount = '-',
            participants = '-',
            status = 0,
            round = '-',
            current = '-',
            next = 'Trump'} = this.state.potDetail;

        const curPotValue = parseInt(current) * parseInt(amount);
        const totPotValue = (parseInt(participants)-1) * parseInt(amount);

        return (
            <View style={[ styles.container ]}>
                <View style={styles.top}>
                    <Text style={[ styles.title ]}>{title}</Text>
                    <Icon
                        name="ellipsis-v"
                        size={utils.icons.size}
                        color={utils.colours.purple}
                        onPress={this.handlePress} />
                </View>

                <Text style={styles.heading}>Form</Text>
                <Text>Title :{ title } (editable before payment)</Text>
                <Text>Amount: £{ amount } (editable before payment)</Text>
                <Text>No. of Participants: { participants } (editable before payment)</Text>
                <Text>---</Text>
                <Text style={styles.heading}>Meta</Text>
                <Text>Pot Status: { status } (derived)</Text>
                <Text>Current round: { round } (derived)</Text>
                <Text>Next to get paid: { next } (derived)</Text>
                <Text>Current pot value: £{ curPotValue } (derived)</Text>
                <Text>Total pot value: { totPotValue } (derived)</Text>
                <Text>---</Text>
                <Text style={styles.heading}>Actions</Text>
                <Text>- Delete a pot (may be disabled)</Text>
                <Text>- Save a Pot (may be disabled)</Text>
                <Text>- Manage payment/collection (click on Participant)</Text>
                <Text>- Clear Pot/Form (may be disabled)</Text>
                <Text>- Clone Pot (may be disabled)</Text>
                <Text>- Add/Remove Participants (may be disabled)</Text>
                <Text>- Re-order Participants (may be disabled)</Text>

                <View style={styles.tray}>
                    <IconAnt
                        name="upcircleo"
                        size={utils.icons.size}
                        color={utils.colours.purple}
                        onPress={this.showParticipants} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 25,
        color: utils.colours.purple,
        paddingBottom: 10
    },
    tray: {
        paddingTop: 30
    },
    heading:{
        fontSize: 18,
        paddingTop: 15
    },
    back: {
        backgroundColor: utils.colours.purple,
        marginBottom: 20,
        padding: 12,
        borderRadius: 5
    },
    backText: {
        color: utils.colours.white,
        fontSize: 18,
        textAlign: 'center'
    }
});

export default Detail