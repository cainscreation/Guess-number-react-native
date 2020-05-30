import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [guess, setguess] = useState(0);
  const [dataLoaded, setdataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setdataLoaded(true)}
        onError={(err)=>console.lof(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setguess(0);
    setuserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setuserNumber(selectedNumber);
    setguess(0);
  };
  const gameOverHandler = (numofRounds) => {
    setguess(numofRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guess == 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guess > 0) {
    content = (
      <GameOver
        rounds={guess}
        userNumber={userNumber}
        onPress={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="GUESS THE NUMBER" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
