// Imports: Dependencies
import React, { useState, useEffect } from 'react';
import { Modal, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserCard from './UserCard';
const { height, width } = Dimensions.get('window');
import Swiper from 'react-native-deck-swiper';

import { addFavoriteRequest } from './action/favoriteAction';
function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function Main (props) {

    const [user, setUser] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [modalVisible, openModal] = useState(false);

    useEffect(() => {
        fetchUserData();
    },[])

    fetchUserData = () =>{
        const url = "https://randomuser.me/api/?results=10";
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const newUserData = user.concat(res.results)
                setUser(newUserData)
            });
    }

    _renderItem = (item, index) => {
        return (
          <View>
                <UserCard key={index}
                user={item}
                />
          </View>
        );
    }

    onSwiped = (type) => {
      console.log(`on swiped ${type}`)
      switch (type) {
        case 'left':  setCardIndex(cardIndex + 1)
                    if(cardIndex >= user.length - 1)
                    {
                      fetchUserData()
                    }
                    break;
        case 'right':  setCardIndex(cardIndex + 1)
                    props.addFavoriteRequest(user[cardIndex])
                    break;
      
        default:
          break;
      }
    }


    return (
    <SafeAreaView style={styles.container}>
            <View style={styles.backgroundHeader}/>
            <View style={styles.backgroundBottom}/>
            <View style={styles.carousel}>
                <Swiper
                cards={user}
                renderCard={(user,index) => _renderItem(user,index)}
                disableTopSwipe
                disableBottomSwipe
                onSwipedLeft={() => onSwiped('left')}
                onSwipedRight={() => onSwiped('right')}
                cardIndex={cardIndex}
                backgroundColor={'transparent'}
                stackSize= {3}> 
                {/* stackSize = 1 when UserCard is function component */}
                </Swiper>
            </View>
            <View style={styles.favorites}>
              <Text style={styles.favText}>Favorite List in db</Text>
              <FlatList
              data={props.favoriteReducer.favorites}
              renderItem={({ item }) => <Item title={item.name.first} />}
              keyExtractor={item => item.login.username }
              />
            </View>
               
    </SafeAreaView>
    )
}

// Styles
const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   },
   backgroundHeader:{
        backgroundColor: 'rgb( 45, 45, 50)',
        flex: 2,
        width: '100%',
   },
   backgroundBottom:{
        backgroundColor: 'rgb( 250, 250, 248)',
        flex: 4,
        width: '100%',
   },
   carousel:{
        position: 'absolute',
        zIndex: 2,
        top: 0,
        width: width,
        height: height*.7,
        justifyContent: 'center',
        backgroundColor: 'transparent'
   },
   favorites:{
     marginTop: 10,
     marginLeft: 30,
     flex: 1,
     width: "100%"
   },
   favText:{
     fontSize: 16,
     fontWeight: 'bold'
   }
});



// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    favoriteReducer: state.favoriteReducer
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    addFavoriteRequest: user => dispatch(addFavoriteRequest(user)),
  };
};
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Main)