import React from 'react'
import { View,Text,StyleSheet } from 'react-native';
const Card=props=>{
return<View style={{...styles.card,...props.style}}>{props.children}</View>
}

const styles=StyleSheet.create({
card:{
    padding: 20,
    marginVertical: 20,
    shadowColor:'rgb(0,0,0)',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.8,
    shadowRadius:6,
    elevation:5,
    backgroundColor:'white',
    borderRadius:10,
}
});

export default Card;