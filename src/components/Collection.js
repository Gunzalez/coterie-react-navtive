import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import IconII from "react-native-vector-icons/Ionicons";

import IconIII from "react-native-vector-icons/MaterialCommunityIcons";

import ajax from './../ajax';

import utils from './../utils';

import Toast from "react-native-whc-toast";

class Collection extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { participant, potDetail, reloadPot } = this.props.navigation.state.params;
        const { isNextParticipantToCollect, hasParticipantPaid } = participant.item;
        const { participants, savingsAmount, round } = potDetail;

        this.fullPotValue = savingsAmount * (participants.length - 1);
        this.thisRound = round === null ? 1 : round;
        this.type = isNextParticipantToCollect ? 'collection' : 'payment';
        this.savingsAmount = potDetail.savingsAmount;
        this.name = potDetail.name;
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
            currentPotValue: this.savingsAmount * 2
        };

        this.copy = {
            collection: {
                unpaid: {
                    button: "CLICK TO COLLECT",
                    intro: "This participant is due to collect the full pot value for round " + this.thisRound + ".",
                },
                paid: {
                    button: "COLLECTED",
                    intro: "This participant has collected the full pot value for round " + this.thisRound + ".",
                }
            },
            payment: {
                unpaid: {
                    button: "CLICK TO PAY",
                    intro: "This participant is due to pay the saving amount for round " + this.thisRound + ".",
                },
                paid: {
                    button: "PAID",
                    intro: "This participant has paid the saving amount for round " + this.thisRound + ".",
                }
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
                'Changes will be lost without saving\nLeave anyway?',
                [
                    { text: "LEAVE", onPress: () => { this.props.navigation.navigate('Landing') }},
                    { text: "STAY", onPress: () => {}, style: 'cancel' }
                ],
                { cancelable: false }
            );

        } else {

            this.props.navigation.navigate('Landing');
        }
    };

    askToSaveTransaction = (participantId, pot) => {

        if(pot.status === "created"){
            Alert.alert(
                'Start the pot?',
                'Once started, the pot name, saving amount and participants will be fixed.\nStart the pot?',
                [
                    { text: "NO", onPress: () => {}, style: 'cancel' },
                    { text: "YES", onPress: () => { this.startPotThenSaveTransaction(participantId, pot) }},
                ],
                { cancelable: false }
            );
        } else if(pot.status === "in-progress")  {

            this.saveTransaction(participantId, pot)
        }
    };

    saveTransaction = (participantId, pot) => {

        this.setState({
            busy: true
        }, ()=>{
            if(this.type === 'collection'){
                ajax.takeCollection(participantId, pot.id).then(response => {
                    if(response){
                        this.updatePageDetails(pot.id);
                    }
                })
            } else {
                ajax.makePayment(participantId, pot.id).then(response => {
                    if(response){
                        this.updatePageDetails(pot.id);
                    }
                })
            }
        });
    };

    startPotThenSaveTransaction = (participantId, pot) => {
        this.setState({
            busy: true
        }, ()=>{
            ajax.startAPot(pot.id).then( response => {
                if(response){
                    this.saveTransaction(participantId, pot)
                }
            })
        });
    };

    updatePageDetails = (id) => {
        this.setState({
            busy: false,
            initialStatus: this.state.finalStatus,
            hasParticipantPaid: true,
            disabled: true,
        }, () => {
            this.reloadPot(id);
            this.refs.toast.show('Transaction confirmed', Toast.Duration.short, Toast.Position.bottom);
        })
    };

    render() {

        const { potDetail, participant } = this.props.navigation.state.params;

        const { id, familyName, givenName } = participant.item;

        const { hasParticipantPaid, currentPotValue } = this.state;

        const copy = this.copy[this.type][hasParticipantPaid ? 'paid' : 'unpaid'];

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>

                    <TouchableOpacity onPress={this.closeCollection}>
                        <Icon
                            name="left"
                            size={utils.style.icons.top}
                            color={utils.style.colours.purple } />
                    </TouchableOpacity>

                    <View style={[styles.nameInput]}>
                        <Text style={[styles.input]}>{this.name}</Text>
                        <Text style={[styles.meta]}>Rnd {this.thisRound}</Text>
                    </View>

                </View>

                <View style={styles.row}>
                    <View style={[styles.statusIcon]}>

                        { this.type === 'collection' ?

                            <IconII
                                name={'md-hammer'}
                                size={32}
                                color={ hasParticipantPaid ? utils.style.colours.purple : utils.style.colours.gray  }
                            />
                            :
                            <IconIII
                                name={'coin'}
                                size={32}
                                color={ hasParticipantPaid ? utils.style.colours.purple : utils.style.colours.gray }
                            />

                        }

                    </View>

                    <View style={[styles.statusCopy]}>

                        <Text style={styles.amount}>
                            <Text style={styles.label}>£</Text>
                            { this.type === 'collection' ? utils.js.thousandth(this.fullPotValue) : utils.js.thousandth(this.savingsAmount) }
                        </Text>

                        <View style={styles.participant}>
                            <Text style={styles.participantName}>{givenName} {familyName}</Text>
                        </View>

                        <Text style={styles.intro}>{ hasParticipantPaid || this.hasMadeAChange() ? copy.intro : copy.intro }</Text>

                    </View>
                </View>

                <View style={styles.bottom}>

                    { this.hasMadeAChange() ?

                        <Text style={[styles.notificationText]}>
                            Save to confirm {this.type}
                        </Text>

                        :

                        <Text style={[styles.notificationText]}>
                            &nbsp;
                        </Text>

                    }
                    
                    <TouchableOpacity style={[styles.button, hasParticipantPaid || this.hasMadeAChange() ? styles.paid : null ]}
                                      disabled={ this.state.disabled }
                                      onPress={this.handlePress}>
                        <Text style={[styles.buttonText, hasParticipantPaid || this.hasMadeAChange() ? styles.paidText : null]}>
                            { hasParticipantPaid || this.hasMadeAChange() ? copy.button : copy.button }
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
                        onPress={()=>{this.askToSaveTransaction(id, potDetail)}}>
                        <Icon
                            name="save"
                            size={40}
                            color={ !this.hasMadeAChange() ? utils.style.colours.grayText : utils.style.colours.white  } />
                    </TouchableOpacity>
                </View>

                <Modal animationType={'none'}
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
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        height: 105
    },
    statusCopy: {
        flex: 1
    },
    nameInput: {
        paddingTop: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '100%',
    },
    meta: {
        textAlign: 'right',
        color: utils.style.colours.grayText,
        paddingTop: 10
    },
    input: {
        fontSize: 25,
        marginBottom: 15,
        color: utils.style.colours.grayText,
        flex: 1
    },
    label: {
        color: utils.style.colours.grayText
    },
    icon: {
        paddingLeft: 10
    },
    button: {
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
        color: utils.style.colours.purple,
        fontSize: 16
    },
    paid: {
        backgroundColor: utils.style.colours.purple
    },
    paidText: {
        color: utils.style.colours.white
    },
    row: {
        backgroundColor: utils.style.colours.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    participantName: {
        fontSize: 20,
        paddingVertical: 10,
        color: utils.style.colours.grayDark
    },
    participant: {
        borderBottomWidth: 1,
        borderColor: utils.style.colours.grayLight,
        marginBottom: 10
    },
    statusIcon: {
        paddingRight: 10
    },
    amount: {
        fontSize: 27
    },
    bottom: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: utils.style.colours.white,
        flex: 1
    },
    notificationText: {
        color: utils.style.colours.purple,
        fontSize: 15,
        textTransform: 'uppercase',
        paddingBottom: 15
    },
    intro: {
        color: utils.style.colours.grayText
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