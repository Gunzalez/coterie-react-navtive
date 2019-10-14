import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, FlatList, Alert, Modal, ActivityIndicator } from 'react-native';

import Toast from 'react-native-whc-toast'

import Contacts from 'react-native-contacts';

import Icon from "react-native-vector-icons/AntDesign";

import ajax from './../ajax';

import utils from './../utils';

import Row from './LandingRow';

class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        setPotDetail: PropTypes.func.isRequired,
        addPotToList: PropTypes.func.isRequired,
        updatePotInList: PropTypes.func.isRequired,
        removePotFromList: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.savingsMax = 1000;
        this.savingsMin = 50;
        this.savingsInc = 50;
        this.characterCap = 25;

        this.state = {
            busy: false,
            contacts: [],
            contactsPermission: true,
            potDetail: this.props.potDetail,
            localPot: Object.assign({}, this.props.potDetail),
            charactersLeft: this.characterCap - (this.props.potDetail.name ? this.props.potDetail.name.length : 0)
        };
    }

    componentDidMount(){

        Contacts.checkPermission((err, permission) => {

            if (err) throw err;

            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if (permission === 'undefined') {

                Contacts.requestPermission((err, permission) => {

                    if (err) throw err;

                    if (permission === 'authorized') {
                        this.getAllContacts();
                    }

                    if (permission === 'denied') {
                        this.setState({
                            contactsPermission: false
                        })
                    }
                })

            } else {

                if (permission === 'authorized') {
                    this.getAllContacts();
                }

                if (permission === 'denied') {
                    this.setState({
                        contactsPermission: false
                    })
                }
            }
        })
    };

    reAssignContactNames = (contacts) => {
        let contactsToReturn = [];
        contacts.map( item => {
            const lastName = item.familyName.trim();
            let firstName = "";
            let avatar = '';
            if(item.givenName && item.givenName.trim().length){
                firstName = item.givenName.trim();
            } else if (item.displayName && item.displayName.trim().length){
                firstName = item.displayName.trim();
            } else if (item['nickname'] && item['nickname'].trim().length) {
                firstName = item['nickname'].trim();
            } else if (item.name && item.name['formatted'] && item.name['formatted'].trim().length) {
                firstName = item.name['formatted'].trim();
            }
            item.givenName = firstName;
            item.spName = firstName + ' ' + lastName;
            if(firstName.length > 0){
                avatar = firstName.charAt(0).toUpperCase();
                if(lastName.length > 0){
                    avatar = avatar + lastName.charAt(0).toUpperCase();
                }
                item.avatar = avatar;
                contactsToReturn.push(item);
            }
        });
        return contactsToReturn;
    };

    getAllContacts = () => {
        this.setState({
            busy: true
        }, ()=> {
            Contacts.getAllWithoutPhotos((err, contacts) => {
                if (err) throw err;
                this.setState({ contacts: this.reAssignContactNames(contacts) }, () => {
                    this.setState({
                        busy: false
                    })
                })
            });
        })
    };

    handlePress = () => {
        if(this.hasEditedNameOrAmount()){
            Alert.alert(
                'Unsaved changes',
                'Changes will be lost without saving\nLeave anyway?',
                [
                    { text: "LEAVE", onPress: () => { this.props.navigateTo('list'); }},
                    { text: "STAY", onPress: () => {}, style: 'cancel' }
                ],
                { cancelable: false }
            );
        } else {

            this.props.navigateTo('list');
        }
    };

    decreaseSavings = () => {
        Keyboard.dismiss();
        if(this.state.localPot.savingsAmount > this.savingsMin){
            const localPot = this.state.localPot;
            localPot.savingsAmount = localPot.savingsAmount - this.savingsInc;
            this.setState({ localPot });
        }
    };

    increaseSavings = () => {
        Keyboard.dismiss();
        if(this.state.localPot.savingsAmount < this.savingsMax){
            const localPot = this.state.localPot;
            localPot.savingsAmount = localPot.savingsAmount + this.savingsInc;
            this.setState({ localPot });
        }
    };

    updateLocalParticipants = (participants) => {
        const localPot = this.state.localPot;
        localPot.participants = participants;
        this.addNewOrUpdateExistingPot(localPot);
    };

    reloadPot(id){
        ajax.getAPot(id).then(potDetail => {
            const localPot = Object.assign({}, potDetail);
            this.setState({ potDetail, localPot, busy: false }, ()=> {
                this.props.updatePotInList(potDetail);
            });
        })
    }

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.localPot,
            contacts: this.state.contacts,
            updateLocalParticipants: this.updateLocalParticipants
        })
    };

    showSchedule = () => {
        this.props.navigation.navigate('Schedule', {
            potDetail: this.state.localPot,
            contacts: this.state.contacts,
            updateLocalParticipants: this.updateLocalParticipants
        });
    };

    showCollection = participant => {

        const navigationCallBack = () => {
            this.props.navigation.navigate('Collection', {
                participant: participant,
                potDetail: this.state.localPot,
                reloadPot: this.reloadPot.bind(this)
            })
        };

        if(this.hasEditedNameOrAmount()){
            Alert.alert(
                'Unsaved changes',
                'Changes may be lost without saving\nLeave anyway?',
                [
                    { text: "LEAVE", onPress: () => { navigationCallBack() }},
                    { text: "STAY", onPress: () => {}, style: 'cancel' }
                ],
                { cancelable: false }
            );
        } else {
            navigationCallBack();
        }
    };

    updatePotName = name => {
        const localPot = this.state.localPot;
        localPot.name = name;
        const charactersLeft = this.characterCap - name.length;
        this.setState({ charactersLeft, localPot });
    };

    hasEditedNameOrAmount = () => {
        return this.state.localPot.name !== this.state.potDetail.name || this.state.localPot.savingsAmount !== this.state.potDetail.savingsAmount
    };

    canSavePotDetails = () => {
        const { name, participants, status } = this.state.localPot;
        return name && name.trim().length > 0 && participants && participants.length > 2 && status !== "in-progress" && status !== "completed";
    };

    canShowSchedule = () => {
        const { participants, status, name } = this.state.localPot;
        return name && name.trim().length > 0 && participants && participants.length > 2 && status !== "completed";
    };

    canAddParticipants = () => {
        const { status, name } = this.state.localPot;
        return status !== "in-progress" && status !== "completed" && name;
    };

    canDeletePot = () => {
        const { status } = this.state.localPot;
        return status !== "new";
    };

    askToDeletePot = () => {
        const { name } = this.state.localPot;
        Alert.alert(
            'Delete the pot?',
            '"' +name + '"\nwill be removed completely.\nAre you sure?',
            [
                { text: "NO", onPress: () => {}, style: 'cancel' },
                { text: "YES", onPress: () => { this.deletePot() }},
            ],
            { cancelable: false }
        );
    };

    deletePot = () => {
        this.setState({
            busy: true
        }, ()=>{
            const { id, status } = this.state.potDetail;

            if ( status === "completed") {

                ajax.archiveAPot(id).then( response => {
                    if(response){
                        const { removePotFromList } = this.props;
                        removePotFromList(id, () => {
                            this.props.navigateTo('list')
                        });
                    }
                })

            } else {

                ajax.deleteAPot(id).then( response => {
                    if(response){
                        const { removePotFromList } = this.props;
                        removePotFromList(id, () => {
                            this.props.navigateTo('list')
                        });
                    }
                })
            }
        });
    };

    returnParticipantsToDisplay = () => {
        const participants = [];
        this.state.localPot.participants.forEach((participant, index) => {
            const displayParticipant = Object.assign({}, participant, {
                spName: utils.js.getContactDetailFromId(participant.contactId, 'spName', this.state.contacts),
                participants: this.state.potDetail.participants,
                status: this.state.potDetail.status,
                hasLocalPotName: this.state.localPot.name && this.state.localPot.name.trim().length,
                canPayAndCollect: this.state.potDetail.status === 'in-progress' || this.state.potDetail.status === 'created' && this.state.potDetail.participants.length > 2,
                isNextParticipantToCollect: this.state.potDetail.status === 'in-progress' && participant.id === this.state.potDetail['nextParticipantToCollect'],
                isNextParticipantsToPay: this.state.potDetail.status === 'in-progress' && this.state.potDetail['nextParticipantsToPay'].indexOf(participant.id) !== -1,
                isReadyToCollect: this.state.potDetail.status === 'in-progress' && participant.id === this.state.potDetail['nextParticipantToCollect'] && this.state.potDetail['nextParticipantsToPay'].length < 1,
                hasParticipantPaid: this.state.potDetail.status === 'in-progress' && participant.id !== this.state.potDetail['nextParticipantToCollect'] && this.state.potDetail['nextParticipantsToPay'].indexOf(participant.id) === -1
            });

            if(this.state.potDetail.status === 'created'){
                if(index === 0){
                    displayParticipant.isNextParticipantToCollect = true;
                }
            }

            participants.push(displayParticipant)
        });
        // const sortedParticipants = utils.js.sort(participants);
        return participants;
    };

    returnNextParticipantToCollect = () => {
        let nextToCollect = null;
        let contactId = null;
        const { participants, nextParticipantToCollect } = this.state.potDetail;
        if(nextParticipantToCollect){
            participants.map( participant => {
                if(participant.id === nextParticipantToCollect){
                    contactId = participant.contactId
                }
            });
            nextToCollect = utils.js.getContactDetailFromId(contactId, 'givenName', this.state.contacts)
        }
        return nextToCollect
    };

    savePotDetail = () => {

        if(this.hasEditedNameOrAmount()){

            this.setState({
                busy: true
            }, () => {
                const { localPot } = this.state;
                this.addNewOrUpdateExistingPot(localPot);
            });

        }
    };

    addNewOrUpdateExistingPot = (localPot) => {

        if(localPot.id === -1 && localPot.status === 'new') {

            delete localPot.id;
            delete localPot.status;

            ajax.addAPot(localPot).then( potIdArr => {
                const newPotId = potIdArr[potIdArr.length - 1];

                ajax.getAPot(newPotId).then( potDetail => {
                    const localPot = Object.assign({}, potDetail);
                    this.setState({ potDetail, localPot, busy: false }, () => {
                        this.props.addPotToList(this.state.potDetail);
                        this.refs.toast.show('Changes saved', Toast.Duration.short, Toast.Position.bottom);
                    });
                })
            })

        } else {

            ajax.updateAPot(localPot).then( response => {
                if(response){
                    this.reloadPot(localPot.id);
                    this.refs.toast.show('Changes saved', Toast.Duration.short, Toast.Position.bottom);
                }
            })
        }
    };

    render() {

        const { name, participants = [], status, savingsAmount, round } = this.state.localPot;

        const totPotValue = participants.length > 0 ? (participants.length * savingsAmount) - savingsAmount : 0;

        const permission = this.state.contactsPermission;

        let thisRound = round !== null ? round : 1;

        if(status === "completed"){
            thisRound = participants.length
        }

        const colors = utils.style.colours;
        let footerBackgroundColour = colors.purple;
        switch(status){
            case 'completed':
                footerBackgroundColour = colors.grayDark;
                break;
            case 'created':
                footerBackgroundColour = colors.yellow;
                break;
            case 'new':
                footerBackgroundColour = colors.grayText;
                break;
        }

        const _renderContent = () => {

            if(participants.length < 1){
                return (
                    <View style={styles.empty}>
                        <TouchableOpacity onPress={this.showParticipants}
                            disabled={!this.canAddParticipants() || !permission }>
                            <Icon
                                name="addusergroup"
                                size={utils.style.icons.footer}
                                color={ this.canAddParticipants() && permission ? utils.style.colours.purple : utils.style.colours.grayLight }/>
                        </TouchableOpacity>
                        <Text style={[ this.canAddParticipants() && permission ? styles.emptyText : styles.emptyTextDisabled ]}>Manage participants</Text>
                    </View>
                )
            }

            return (
                <FlatList
                    data={this.returnParticipantsToDisplay()}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) =>
                        <Row data={item} participantClicked={()=>{this.showCollection(item)}}/>
                    }
                />
            )
        };

        return (
            <View style={[ styles.container ]}>

                <View style={[styles.top, { backgroundColor: footerBackgroundColour }]}>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Icon
                            name="shrink"
                            size={utils.style.icons.top}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    {(status === "created" || status === "new") &&

                        <View style={[styles.nameInput]}>

                            <TextInput
                                style={styles.input}
                                placeholder={'Type in a pot name'}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'words'}
                                autoFocus={status === 'new'}
                                autoCorrect={false}
                                maxLength={this.characterCap}
                                value={name}
                                onChangeText={(text) => {this.updatePotName(text)}} />

                            <View style={[styles.charactersLeft]}>
                                <Text style={[styles.characters]}>{this.state.charactersLeft}</Text>
                            </View>

                        </View>

                    }

                    {(status === "in-progress" || status === "completed") &&

                        <View style={[styles.nameInput]}>
                            <Text style={[styles.input]}>{name}</Text>
                            <Text style={[styles.meta, { color: utils.style.colours.white, paddingTop: 10 }]}>Rnd {thisRound}</Text>
                        </View>

                    }

                </View>

                <View style={styles.middle}>

                    {(status === "created" || status === "new") &&

                        <View style={styles.savingsSummary}>
                            <TouchableOpacity
                                disabled={savingsAmount <= this.savingsMin}
                                onPress={this.decreaseSavings}
                                style={styles.amountControls}>
                                <Icon
                                    name="minus"
                                    size={utils.style.icons.body}
                                    color={savingsAmount <= this.savingsMin ? utils.style.colours.white : utils.style.colours.grayText}/>
                            </TouchableOpacity>
                            <View style={styles.amount}>
                                <Text style={[styles.amountText, styles.cashAmount]}>£</Text>
                                <Text style={styles.cashAmount}>{utils.js.thousandth(savingsAmount)}</Text>
                            </View>
                            <TouchableOpacity
                                disabled={savingsAmount >= this.savingsMax}
                                onPress={this.increaseSavings}
                                style={styles.amountControls}>
                                <Icon
                                    name="plus"
                                    size={utils.style.icons.body}
                                    color={savingsAmount >= this.savingsMax ? utils.style.colours.white : utils.style.colours.grayText}/>
                            </TouchableOpacity>
                        </View>

                    }

                    {(status === "in-progress" || status === "completed") &&

                        <View style={styles.savingsSummary}>

                            <View style={styles.totalAmount}>
                                <Text style={styles.label}>Pot Value</Text>
                                <View style={styles.cashValue}>
                                    <Text style={[styles.amountText, styles.total]}>£</Text>
                                    <Text style={[styles.total]}>{ utils.js.thousandth(totPotValue) }</Text>
                                </View>
                            </View>

                            <View style={styles.savingsMeta}>
                                <Text style={styles.meta}>{participants.length} <Text style={styles.label}>participants</Text></Text>
                                <Text style={styles.meta}>£{utils.js.thousandth(savingsAmount)} <Text style={styles.label}>each</Text></Text>
                                <Text style={styles.meta}>

                                    { this.returnNextParticipantToCollect()  ?

                                        <Text style={styles.label}>Next: </Text>

                                        :

                                        <Text>All have collected</Text>

                                    }

                                    { this.returnNextParticipantToCollect() }

                                </Text>
                            </View>
                        </View>

                    }

                </View>

                <View style={[styles.list]}>

                    { !permission &&

                        <View style={styles.settings}>
                            <Text style={[styles.settingsHeader]}>Enable Contacts to use this App</Text>
                            <Text style={styles.settingsText}>1. Go to Settings > Saving Pots. If iOS 10.2 or earlier, go to Settings > iCloud.</Text>
                            <Text style={styles.settingsText}>2. Turn on Contacts</Text>
                        </View>
                    }

                    { permission && _renderContent() }

                </View>


                { status === "completed" && 
            
                    <View style={[styles.footer, { backgroundColor: footerBackgroundColour }]}>

                            <TouchableOpacity
                                disabled={ !this.canDeletePot() || !permission}
                                onPress={this.askToDeletePot}>
                                <Icon
                                    name="delete"
                                    size={utils.style.icons.footer}
                                    color={ colors.white } />
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={true}>
                                <Icon
                                    name="delete"
                                    size={utils.style.icons.footer}
                                    color={colors.grayDark} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={true}>
                                <Icon
                                    name="delete"
                                    size={utils.style.icons.footer}
                                    color={colors.grayDark} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this.askToClonePot}>
                            <Icon
                                name="antdesign"
                                size={40}
                                color={ colors.white } />
                            </TouchableOpacity>

                        </View>
                    
                }
                
                { status === "created" ? 

                    <View style={[styles.footer, { backgroundColor: footerBackgroundColour }]}>

                        <TouchableOpacity
                            disabled={ !this.canDeletePot() || !permission}
                            onPress={this.askToDeletePot}>
                            <Icon
                                name="delete"
                                size={utils.style.icons.footer}
                                color={ this.canDeletePot() && permission ? colors.white : colors.grayText } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!this.canSavePotDetails() || !permission || !this.hasEditedNameOrAmount() }
                            onPress={ this.savePotDetail}>

                            { this.hasEditedNameOrAmount() && this.canSavePotDetails() ?

                                <View style={styles.changes}>
                                    {/* red dot */}
                                </View>

                                :

                                null
                            }
                            <Icon
                                name="save"
                                size={utils.style.icons.footer}
                                color={ this.canSavePotDetails() && permission ? colors.white : colors.grayText } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={ !this.canShowSchedule() || !permission }
                            onPress={this.showSchedule}>
                            <Icon
                                name="menufold"
                                size={utils.style.icons.footer}
                                color={ this.canShowSchedule() && permission ? colors.white : colors.grayText } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!this.canAddParticipants() || !permission }
                            onPress={this.showParticipants}>
                            <Icon
                                name="addusergroup"
                                size={utils.style.icons.footer}
                                color={ this.canAddParticipants() && permission ? colors.white : colors.grayText } />
                        </TouchableOpacity>
                    </View>

                :
                
                    null
                
                }

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
        backgroundColor: utils.style.colours.background,
        flex: 1
    },
    changes: {
        width: 18,
        height: 18,
        borderRadius: 8,
        backgroundColor: 'red',
        position: 'absolute',
        top: -2,
        right: -2,
        zIndex: 1,
        borderColor: utils.style.colours.purple,
        borderWidth: 2
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
    top: {
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.grayText,
        alignItems: 'flex-end',
        height: 105
    },
    new: {
        backgroundColor: utils.style.colours.yellow
    },
    running: {
        backgroundColor: utils.style.colours.purpleLight
    },
    completed: {
        backgroundColor: utils.style.colours.grayDark
    },
    nameInput: {
        paddingTop: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '100%',
    },
    middle: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: utils.style.colours.background,
        borderBottomWidth: 1,
        borderColor: utils.style.colours.grayLight
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.white
    },
    charactersLeft: {
        marginTop: 9,
        marginLeft: 15
    },
    characters: {
        color: utils.style.colours.white,
        textAlign: 'center',
        fontSize: 16
    },
    input: {
        fontSize: 25,
        marginBottom: 15,
        color: utils.style.colours.white,
        flex: 1
    },
    amount: {
        flex: 1,
        fontSize: 30,
        paddingTop: 4,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    totalAmount: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cashValue: {
        flex: 1,
        fontSize: 30,
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 3
    },
    savingsSummary: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    savingsMeta: {
        flexDirection: 'column'
    },
    meta: {
        textAlign: 'right'
    },
    label: {
        color: utils.style.colours.grayText
    },
    cashAmount: {
        fontSize: 40
    },
    total: {
        fontSize: 37,
        lineHeight: 37
    },
    amountText: {
        color: utils.style.colours.grayText
    },
    amountControls: {
        backgroundColor: utils.style.colours.gray,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 20,
        marginBottom: 100,
        color: utils.style.colours.grayText
    },
    emptyTextDisabled: {
        fontSize: 20,
        marginBottom: 100,
        color: utils.style.colours.grayLight
    },
    settings: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 40
    },
    settingsHeader: {
        fontSize: 20,
        paddingBottom: 10
    },
    settingsText: {
        fontSize: 16,
        paddingBottom: 10
    },
    footer: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Detail