import React, {useState} from 'react';
import Button from '../components/Button';
import {View, StyleSheet} from 'react-native';
import {fontSizes, fontWeights} from '../constants/ui';

import {Text} from 'react-native';
import SignInScreen from './SignIn';
import Input from '../components/Input';

const Welcome = props => {
  const {authenticate} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInPressed, setIsSignInPressed] = useState(false);

  if (isSignInPressed) {
    return <SignInScreen goBack={() => setIsSignInPressed(false)} />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome To Allergy Less</Text>
        <Text>// Need to place logo here</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>Login to Continue</Text>
        <Input label="Email" required onChange={setEmail} value={email} />
        <Input
          label="Password"
          required
          onChange={setPassword}
          value={password}
          secureTextEntry
        />

        <Button
          title="Login"
          mode="outlined"
          onPress={() => authenticate(true)}
        />
        <Button
          title="Don't have account"
          onPress={() => setIsSignInPressed(true)}
        />
      </View>

      <View style={styles.footer}>
        <Text>// Leapfrog Logo here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },

  header: {
    flex: 1,
    alignSelf: 'center',
  },

  headerText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.xBold,
  },

  body: {
    marginTop: 20,
  },

  bodyText: {
    fontSize: fontSizes.normal,
    marginBottom: 10,
    fontWeight: fontWeights.semiBold,
  },

  footer: {
    flex: 1,
    padding: 20,
  },
});

export default Welcome;
