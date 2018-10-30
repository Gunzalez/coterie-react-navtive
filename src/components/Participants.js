import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, FlatList } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Participant from './Participant';

import Contact from './Contact';

class Participants extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    closeParticipants = () => {
        this.props.navigation.navigate('Landing')
    };

    state = {
        participants: [
            {
                name: "Peter Parker",
                mobileId: 14,
                id: 8,
                avatar: 'PP'
            }
            // {
            //     name: "Mathew",
            //     mobileId: 17,
            //     id: 4
            // },
            // {
            //     name: "Linda",
            //     mobileId: 4,
            //     id: 3
            // },
            // {
            //     name: "Jaclyn",
            //     mobileId: 12,
            //     id: 2
            // },
            // {
            //     name: "Linda",
            //     mobileId: 13,
            //     id: 7
            // },
            // {
            //     name: "Jaclyn",
            //     mobileId: 10,
            //     id: 5
            // },
            // {
            //     name: "Shorma",
            //     mobileId: 22,
            //     id: 9
            // },
            // {
            //     name: "Scott",
            //     mobileId: 11,
            //     id: 21
            // }
        ],
        contacts: [
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
                if(participant.mobileId === contact.mobileId){
                    tempParticipantsArray.splice(index, 1);
                }
            })
        } else { // add to Participants
            const participant = Object.assign({}, {
                name: contact.name,
                mobileId: contact.mobileId,
                avatar: this.createAvatar(contact)
            });
            tempParticipantsArray.push(participant);
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

        const { title } = navigation.state.params.potDetail;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
                    <Text style={[ styles.title ]}>{title}</Text>

                    <View style={styles.icon}>
                        <Icon
                            name="downcircleo"
                            size={utils.icons.size}
                            color={utils.colours.purple}
                            onPress={this.closeParticipants} />
                    </View>
                </View>

                <View style={styles.middle}>
                    <FlatList
                        ref={(scrollView) => { this.flatList = scrollView }}
                        data={this.state.participants}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) =>
                            <Participant data={item}  />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={this.state.contacts}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) =>
                            <Contact data={item} contactClicked={this.contactClicked}  />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
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

    },
    bottom: {
        borderTopWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: utils.colours.white
    },
    title: {
        fontSize: 25,
        color: utils.colours.purple,
        paddingBottom: 10
    }
});

export default Participants