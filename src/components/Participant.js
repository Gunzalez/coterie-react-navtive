import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Animated } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';


class Participant extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        this.entryAnimation();
    }

    entryAnimation = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    };

    render(){

        const createAvatar = (a, b) =>{
            let avatar = a.charAt(0).toUpperCase();
            if(b.trim()){
                avatar = avatar + b.charAt(0).toUpperCase()
            }
            if(avatar.trim().length){
                return avatar;
            } else {
                return "PP"
            }
        };

        const  { data } = this.props;

        const { familyName, givenName, placeHolder, highlight } = data.item;

        return (
            <View style={[ styles.container, highlight ? styles.narrow : null]}>

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
                        <View style={[styles.closeBackground]}>
                            <Icon
                                name={'closecircle'}
                                size={20}
                                color={utils.style.colours.grayText} />
                        </View>
                    }

                    { placeHolder ?

                        <Icon
                            name={'user'}
                            size={24}
                            color={utils.style.colours.grayText}/>
                        :

                        <Text style={[styles.text]}>{ createAvatar(familyName, givenName) }</Text>
                    }

                </Animated.View>

                <Text style={styles.name}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>{familyName}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        marginHorizontal: 4
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
        width: '100%',
        textAlign: 'center',
        color: utils.style.colours.grayText
    }
});

export default Participant