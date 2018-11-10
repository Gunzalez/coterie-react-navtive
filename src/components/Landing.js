import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native';

import Contacts from 'react-native-contacts';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Row from './LandingRow';

class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        savePotDetail: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.contactList = [
            {
                familyName:"Karl",
                givenName:"Walsh",
                id: "1"
            },
            {
                familyName:"Titi",
                givenName:"Adesanya",
                id: "2"
            },
            {
                familyName:"Hasan",
                givenName:"Kazan",
                id: "3"
            },
            {
                familyName:"Segun",
                givenName:"Konibire",
                id: "4"
            },
            {
                familyName:"Malcolm",
                givenName:"Seaborn",
                id: "5"
            },
            {
                familyName:"Frank",
                givenName:"Sinatra",
                id: "6"
            },
            {
                familyName:"Mathew",
                givenName:"Ferry",
                id: "7"
            },
            {
                familyName:"Clifton",
                givenName:"Green",
                id: "8"
            },
            {
                familyName:"Mary",
                givenName:"Poppins",
                id: "9"
            },
            {
                familyName:"Jay",
                givenName:"Flaxman",
                id: "10"
            },
            {
                familyName:"Jaclyn",
                givenName:"Jones",
                id: "11"
            },
            {
                familyName:"Pilan",
                givenName:"Ramiah",
                id: "12"
            },
            {
                familyName:"Keon",
                givenName:"Konibire",
                id: "13"
            },
            {
                familyName:"Kayden",
                givenName:"konibire",
                id: "14"
            },
            {
                familyName:"Rob",
                givenName:"Curle",
                id: "15"
            },
            {
                familyName:"Jacky",
                givenName:"Brown",
                id: "16"
            },
            {
                familyName:"Kevin",
                givenName:"Philips",
                id: "17"
            },
            {
                familyName:"Lynda",
                givenName:"Dot.Com",
                id: "18"
            },
            {
                familyName:"Jane",
                givenName:"Red",
                id: "19"
            },
            {
                familyName:"Susan",
                givenName:"Fox",
                id: "20"
            },
            {
                familyName:"Florence",
                givenName:"Nightingale",
                id: "21"
            }
        ];
        this.savingsMax = 1000;
        this.savingsMin = 50;
        this.savingsInc = 50;
        this.characterCap = 25;

        this.state = {
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

    getAllContacts = () => {
        Contacts.getAllWithoutPhotos((err, contacts) => {
            if (err) throw err;
            this.contactList = contacts;
        });
    };

    handlePress = () => {
        this.props.navigateTo('list');
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
        this.setState({ localPot });
    };

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.localPot,
            contacts: this.contactList,
            updateLocalParticipants: this.updateLocalParticipants
        })
    };

    showCollection = participant => {
        this.props.navigation.navigate('Collection', {
            participant: participant,
            potDetail: this.state.localPot
        })
    };

    updatePotName = name => {
        const localPot = this.state.localPot;
        localPot.name = name;
        const charactersLeft = this.characterCap - name.length;
        this.setState({ charactersLeft, localPot });
    };

    canSavePotDetails = () => {
        const { status } = this.state.localPot;
        return status === "created" || status === "new";
    };

    savePotDetail = () => {
        const { localPot } = this.state;
        this.props.savePotDetail(localPot);
    };

    render() {

        const { name, participants = [], status, savingsAmount, round = "-", nextParticipantToCollect } = this.state.localPot;

        const totPotValue = participants.length > 0 ? (participants.length * savingsAmount) - savingsAmount : 0;

        const permission = this.state.contactsPermission;

        const _renderContent = () => {

            if(participants.length < 1){
                return (
                    <View style={styles.empty}>
                        <TouchableOpacity onPress={this.showParticipants}>
                            <Icon
                                name="addusergroup"
                                size={utils.style.icons.footer}
                                color={utils.style.colours.purple}/>
                        </TouchableOpacity>
                        <Text style={styles.emptyText}>Add participants to this pot</Text>
                    </View>
                )
            }

            return (
                <FlatList
                    data={this.state.localPot.participants}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) =>
                        <Row data={item} participantClicked={()=>{this.showCollection(item)} } />
                    }
                />
            )
        };

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
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
                                placeholder={'Type in a name'}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'words'}
                                autoFocus={status === 'new'}
                                autoCorrect={false}
                                maxLength={this.characterCap}
                                value={name}
                                onChangeText={(text) => {this.updatePotName(text)}}
                            />

                            <View style={[styles.charactersLeft]}>
                                <Text style={[styles.characters]}>{this.state.charactersLeft}</Text>
                            </View>

                        </View>

                    }

                    {(status === "in-progress" || status === "completed") &&

                        <View style={[styles.nameInput]}>
                            <Text style={[styles.input]}>{name}</Text>
                            <Text style={[styles.meta, { color: utils.style.colours.white, paddingTop: 10 }]}>{round}/{participants.length}</Text>
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
                                    color={savingsAmount <= this.savingsMin ? utils.style.colours.grayText : utils.style.colours.purple}/>
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
                                    color={savingsAmount >= this.savingsMax ? utils.style.colours.grayText : utils.style.colours.purple}/>
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
                                <Text style={styles.meta}>{participants.length} participants</Text>
                                <Text style={styles.meta}>£{savingsAmount} each</Text>
                                {/*<Text style={styles.meta}>Next: {nextParticipantToCollect}</Text>*/}
                                <Text style={styles.meta}>Next: {'Michael Jordan'}</Text>
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

                <View style={styles.footer}>

                    <TouchableOpacity>
                        <Icon
                            name="delete"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={!this.canSavePotDetails() && permission }
                        onPress={ this.savePotDetail}>
                        <Icon
                            name="save"
                            size={utils.style.icons.footer}
                            color={ this.canSavePotDetails() && permission  ? utils.style.colours.white : utils.style.colours.grayText} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name="menufold"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={!this.canSavePotDetails() && permission }
                        onPress={this.showParticipants}>
                        <Icon
                            name="addusergroup"
                            size={utils.style.icons.footer}
                            color={ this.canSavePotDetails() && permission ? utils.style.colours.white : utils.style.colours.grayText} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    top: {
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.purple,
        alignItems: 'flex-end',
        height: 105
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
        backgroundColor: '#f5f5f5',
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
        justifyContent: 'space-between',
        height: 50
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
    settings: {
        flex: 1,
        // justifyContent: 'space-around',
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