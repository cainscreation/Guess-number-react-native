import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import colors from '../constants/Color';

const Header=props=>{
    
return(<View style={styles.headerTitle}>
<Text style={styles.headerText}>{props.title}</Text>
</View>);
}

const styles= StyleSheet.create({
headerTitle:{
width:'100%',
height:90,
paddingTop:40,
backgroundColor:colors.primary,
alignItems:"center",
justifyContent:"center",

},
headerText:{
color:'white',
fontSize:20,
fontWeight:'900',

},
});

export default Header;