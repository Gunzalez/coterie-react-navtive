import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import Toast from 'react-native-whc-toast'

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Participant from './Participant';

import Contact from './Contact';

class Participants extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { contacts, potDetail } = this.props.navigation.state.params;
        const { participants = [] } = potDetail;

        contacts.forEach(contact => {
            delete contact.checked
        });

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

    getContactDetailFromId = (id, param) => {
        let returnName = 'Participant';
        this.state.contacts.forEach(contact => {
            if(contact.recordID === id){
                returnName = contact[param].trim()
            }
        });
        return returnName;
    };

    returnParticipantsToDisplay = () => {
        const participants = [];
        this.state.participants.forEach(participant => {
            const displayParticipant = Object.assign({}, participant, {
                familyName: this.getContactDetailFromId(participant.contactId, 'familyName'),
                givenName: this.getContactDetailFromId(participant.contactId, 'givenName')
            });
            participants.push(displayParticipant)
        });
        return participants;
    };

    closeParticipants = () => {

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

    saveParticipants = () => {
        const { updateLocalParticipants } = this.props.navigation.state.params;
        updateLocalParticipants(this.state.participants);
        this.setState({ originalParticipants: this.state.participants }, () => {
            this.refs.toast.show('Changes saved', Toast.Duration.short, Toast.Position.bottom);
        })
    };

    clearParticipants = () => {

        let unCheckedContacts = [];
        this.state.contacts.forEach(contact => {
            delete contact.checked;
            unCheckedContacts.push(contact);
        });

        this.setState({
            participants: [],
            contacts: unCheckedContacts
        })
    };

    contactClicked = (indexOfContactList) => {
        const tempParticipantsArray = this.state.participants.slice();
        const tempContactsArray = this.state.contacts.slice();
        const contact = tempContactsArray[indexOfContactList];

        if(contact.checked){ // remove from Participants

            tempParticipantsArray.map((participant, index) => {

                if(participant.contactId === contact.recordID.toString()){
                    // this.flatList.scrollToIndex({
                    //     animated: true,
                    //     index: index,
                    //     viewPosition: 1,
                    //     viewOffset: 0
                    // });
                    // tempParticipantsArray[index].highlight = true;
                    // setTimeout(() => tempParticipantsArray.splice(index, 1), 200);
                    tempParticipantsArray.splice(index, 1);
                }
            })

        } else { // add to Participants

            const newParticipant = { contactId: contact.recordID.toString() };
            if(contact.participantId){
                newParticipant.id = contact.participantId
            }
            tempParticipantsArray.push(newParticipant);
            setTimeout(() => this.flatList.scrollToEnd(), 200);

        }

        Object.assign(contact, { "checked": !contact.checked });

        this.setState({
            "contacts": tempContactsArray,
            "participants": tempParticipantsArray
        });
    };


    render() {

        const { navigation } = this.props;

        const { name } = navigation.state.params.potDetail;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
                    <Text style={[ styles.title ]}>{ name }</Text>

                    <View style={styles.icon}>
                        <TouchableOpacity
                            onPress={this.closeParticipants}>
                        <Icon
                            name="down"
                            size={utils.style.icons.top}
                            color={utils.style.colours.purple}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.middle}>

                    { this.state.participants.length > 0 ?

                    <FlatList
                        ref={(scrollView) => { this.flatList = scrollView }}
                        data={this.returnParticipantsToDisplay()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        // onMomentumScrollEnd={(item) => {console.log(item, this)}}
                        renderItem={(item) =>
                            <Participant data={item} />
                        }/>

                    :
                        <Participant data={{item:{placeHolder:true}}} />
                    }

                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={this.state.contacts}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>
                            <Contact data={item} contactClicked={this.contactClicked}/>
                        }/>
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity
                        disabled={this.state.participants.length < 1}
                        onPress={this.clearParticipants}>
                        <Icon
                            name="deleteusergroup"
                            size={40}
                            color={this.state.participants.length < 1 ? utils.style.colours.grayText : utils.style.colours.white} />
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
                        onPress={this.saveParticipants}>
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
        backgroundColor: '#f5f5f5'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    middle: {
        height: 85
    },
    bottom: {
        borderTopWidth: 1,
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        borderColor: utils.style.colours.grayLight,
        backgroundColor: utils.style.colours.white
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple,
        paddingBottom: 10
    },
    footer: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Participants