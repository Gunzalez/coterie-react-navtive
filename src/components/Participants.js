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
                name: "Peter",
                mobileId: 14,
                id: 8
            },
            {
                name: "Mathew",
                mobileId: 17,
                id: 4
            },
            {
                name: "Linda",
                mobileId: 4,
                id: 3
            },
            {
                name: "Jaclyn",
                mobileId: 12,
                id: 2
            },
            {
                name: "Linda",
                mobileId: 13,
                id: 7
            },
            {
                name: "Jaclyn",
                mobileId: 10,
                id: 5
            },
            {
                name: "Shorma",
                mobileId: 22,
                id: 9
            },
            {
                name: "Scott",
                mobileId: 11,
                id: 21
            }
        ],
        contacts: [
            {
                name: "Karl",
                mobileId: 14
            },
            {
                name: "Titi",
                mobileId: 17
            },
            {
                name: "Hasan",
                mobileId: 4
            },
            {
                name: "Segun",
                mobileId: 12
            },
            {
                name: "Malcolm",
                mobileId: 13
            },
            {
                name: "Frank",
                mobileId: 10,
            },
            {
                name: "Mathew",
                mobileId: 17
            },
            {
                name: "Clifton",
                mobileId: 4
            },
            {
                name: "Mary",
                mobileId: 12
            },
            {
                name: "Jay",
                mobileId: 13
            },
            {
                name: "Jaclyn",
                mobileId: 10,
            },
            {
                name: "Pilan",
                mobileId: 17
            },
            {
                name: "Keon",
                mobileId: 4
            },
            {
                name: "Kayden",
                mobileId: 12
            },
            {
                name: "Rob",
                mobileId: 13
            },
            {
                name: "Jaclyn",
                mobileId: 10,
            },
            {
                name: "Mathew",
                mobileId: 17
            },
            {
                name: "Linda",
                mobileId: 4
            },
            {
                name: "Jaclyn",
                mobileId: 12
            },
            {
                name: "Susan",
                mobileId: 13
            },
            {
                name: "Florence",
                mobileId: 10,
            }
        ]
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
                        data={this.state.participants}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this._keyExtractor}
                        renderItem={(item) =>
                            <Participant data={item}  />
                        }
                    />
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={this.state.contacts}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={this._keyExtractor}
                        renderItem={(item) =>
                            <Contact data={item}  />
                        }
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