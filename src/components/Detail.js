import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { createStackNavigator } from 'react-navigation';

import Landing from './Landing';

import Participants from './Participants';

import Collection from './Collection';

import Schedule from './Schedule';

class ParticipantsScreen extends Component {
    render(){
        return(
            <Participants navigation={this.props.navigation} />
        )
    }
}

class ScheduleScreen extends Component {
    render(){
        return(
            <Schedule navigation={this.props.navigation} />
        )
    }
}

class LandingScreen extends Component {
    render(){
        const { navigateTo, potDetail, setPotDetail, removePotFromList, addPotToList, updatePotInList } = this.props.screenProps;
        return(
            <Landing
                navigation={this.props.navigation}
                navigateTo={navigateTo}
                setPotDetail={setPotDetail}
                addPotToList={addPotToList}
                removePotFromList={removePotFromList}
                updatePotInList={updatePotInList}
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
    },
    Schedule: {
        screen: ScheduleScreen
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
        setPotDetail: PropTypes.func.isRequired,
        addPotToList: PropTypes.func.isRequired,
        updatePotInList: PropTypes.func.isRequired,
        removePotFromList: PropTypes.func.isRequired
    };

    state = {
        navigateTo: this.props.navigateTo,
        potDetail: this.props.potDetail,
        setPotDetail: this.props.setPotDetail,
        addPotToList: this.props.addPotToList,
        updatePotInList: this.props.updatePotInList,
        removePotFromList: this.props.removePotFromList
    };

    render(){
        return (
            <PotDetailNavigator screenProps={this.state} />
        )
    }
}

export default Detail;