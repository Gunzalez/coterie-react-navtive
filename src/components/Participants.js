import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';

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

        this.currentVisibleParticipants = [];
        this.rowRefs = {};
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

    returnContactsToDisplay = () => {
        return utils.js.sort(this.state.contacts);
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

        Alert.alert(
            'Remove participants?',
            'Clears all added contacts. Are you sure?',
            [
                { text: "NO", onPress: () => {}, style: 'cancel' },
                { text: "YES", onPress: () => {

                    let unCheckedContacts = [];
                    this.state.contacts.forEach(contact => {
                        delete contact.checked;
                        unCheckedContacts.push(contact);
                    });

                    this.setState({
                        participants: [],
                        contacts: unCheckedContacts
                    })

                }},
            ],
            { cancelable: false }
        );
    };


    contactClicked = (indexOfContactList) => {

        const tempParticipantsArray = this.state.participants.slice();
        const tempContactsArray = this.state.contacts.slice();
        const contact = tempContactsArray[indexOfContactList];

        if(!contact.checked){

            const newParticipant = { contactId: contact.recordID };
            if(contact.participantId){
                newParticipant.id = contact.participantId
            }
            tempParticipantsArray.push(newParticipant);
            setTimeout(() => this.flatList.scrollToEnd(), 200);

            Object.assign(contact, { "checked": true });

            this.setState({
                contacts: tempContactsArray,
                participants: tempParticipantsArray
            });

        } else {

            const arrayOfVisibleIds = [];
            this.currentVisibleParticipants.map( participant => {
                arrayOfVisibleIds.push(participant.key)
            });

            // const isParticipantOffScreen = arrayOfVisibleIds.indexOf(contact.recordID) === -1;
            // console.log(isParticipantOffScreen ? 'will scroll and delete': 'will delete');

            this.rowRefs[contact.recordID].exitAnimation(contact.recordID);
        }
    };


    participantClicked = (contactId) => {

        const tempParticipantsArray = this.state.participants.slice();
        const tempContactsArray = this.state.contacts.slice();

        tempParticipantsArray.forEach((participant, index) => {
            if(participant.contactId === contactId){
                tempParticipantsArray.splice(index, 1);
            }
        });

        tempContactsArray.forEach(contact => {
            if(contact.recordID === contactId){
                delete contact.checked;
            }
        });

        this.setState({
            contacts: tempContactsArray,
            participants: tempParticipantsArray
        });
    };

    onViewableItemsChanged = ({ viewableItems }) => {
        this.currentVisibleParticipants = viewableItems;
    };

    viewAbilityConfig = {
        itemVisiblePercentThreshold: 1
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

                <View style={styles.participants}>

                    { this.state.participants.length > 0 ?

                        <FlatList
                            ref={(scrollView) => { this.flatList = scrollView }}
                            data={this.returnParticipantsToDisplay()}
                            onViewableItemsChanged={this.onViewableItemsChanged}
                            viewabilityConfig={this.viewAbilityConfig}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.contactId.toString()}
                            renderItem={(item) => <Participant data={item}
                                                        ref={(Participant) => { this.rowRefs[item.item.contactId] = Participant; }}
                                                        participantClicked={ this.participantClicked } />
                            }/>

                    :
                        <Participant data={{item:{placeHolder:true}}} />
                    }

                </View>
                <View style={styles.searchBarBox}>
                    <TextInput
                        style={styles.searchBar}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholderTextColor={utils.style.colours.grayText}
                        autoCorrect={false}
                        placeholder={'Filter contacts'}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={'words'}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={this.returnContactsToDisplay()}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>
                            <Contact data={item} contactClicked={this.contactClicked} />
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
        backgroundColor: utils.style.colours.background
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    searchBarBox: {
        backgroundColor: utils.style.colours.white
    },
    searchBar:{
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: utils.style.colours.grayLight,
        padding: 10,
        borderRadius: 2,
        color: utils.style.colours.grayText
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