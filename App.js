
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

import Detail from './src/components/Detail';

export default class App extends Component {

    state = {
        screen: 'intro',
        pots: [],
        potId: '',
        potDetail: {}
    };

    updateScreen = screen => {
        this.setState({ screen })
    };

    updatePotId = potId => {
        this.setState({ potId })
    };

    render() {

        const { screen } = this.state;

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
                    <List navigateTo={this.updateScreen} updatePotId={this.updatePotId} potId={this.state.potId}  />
                </View>
            );
        }

        if(screen === 'detail'){
            return (
                <View style={styles.container}>
                    <Detail navigateTo={this.updateScreen} potDetail={this.state.potDetail} />
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
