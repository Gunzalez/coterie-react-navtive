
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
                "id": "44caf03b-fe75-4baf-82cf-c358bc1d9381",
                "name": "TFS Rocks On!",
                // "nextParticipantToCollect" : "ff0d736d-5a23-4ba2-823a-d4ba2d783865",
                "nextParticipantToCollect" : "Michael Johnson",
                "nextParticipantsToPay": ["3e852ade-da83-41f6-a714-061d1687601e", "aa5b0b63-d669-4c4e-8371-6b37e50c2283"],
                "participants": [
                    {
                        "contactId": "12",
                        "id": "ff0d736d-5a23-4ba2-823a-d4ba2d783865"
                    },
                    {
                        "contactId": "15",
                        "id": "c68ee291-9172-450e-8c99-e1bd6759affc"
                    },
                    {
                        "contactId": "4",
                        "id": "709f1608-a503-4f58-8b3a-b1f783138dac"
                    },
                    {
                        "contactId": "11",
                        "id": "3e852ade-da83-41f6-a714-061d1687601e"
                    },
                    {
                        "contactId": "1",
                        "id": "41749e12-2b97-44a2-be72-11228fa6df60"
                    },
                    {
                        "contactId": "14",
                        "id": "62219a0e-f6ed-4d0c-a6bc-fe9b60c715de"
                    },
                    {
                        "contactId": "16",
                        "id": "aa5b0b63-d669-4c4e-8371-6b37e50c2283"
                    }
                ],
                "round": 1,
                "savingsAmount": 400,
                "status": "in-progress",
                "_capabilities": []
            },
            // {
            //     status: 2,
            //     title: 'Daddy\'s Slippers',
            //     participants: [],
            //     round: 0,
            //     amount: 60,
            //     current: 2,
            //     next: 'Peter Bratu',
            //     potId: '120X-90-4B'
            // },
            // {
            //     status: 1,
            //     title: 'June14.02.2018',
            //     participants: [],
            //     round: 0,
            //     amount: 200,
            //     current: 2,
            //     next: 'Harry Kane',
            //     potId: 'USU-0BV-X'
            // }
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
                        potDetail={potDetail}
                        pots={pots} />
                </View>
            );
        }

        if(screen === 'detail'){
            return (
                <View style={styles.container}>
                    <Detail navigateTo={this.updateScreen}
                        updatePotDetail={this.updatePotDetail}
                        potDetail={potDetail} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        flex: 1
    }
});
