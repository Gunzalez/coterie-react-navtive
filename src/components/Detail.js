import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation';

import Landing from './Landing';

import Participants from './Participants';

class ParticipantsScreen extends Component {

    render(){

        const { navigate } = this.props.navigation;

        return(
            <Participants
                navigate={navigate}
            />
        )
    }
}

class LandingScreen extends Component {

    render(){

        const { navigateTo, potDetail } = this.props.screenProps;
        const { navigate } = this.props.navigation;

        return(
            <Landing
                navigateTo={navigateTo}
                potDetail={potDetail}
                navigate={navigate}
            />
        )
    }
}

const PotDetailNavigator = createStackNavigator({
    Landing: {
        screen: LandingScreen
    },

    Participants: {
        screen: ParticipantsScreen
    }
},{
    initialRouteName: 'Landing',
    headerMode: 'none',
    mode: 'modal'
});

class DetailHome extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired
    };

    state = {
        navigateTo: this.props.navigateTo,
        potDetail: this.props.potDetail
    };

    render(){
        return (
            <PotDetailNavigator screenProps={this.state} />
        )
    }
}

export default DetailHome;