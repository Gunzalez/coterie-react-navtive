
import React, { Component } from 'react';

import { StyleSheet, View, StatusBar } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

import Detail from './src/components/Detail';

import data from './src/data/DummyPots';

import utils from './src/utils';

import ajax from './src/ajax';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 'intro',
            pots: data['plans'],
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
            // console.log(pots);
            // console.log(this.state.pots);
            this.setState({ pots })
        })
    };

    switchScreen = screen => {
        this.setState({ screen })
    };

    setPotDetail = potDetail => {
        this.setState({ potDetail })
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
