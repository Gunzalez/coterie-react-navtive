
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

import Detail from './src/components/Detail';

export default class App extends Component {

    state = {
        screen: 'intro',
        potId: null
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
                    <List navigateTo={this.updateScreen} updatePotId={this.updatePotId}  />
                </View>
            );
        }

        if(screen === 'detail'){
            return (
                <View style={styles.container}>
                    <Detail navigateTo={this.updateScreen} potId={this.state.potId} />
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
