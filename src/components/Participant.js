import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

class Participant extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        participantClicked: PropTypes.func
    };

    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            width: new Animated.Value(67)
        }
    }

    componentDidMount(){
        this.entryAnimation();
    }

    entryAnimation = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start()
    };

    exitAnimation = (contactId) => {
        Animated.sequence([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.timing(this.state.width, {
                toValue: 0,
                duration: 100
            })
        ]).start(()=>{
            this.props.participantClicked(contactId);
        })
    };

    render(){

        const  { data } = this.props;

        const { contactId, avatar, givenName, placeHolder, highlight } = data.item;

        return (
            <Animated.View style={[ styles.container, highlight ? styles.narrow : null, { width: this.state.width }]}>

                <Animated.View style={[ styles.circle, placeHolder ? styles.placeHolder : null, highlight ? styles.highlight : null, {
                    opacity: this.state.opacity,
                    transform: [
                        {
                            scale: this.state.opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.85, 1]
                            })
                        }]}]}>

                    { !placeHolder &&

                        <TouchableWithoutFeedback
                            onPress={()=>{this.exitAnimation(contactId)}}>
                            <View style={[styles.closeBackground]}>
                                <Icon
                                    name={'closecircle'}
                                    size={20}
                                    color={utils.style.colours.grayText} />
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    { placeHolder ?

                        <Icon
                            name={'user'}
                            size={24}
                            color={utils.style.colours.grayText}/>
                        :

                        <Text style={[styles.text]}>{ avatar }</Text>
                    }

                </Animated.View>

                <Text style={[styles.name]}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>{givenName}</Text>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width: 70,
        marginHorizontal: 4,
        alignItems: 'center'
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: utils.style.colours.purple,
        marginHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0
    },
    closeBackground: {
        position: 'absolute',
        right: -5,
        top: -2,
        backgroundColor: utils.style.colours.background,
        width: 24,
        height: 24,
        borderRadius: 12,
        padding: 2
    },
    placeHolder: {
        backgroundColor: utils.style.colours.white,
        borderWidth: 1,
        borderColor: utils.style.colours.grayText,
        borderStyle: 'dashed'
    },
    highlight: {
        backgroundColor: 'red',
        width: 40
    },
    narrow: {
        width: 40
    },
    text: {
        fontSize: 20,
        color: utils.style.colours.white
    },
    name: {
        paddingTop: 5,
        width: '80%',
        textAlign: 'center',
        color: utils.style.colours.grayText
    }
});

export default Participant