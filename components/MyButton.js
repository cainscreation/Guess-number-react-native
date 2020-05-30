import React from 'react'
import { Text, StyleSheet,View,Touchable, TouchableOpacity } from 'react-native';
import Color from '../constants/Color'
const MyButton=props=>{
    return <TouchableOpacity onPress={props.onPress}>

    <View style={{...props.style,...styles.button}}>
        <Text style={styles.buttonText}>
            {props.children}
        </Text>
    </View>
    </TouchableOpacity>
};




const styles = StyleSheet.create({
button:{
backgroundColor:Color.primary,
paddingVertical:12,
paddingHorizontal:30,
borderRadius:25,

},
buttonText:{
color:'white',
fontFamily:'open-sans',
fontSize:18,
}
});

export default MyButton;