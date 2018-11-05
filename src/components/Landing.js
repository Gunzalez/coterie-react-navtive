import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

import Row from './LandingRow';

class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

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
        ];
        this.savingsMax = 500;
        this.savingsMin = 50;
        this.savingsInc = 50;
        this.characterCap = 25;

        this.state = {
            potDetail: this.props.potDetail,
            localPot: Object.assign({}, this.props.potDetail),
            charactersLeft: this.characterCap - (this.props.potDetail.name ? this.props.potDetail.name.length : 0)
        };
    }

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

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.localPot,
            contacts: this.contactList
        })
    };

    showCollection = participant => {
        this.props.navigation.navigate('Collection', {
            participant: participant
        })
    };

    updatePotName = name => {
        const localPot = this.state.localPot;
        localPot.name = name;
        const charactersLeft = this.characterCap - name.length;
        this.setState({ charactersLeft, localPot });
    };

    canUpdatePotDetails = () => {
        const { status } = this.state.localPot;
        return status === "created" || status === "new";
    };

    render() {

        const { name, participants = [], status, savingsAmount, round, nextParticipantToCollect } = this.state.localPot;

        const totPotValue = participants.length > 0 ? (participants.length * savingsAmount) - savingsAmount : 0;

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
                                <Text style={[styles.amountText, styles.cashAmount]}>£</Text>
                                <Text style={styles.cashAmount}>{ utils.js.thousandth(totPotValue) }</Text>
                            </View>
                            <View style={styles.savingsMeta}>
                                <Text style={styles.meta}>{participants.length} participants @ £{savingsAmount}</Text>
                                <Text style={styles.meta}>Round: {round}/{participants.length}</Text>
                                <Text style={styles.meta}>Next: {nextParticipantToCollect}</Text>
                            </View>
                        </View>

                    }





                </View>

                <View style={[styles.list]}>

                    { participants.length < 1 &&

                        <View style={styles.empty}>
                            <TouchableOpacity onPress={this.showParticipants}>
                                <Icon
                                    name="addusergroup"
                                    size={utils.style.icons.footer}
                                    color={utils.style.colours.purple}/>
                            </TouchableOpacity>
                            <Text style={styles.emptyText}>Add participants to this pot</Text>
                        </View>
                    }

                    { participants.length > 0 &&

                        <FlatList
                            data={this.state.localPot.participants}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) =>
                                <Row data={item} participantClicked={()=>{this.showCollection(item)} } />
                            }
                        />
                    }

                </View>

                <View style={styles.footer}>

                    <TouchableOpacity>
                        <Icon
                            name="delete"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabaled={!this.canUpdatePotDetails()}>
                        <Icon
                            name="save"
                            size={utils.style.icons.footer}
                            color={ this.canUpdatePotDetails() ? utils.style.colours.white : utils.style.colours.grayText} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon
                            name="menufold"
                            size={utils.style.icons.footer}
                            color={utils.style.colours.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={!this.canUpdatePotDetails()}
                        onPress={this.showParticipants}>
                        <Icon
                            name="addusergroup"
                            size={utils.style.icons.footer}
                            color={ this.canUpdatePotDetails() ? utils.style.colours.white : utils.style.colours.grayText} />
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
        alignItems: 'flex-end'
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
        borderColor: '#cccccc'
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.white
    },
    charactersLeft: {
        marginTop: 5,
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
    cashAmount: {
        fontSize: 40
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
    footer: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Detail