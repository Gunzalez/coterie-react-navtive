import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Participant from './Participant';

import Contact from './Contact';

class Participants extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        updatePotDetail: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let initialParticipants = [];
        let initialContacts = this.props.navigation.state.params.contacts;
        initialContacts.forEach(contact => {
            delete contact.checked
        });

        this.props.navigation.state.params.potDetail.participants.map(participant => {
            this.props.navigation.state.params.contacts.map((contact, index) => {
                if(contact.id === participant.mobileId){
                    initialParticipants.push({
                        mobileId: contact.id,
                        avatar: this.createAvatar(contact)
                    });
                    initialContacts[index].checked = true;
                }
            })
        });

        this.state = {
            participants: initialParticipants,
            contacts: initialContacts,
            originalParticipants: initialParticipants
        };
    }

    hasParticipantsChanged = () => {
        console.log(this.state.participants);
        console.log(this.state.originalParticipants);
        return !utils.js.areDifferentByIds(this.state.participants, this.state.originalParticipants)
    };

    closeParticipants = () => {
        this.props.navigation.navigate('Landing')
    };

    saveParticipants = () => {
        let originalPot = this.props.navigation.state.params.potDetail;
        let updatedPot = Object.assign(originalPot, { participants:this.state.participants });
        // should update pot in backend
        this.props.updatePotDetail(updatedPot);
    };

    createAvatar = contact => {
        let avatar = contact.name.charAt(0).toUpperCase();
        if(contact.surname){
            avatar = avatar + contact.surname.charAt(0).toUpperCase()
        }
        return avatar;
    };

    contactClicked = (indexOfContactList) => {
        const tempContactsArray = this.state.contacts.slice();
        const tempParticipantsArray = this.state.participants.slice();
        const contact = tempContactsArray[indexOfContactList];

        if(contact.checked){ // remove from Participants


            tempParticipantsArray.map((participant, index) => {
                if(participant.mobileId === contact.id){

                    // tempParticipantsArray.splice(index, 1);
                    this.flatList.scrollToIndex({
                        animated: false,
                        index: index,
                        viewPosition: 1,
                        viewOffset: 0
                    });
                    tempParticipantsArray.splice(index, 1);
                }
            })
        } else { // add to Participants
            tempParticipantsArray.push({
                mobileId: contact.id,
                avatar: this.createAvatar(contact)
            });
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
                            disabled={this.hasParticipantsChanged()}
                            onPress={this.saveParticipants}>
                        <Icon
                            name="save"
                            size={utils.style.icons.size}
                            color={ this.hasParticipantsChanged() ? utils.style.colours.gray : utils.style.colours.purple }
                             />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.middle}>
                    <FlatList
                        ref={(scrollView) => { this.flatList = scrollView }}
                        data={this.state.participants}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        onMomentumScrollEnd={() => console.log("end")}

                        renderItem={(item) =>
                            <Participant data={item}  />
                        }
                    />
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={this.state.contacts}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>
                            <Contact data={item} contactClicked={this.contactClicked}  />
                        }
                    />
                </View>

                <View style={styles.footer}>
                    <Icon
                        name="downcircleo"
                        size={utils.style.icons.size}
                        color={utils.style.colours.white}
                        onPress={this.closeParticipants} />
                </View>

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
        margin: 20
    },
    middle: {
        height: 60
    },
    bottom: {
        borderTopWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
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
        backgroundColor: utils.style.colours.purple,
        height: 100,
        padding: 20,
        alignItems: 'flex-end'
    }
});

export default Participants