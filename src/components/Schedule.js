import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import { throttle, debounce } from 'throttle-debounce';

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
        const originalOrder = Array.from(new Array(participants.length),(val,index)=> index.toString());

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

        this.debouncedSetSchedule = debounce(500, this.setSchedule);

        this.state = {
            contacts: contacts,
            participants: participants,
            schedule: originalOrder,
            initialSchedule: originalOrder
        };
    }

    isScheduleTheSame = () => {
        return JSON.stringify(this.state.schedule) === JSON.stringify(this.state.initialSchedule)
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

        if(!this.isScheduleTheSame()){

            Alert.alert(
                'Unsaved changes',
                'Changes will be lost without saving\nLeave anyway?',
                [
                    { text: "LEAVE", onPress: () => { this.props.navigation.navigate('Landing') }},
                    { text: "STAY", onPress: () => {}, style: 'cancel' }
                ],
                { cancelable: false }
            );

        } else {

            this.props.navigation.navigate('Landing')
        }
    };

    saveSchedule = () => {

        const newOrderParticipants = this.state.schedule.map(i => this.state.participants[i]);
        const { updateLocalParticipants } = this.props.navigation.state.params;
        updateLocalParticipants(newOrderParticipants);

        this.setState({
            initialSchedule: this.state.schedule
        },()=>{
            this.refs.toast.show('Schedule saved', Toast.Duration.short, Toast.Position.bottom);
        });
    };

    setSchedule = schedule => {
        this.setState({ schedule });
    };

    render() {

        const { navigation } = this.props;

        const { name } = navigation.state.params.potDetail;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>

                    <View style={[styles.potMeta]}>
                        <Text style={[ styles.title ]}>{ name }</Text>
                        <Text style={[ styles.subTitle ]}>Participants in this pot: <Text style={[styles.darker]}>{this.state.participants.length}</Text></Text>
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

                <View style={styles.intro}>
                    <Text>The following participants have not collected and can be reordered</Text>
                </View>

                <View style={styles.bottom}>

                    <SortableList
                        style={styles.list}
                        data={this.returnParticipantsToDisplay()}
                        order={this.state.schedule}
                        onChangeOrder={(nextOrder)=>{
                            this.debouncedSetSchedule(nextOrder);
                        }}
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
                        disabled={ this.isScheduleTheSame()}
                        onPress={this.saveSchedule}>
                    <Icon
                        name="save"
                        size={40}
                        color={ this.isScheduleTheSame() ? utils.style.colours.grayText : utils.style.colours.white } />
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
    intro: {
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
    subTitle: {
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