
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

import Detail from './src/components/Detail';

export default class App extends Component {

    state = {
        screen: 'intro',
        pots: [
            {
                status: 2,
                title: 'Daddy\'s Slippers',
                participants: 4,
                round: 2,
                amount: 80,
                current: 2,
                next: 'Steven',
                potId: '9901-OA-44'
            },
            {
                status: 0
            }
        ],
        potDetail: {}
    };

    updateScreen = screen => {
        this.setState({ screen })
    };

    updatePotDetail = potDetail => {
        this.setState({ potDetail })
    };

    render() {

        const { screen, pots, potDetail } = this.state;

        if(screen === 'intro'){
            return (
                <View style={styles.container}>
                    <Introduction navigateTo={this.updateScreen} />
                </View>
            );
        }

        if(screen === 'list'){
            return (
                <View style={styles.container}>
                    <List navigateTo={this.updateScreen}
                          updatePotDetail={this.updatePotDetail}
                          pots={pots}
                          potDetail={potDetail}  />
                </View>
            );
        }

        if(screen === 'detail'){
            return (
                <View style={styles.container}>
                    <Detail navigateTo={this.updateScreen}
                            potDetail={potDetail} />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
        flex: 1
    }
});
