import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

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
                id: 1
            },
            {
                name: "Titi",
                surname: "Adesanya",
                id: 2
            },
            {
                name: "Hasan",
                surname: "Kazan",
                id: 3
            },
            {
                name: "Segun",
                surname: "Konibire",
                id: 4
            },
            {
                name: "Malcolm",
                surname: "Seaborn",
                id: 5
            },
            {
                name: "Frank",
                surname: "Sinatra",
                id: 6
            },
            {
                name: "Mathew",
                surname: "Ferry",
                id: 7
            },
            {
                name: "Clifton",
                surname: "Green",
                id: 8
            },
            {
                name: "Mary",
                surname: "Poppins",
                id: 9
            },
            {
                name: "Jay",
                surname: "Flaxman",
                id: 10
            },
            {
                name: "Jaclyn",
                surname: "Jones",
                id: 11
            },
            {
                name: "Pilan",
                surname: "Ramiah",
                id: 12
            },
            {
                name: "Keon",
                surname: "Konibire",
                id: 13
            },
            {
                name: "Kayden",
                surname: "konibire",
                id: 14
            },
            {
                name: "Rob",
                surname: "Curle",
                id: 15
            },
            {
                name: "Jacky",
                surname: "Brown",
                id: 16
            },
            {
                name: "Kevin",
                surname: "Philips",
                id: 17
            },
            {
                name: "Lynda",
                surname: "Dot.Com",
                id: 18
            },
            {
                name: "Jane",
                surname: "Red",
                id: 19
            },
            {
                name: "Susan",
                surname: "Fox",
                id: 20
            },
            {
                name: "Florence",
                surname: "Nightingale",
                id: 21
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

        const { name = 'Create a new pot', savingsAmount, participants = [], status, round, nextParticipantToCollect } = this.state.potDetail;

        const totPotValue =  (participants.length * savingsAmount) - savingsAmount;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
                    <Text style={[ styles.title ]}>{name}</Text>
                    <TouchableOpacity onPress={this.handlePress}>
                    <Icon
                        name="shrink"
                        size={utils.style.icons.size}
                        color={utils.style.colours.purple}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.middle}>
                    <View style={styles.form}>
                        <Text>Title :{ name } (editable before payment)</Text>
                        <Text>Amount: £{ savingsAmount } (editable before payment)</Text>
                    </View>
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity>
                        <Icon
                            name="delete"
                            size={40}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name="save"
                            size={40}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name="menufold"
                            size={40}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.showParticipants}>
                        <Icon
                            name="adduser"
                            size={40}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple,
        paddingBottom: 10
    },
    middle: {
        flex: 1,
        paddingHorizontal: 20
    },
    footer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Detail