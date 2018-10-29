import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View, Text, Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Detail from './Detail';


class ParticipantsScreen extends Component {

    goBack = () => {
        this.props.navigation.navigate('Detail')
    };

    render(){
        return(
            <View stye={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                <Text stye={{fontSize: 20}}>Participants</Text>
                <Button/>
            </View>
        )
    }
}

class DetailScreen extends Component {

    render(){

        console.log(this.props.navigation.state.params);

        return(
            <View stye={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                <Detail navigateTo={()=>{}} potDetail={{}} />
            </View>
        )
    }
}

const PotDetailNavigator = createStackNavigator({
        Detail: {
            screen: DetailScreen
        },

        Participants: {
            screen: ParticipantsScreen
        }
    },{
        initialRouteName: 'Detail',
        initialRouteParams: {
            navigateTo: () => {},
            pot: {},
            name: 'Ovais'
        },
        headerMode: 'none'
    });

class DetailHome extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired
    };

    state = {
        func: this.props.navigateTo,
        details: this.props.potDetail
    };

    render(){

        return (
            <PotDetailNavigator />
        )
    }
}



export default DetailHome;