import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import utils from './../utils';

class Collection extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    closeCollection = () => {
        this.props.navigation.navigate('Landing')
    };

    render() {

        const { potDetail, participant } = this.props.navigation.state.params;

        const { name } = potDetail;

        const { id, contactId } = participant.item;

        return (
            <View style={[ styles.container ]}>

                <View style={styles.top}>
                    <Text style={[ styles.title ]}>{name}</Text>

                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.closeCollection}>
                            <Icon
                                name="left"
                                size={utils.style.icons.top}
                                color={utils.style.colours.purple }
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.middle}>


                </View>
                <View style={styles.bottom}>
                    <Text>ID is { id }</Text>
                    <Text>Contact Id is { contactId }</Text>


                </View>

                <View style={styles.footer}>
                    {/*<TouchableOpacity>*/}
                        {/*<Icon*/}
                            {/*name="left"*/}
                            {/*size={utils.style.icons.top}*/}
                            {/*color={utils.style.colours.white} />*/}
                    {/*</TouchableOpacity>*/}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        height: 49
    },
    title: {
        fontSize: 25,
        color: utils.style.colours.purple,
        paddingBottom: 10
    },
    bottom: {
        borderTopWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: utils.style.colours.white
    },
    footer: {
        backgroundColor: utils.style.colours.purple,
        height: 74,
        padding: 20,
        alignItems: 'flex-end'
    }
});

export default Collection