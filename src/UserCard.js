import React, { useState } from 'react';
import {  Dimensions, StyleSheet, Text,  View, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";

const { height, width } = Dimensions.get('window');
const avatarHeight = height * .25

const buttons = [
        {iconActive: require("../user.png"), iconInactive: require("../userInactive.png")}
    ,    {iconActive: require("../user.png"), iconInactive: require("../userInactive.png")}
    ,    {iconActive: require("../user.png"), iconInactive: require("../userInactive.png")}
    ,    {iconActive: require("../user.png"), iconInactive: require("../userInactive.png")}
    ,    {iconActive: require("../user.png"), iconInactive: require("../userInactive.png")}
    
]
class UserCard extends React.Component {
    //  only use Hook for 1 card swipe

    constructor(props){  
        super(props);  
        this.state = {  
            currentTab: 0
          }  
          this.formatDate = this.formatDate.bind(this);
      }  

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + '-' + monthNames[monthIndex] + '-' + year;
      }

    renderTab(index, user){
        switch (index) {
            case 0:
                    return(
                        <View>
                            <Text style={styles.subText}>{'My name Is'}</Text>
                            <Text style={styles.text}>{user.name.first + " " + user.name.last}</Text>
                        </View>
                    )
                break;
            case 1:
                    return(
                    <View>
                        <Text style={styles.subText}>{'My email Is'}</Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    )
                break;
            case 2:
                    const date = new Date(user.dob.date);
                    const stringDate = this.formatDate(date)
                    return(
                        <View>
                            <Text style={styles.subText}>{'My birhday Is'}</Text>
                            <Text style={styles.text}>{stringDate}</Text>
                        </View>
                        )
                break;
            case 3:
                    return(
                        <View>
                            <Text style={styles.subText}>{'My address Is'}</Text>
                            <Text style={styles.text}>{user.location.street.number + " " + user.location.street.name}</Text>
                        </View>
                        )
                break;
            case 4:
                    return(
                        <View>
                            <Text style={styles.subText}>{'My Phone Number Is'}</Text>
                            <Text style={styles.text}>{user.phone}</Text>
                        </View>
                        )
                break;
            default:
                break;
        }
    }

    buttonPress(i){
        this.setState({currentTab: i})
    }

    renderTabButtons(index){
        return buttons.map((b, i) => {
            return (
                <View key={i}>
                { i == index && <Image
                    resizeMode={'contain'}
                    style={styles.button}
                    source={require("../up-arrow.png")}
                    />
                }
                <TouchableOpacity 
                style={styles.buttonContain}
                onPress={this.buttonPress.bind(this,i)} >
                    
                    <Image
                    resizeMode={'contain'}
                    style={styles.button}
                    source={i == index ? b.iconActive : b.iconInactive}
                    />
                </TouchableOpacity>
                </View>
            )
        })
    }
    render(){
        const { containStyle, user } = this.props;
        const { currentTab } = this.state;
        return (
            <View style={[styles.container, containStyle]}>
                <View style={styles.backgroundHeader}/>
                <View style={styles.backgroundBottom}>
                    <View style={styles.infos}>
                        {
                            this.renderTab(currentTab, user)
                        }
                    </View>
                    <View style={styles.tabIcons}>
                        {
                            this.renderTabButtons(currentTab)
                        }
                    </View>
                </View>
                <View style={styles.avatarBorder}>
                    <View style={styles.avatarContainer} >
                        <Image
                            resizeMode='cover'
                            source={{uri: user.picture.large}}
                            style={styles.avt}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
// Styles
const styles = StyleSheet.create({
    container: {
        width: width * .9,
        height: height * .7,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        //overflow: 'hidden'
    },
    backgroundHeader:{
        backgroundColor: 'rgb( 250, 250, 248)',
        height: '45%',
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    backgroundBottom:{
        height: '55%',
        width: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopWidth: 1,
        borderTopColor: 'rgb(208, 207, 208)',
    },
    avatarContainer:{
        overflow: 'hidden',
        borderRadius: avatarHeight / 2,
        width: avatarHeight,
        height: avatarHeight,
    },
    avt: {
        width: avatarHeight,
        height: avatarHeight,
    },
    avatarBorder:{
        borderWidth: 1,
        borderColor: 'rgb(208, 207, 208)',
        borderRadius: avatarHeight / 2,
        position: 'absolute',
        padding: 4,
        top:  height * .12,
        borderRadius: avatarHeight / 2 + 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infos:{
        flex: 2,
        paddingBottom: 10,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tabIcons:{
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        padding: 20

    },
    subText:{
        color: 'grey',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'

    },
    text:{
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button:{
        height: 25,
        width: 25
    },
    buttonContain:{
        marginTop: 10
    }
});

UserCard.propTypes = {
    containStyle: PropTypes.object,
    user: PropTypes.object,
  };
  
UserCard.defaultProps = {
    containStyle: {},
    user:  {
    "name": {
      "first": "brad",
      "last": "gibson"
    },
    "location": {
      "street": {
        "name": "Avenue du Fort-Caire",
        "number": 6731
      }
    },
    "email": "brad.gibson@example.com",
    "dob": {
      "date": "1993-07-20T09:44:18.674Z",
      "age": 26
    },
    "phone": "011-962-7516",
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/75.jpg",
    },
    },
};

export default UserCard
