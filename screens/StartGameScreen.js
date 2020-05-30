import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BodyText from '../components/BodyText';
import Card from "../components/Card";
import colors from "../constants/Color";
import Input from "../components/Inputs";
import Box from '../components/Box'
import GameScreen from "./GameScreen";
import MyButton from '../components/MyButton'

const StartGameScreens = (props) => {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputhandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99.", [
        { text: "okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
  };

  let confirmOutput;
  if (confirmed) {
    confirmOutput =      <Card style={styles.summaryContainer}>
    <BodyText>You selected</BodyText>
    <Box>{selectedNumber}</Box>
    <MyButton onPress={()=>props.onStartGame(selectedNumber)}>START GAME</MyButton>
  </Card>;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <BodyText style={styles.title}>Start The Game</BodyText>
        <Card style={styles.inputContainer}>
          <BodyText>Select A Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputhandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Start" onPress={confirmHandler} />
            </View>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetHandler}
                color={colors.accent}
              />
            </View>
          </View>
        </Card>
        {confirmOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    
    // justifyContent: "center",
  },
  title:{
fontSize:20,
fontFamily:'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    
  },
  button: {
    width: "30%",
    borderRadius:25,
    
  },
  input: {
    width: 40,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});
export default StartGameScreens;
