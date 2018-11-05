import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation';

// pages
import Landing from './Landing';
import Participants from './Participants';
import Collection from './Collection';

class ParticipantsScreen extends Component {

    render(){

        const { updatePotDetail } = this.props.screenProps;

        return(
            <Participants
                navigation={this.props.navigation}
                updatePotDetail={updatePotDetail}
            />
        )
    }
}

class LandingScreen extends Component {

    render(){

        const { navigateTo, potDetail } = this.props.screenProps;

        return(
            <Landing
                navigation={this.props.navigation}
                navigateTo={navigateTo}
                potDetail={potDetail}
            />
        )
    }
}

class CollectionScreen extends Component {

    render(){

        // const { navigateTo, potDetail } = this.props.screenProps;

        return(
            <Collection
                navigation={this.props.navigation}
            />
        )
    }
}

const CollectionNavigator = createStackNavigator({
    Landing: {
        screen: LandingScreen
    },
    Collection: {
        screen: CollectionScreen
    }
}, {
    initialRouteName: 'Landing',
    headerMode: 'none',
    mode: 'card'
});

const PotDetailNavigator = createStackNavigator({
    Landing: {
        screen: CollectionNavigator
    },
    Participants: {
        screen: ParticipantsScreen
    },
    Collection: {
        screen: CollectionScreen
    }
},{
    initialRouteName: 'Landing',
    headerMode: 'none',
    mode: 'modal'
});


class Detail extends Component {

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        updatePotDetail: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired
    };

    state = {
        navigateTo: this.props.navigateTo,
        potDetail: this.props.potDetail,
        updatePotDetail: this.props.updatePotDetail
    };

    render(){
        return (
            <PotDetailNavigator screenProps={this.state} />
        )
    }
}

export default Detail;