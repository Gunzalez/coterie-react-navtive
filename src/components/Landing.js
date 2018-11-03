import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native';

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
        this.characterCap = 25;

        this.state = {
            potDetail: this.props.potDetail,
            saveValue: this.savingsMin,
            newName: '',
            charactersLeft: this.characterCap
        };
    }

    handlePress = () => {
        this.props.navigateTo('list');
    };

    decreaseSavings = () => {
        Keyboard.dismiss();
        if(this.state.saveValue > this.savingsMin){
            this.setState((state) => {
                return { saveValue: state.saveValue - 50 };
            });
        }
    };

    increaseSavings = () => {
        Keyboard.dismiss();
        if(this.state.saveValue < this.savingsMax){
            this.setState((state) => {
                return { saveValue: state.saveValue + 50 };
            });
        }
    };

    showParticipants = () => {
        this.props.navigation.navigate('Participants', {
            potDetail: this.state.potDetail,
            contacts: this.contactList
        })
    };

    updatePotName = newName => {
        this.setState({
            charactersLeft: this.characterCap - newName.length,
            newName
        })
    };

    render() {

        const { name = 'Saving Pot Name', savingsAmount = 50, participants = [], status, round, nextParticipantToCollect } = this.state.potDetail;

        const totPotValue =  (participants.length * savingsAmount) - savingsAmount;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Icon
                            name="shrink"
                            size={utils.style.icons.size}
                            color={utils.style.colours.white}/>
                    </TouchableOpacity>
                    <View style={[styles.nameInput]}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Saving Pot name'}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'words'}
                            autoFocus={status === 'new'}
                            maxLength={this.characterCap}
                            value={this.state.newName}
                            onChangeText={(text) => {this.updatePotName(text)}}
                        />
                        <View style={[styles.charactersLeft]}>
                            <Text style={[ styles.characters ]}>{this.state.charactersLeft}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.middle}>

                    <View style={styles.savingsAmount}>
                        <TouchableOpacity
                            disabled={this.state.saveValue <= this.savingsMin}
                            onPress={this.decreaseSavings}
                            style={styles.amountControls}>
                            <Icon
                                name="minus"
                                size={utils.style.icons.size}
                                color={this.state.saveValue <= this.savingsMin ? utils.style.colours.grayText : utils.style.colours.purple}/>
                        </TouchableOpacity>
                        <View style={styles.amount}>
                            <Text style={[styles.amountText, styles.cashAmount]}>£</Text>
                            <Text style={styles.cashAmount}>{ this.state.saveValue }</Text>
                            {/*<Text style={[styles.amountText, styles.cashAmount]}>.00</Text>*/}
                        </View>
                        <TouchableOpacity
                            disabled={this.state.saveValue >= this.savingsMax}
                            onPress={this.increaseSavings}
                            style={styles.amountControls}>
                            <Icon
                                name="plus"
                                size={utils.style.icons.size}
                                color={this.state.saveValue >= this.savingsMax ? utils.style.colours.grayText : utils.style.colours.purple} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.empty}>
                        <TouchableOpacity onPress={this.showParticipants}>
                            <Icon
                                name="addusergroup"
                                size={40}
                                color={utils.style.colours.purple} />
                        </TouchableOpacity>
                        <Text style={styles.emptyText}>Add participants to this pot</Text>
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
                            name="addusergroup"
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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    charactersLeft: {
        // borderRadius: 13,
        // height: 26,
        // width: 26,
        // borderWidth: 1,
        // borderColor: utils.style.colours.gray,
        // marginLeft: 15,
        marginTop: 5
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
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    savingsAmount: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20
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
        marginBottom: 80,
        color: utils.style.colours.grayText
    },
    footer: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: utils.style.colours.purple
    }
});

export default Detail