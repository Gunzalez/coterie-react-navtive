import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import SortableList from 'react-native-sortable-list';

import Toast from 'react-native-whc-toast'

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Saver from './Saver';

class Schedule extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { contacts, potDetail } = this.props.navigation.state.params;
        const { participants = [] } = potDetail;

        if(participants.length){
            participants.map(participant => {
                contacts.map((contact, index) => {
                    if(contact.recordID === participant.contactId) {
                        contacts[index].checked = true;
                        if (participant.id){
                            contacts[index].participantId = participant.id;
                        }
                    }
                })
            });
        }

        this.state = {
            contacts: contacts,
            participants: participants,
            originalParticipants: participants
        };
    }

    participantsHaveChanged = () => {
        return JSON.stringify(this.state.participants) === JSON.stringify(this.state.originalParticipants)
    };

    returnParticipantsToDisplay = () => {
        const participants = [];
        this.state.participants.forEach(participant => {
            const displayParticipant = Object.assign({}, participant, {
                familyName: utils.js.getContactDetailFromId(participant.contactId, 'familyName', this.state.contacts),
                givenName: utils.js.getContactDetailFromId(participant.contactId, 'givenName', this.state.contacts)
            });
            participants.push(displayParticipant)
        });
        return participants;
    };

    closeSchedule = () => {

        if(!this.participantsHaveChanged()){

            Alert.alert(
                'Unsaved changes',
                'Discard changes and leave anyway?',
                [
                    { text: "NO", onPress: () => {}, style: 'cancel' },
                    { text: "YES", onPress: () => { this.props.navigation.navigate('Landing') }},
                ],
                { cancelable: false }
            );

        } else {

            this.props.navigation.navigate('Landing')
        }
    };

    saveSchedule = () => {
        const { updateLocalParticipants } = this.props.navigation.state.params;
        updateLocalParticipants(this.state.participants);
        this.setState({ originalParticipants: this.state.participants }, () => {
            this.refs.toast.show('Changes saved', Toast.Duration.short, Toast.Position.bottom);
        })
    };

    orderChanged = () => {
        console.log(this.state.participants)
    };

    render() {

        const { navigation } = this.props;

        const { name } = navigation.state.params.potDetail;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>

                    <View style={[styles.potMeta]}>
                        <Text style={[ styles.title ]}>{ name }</Text>
                        <Text style={[ styles.count ]}>Participants in this pot: <Text style={[styles.darker]}>{this.state.participants.length}</Text></Text>
                    </View>

                    <View style={styles.icon}>
                        <TouchableOpacity
                            onPress={this.closeSchedule}>
                        <Icon
                            name="down"
                            size={utils.style.icons.top}
                            color={utils.style.colours.purple}/>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.bottom}>

                    <SortableList
                        style={styles.list}
                        // contentContainerStyle={styles.contentContainer}
                        data={this.returnParticipantsToDisplay()}
                        onChangeOrder={this.orderChanged}
                        renderRow={({data, active}) =>
                            <Saver data={data} active={active} />
                        } />
                </View>
                <View style={styles.footer}>

                    <TouchableOpacity
                        disabled={true}>
                        <Icon
                            name="delete"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.purple} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={true}>
                        <Icon
                            name="delete"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.purple} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={true}>
                        <Icon
                            name="delete"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.purple} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={this.participantsHaveChanged()}
                        onPress={this.saveSchedule}>
                    <Icon
                        name="save"
                        size={40}
                        color={this.participantsHaveChanged() ? utils.style.colours.grayText : utils.style.colours.white} />
                    </TouchableOpacity>
                </View>

                <Toast
                    ref="toast"
                    style={styles.toast}
                    textStyle={styles.text}
                    position={Toast.Position.bottom}
                    fadeInDuration={200}
                    fadeOutDuration={200}
                    duration={Toast.Duration.long}
                    opacity={0.9}
                    positionValue={100} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: utils.style.colours.background
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    list: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple,
        paddingBottom: 1
    },
    count: {
        color: utils.style.colours.grayText,
        paddingBottom: 5
    },
    darker: {
        color: utils.style.colours.grayDark
    },
    icon: {
        paddingLeft: 10
    },
    potMeta: {
        flexDirection: 'column',
        flex: 1,
        marginRight: 5
    },
    participants: {
        borderBottomWidth: 1,
        borderColor: utils.style.colours.grayLight,
        height: 90
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.white
    },
    footer: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Schedule