import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation';

import Landing from './Landing';

import Participants from './Participants';

import Collection from './Collection';

class ParticipantsScreen extends Component {

    render(){

        return(
            <Participants navigation={this.props.navigation} />
        )
    }
}

class LandingScreen extends Component {

    render(){

        const { navigateTo, potDetail, savePotDetail } = this.props.screenProps;

        return(
            <Landing
                navigation={this.props.navigation}
                navigateTo={navigateTo}
                savePotDetail={savePotDetail}
                potDetail={potDetail} />
        )
    }
}

class CollectionScreen extends Component {

    render(){

        return(
            <Collection navigation={this.props.navigation} />
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

    constructor(props){
        super(props);
    }

    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        potDetail: PropTypes.object.isRequired,
        savePotDetail: PropTypes.func.isRequired
    };

    state = {
        navigateTo: this.props.navigateTo,
        potDetail: this.props.potDetail,
        savePotDetail: this.props.savePotDetail
    };

    render(){
        return (
            <PotDetailNavigator screenProps={this.state} />
        )
    }
}

export default Detail;