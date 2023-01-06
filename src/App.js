/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Navigator from './Navigator';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Welcome from './screens/Welcome';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const authenticate = isLoggedIn => {
    console.log(isLoggedIn);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoggedIn(isLoggedIn);
        resolve();
      }, 3000);
    });
  };

  return !isLoggedIn ? (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Welcome authenticate={authenticate} />
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Navigator authenticate={authenticate} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
