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

    constructor(props) {
        super(props);

        this.state = {
            potDetail: this.props.potDetail
        };

        this.contactList = [
            {
                name: "Karl",
                surname: "Walsh",
                mobileId: 1,
                checked: false
            },
            {
                name: "Titi",
                surname: "Adesanya",
                mobileId: 2,
                checked: false
            },
            {
                name: "Hasan",
                surname: "Kazan",
                mobileId: 3,
                checked: false
            },
            {
                name: "Segun",
                surname: "Konibire",
                mobileId: 4,
                checked: false
            },
            {
                name: "Malcolm",
                surname: "Seaborn",
                mobileId: 5,
                checked: false
            },
            {
                name: "Frank",
                surname: "Sinatra",
                mobileId: 6,
                checked: false
            },
            {
                name: "Mathew",
                surname: "Ferry",
                mobileId: 7,
                checked: false
            },
            {
                name: "Clifton",
                surname: "Green",
                mobileId: 8,
                checked: false
            },
            {
                name: "Mary",
                surname: "Poppins",
                mobileId: 9,
                checked: false
            },
            {
                name: "Jay",
                surname: "Flaxman",
                mobileId: 10,
                checked: false
            },
            {
                name: "Jaclyn",
                surname: "Jones",
                mobileId: 11,
                checked: false
            },
            {
                name: "Pilan",
                surname: "Ramiah",
                mobileId: 12,
                checked: false
            },
            {
                name: "Keon",
                surname: "Konibire",
                mobileId: 13,
                checked: false
            },
            {
                name: "Kayden",
                surname: "konibire",
                mobileId: 14,
                checked: false
            },
            {
                name: "Rob",
                surname: "Curle",
                mobileId: 15,
                checked: false
            },
            {
                name: "Jacky",
                surname: "Brown",
                mobileId: 16,
                checked: false
            },
            {
                name: "Kevin",
                surname: "Philips",
                mobileId: 17,
                checked: false
            },
            {
                name: "Lynda",
                surname: "Dot.Com",
                mobileId: 18,
                checked: false
            },
            {
                name: "Jane",
                surname: "Red",
                mobileId: 19,
                checked: false
            },
            {
                name: "Susan",
                surname: "Fox",
                mobileId: 20,
                checked: false
            },
            {
                name: "Florence",
                surname: "Nightingale",
                mobileId: 21,
                checked: false
            }
        ]
    }

    handlePress = () => {
        this.props.navigateTo('list');
    };

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.potDetail,
            contacts: this.contactList
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
                <Text>Participants: { participants } (editable before payment)</Text>
                <Text>---</Text>
                <Text style={styles.heading}>Meta</Text>
                <Text>Pot Status: { status } (derived)</Text>
                <Text>Current round: { round } (derived)</Text>
                <Text>Next to get paid: { next } (derived)</Text>
                <Text>Current pot value: £{ curPotValue } (derived)</Text>
                <Text>Total pot value: £{ totPotValue } (derived)</Text>
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
        padding: 20,
        backgroundColor: '#f5f5f5',
        flex: 1
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