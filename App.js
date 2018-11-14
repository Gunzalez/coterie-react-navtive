
import React, { Component } from 'react';

import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

import Detail from './src/components/Detail';

import utils from './src/utils';

import ajax from './src/ajax';

YellowBox['ignoreWarnings'](['Require cycle']); // well that was painful

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 'intro',
            pots: [],
            potDetail: {}
        };
    }

    componentDidMount(){

        ajax.getAccessTokenFromStorage().then( accessToken => {

            if(accessToken.length > 0) {

                this.setHeadersWithAccessTokenGetAllPots(accessToken);

            } else {

                ajax.registerAndReturnRegistrationString().then( registrationStringArr => {

                    const registrationString = registrationStringArr[registrationStringArr.length - 1];

                    if(registrationString.length > 0) {

                        ajax.getAccessTokenRegistrationString(registrationString).then( response => {

                            const accessToken = response['authorisationToken'];

                            if(accessToken.length > 0) {

                                ajax.saveAccessTokenToStorage(accessToken).then( _ => {

                                    this.setHeadersWithAccessTokenGetAllPots(accessToken);

                                });
                            }
                        });
                    }
                });
            }
        })
    }

    setHeadersWithAccessTokenGetAllPots = accessToken => {
        ajax.accessToken = accessToken;
        ajax.setHeadersForFetch();
        ajax.getAllPots().then( data => {
            const pots = data['plans'];
            this.setState({ pots })
        })
    };

    switchScreen = screen => {
        this.setState({ screen })
    };

    setPotDetail = potDetail => {
        this.setState({ potDetail })
    };

    removePotFromList = (id, callback) => {
        const pots = this.state.pots.slice();
        pots.forEach((pot, index) => {
            if(pot.id === id || pot.id === -1 || pot.status === "new"){
                pots.splice(index, 1);
            }
        });
        this.setState({ pots }, ()=>{
            callback();
        })
    };

    addPotToList = potDetail => {
        const pots = this.state.pots.slice();
        pots.forEach((pot, index) => {
            if(pot.id === -1 || pot.status === "new"){
                pots.splice(index, 1);
            }
        });
        pots.push(potDetail);
        this.setState({ pots, potDetail });
    };

    updatePotInList = potDetail => {
        const pots = [];
        this.state.pots.forEach( pot => {
            if(pot.id === potDetail.id){
                const updatedPot = Object.assign({}, potDetail);
                pots.push(updatedPot)
            } else {
                const existingPot = Object.assign({}, pot);
                pots.push(existingPot)
            }
        });
        pots.forEach((pot, index) => {
            if(pot.id === -1 || pot.status === "new"){
                pots.splice(index, 1);
            }
        });
        this.setState({ pots, potDetail });
    };

    render() {

        const { screen, pots, potDetail } = this.state;

        if(screen === 'intro'){
            return (
                <View style={styles.container}>
                    <StatusBar barStyle={"light-content"} />
                    <Introduction navigateTo={this.switchScreen} />
                </View>
            );
        }

        if(screen === 'list'){
            return (
                <View style={styles.container}>
                    <StatusBar barStyle={"light-content"} />
                    <List navigateTo={this.switchScreen}
                        setPotDetail={this.setPotDetail}
                        potDetail={potDetail}
                        pots={pots} />
                </View>
            );
        }

        if(screen === 'detail'){
            return (
                <View style={styles.container}>
                    <StatusBar barStyle={"light-content"} />
                    <Detail navigateTo={this.switchScreen}
                        setPotDetail={this.setPotDetail}
                        addPotToList={this.addPotToList}
                        updatePotInList={this.updatePotInList}
                        removePotFromList={this.removePotFromList}
                        potDetail={potDetail} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: utils.style.colours.purple,
        paddingTop: getStatusBarHeight(),
        flex: 1
    }
});
