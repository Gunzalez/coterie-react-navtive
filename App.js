
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import Introduction from './src/components/Introduction';

import List from './src/components/List';

export default class App extends Component {

    state = {
        stage: 'intro'
    };

    stageUpdate = stage => {
        this.setState({ stage })
    };

    render() {

        const { stage } = this.state;

        if(stage === 'intro'){
            return (
                <View style={styles.container}>
                    <Introduction skipLink={this.stageUpdate} />
                </View>
            );
        }

        if(stage === 'list'){
            return (
                <View style={styles.container}>
                    <List />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingTop: 30,
        flex: 1
    }
});
