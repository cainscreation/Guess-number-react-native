import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView
} from "react-native";
import Box from "../components/Box";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import BodyText from "../components/BodyText";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value,numOfRounds) => (
  <View key={value} style={styles.list}>
    <BodyText>#{numOfRounds} </BodyText>
    <Text>{value}</Text>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomNumber(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", "Dont act smart bitch", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setrounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <Box>{currentGuess}</Box>
      <Card style={styles.buttonContainer}>
        <MyButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MyButton>
        <MyButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MyButton>
      </Card>
     <View style={styles.listIn}>
     <ScrollView contentContainerStyle={styles.listScroll}>
        {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length-index))}
      </ScrollView>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  list:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:"space-between",


  },
  listIn:{
    flex:1,
    width:'80%',


  },
  listScroll:{
alignItems:'center',
justifyContent:'flex-end',
// flexGrow:1
  },
});
export default GameScreen;
