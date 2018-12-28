import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import ajax from './../ajax';

import utils from './../utils';

import Toast from "react-native-whc-toast";

class Collection extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { participant, reloadPot } = this.props.navigation.state.params;
        const { isNextParticipantToCollect, hasParticipantPaid } = participant.item;

        this.type = isNextParticipantToCollect ? 'collection' : 'payment';
        this.reloadPot = reloadPot;

        let disabledButton = true;
        if(isNextParticipantToCollect || !hasParticipantPaid){
            disabledButton = false;
        }

        this.state = {
            disabled: disabledButton,
            busy: false,
            initialStatus: disabledButton,
            finalStatus: disabledButton,
            hasParticipantPaid,
        };

        this.copy = {
            collection: {
                button: {
                    unClicked: 'CLICK TO COLLECT',
                    clicked: 'COLLECTED'
                },
                intro: "This participant is due to collect the pot value for this round."
            },
            payment: {
                button: {
                    unClicked: 'CLICK TO PAY',
                    clicked: 'PAID'
                },
                intro: "This participant is due to pay the saving amount for this round."
            }
        };

    }

    handlePress = () => {
        this.setState({
            finalStatus: !this.state.finalStatus
        })
    };

    hasMadeAChange = () => {
        return this.state.finalStatus !== this.state.initialStatus
    };

    closeCollection = () => {

        if(this.hasMadeAChange()){

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

            this.props.navigation.navigate('Landing');
        }
    };

    saveTransaction = (participantId, pot) => {
        this.setState({
            busy: true
        }, ()=>{
            if(this.type === 'collection'){
                ajax.takeCollection(participantId, pot.id).then(response => {
                    if(response){
                        this.setState({
                            busy: false,
                            initialStatus: this.state.finalStatus
                        }, ()=>{
                            this.reloadPot(pot.id);
                        })
                    }
                })
            } else {
                ajax.makePayment(participantId, pot.id).then(response => {
                    if(response){
                        this.setState({
                            busy: false,
                            initialStatus: this.state.finalStatus,
                            hasParticipantPaid: true,
                            disabled: true,
                        }, ()=>{
                            this.reloadPot(pot.id);
                        })
                    }
                })
            }
        });
    };

    render() {

        const { potDetail, participant } = this.props.navigation.state.params;

        const { name, round, savingsAmount, participants } = potDetail;

        const { id, familyName, givenName } = participant.item;

        const potValue = savingsAmount * (participants.length - 1);

        const curValue = savingsAmount * 2;

        const thisRound = round === null ? 1 : round;

        const copy = this.copy[this.type];

        const { hasParticipantPaid } = this.state;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>

                    <View style={[styles.meta]}>
                        <Text style={[ styles.title ]}>{ name }</Text>
                        <Text style={[ styles.subTitle ]}>Current round: <Text style={[styles.darker]}>{ thisRound }</Text></Text>
                    </View>

                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.closeCollection}>
                            <Icon
                                name="left"
                                size={utils.style.icons.top}
                                color={utils.style.colours.purple } />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.intro}>
                    <Text>{ copy.intro }</Text>
                </View>

                <View style={styles.middle}>
                    <Text>{givenName} {familyName}</Text>
                    <Text>Current pot value £{curValue}</Text>
                    <Text>Full pot value £{potValue}</Text>
                    <Text>Saving amount £{savingsAmount}</Text>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={[styles.button, hasParticipantPaid || this.hasMadeAChange() ? styles.paid : null ]}
                                      disabled={ this.state.disabled }
                                      onPress={this.handlePress}>
                        <Text style={[styles.buttonText, hasParticipantPaid || this.hasMadeAChange() ? styles.paidText : null]}>
                            { copy.button.unClicked }
                        </Text>
                    </TouchableOpacity>
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
                        disabled={ !this.hasMadeAChange() }
                        onPress={()=>{this.saveTransaction(id, potDetail)}}>
                        <Icon
                            name="save"
                            size={40}
                            color={ !this.hasMadeAChange() ? utils.style.colours.grayText : utils.style.colours.white  } />
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

                <Modal
                    animationType={'none'}
                    transparent={true}
                    presentationStyle={'overFullScreen'}
                    visible={this.state.busy}>
                    <View style={styles.modal}>
                        <ActivityIndicator
                            animating={this.state.busy}
                            color={utils.style.colours.white}
                            size={'large'}/>
                    </View>
                </Modal>

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
    button: {
        marginVertical: 50,
        width: '60%',
        backgroundColor: utils.style.colours.white,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 8,
        borderColor: utils.style.colours.purple,
        borderWidth: 1
    },
    buttonText: {
        color: utils.style.colours.purple

    },
    paid: {
        backgroundColor: utils.style.colours.purple
    },
    paidText: {
        color: utils.style.colours.white
    },
    meta: {
        flexDirection: 'column',
        flex: 1,
        marginRight: 5
    },
    participants: {
        borderBottomWidth: 1,
        borderColor: utils.style.colours.grayLight,
        height: 90
    },
    middle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: utils.style.colours.white
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: utils.style.colours.white
    },
    modal: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
    },
    activityIndicator: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    footer: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Collection